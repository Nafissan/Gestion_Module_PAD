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

import sn.pad.pe.pss.dto.AbsenceDTO;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.MotifDTO;
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.AbsenceService;
import sn.pad.pe.pss.services.AgentService;
import sn.pad.pe.pss.services.PlanningAbsenceService;

/**
 * 
 * @author abdou.diop
 *
 */
@DisplayName("Test Absence Controlleer")
@ExtendWith(MockitoExtension.class)
class AbsenceControllerTest {

	private MockMvc mockMvc;
	@Mock
	private AbsenceService absenceService;
	@InjectMocks
	private AbsenceController absenceController;
	@Mock
	private AgentService agentService;
	@Mock
	private PlanningAbsenceService planningAbsenceService;

	private static AbsenceDTO absenceDTO1;

	private static List<AbsenceDTO> absenceDTOs;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		AgentDTO agentDTO = new AgentDTO();
		UniteOrganisationnelleDTO organisationnelleDTO = new UniteOrganisationnelleDTO();
		PlanningAbsenceDTO planningAbsenceDTO = new PlanningAbsenceDTO();
		MotifDTO motifDTO = new MotifDTO();

		absenceDTO1 = new AbsenceDTO();
		absenceDTO1.setId(1L);
		absenceDTO1.setEtat("TRANSMIS");
		absenceDTO1.setCommentaire("bien");
		absenceDTO1.setAgent(agentDTO);
		absenceDTO1.setUniteOrganisationnelle(organisationnelleDTO);
		absenceDTO1.setPlanningAbsence(planningAbsenceDTO);
		absenceDTO1.setMotif(motifDTO);

		absenceDTOs = Arrays.asList(absenceDTO1);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(absenceController).build();
	}

	@Order(1)
	@DisplayName("Test de la methode get All Absence")
	@Test
	final void testGetAbsence() throws Exception {
		when(absenceService.getAbsence()).thenReturn(absenceDTOs);
		mockMvc.perform(get("/absences").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)) //
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("TRANSMIS")));

		verify(absenceService, times(1)).getAbsence();

		verifyNoMoreInteractions(absenceService);
	}

	@Order(2)
	@DisplayName("Test de la methode get Absence By id")
	@Test
	final void testGetAbsenceById_1() throws Exception {
		when(absenceService.getAbsenceById(absenceDTO1.getId())).thenReturn(absenceDTO1);
		mockMvc.perform(get("/absences/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.etat", is("TRANSMIS")));

		verify(absenceService, times(1)).getAbsenceById(absenceDTO1.getId());
		verifyNoMoreInteractions(absenceService);
	}

	@Order(3)
	@DisplayName("Test de la methode Create Absence")
	@Test
	final void testCreateAbsence() throws Exception {

		when(absenceService.createAbsence(any(AbsenceDTO.class))).thenReturn(absenceDTO1);
		mockMvc.perform(post("/absences/").contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)
				.content(asJsonString(absenceDTO1))).andExpect(status().isOk());

		verify(absenceService, times(1)).createAbsence(any(AbsenceDTO.class));
		verifyNoMoreInteractions(absenceService);
	}

	@Order(4)
	@DisplayName("Test de la methode Update Absence")
	@Test
	final void testUpdateAbsence() throws Exception {
		when(absenceService.updateAbsence(any(AbsenceDTO.class))).thenReturn(true);

		mockMvc.perform(put("/absences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(absenceDTO1)))
				.andExpect(status().isOk());
		verify(absenceService, times(1)).updateAbsence(any(AbsenceDTO.class));
		verifyNoMoreInteractions(absenceService);
	}

	@Order(5)
	@DisplayName("Test de la methode Delete Absence")
	@Test
	final void testDeleteAbsence() throws Exception {
		when(absenceService.deleteAbsence(any(AbsenceDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/absences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(absenceDTO1)))
				.andExpect(status().isOk());

		verify(absenceService, times(1)).deleteAbsence(any(AbsenceDTO.class));
		verifyNoMoreInteractions(absenceService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Order(6)
	@DisplayName("Test de la methode Update Absence (FAILED)")
	@Test
	final void testUpdateAbsenceFailed() throws Exception {
		when(absenceService.updateAbsence(any(AbsenceDTO.class))).thenReturn(false);

		mockMvc.perform(put("/absences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(absenceDTO1)))
				.andExpect(status().isNotFound());
		verify(absenceService, times(1)).updateAbsence(any(AbsenceDTO.class));
		verifyNoMoreInteractions(absenceService);
	}

	@Order(5)
	@DisplayName("Test de la methode Delete Absence (FAILED)")
	@Test
	void testDeleteAbsenceFailed() throws Exception {

		when(absenceService.deleteAbsence(any(AbsenceDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/absences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(absenceDTO1)))
				.andExpect(status().isNotFound());

		verify(absenceService, times(1)).deleteAbsence(any(AbsenceDTO.class));
		verifyNoMoreInteractions(absenceService);
	}

	@Order(6)
	@DisplayName("Test de la methode get All Absence par unité organnisationnelle")
	@Test
	void testGetAbsencesByUniteOrgannisationnelle() throws Exception {
		when(absenceService.getAbsencesByUniteOrganisationnellesPLus(1L)).thenReturn(absenceDTOs);
		mockMvc.perform(get("/absences/uniteOrganisationnelle/{id}", 1L).header("Access-Control-Allow-Origin", "*"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)) //
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("TRANSMIS")));

		verify(absenceService, times(1)).getAbsencesByUniteOrganisationnellesPLus(1L);
		verifyNoMoreInteractions(absenceService);
	}

	@Order(7)
	@DisplayName("Test de la methode de récupération des Absences par unité organnisationnelle")
	@Test
	void testGetPlanningAbsencesUniteOrganisationnelles() throws Exception {
		when(absenceService.getAbsencesByUniteOrganisationnelless(Arrays.asList(1L))).thenReturn(absenceDTOs);
		mockMvc.perform(get("/absences/uniteOrganisationnelles/{idUniteOrganisationnelles}", 1L))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)) //
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("TRANSMIS")));

		verify(absenceService, times(1)).getAbsencesByUniteOrganisationnelless(Arrays.asList(1L));
		verifyNoMoreInteractions(absenceService);
	}

	@Order(8)
	@DisplayName("Test de la methode de récupération des absences d'un agent")
	@Test
	void testGetAbsencesByAgent() throws Exception {
		when(agentService.getAgentById(1L)).thenReturn(absenceDTO1.getAgent());
		when(absenceService.findAbsencesByAgent(any(AgentDTO.class))).thenReturn(absenceDTOs);
		mockMvc.perform(get("/absences/agent/{id}", 1L))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)) //
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("TRANSMIS")));

		verify(absenceService, times(1)).findAbsencesByAgent(any(AgentDTO.class));
		verify(agentService, times(1)).getAgentById(1L);
		verifyNoMoreInteractions(absenceService);
	}
	
	@Order(9)
	@DisplayName("Test de la methode de récupération des absences d'un planning absence")
	@Test
	void testGetAbsencesByPlanningAbsence() throws Exception {
		when(planningAbsenceService.getPlanningAbsenceById(1L)).thenReturn(absenceDTO1.getPlanningAbsence());
		when(absenceService.findAbsencesByPlanningAbsence(any(PlanningAbsenceDTO.class))).thenReturn(absenceDTOs);
		mockMvc.perform(get("/absences/planningAbsence/{idPlanningAbsence}", 1L))
		.andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(absenceService, times(1)).findAbsencesByPlanningAbsence(any(PlanningAbsenceDTO.class));
		verifyNoMoreInteractions(absenceService);
	}
}
