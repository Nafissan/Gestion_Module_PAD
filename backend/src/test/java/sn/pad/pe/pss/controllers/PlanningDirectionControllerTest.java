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

import sn.pad.pe.pss.dto.PlanningDirectionDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.PlanningDirectionService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@DisplayName("Test controlleur PlanningDirection")
@ExtendWith(MockitoExtension.class)
class PlanningDirectionControllerTest {

	private static final String CODE = "U002";
	private MockMvc mockMvc;
	@Mock
	private PlanningDirectionService planningDirectionService;
	@InjectMocks
	private PlanningDirectionController planningDirectionController;

	private static UniteOrganisationnelleDTO uniteOrganisationnelle;
	private static PlanningDirectionDTO planningDirection1;
	private static PlanningDirectionDTO planningDirection2;
	private static PlanningDirectionDTO planningDirection3;

	private static List<PlanningDirectionDTO> planningDirections;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {

		uniteOrganisationnelle = new UniteOrganisationnelleDTO();
		uniteOrganisationnelle.setId(1L);
		uniteOrganisationnelle.setCode("DD");

		planningDirection1 = new PlanningDirectionDTO();
		planningDirection1.setId(1L);
		planningDirection1.setEtat("SAISI");

		planningDirection2 = new PlanningDirectionDTO();
		planningDirection2.setId(2L);
		planningDirection2.setEtat("SAISI");

		planningDirection3 = new PlanningDirectionDTO();
		planningDirection3.setId(3L);
		planningDirection3.setEtat("SAISI");

		planningDirections = Arrays.asList(planningDirection1, planningDirection2, planningDirection3);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(planningDirectionController).build();
	}

	@DisplayName("Liste planning congé")
	@Test
	void testGetDossierDirections() throws Exception {
		when(planningDirectionService.getPlanningDirections()).thenReturn(planningDirections);
		mockMvc.perform(get("/planningdirections").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningDirectionService, times(1)).getPlanningDirections();
		verifyNoMoreInteractions(planningDirectionService);
	}

	@DisplayName("Planning congé en fonction de l'Id (SUCCESS)")
	@Test
	void testGetAgentById() throws Exception {
		when(planningDirectionService.getPlanningDirectionById(1L)).thenReturn(planningDirection1);
		mockMvc.perform(get("/planningdirections/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.etat", is("SAISI")));

		verify(planningDirectionService, times(1)).getPlanningDirectionById(1L);
		verifyNoMoreInteractions(planningDirectionService);
	}

	@DisplayName("Création planning congé(SUCCESS)")
	@Test
	void testCreate() throws Exception {
		when(planningDirectionService.createPlanningDirection(any(PlanningDirectionDTO.class))).thenReturn(planningDirection1);
		mockMvc.perform(
				post("/planningdirections").contentType(MediaType.APPLICATION_JSON).content(asJsonString(planningDirection1)))
				.andExpect(status().isCreated());

		verify(planningDirectionService, times(1)).createPlanningDirection(any(PlanningDirectionDTO.class));
		verifyNoMoreInteractions(planningDirectionService);
	}

	@DisplayName("Modification planning congé(SUCCESS)")
	@Test
	void testUpdate() throws Exception {
		when(planningDirectionService.updatePlanningDirection(any(PlanningDirectionDTO.class))).thenReturn(true);
		mockMvc.perform(
				put("/planningdirections/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(planningDirection2)))
				.andExpect(status().isOk());

		when(planningDirectionService.updatePlanningDirection(any(PlanningDirectionDTO.class))).thenReturn(false);
		mockMvc.perform(
				put("/planningdirections/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(planningDirection2)))
				.andExpect(status().isNotFound());

		verify(planningDirectionService, times(2)).updatePlanningDirection(any(PlanningDirectionDTO.class));
		verifyNoMoreInteractions(planningDirectionService);
	}

	@DisplayName("Suppression planning congé")
	@Test
	void testDelete() throws Exception {
		when(planningDirectionService.detelePlanningDirection(any(PlanningDirectionDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/planningdirections/").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(planningDirection3))).andExpect(status().isOk());

		when(planningDirectionService.detelePlanningDirection(any(PlanningDirectionDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/planningdirections/").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(planningDirection3))).andExpect(status().isNotFound());

		verify(planningDirectionService, times(2)).detelePlanningDirection(any(PlanningDirectionDTO.class));
		verifyNoMoreInteractions(planningDirectionService);
	}

	@DisplayName("Planning Direction d'un dossier d'absence")
	@Test
	void testGetPlanningDirection() throws Exception {
		when(planningDirectionService.getPlanningDirectionsByDossierConge(1L)).thenReturn(planningDirections);
		mockMvc.perform(get("/planningdirections/dossierConge/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(planningDirectionService, times(1)).getPlanningDirectionsByDossierConge(1L);
		verifyNoMoreInteractions(planningDirectionService);
	}
	
	@DisplayName("Planning Direction d'un dossier d'absence")
	@Test
	void testGetPlanningDirectionsByCodeDirectionAndDossierConge() throws Exception {
		when(planningDirectionService.getPlanningDirectionsByCodeDirectionAndDossierConge(CODE,1L)).thenReturn(planningDirection1);
		mockMvc.perform(get("/planningdirections/uniteOrganisationnelle/{codeDirection}/dossierConge/{idDossierConge}",CODE, 1)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(planningDirectionService, times(1)).getPlanningDirectionsByCodeDirectionAndDossierConge(CODE,1L);
		verifyNoMoreInteractions(planningDirectionService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
