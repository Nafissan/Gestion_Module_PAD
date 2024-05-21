package sn.pad.pe.pss.controllers;

import static org.hamcrest.core.Is.is;
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
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.dto.MotifDTO;
import sn.pad.pe.pss.services.MotifService;

/**
 * 
 * @author abdou.diop
 *
 */
@DisplayName("Test Motif Controller")
@ExtendWith(MockitoExtension.class)
class MotifControllerTest {

	private MockMvc mockMvc;
	@Mock
	private MotifService motifService;
	@InjectMocks
	private MotifController motifController;
	@Spy
	private ModelMapper modelMapper;

	private static MotifDTO motifDTO1;
	private static MotifDTO motifDTO2;
	private static MotifDTO motifDTO3;

	private static List<MotifDTO> motifDTO;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		 motifDTO1 = new MotifDTO();
		 motifDTO1.setId(1L);
		 motifDTO1.setDescription("traite");
	
		 motifDTO2 = new MotifDTO();
		 motifDTO2.setId(2L);
         motifDTO3 = new MotifDTO();
		 motifDTO3.setId(3L);
         motifDTO = Arrays.asList(
				motifDTO1, 
				motifDTO2, 
				motifDTO3);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(motifController)
				.build();
		
		modelMapper.getConfiguration().setAmbiguityIgnored(true); // Utile pour ignore les ambiguités
	}

	@Order(1)
	@DisplayName("Test de la methode get All Motif")
	@Test
	final void testGetMotif() throws Exception {
		when(motifService.getMotif()).thenReturn(motifDTO);
		mockMvc.perform(get("/motifs").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1)))
				.andExpect(jsonPath("$[0].description", is("traite")));
				

		verify(motifService, times(1)).getMotif();

		verifyNoMoreInteractions(motifService);
	}

	@Order(2)
	@DisplayName("Test de la methode get Motif By id")
	@Test
	final void testGetMotifById_1() throws Exception {
		when(motifService.getMotifById(motifDTO1.getId())).thenReturn(motifDTO1);
		mockMvc.perform(get("/motifs/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath(""
						+ "$.id", is(1))).andExpect(jsonPath("$.description", is("traite")));

		verify(motifService, times(1)).getMotifById(motifDTO1.getId());
		verifyNoMoreInteractions(motifService);
	}

	@Order(3)
	@DisplayName("Test de la methode Create Motif")
	@Test
	final void testCreateMotif() throws Exception {
		//motifDTO2 = modelMapper.map(motifDTO2, MotifDTO.class);
		when(motifService.createMotif(motifDTO2)).thenReturn(motifDTO2);
		mockMvc.perform(post("/motifs/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(motifDTO2)))
				.andExpect(status().isOk());

		verify(motifService, times(1)).createMotif(motifDTO2);
		verifyNoMoreInteractions(motifService);
	}

	@Order(4)
	@DisplayName("Test de la methode Update Motif")
	@Test
	final void testUpdateMotif() throws Exception {
		when(motifService.updateMotif(motifDTO2)).thenReturn(true);
		mockMvc.perform(put("/motifs/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(motifDTO2)))
				.andExpect(status().isOk());

		verify(motifService, times(1)).updateMotif(motifDTO2);
		verifyNoMoreInteractions(motifService);
	}

	@Order(5)
	@DisplayName("Test de la methode Delete Motif")
	@Test
	final void testDeleteMotif() throws Exception {
		when(motifService.deleteMotif(motifDTO3)).thenReturn(true);
		mockMvc.perform(delete("/motifs").contentType(MediaType.APPLICATION_JSON).content(asJsonString(motifDTO3)))
				.andExpect(status().isOk());

		verify(motifService, times(1)).deleteMotif(motifDTO3);
		verifyNoMoreInteractions(motifService);
	}
	
	@Order(6)
	@DisplayName("Test de la methode Update Motif (FAILED)")
	@Test
	final void testUpdateMotifFailed() throws Exception {
		when(motifService.updateMotif(motifDTO2)).thenReturn(false);
		mockMvc.perform(put("/motifs/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(motifDTO2)))
				.andExpect(status().isNotFound());

		verify(motifService, times(1)).updateMotif(motifDTO2);
		verifyNoMoreInteractions(motifService);
	}

	@Order(7)
	@DisplayName("Test de la methode Delete Motif (FAILED)")
	@Test
	final void testDeleteMotifFailed() throws Exception {
		when(motifService.deleteMotif(motifDTO3)).thenReturn(false);
		mockMvc.perform(delete("/motifs").contentType(MediaType.APPLICATION_JSON).content(asJsonString(motifDTO3)))
				.andExpect(status().isNotFound());

		verify(motifService, times(1)).deleteMotif(motifDTO3);
		verifyNoMoreInteractions(motifService);
	}
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
