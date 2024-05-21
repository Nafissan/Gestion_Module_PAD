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
import java.util.Date;
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

import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.PlanningAbsenceService;

/**
 * 
 * @author diop.Modou
 *
 */
@DisplayName("Test controlleur PlanningAbsence (Fiche d'absences)")
@ExtendWith(MockitoExtension.class)
class PlanningAbsenceControllerTest {

	private MockMvc mockMvc;
	@Mock
	private PlanningAbsenceService planningAbsenceService;
	@InjectMocks
	private PlanningAbsenceController planningAbsenceController;

	private static UniteOrganisationnelleDTO uniteOrganisationnelle;
	private static PlanningAbsenceDTO planningAbsence1;
	private static PlanningAbsenceDTO planningAbsence2;
	private static PlanningAbsenceDTO planningAbsence3;

	private static List<PlanningAbsenceDTO> planningAbsences;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {

		uniteOrganisationnelle = new UniteOrganisationnelleDTO();
		uniteOrganisationnelle.setId(1L);
		uniteOrganisationnelle.setCode("DD");

		planningAbsence1 = new PlanningAbsenceDTO();
		planningAbsence1.setId(1L);
		planningAbsence1.setDateCreation(new Date());
		planningAbsence1.setEtat("SAISI");

		planningAbsence2 = new PlanningAbsenceDTO();
		planningAbsence2.setId(2L);
		planningAbsence2.setDateCreation(new Date());
		planningAbsence2.setEtat("SAISI");

		planningAbsence3 = new PlanningAbsenceDTO();
		planningAbsence3.setId(3L);
		planningAbsence3.setDateCreation(new Date());
		planningAbsence3.setEtat("SAISI");

		planningAbsences = Arrays.asList(planningAbsence1, planningAbsence2, planningAbsence3);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(planningAbsenceController).build();
	}

	@DisplayName("Liste planning AbsencePlanning (SUCCESS)")
	@Test
	final void testGetAbsencePlanning() throws Exception {
		when(planningAbsenceService.getPlanningAbsences()).thenReturn(planningAbsences);
		mockMvc.perform(get("/planningabsences").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningAbsenceService, times(1)).getPlanningAbsences();
		verifyNoMoreInteractions(planningAbsenceService);
	}

	@DisplayName("Planning Absence en fonction de l'Id (SUCCESS)")
	@Test
	void testGetById() throws Exception {
		when(planningAbsenceService.getPlanningAbsenceById(1L)).thenReturn(planningAbsence1);
		mockMvc.perform(get("/planningabsences/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.etat", is("SAISI")));

		verify(planningAbsenceService, times(1)).getPlanningAbsenceById(1L);
		verifyNoMoreInteractions(planningAbsenceService);
	}

	@DisplayName("Création planning planning(SUCCESS)")
	@Test
	void testCreate() throws Exception {
		when(planningAbsenceService.createPlanningAbsence(any(PlanningAbsenceDTO.class))).thenReturn(planningAbsence1);
		mockMvc.perform(post("/planningabsences").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(planningAbsence1))).andExpect(status().isCreated());

		verify(planningAbsenceService, times(1)).createPlanningAbsence(any(PlanningAbsenceDTO.class));
		verifyNoMoreInteractions(planningAbsenceService);
	}

	@DisplayName("Modification planning planning(SUCCESS)")
	@Test
	void testUpdate() throws Exception {
		when(planningAbsenceService.updatePlanningAbsence(any(PlanningAbsenceDTO.class))).thenReturn(true);
		mockMvc.perform(put("/planningabsences/").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(planningAbsence1))).andExpect(status().isOk());

		when(planningAbsenceService.updatePlanningAbsence(any(PlanningAbsenceDTO.class))).thenReturn(false);
		mockMvc.perform(put("/planningabsences/").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(planningAbsence1))).andExpect(status().isNotFound());

		verify(planningAbsenceService, times(2)).updatePlanningAbsence(any(PlanningAbsenceDTO.class));
		verifyNoMoreInteractions(planningAbsenceService);
	}

	@DisplayName("Suppression planning absence(SUCCESS)")
	@Test
	void testDelete() throws Exception {
		when(planningAbsenceService.detelePlanningAbsence(any(PlanningAbsenceDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/planningabsences/").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(planningAbsence1))).andExpect(status().isOk());

		when(planningAbsenceService.detelePlanningAbsence(any(PlanningAbsenceDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/planningabsences/").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(planningAbsence1))).andExpect(status().isNotFound());

		verify(planningAbsenceService, times(2)).detelePlanningAbsence(any(PlanningAbsenceDTO.class));
		verifyNoMoreInteractions(planningAbsenceService);
	}

	@DisplayName("Liste planning AbsencePlanning par dossier")
	@Test
	void testGetDossierAbsencesByUniteOrganisationnelle() throws Exception {
		when(planningAbsenceService.getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(1L, 2L))
				.thenReturn(planningAbsences);
		mockMvc.perform(get(
				"/planningabsences/dossierAbsence/{idDossierAbsence}/uniteOrganisationnelle/{idUniteOrganisationnelle}",
				1L, 2L).header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningAbsenceService, times(1)).getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(1L, 2L);
		verifyNoMoreInteractions(planningAbsenceService);
	}

	@DisplayName("Liste planning AbsencePlanning de toute les Unité Organisationnelles inférieures et dossier")
	@Test
	void testGetDossierAbsencesByUniteOrganisationnelles() throws Exception {
		when(planningAbsenceService.getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelles(any(Long.class),
				any(List.class))).thenReturn(planningAbsences);
		mockMvc.perform(get("/planningabsences/dossierAbsence/{idDossierAbsence}/uniteOrganisationnelles/{idUniteOrganisationnelles}",
				1L,2L)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningAbsenceService, times(1)).getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelles(any(Long.class),
				any(List.class));
		verifyNoMoreInteractions(planningAbsenceService);
	}
	
	@DisplayName("Liste planning AbsencePlanning de toute les Unité Organisationnelles inférieures en fonction de l'état")
	@Test
	void testGetDossierAbsencesByUniteOrganisationnellesAndEtat() throws Exception {
		when(planningAbsenceService.getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(any(Long.class),
				any(Long.class),any(String.class))).thenReturn(planningAbsences);
		mockMvc.perform(get("/planningabsences/dossierAbsence/{idDossierAbsence}/uniteOrganisationnelle/{idUniteOrganisationnelle}/etat/{etat}",
				1L,2L,"SAISI")).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
		.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
		.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
		.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));
		
		verify(planningAbsenceService, times(1)).getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(any(Long.class),
				any(Long.class), any(String.class));
		verifyNoMoreInteractions(planningAbsenceService);
	}

	@DisplayName("Planning Absence en fonction de l'Id du dossier")
	@Test
	void testGetPlanningCongesByidPlanningDirection() throws Exception {
		when(planningAbsenceService.getPlanningAbsencesByDossierAbsence(1L)).thenReturn(planningAbsences);
		mockMvc.perform(get("/planningabsences/dossierAbsence/{idDossierAbsence}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningAbsenceService, times(1)).getPlanningAbsencesByDossierAbsence(1L);
		verifyNoMoreInteractions(planningAbsenceService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
