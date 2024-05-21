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

import sn.pad.pe.pss.bo.Fonction;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.CongeDTO;
import sn.pad.pe.pss.dto.PlanningCongeDTO;
import sn.pad.pe.pss.services.CongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@DisplayName("Test controlleur Congé")
@ExtendWith(MockitoExtension.class)
class CongeControllerTest {

	private MockMvc mockMvc;
	@Mock
	private CongeService congeService;
	@InjectMocks
	private CongeController congeController;

	private static CongeDTO conge1;
	private static PlanningCongeDTO planningConge;
	private static AgentDTO agent;
	private static CongeDTO conge2;
	private static CongeDTO conge3;
	private static List<CongeDTO> conges;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		agent = new AgentDTO();
		agent.setMatricule("607043");
		agent.setEmail("ada@gmail.com");
		agent.setId(1L);
		Fonction fonction = new Fonction();
		fonction.setId(1L);
		fonction.setNom("Développeur Full Stack");
		
		planningConge = new PlanningCongeDTO();
		planningConge.setId(1L);
		planningConge.setDateCreation(new Date());
		planningConge.setEtat("SAISI");
		
		conge1 = new CongeDTO();
		conge1.setId(1L);
		conge1.setDateRetourPrevisionnelle(new Date());
		conge1.setDateRetourEffectif(new Date());
		conge1.setDateSaisie(new Date());
		conge1.setEtat("SAISI");
		conge1.setPlanningConge(planningConge);
		conge1.setAgent(agent);

		conge2 = new CongeDTO();
		conge2.setId(2L);
		conge2.setDateRetourPrevisionnelle(new Date());
		conge2.setDateRetourEffectif(new Date());
		conge2.setDateSaisie(new Date());
		conge2.setEtat("SAISI");
		conge2.setPlanningConge(planningConge);
		conge2.setAgent(agent);

		conge3 = new CongeDTO();
		conge3.setId(3L);
		conge3.setDateRetourPrevisionnelle(new Date());
		conge3.setDateRetourEffectif(new Date());
		conge3.setDateSaisie(new Date());
		conge3.setEtat("SAISI");
		conge3.setPlanningConge(planningConge);
		conge3.setAgent(agent);

		conges = Arrays.asList(conge1, conge2, conge3);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(congeController)
				.build();
	}

	@Order(1)
	@DisplayName("Liste congé (SUCCESS)")
	@Test
	final void testGetConges() throws Exception {
		when(congeService.getConges()).thenReturn(conges);
		mockMvc.perform(get("/conges").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)) //
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(congeService, times(1)).getConges();

		verifyNoMoreInteractions(congeService);
	}


	@DisplayName("Congé en fonction de l'Id (SUCCESS)")
	@Test
	final void testGetCongeById_1() throws Exception {
		when(congeService.getCongeById(conge1.getId())).thenReturn(conge1);
		mockMvc.perform(get("/conges/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.etat", is("SAISI")));

		verify(congeService, times(1)).getCongeById(conge1.getId());
		verifyNoMoreInteractions(congeService);
	}


	@DisplayName("Création congé (SUCCESS)")
	@Test
	final void testCreate() throws Exception {
		when(congeService.createConge(any(CongeDTO.class))).thenReturn(conge2);
		mockMvc.perform(post("/conges/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(conge2)))
				.andExpect(status().isCreated());

		verify(congeService, times(1)).createConge(any(CongeDTO.class));
		verifyNoMoreInteractions(congeService);
	}
	
	@DisplayName("Création multiple de congés")
	@Test
	final void testCreateMany() throws Exception {
		when(congeService.createAllConge(any(List.class))).thenReturn(conges);
		mockMvc.perform(post("/conges/all").contentType(MediaType.APPLICATION_JSON).content(asJsonString(conges)))
		.andExpect(status().isCreated());
		
		verify(congeService, times(1)).createAllConge(any(List.class));
		verifyNoMoreInteractions(congeService);
	}
	
	@DisplayName("Modification multiple de congés")
	@Test
	final void testUpdateMany() throws Exception {
		when(congeService.updateCongeMany(any(List.class))).thenReturn(true);
		mockMvc.perform(put("/conges/many").contentType(MediaType.APPLICATION_JSON).content(asJsonString(conges)))
		.andExpect(status().isOk());
		
		when(congeService.updateCongeMany(any(List.class))).thenReturn(false);
		mockMvc.perform(put("/conges/many").contentType(MediaType.APPLICATION_JSON).content(asJsonString(conges)))
		.andExpect(status().isNotFound());
		
		verify(congeService, times(2)).updateCongeMany(any(List.class));
		verifyNoMoreInteractions(congeService);
	}

	@DisplayName("Modification dossier congé(SUCCESS)")
	@Test
	final void testUpdate() throws Exception {
		when(congeService.updateConge(any(CongeDTO.class))).thenReturn(true);
		mockMvc.perform(put("/conges/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(conge2)))
				.andExpect(status().isOk());

		when(congeService.updateConge(any(CongeDTO.class))).thenReturn(false);
		mockMvc.perform(put("/conges/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(conge2)))
				.andExpect(status().isNotFound());
		
		verify(congeService, times(2)).updateConge(any(CongeDTO.class));
		verifyNoMoreInteractions(congeService);
	}

	@DisplayName("Suppression dossier congé(SUCCESS)")
	@Test
	final void testDelete() throws Exception {
		when(congeService.deteleConge(any(CongeDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/conges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(conge3)))
				.andExpect(status().isOk());

		when(congeService.deteleConge(any(CongeDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/conges").contentType(MediaType.APPLICATION_JSON).content(asJsonString(conge3)))
				.andExpect(status().isNotFound());
		
		verify(congeService, times(2)).deteleConge(any(CongeDTO.class));
		verifyNoMoreInteractions(congeService);
	}

	@DisplayName("Liste des congés d'un planning")
	@Test
	final void testGetCongesByPlanningConge() throws Exception {
		when(congeService.getCongesByPlanningConge(1L)).thenReturn(conges);
		mockMvc.perform(get("/conges/planningConge/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
				.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));

		verify(congeService, times(1)).getCongesByPlanningConge(1L);
		verifyNoMoreInteractions(congeService);
	}
	
	@DisplayName("Liste des congés d'un agent")
	@Test
	final void testGetCongesByAgent() throws Exception {
		when(congeService.getCongeByAgent(1L)).thenReturn(conges);
		mockMvc.perform(get("/conges/agent/{id}", 1)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
		.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is("SAISI")))
		.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is("SAISI")))
		.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is("SAISI")));
		
		verify(congeService, times(1)).getCongeByAgent(1L);
		verifyNoMoreInteractions(congeService);
	}
	
	@DisplayName("Liste des congés par ETAT")
	@Test
	final void testGetCongesByEtat() throws Exception {
		final String ETAT= "SAISI";
		when(congeService.getCongesByPlanningCongeAndEtat(1L,ETAT)).thenReturn(conges);
		mockMvc.perform(get("/conges/etat/{etat}/planningConge/{id}", ETAT, 1)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
		.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].etat", is(ETAT)))
		.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].etat", is(ETAT)))
		.andExpect(jsonPath("$[2].id", is(3))).andExpect(jsonPath("$[2].etat", is(ETAT)));
		
		verify(congeService, times(1)).getCongesByPlanningCongeAndEtat(1L,ETAT);
		verifyNoMoreInteractions(congeService);
	}
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
