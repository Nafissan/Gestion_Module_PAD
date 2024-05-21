package sn.pad.pe.pss.controllers;

import static org.hamcrest.core.Is.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.dto.PrivilegeDTO;
import sn.pad.pe.pss.services.PrivilegeService;

@DisplayName("Test Classe PrivilegesController")
@ExtendWith(MockitoExtension.class)
class PrivilegeControllerTest {

	private MockMvc mockMvc;

	@Mock
	private PrivilegeService privilegeService;

	@InjectMocks
	private PrivilegeController privilegeController;

	private static PrivilegeDTO privilege1;
	private static PrivilegeDTO privilege2;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		privilege1 = new PrivilegeDTO();
		privilege1.setNom("CREATE");
		privilege1.setDescription("Avoir le droit de creer un objet");
		privilege2 = new PrivilegeDTO();
		privilege2.setNom("UPDATE");
		privilege2.setDescription("Avoir le droit de modifier un objet");

	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(privilegeController)
				.build();
	}

	@Test
	void testGetPrivileges() throws Exception {
		List<PrivilegeDTO> privileges = Arrays.asList(privilege1, privilege2);
		when(privilegeService.getPrivileges()).thenReturn(privileges);
		mockMvc.perform(get("/privileges")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].nom", is("CREATE")))
				.andExpect(jsonPath("$[0].description", is("Avoir le droit de creer un objet")))
				.andExpect(jsonPath("$[1].nom", is("UPDATE")))
				.andExpect(jsonPath("$[1].description", is("Avoir le droit de modifier un objet")));
		verify(privilegeService, times(1)).getPrivileges();
		verifyNoMoreInteractions(privilegeService);
	}

	@Test
	void testGetPrivilegeById() throws Exception {
		when(privilegeService.getPrivilegeById("CREATE")).thenReturn(privilege1);
		mockMvc.perform(get("/privileges/{name}", "CREATE")).andExpect(status().isFound())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.nom", is("CREATE")));
		verify(privilegeService, times(1)).getPrivilegeById("CREATE");
		verifyNoMoreInteractions(privilegeService);
	}

	@Test
	void testCreate() throws Exception {
		PrivilegeDTO privilegeDTO = new PrivilegeDTO();
		privilegeDTO.setNom("DELETE");
		privilegeDTO.setDescription("Avoir le droit de supprimer un objet");
		when(privilegeService.create(any(PrivilegeDTO.class))).thenReturn(privilegeDTO);
		mockMvc.perform(post("/privileges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(privilegeDTO)))
				.andExpect(status().isCreated());
		verify(privilegeService, times(1)).create(any(PrivilegeDTO.class));
		verifyNoMoreInteractions(privilegeService);
	}

	@Test
	void testUpdate() throws Exception {
		PrivilegeDTO privilegeDTO = new PrivilegeDTO();
		privilegeDTO.setNom("CREATE");
		privilegeDTO.setDescription("Avoir le droit de creer un objet");
		when(privilegeService.update(any(PrivilegeDTO.class))).thenReturn(true);
		mockMvc.perform(put("/privileges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(privilegeDTO)))
				.andExpect(status().isOk());
		
		when(privilegeService.update(any(PrivilegeDTO.class))).thenReturn(false);
		mockMvc.perform(put("/privileges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(privilegeDTO)))
				.andExpect(status().isNotFound());
		
		verify(privilegeService, times(2)).update(any(PrivilegeDTO.class));
		verifyNoMoreInteractions(privilegeService);
	}

	@Test
	void testDelete() throws Exception {
		PrivilegeDTO privilegeDTO = new PrivilegeDTO();
		when(privilegeService.delete(any(PrivilegeDTO.class))).thenReturn(true);
		mockMvc.perform(
				delete("/privileges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(privilegeDTO)))
				.andExpect(status().isOk());
		
		when(privilegeService.delete(any(PrivilegeDTO.class))).thenReturn(false);
		mockMvc.perform(
				delete("/privileges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(privilegeDTO)))
		.andExpect(status().isNotFound());
		
		verify(privilegeService, times(2)).delete(any(PrivilegeDTO.class));
		verifyNoMoreInteractions(privilegeService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
