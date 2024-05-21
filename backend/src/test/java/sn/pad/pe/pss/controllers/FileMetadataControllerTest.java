package sn.pad.pe.pss.controllers;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.dto.FileMetaDataDTO;
import sn.pad.pe.pss.services.FileMetaDataService;


/**
 * 
 * @author charle.sarr
 *
 */
@ExtendWith(MockitoExtension.class)
public class FileMetadataControllerTest {

	private MockMvc mockMvc;
	@Mock
	private FileMetaDataService fileMetaDataService;
	@Spy
	private ModelMapper modelmapper;
	@SpyBean
	private ModelMapper modelMapper;
	@InjectMocks
	private FileMetaDataController fileMetaDataController;
	private static FileMetaData fileMetaData;
	private static FileMetaDataDTO fileMetaDataDTO1;
	private static FileMetaDataDTO fileMetaDataDTO2;
	private static List<FileMetaDataDTO> listeFileMetaDataDTO;

	@BeforeEach
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(fileMetaDataController)
				.build();
	}

	@BeforeAll
	public static void setUpBeforeClass() throws Exception {

		listeFileMetaDataDTO = new ArrayList<>();
		fileMetaData = new FileMetaData();
		fileMetaData.setId(1L);

		fileMetaDataDTO1 = new FileMetaDataDTO();
		fileMetaDataDTO1.setId(3L);


		fileMetaDataDTO2 = new FileMetaDataDTO();
		fileMetaDataDTO2.setId(2L);

		listeFileMetaDataDTO.add(fileMetaDataDTO1);
		listeFileMetaDataDTO.add(fileMetaDataDTO2);

	}

	@Test
	public void getFileMetaDatasTest() throws Exception {
		when(fileMetaDataService.getAll()).thenReturn(listeFileMetaDataDTO);
		mockMvc.perform(get("/fileMetaDatas")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));
		verify(fileMetaDataService, Mockito.times(1)).getAll();
		verifyNoMoreInteractions(fileMetaDataService);
	}

	@Test
	public void getFileMetaDataByIdTest() throws Exception {
		when(fileMetaDataService.findById(fileMetaDataDTO1.getId())).thenReturn(fileMetaDataDTO1);
		mockMvc.perform(get("/fileMetaDatas/{id}", fileMetaDataDTO1.getId())).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		verify(fileMetaDataService, times(1)).findById(fileMetaDataDTO1.getId());
		verifyNoMoreInteractions(fileMetaDataService);
	}
	
	@Test
	public void getAllOccurenceSizeTest() throws Exception {
		when(fileMetaDataService.getAllOccurrenceSize()).thenReturn(Long.valueOf(listeFileMetaDataDTO.size()));
		mockMvc.perform(get("/fileMetaDatas/size")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));
		verify(fileMetaDataService, Mockito.times(1)).getAllOccurrenceSize();
		verifyNoMoreInteractions(fileMetaDataService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
