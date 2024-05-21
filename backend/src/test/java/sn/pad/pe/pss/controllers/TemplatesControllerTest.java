package sn.pad.pe.pss.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import sn.pad.pe.pss.services.helpers.FileStorageService;

@ExtendWith(MockitoExtension.class)
class TemplatesControllerTest {

	private MockMvc mockMvc;
	
	@Mock
	private FileStorageService fileStorageService;

	@InjectMocks
	private TemplatesController templatesController;


	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(templatesController)
				.build();
	}

	@Test
	void testDownloadFile() throws Exception {
		ResponseEntity<Resource> resource = new ResponseEntity<Resource>(HttpStatus.OK);

		when(fileStorageService.downloadFile(any(String.class), any(HttpServletRequest.class))).thenReturn(resource);
		mockMvc.perform(get("/templates/{name_template}","liste_agents"))
		.andExpect(status().isOk());
		
		mockMvc.perform(get("/templates/{name_template}","agent"))
		.andExpect(status().isOk());
		
	}

}
