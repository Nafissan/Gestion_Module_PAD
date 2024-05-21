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

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.dto.DossierAbsenceDTO;
import sn.pad.pe.pss.services.DossierAbsenceService;


/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@DisplayName("Test controlleur DossierCongé")
@ExtendWith(MockitoExtension.class)
class DossierAbsenceControllerTest {

	private MockMvc mockMvc;
	@Mock
	private DossierAbsenceService dossierAbsenceService;
	@InjectMocks
	private DossierAbsenceController dossierAbsenceController;

	private static DossierAbsenceDTO dossierAbsence1;
	private static DossierAbsenceDTO dossierAbsence2;
	private static DossierAbsenceDTO dossierAbsence3;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierAbsence1 = new DossierAbsenceDTO();
		dossierAbsence1.setId(1L);
		dossierAbsence1.setDescription("bien");
	

		dossierAbsence2 = new DossierAbsenceDTO();
		dossierAbsence2.setId(2L);
		dossierAbsence2.setDescription("mauvais");

		dossierAbsence3 = new DossierAbsenceDTO();
		dossierAbsence3.setId(3L);
		dossierAbsence3.setDescription("juste");
		
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(dossierAbsenceController)
				.build();
	}

	@DisplayName("Liste dossier congé (SUCCESS)")
	@Test
	final void testGetDossierConges() throws Exception {

		when(dossierAbsenceService.getDossierAbsences()).thenReturn(Arrays.asList(dossierAbsence1));
		mockMvc.perform(get("/dossierabsences").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)) //
				.andExpect(jsonPath("$[0].description", is("bien"))).andExpect(jsonPath("$[0].id", is(1)));
				

		verify(dossierAbsenceService, times(1)).getDossierAbsences();

		verifyNoMoreInteractions(dossierAbsenceService);
	}

	@DisplayName("Dossier Absence en fonction de l'Id (SUCCESS)")
	@Test
	final void testGetAgentById_1() throws Exception {
		when(dossierAbsenceService.getDossierAbsenceById(1L)).thenReturn(dossierAbsence1);
		mockMvc.perform(get("/dossierabsences/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.description", is("bien")));

		verify(dossierAbsenceService, times(1)).getDossierAbsenceById(1L);
		verifyNoMoreInteractions(dossierAbsenceService);
	}

	@DisplayName("Création absence congé(SUCCESS)")
//	@Disabled("Probleme avec l'object ModelMapper sur le controlleur")
	@Test
	final void testCreate() throws Exception {
		when(dossierAbsenceService.createDossierAbsence(any(DossierAbsenceDTO.class))).thenReturn(dossierAbsence1);
		mockMvc.perform(
				post("/dossierabsences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierAbsence1)))
				.andExpect(status().isCreated());

		verify(dossierAbsenceService, times(1)).createDossierAbsence(any(DossierAbsenceDTO.class));
		verifyNoMoreInteractions(dossierAbsenceService);
	}

	@DisplayName("Modification dossier congé(SUCCESS)")
	@Test
	final void testUpdate() throws Exception {
		when(dossierAbsenceService.updateDossierAbsence(any(DossierAbsenceDTO.class))).thenReturn(true);
		mockMvc.perform(
				put("/dossierabsences/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierAbsence1)))
				.andExpect(status().isOk());

		when(dossierAbsenceService.updateDossierAbsence(any(DossierAbsenceDTO.class))).thenReturn(false);
		mockMvc.perform(
				put("/dossierabsences/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierAbsence1)))
				.andExpect(status().isNotFound());
		
		verify(dossierAbsenceService, times(2)).updateDossierAbsence(any(DossierAbsenceDTO.class));
		verifyNoMoreInteractions(dossierAbsenceService);
	}
	@Order(5)
	@DisplayName("Suppression dossier congé(SUCCESS)")
	@Test
	final void testDelete() throws Exception {
		when(dossierAbsenceService.deteleDossierAbsence(any(DossierAbsenceDTO.class))).thenReturn(true);
		mockMvc.perform(
				delete("/dossierabsences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierAbsence1)))
				.andExpect(status().isOk());

		when(dossierAbsenceService.deteleDossierAbsence(any(DossierAbsenceDTO.class))).thenReturn(false);
		mockMvc.perform(
				delete("/dossierabsences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierAbsence1)))
				.andExpect(status().isNotFound());
		
		verify(dossierAbsenceService, times(2)).deteleDossierAbsence(any(DossierAbsenceDTO.class));
		verifyNoMoreInteractions(dossierAbsenceService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}


}
