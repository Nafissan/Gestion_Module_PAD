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

import sn.pad.pe.pss.dto.PlanningCongeDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.PlanningCongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@DisplayName("Test controlleur PlanningConge")
@ExtendWith(MockitoExtension.class)
class PlanningCongeControllerTest {

	private MockMvc mockMvc;
	@Mock
	private PlanningCongeService planningCongeService;
	@InjectMocks
	private PlanningCongeController planningCongeController;

	private static UniteOrganisationnelleDTO uniteOrganisationnelle;
	private static PlanningCongeDTO planningConge1;
	private static PlanningCongeDTO planningConge2;
	private static PlanningCongeDTO planningConge3;

	private static List<PlanningCongeDTO> planningConges;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {

		uniteOrganisationnelle = new UniteOrganisationnelleDTO();
		uniteOrganisationnelle.setId(1L);
		uniteOrganisationnelle.setCode("DD");

		planningConge1 = new PlanningCongeDTO();
		planningConge1.setId(1L);
		planningConge1.setDateCreation(new Date());
		planningConge1.setEtat("SAISI");

		planningConge2 = new PlanningCongeDTO();
		planningConge2.setId(2L);
		planningConge2.setDateCreation(new Date());
		planningConge2.setEtat("SAISI");

		planningConge3 = new PlanningCongeDTO();
		planningConge3.setId(3L);
		planningConge3.setDateCreation(new Date());
		planningConge3.setEtat("SAISI");

		planningConges = Arrays.asList(planningConge1, planningConge2, planningConge3);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(planningCongeController).build();
	}

	@DisplayName("Liste planning congé")
	@Test
	void testGetDossierConges() throws Exception {
		when(planningCongeService.getPlanningConges()).thenReturn(planningConges);
		mockMvc.perform(get("/planningconges").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningCongeService, times(1)).getPlanningConges();
		verifyNoMoreInteractions(planningCongeService);
	}

	@DisplayName("Planning congé en fonction de l'Id (SUCCESS)")
	@Test
	void testGetAgentById() throws Exception {
		when(planningCongeService.getPlanningCongeById(1L)).thenReturn(planningConge1);
		mockMvc.perform(get("/planningconges/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.etat", is("SAISI")));

		verify(planningCongeService, times(1)).getPlanningCongeById(1L);
		verifyNoMoreInteractions(planningCongeService);
	}

	@DisplayName("Création planning congé(SUCCESS)")
	@Test
	void testCreate() throws Exception {
		when(planningCongeService.createPlanningConge(any(PlanningCongeDTO.class))).thenReturn(planningConge1);
		mockMvc.perform(
				post("/planningconges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(planningConge1)))
				.andExpect(status().isCreated());

		verify(planningCongeService, times(1)).createPlanningConge(any(PlanningCongeDTO.class));
		verifyNoMoreInteractions(planningCongeService);
	}

	@DisplayName("Modification planning congé(SUCCESS)")
	@Test
	void testUpdate() throws Exception {
		when(planningCongeService.updatePlanningConge(any(PlanningCongeDTO.class))).thenReturn(true);
		mockMvc.perform(
				put("/planningconges/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(planningConge2)))
				.andExpect(status().isOk());

		when(planningCongeService.updatePlanningConge(any(PlanningCongeDTO.class))).thenReturn(false);
		mockMvc.perform(
				put("/planningconges/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(planningConge2)))
				.andExpect(status().isNotFound());

		verify(planningCongeService, times(2)).updatePlanningConge(any(PlanningCongeDTO.class));
		verifyNoMoreInteractions(planningCongeService);
	}

	@DisplayName("Suppression planning congé")
	@Test
	void testDelete() throws Exception {
		when(planningCongeService.detelePlanningConge(any(PlanningCongeDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/planningconges/").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(planningConge3))).andExpect(status().isOk());

		when(planningCongeService.detelePlanningConge(any(PlanningCongeDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/planningconges/").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(planningConge3))).andExpect(status().isNotFound());

		verify(planningCongeService, times(2)).detelePlanningConge(any(PlanningCongeDTO.class));
		verifyNoMoreInteractions(planningCongeService);
	}

	@DisplayName("Liste planning d'une direction")
	@Test
	void testGetPlanningCongesByidPlanningDirectionAndUniteOrganisationnelle() throws Exception {
		when(planningCongeService.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(any(Long.class),
				any(Long.class))).thenReturn(planningConges);
		mockMvc.perform(get(
				"/planningconges/planningDirection/{idPlanningDirection}/uniteOrganisationnelle/{idUniteOrganisationnelle}",
				1L, 2L)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningCongeService, times(1))
				.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(any(Long.class), any(Long.class));
		verifyNoMoreInteractions(planningCongeService);
	}

	@DisplayName("Liste planning d'une direction selon l'etat")
	@Test
	void testGetPlanningCongesByidPlanningDirectionAndUniteOrganisationnellesAndEtat() throws Exception {
		when(planningCongeService.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(any(Long.class),
				any(Long.class), any(String.class))).thenReturn(planningConges);
		mockMvc.perform(get(
				"/planningconges/planningDirection/{idPlanningDirection}/uniteOrganisationnelle/{idUniteOrganisationnelle}/etat/{etat}",
				1L, 2L, "SAISI")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningCongeService, times(1)).getPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(
				any(Long.class), any(Long.class), any(String.class));
		verifyNoMoreInteractions(planningCongeService);
	}

	@DisplayName("Liste planning")
	@Test
	void testGetDossierAbsencesByUniteOrganisationnelles() throws Exception {
		when(planningCongeService.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelles(any(Long.class),
				any(List.class))).thenReturn(planningConges);
		mockMvc.perform(get(
				"/planningconges/planningDirection/{idPlanningDirection}/uniteOrganisationnelles/{idUniteOrganisationnelles}",
				1L, 2L)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningCongeService, times(1))
				.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelles(any(Long.class), any(List.class));
		verifyNoMoreInteractions(planningCongeService);
	}

	@DisplayName("Plannings de la Direction")
	@Test
	void testGetPlanningDirection() throws Exception {
		when(planningCongeService.getPlanningCongesByPlanningDirection(1L)).thenReturn(planningConges);
		mockMvc.perform(get("/planningconges/planningDirection/{idPlanningDirection}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningCongeService, times(1)).getPlanningCongesByPlanningDirection(1L);
		verifyNoMoreInteractions(planningCongeService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
