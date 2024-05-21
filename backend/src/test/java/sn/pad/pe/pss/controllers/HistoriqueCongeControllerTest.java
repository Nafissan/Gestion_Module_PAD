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

import sn.pad.pe.pss.dto.HistoriqueCongeDTO;
import sn.pad.pe.pss.services.HistoriqueCongeService;

@DisplayName("Test Classe HistoriqueCongesController")
@ExtendWith(MockitoExtension.class)
class HistoriqueCongeControllerTest {

	private MockMvc mockMvc;

	@Mock
	private HistoriqueCongeService historiqueCongeService;

	@InjectMocks
	private HistoriqueCongeController historiqueCongeController;

	private static  List<HistoriqueCongeDTO> historiqueConges;

	private static HistoriqueCongeDTO historiqueConge1;
	private static HistoriqueCongeDTO historiqueConge2;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		historiqueConge1 = new HistoriqueCongeDTO();
		historiqueConge1.setPrenom("Prenom 1");
		historiqueConge1.setNom("Name 1");
		
		historiqueConge2 = new HistoriqueCongeDTO();
		historiqueConge2.setPrenom("Prenom 2");
		historiqueConge2.setNom("Name 2");
		
		historiqueConges = Arrays.asList(historiqueConge1, historiqueConge2);

	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(historiqueCongeController)
				.build();
	}

	@Test
	void testGetHistoriqueConges() throws Exception {
		List<HistoriqueCongeDTO> historiqueconges = Arrays.asList(historiqueConge1, historiqueConge2);
		when(historiqueCongeService.getHistoriqueConges()).thenReturn(historiqueconges);
		mockMvc.perform(get("/historiqueconges")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].nom", is("Name 1")))
				.andExpect(jsonPath("$[1].nom", is("Name 2")));
		verify(historiqueCongeService, times(1)).getHistoriqueConges();
		verifyNoMoreInteractions(historiqueCongeService);
	}

	@Test
	void testGetHistoriqueCongeById() throws Exception {
		when(historiqueCongeService.getHistoriqueCongeById(1L)).thenReturn(historiqueConge1);
		mockMvc.perform(get("/historiqueconges/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.nom", is(historiqueConge1.getNom())));
		verify(historiqueCongeService, times(1)).getHistoriqueCongeById(1L);
		verifyNoMoreInteractions(historiqueCongeService);
	}

	@Test
	void testCreate() throws Exception {
		HistoriqueCongeDTO historiqueCongeDTO = new HistoriqueCongeDTO();
		historiqueCongeDTO.setNom("Name 1");
		historiqueCongeDTO.setPrenom("Prenom");
		when(historiqueCongeService.createHistoriqueConge(any(HistoriqueCongeDTO.class))).thenReturn(historiqueCongeDTO);
		mockMvc.perform(post("/historiqueconges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(historiqueCongeDTO)))
				.andExpect(status().isCreated());
		verify(historiqueCongeService, times(1)).createHistoriqueConge(any(HistoriqueCongeDTO.class));
		verifyNoMoreInteractions(historiqueCongeService);
	}

	@Test
	void testUpdate() throws Exception {
		historiqueConge1.setNom("Name 45");
		when(historiqueCongeService.updateHistoriqueConge(any(HistoriqueCongeDTO.class))).thenReturn(true);
		mockMvc.perform(put("/historiqueconges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(historiqueConge1)))
				.andExpect(status().isOk());
		
		when(historiqueCongeService.updateHistoriqueConge(any(HistoriqueCongeDTO.class))).thenReturn(false);
		mockMvc.perform(put("/historiqueconges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(historiqueConge1)))
				.andExpect(status().isNotFound());
		
		verify(historiqueCongeService, times(2)).updateHistoriqueConge(any(HistoriqueCongeDTO.class));
		verifyNoMoreInteractions(historiqueCongeService);
	}

	@Test
	void testDelete() throws Exception {
		when(historiqueCongeService.deteleHistoriqueConge(any(HistoriqueCongeDTO.class))).thenReturn(true);
		mockMvc.perform(
				delete("/historiqueconges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(historiqueConge1)))
				.andExpect(status().isOk());
		
		when(historiqueCongeService.deteleHistoriqueConge(any(HistoriqueCongeDTO.class))).thenReturn(false);
		mockMvc.perform(
				delete("/historiqueconges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(historiqueConge1)))
		.andExpect(status().isNotFound());
		
		verify(historiqueCongeService, times(2)).deteleHistoriqueConge(any(HistoriqueCongeDTO.class));
		verifyNoMoreInteractions(historiqueCongeService);
	}

	@Test
	void testHistoriqueCongesByConge() throws Exception {
		when(historiqueCongeService.getHistoriqueCongesByConge(1L)).thenReturn(historiqueConges);
		mockMvc.perform(get("/historiqueconges/conge/{idConge}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		verify(historiqueCongeService, times(1)).getHistoriqueCongesByConge(1L);
		verifyNoMoreInteractions(historiqueCongeService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
