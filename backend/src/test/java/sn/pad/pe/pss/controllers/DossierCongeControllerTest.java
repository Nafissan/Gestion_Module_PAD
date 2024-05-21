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

import sn.pad.pe.pss.dto.DossierCongeDTO;
import sn.pad.pe.pss.services.DossierCongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@DisplayName("Test controlleur DossierCongé")
@ExtendWith(MockitoExtension.class)
class DossierCongeControllerTest {

	private MockMvc mockMvc;
	@Mock
	private DossierCongeService dossierCongeService;
	@InjectMocks
	private DossierCongeController dossierCongeController;

	private static DossierCongeDTO dossierConge1;
	private static DossierCongeDTO dossierConge2;
	private static DossierCongeDTO dossierConge3;
	private static List<DossierCongeDTO> dossierConges;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierConge1 = new DossierCongeDTO();
		dossierConge1.setId(1L);
		dossierConge1.setAnnee("2021");
		dossierConge1.setDescription("Dossier congé pour l'anné 2020");

		dossierConge2 = new DossierCongeDTO();
		dossierConge2.setId(2L);
		dossierConge2.setAnnee("2022");
		dossierConge2.setDescription("Dossier congé pour l'anné 2020");

		dossierConge3 = new DossierCongeDTO();
		dossierConge3.setId(3L);
		dossierConge3.setAnnee("2023");
		dossierConge3.setDescription("Dossier congé pour l'anné 2020");

		dossierConges = Arrays.asList(dossierConge1, dossierConge2, dossierConge3);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(dossierCongeController)
				.build();
	}

	@DisplayName("Liste dossier congé (SUCCESS)")
	@Test
	final void testGetDossierConges() throws Exception {

		when(dossierCongeService.getDossierConges()).thenReturn(dossierConges);
		mockMvc.perform(get("/dossierconges").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)) //
				.andExpect(jsonPath("$[0].annee", is("2021"))).andExpect(jsonPath("$[1].id", is(2)))
				.andExpect(jsonPath("$[1].annee", is("2022"))).andExpect(jsonPath("$[2].id", is(3)))
				.andExpect(jsonPath("$[2].annee", is("2023")));

		verify(dossierCongeService, times(1)).getDossierConges();

		verifyNoMoreInteractions(dossierCongeService);
	}

	@DisplayName("Dossier congé en fonction de l'Id (SUCCESS)")
	@Test
	final void testGetAgentById_1() throws Exception {
		when(dossierCongeService.getDossierCongeById(1L)).thenReturn(dossierConge1);
		mockMvc.perform(get("/dossierconges/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.annee", is("2021")));

		verify(dossierCongeService, times(1)).getDossierCongeById(1L);
		verifyNoMoreInteractions(dossierCongeService);
	}

	@DisplayName("Création dossier congé(SUCCESS)")
	@Test
	final void testCreate() throws Exception {
		when(dossierCongeService.createDossierConge(any(DossierCongeDTO.class))).thenReturn(dossierConge1);
		mockMvc.perform(
				post("/dossierconges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierConge1)))
				.andExpect(status().isCreated());

		verify(dossierCongeService, times(1)).createDossierConge(any(DossierCongeDTO.class));
		verifyNoMoreInteractions(dossierCongeService);
	}

	@DisplayName("Modification dossier congé(SUCCESS)")
	@Test
	final void testUpdate() throws Exception {
		when(dossierCongeService.updateDossierConge(any(DossierCongeDTO.class))).thenReturn(true);
		mockMvc.perform(
				put("/dossierconges/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierConge1)))
				.andExpect(status().isOk());

		when(dossierCongeService.updateDossierConge(any(DossierCongeDTO.class))).thenReturn(false);
		mockMvc.perform(
				put("/dossierconges/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierConge1)))
				.andExpect(status().isNotFound());
		
		verify(dossierCongeService, times(2)).updateDossierConge(any(DossierCongeDTO.class));
		verifyNoMoreInteractions(dossierCongeService);
	}

	@DisplayName("Suppression dossier congé(SUCCESS)")
	@Test
	final void testDelete() throws Exception {
		when(dossierCongeService.deteleDossierConge(any(DossierCongeDTO.class))).thenReturn(true);
		mockMvc.perform(
				delete("/dossierconges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierConge1)))
				.andExpect(status().isOk());

		when(dossierCongeService.deteleDossierConge(any(DossierCongeDTO.class))).thenReturn(false);
		mockMvc.perform(
				delete("/dossierconges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierConge1)))
				.andExpect(status().isNotFound());
		
		verify(dossierCongeService, times(2)).deteleDossierConge(any(DossierCongeDTO.class));
		verifyNoMoreInteractions(dossierCongeService);
	}

	@DisplayName("Dossier congé en fonction de l'année")
	@Test
	final void testGetDossierCongeByAnnee() throws Exception {
		final String ANNEE= "2021";
		when(dossierCongeService.getDossierCongeByAnnee(ANNEE)).thenReturn(dossierConge1);
		mockMvc.perform(get("/dossierconges/annee/{annee}", ANNEE)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.annee", is(ANNEE)));

		verify(dossierCongeService, times(1)).getDossierCongeByAnnee(ANNEE);
		verifyNoMoreInteractions(dossierCongeService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
