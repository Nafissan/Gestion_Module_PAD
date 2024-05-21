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
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.services.AgentService;


@DisplayName("Test Classe AgentDTOController")
@ExtendWith(MockitoExtension.class)
class AgentControllerTest {

	private MockMvc mockMvc;

	@Mock
	private AgentService agentService;

	@Spy
	private ModelMapper modelmapper;

	@InjectMocks
	private AgentController agentController;

	private static AgentDTO agent1;
	private static AgentDTO agent2;
	private static ModelMapper modelMapper;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		agent1 = new AgentDTO();
		agent1.setId(1L);
		agent1.setNom("Fall");

		agent2 = new AgentDTO();
		agent2.setNom("Diop");

		modelMapper = new ModelMapper();
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(agentController)
				.build();
	}

	@Test
	@DisplayName("Test de la methode get All  AgentDTOs")
	void testGetAgentDTOs() throws Exception {

		List<AgentDTO> agents = Arrays.asList(agent1, agent2);
		when(agentService.getAgents()).thenReturn(agents);
		mockMvc.perform(get("/agents")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].nom", is("Fall"))).andExpect(jsonPath("$[0].nom", is("Fall")))
				.andExpect(jsonPath("$[1].nom", is("Diop"))).andExpect(jsonPath("$[1].nom", is("Diop")));
		verify(agentService, times(1)).getAgents();
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode récupérant la liste des agents sans compte")
	void testGetAgentsWithoutCompte() throws Exception {
		
		List<AgentDTO> agents = Arrays.asList(agent1, agent2);
		when(agentService.getAgentsWithoutCompte()).thenReturn(agents);
		mockMvc.perform(get("/agents/sansCompte")).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
		.andExpect(jsonPath("$[0].nom", is("Fall"))).andExpect(jsonPath("$[0].nom", is("Fall")))
		.andExpect(jsonPath("$[1].nom", is("Diop"))).andExpect(jsonPath("$[1].nom", is("Diop")));
		verify(agentService, times(1)).getAgentsWithoutCompte();
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode récupérant le nombre total des agents des differentes unites organisationnelles")
	void testGetTotalAgents() throws Exception {
		
		List<AgentDTO> agents = Arrays.asList(agent1, agent2);
		when(agentService.getAgents()).thenReturn(agents);
		mockMvc.perform(get("/agents/total")).andExpect(status().isOk())
		.andExpect(content().string("2"));
		verify(agentService, times(1)).getAgents();
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode récupérant le nombre total des agents par unite organisationnelle")
	void testGetTotalAgentsParUniteOrganisationnelle() throws Exception {
		
		List<AgentDTO> agents = Arrays.asList(agent1, agent2);
		when(agentService.getAgentsByUniteOrganisationnelle(1)).thenReturn(agents);
		mockMvc.perform(get("/agents/totalAgentsUniteOrganisationnelle/{id}", 1)).andExpect(status().isOk())
		.andExpect(content().string("2"));
		verify(agentService, times(1)).getAgentsByUniteOrganisationnelle(1);
		verifyNoMoreInteractions(agentService);
	}

	@Test
	@DisplayName("Test de la methode get AgentDTO By id")
	void testGetAgentDTOById() throws Exception {

		when(agentService.getAgentById(1L)).thenReturn(agent1);
		mockMvc.perform(get("/agents/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.nom", is("Fall"))).andExpect(jsonPath("$.nom", is("Fall")));

		verify(agentService, times(1)).getAgentById(1L);
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode récuppérant l'Agent responsable de l'unité organisationnelle")
	void testGetAgentResponsable() throws Exception {
		
		when(agentService.getAgentResponsable(1L)).thenReturn(agent1);
		mockMvc.perform(get("/agents/uniteOrganisationnelle/{id}/responsable", 1)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
		.andExpect(jsonPath("$.nom", is("Fall"))).andExpect(jsonPath("$.nom", is(agent1.getNom())));
		
		verify(agentService, times(1)).getAgentResponsable(1L);
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode récupérant la liste des agents dans l'unité organisationnelle")
	void testGetAgentsByUniteOrganisationnelle() throws Exception {
		List<AgentDTO> agents = Arrays.asList(agent1, agent2);
		when(agentService.getAgentsByUniteOrganisationnelle(1)).thenReturn(agents);
		mockMvc.perform(get("/agents/uniteOrganisationnelle/{id}", 1)).andExpect(status().isOk())
		.andExpect(jsonPath("$[0].nom", is("Fall"))).andExpect(jsonPath("$[0].nom", is("Fall")))
		.andExpect(jsonPath("$[1].nom", is("Diop"))).andExpect(jsonPath("$[1].nom", is("Diop")));
		verify(agentService, times(1)).getAgentsByUniteOrganisationnelle(1);
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode récupérant la liste de tous les agents dans l'unité organisationnelle")
	void testGetAllAgentsByUniteOrganisationnelleId() throws Exception {
		List<AgentDTO> agents = Arrays.asList(agent1, agent2);
		when(agentService.getAgentsByUniteOrganisationnelle(1)).thenReturn(agents);
		mockMvc.perform(get("/agents/uniteOrganisationnelle/{id}/all", 1)).andExpect(status().isOk())
		.andExpect(jsonPath("$[0].nom", is("Fall"))).andExpect(jsonPath("$[0].nom", is("Fall")))
		.andExpect(jsonPath("$[1].nom", is("Diop"))).andExpect(jsonPath("$[1].nom", is("Diop")));
		verify(agentService, times(1)).getAgentsByUniteOrganisationnelle(1);
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode récupérant la liste des agents qui sont chef de leur unité par niveau")
	void testGetAgentByestChefAndNiveauHierarchique() throws Exception {
		List<AgentDTO> agents = Arrays.asList(agent1, agent2);
		when(agentService.getAllAgentByestChefAndNiveauHierarchique(true,1)).thenReturn(agents);
		mockMvc.perform(get("/agents/position/{niveau}/chef/{estChef}", 1,true)).andExpect(status().isOk())
		.andExpect(jsonPath("$[0].nom", is("Fall"))).andExpect(jsonPath("$[0].nom", is("Fall")))
		.andExpect(jsonPath("$[1].nom", is("Diop"))).andExpect(jsonPath("$[1].nom", is("Diop")));
		verify(agentService, times(1)).getAllAgentByestChefAndNiveauHierarchique(true,1);
		verifyNoMoreInteractions(agentService);
	}

	@Test
	@DisplayName("Test de la methode Create  AgentDTO")
	void testCreate() throws Exception {

		List<AgentDTO> agents = Arrays.asList(agent1, agent2);

		when(agentService.createAll(any(List.class))).thenReturn(agents);
		mockMvc.perform(post("/agents/all").contentType(MediaType.APPLICATION_JSON).content(asJsonString(agents)))
				.andExpect(status().isOk());
		verify(agentService, times(1)).createAll(any(List.class));
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode de Création des ressources agents fournit en paramètre")
	void testCreateAll() throws Exception {
		
		AgentDTO agentDTO = new AgentDTO();
		agentDTO.setNom("Fall");
		AgentDTO agent = modelMapper.map(agentDTO, AgentDTO.class);
		
		when(agentService.create(any(AgentDTO.class))).thenReturn(agent);
		mockMvc.perform(post("/agents").contentType(MediaType.APPLICATION_JSON).content(asJsonString(agentDTO)))
		.andExpect(status().isOk());
		verify(agentService, times(1)).create(any(AgentDTO.class));
		verifyNoMoreInteractions(agentService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Test
	@DisplayName("Test de la methode Update  AgentDTO")
	void testUpdate() throws Exception {
		AgentDTO agentDto = new AgentDTO();
		agentDto.setId(1L);
		agentDto.setNom("Fall");

		when(agentService.update(any(AgentDTO.class))).thenReturn(true);
		mockMvc.perform(put("/agents").contentType(MediaType.APPLICATION_JSON).content(asJsonString(agentDto)))
				.andExpect(status().isOk());
		verify(agentService, times(1)).update(any(AgentDTO.class));
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode Update AgentDTO avec un id inexistant")
	void testUpdateWithInvalidId() throws Exception {
		AgentDTO agentDto = new AgentDTO();
		agentDto.setId(0L);
		agentDto.setNom("");

		when(agentService.update(any(AgentDTO.class))).thenReturn(false);
		mockMvc.perform(put("/agents").contentType(MediaType.APPLICATION_JSON).content(asJsonString(agentDto)))
				.andExpect(status().isNotFound());
		verify(agentService, times(1)).update(any(AgentDTO.class));
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Suppression d'un AgentDTO)")
	final void testDelete() throws Exception {
		AgentDTO agentDTO3 = modelMapper.map(agent2, AgentDTO.class);
		when(agentService.delete(any(AgentDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/agents").contentType(MediaType.APPLICATION_JSON).content(asJsonString(agentDTO3)))
				.andExpect(status().isOk());

		verify(agentService, times(1)).delete(any(AgentDTO.class));
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Suppression d'un AgentDTO avec un id inexistant")
	final void testDeleteWithInvalidId() throws Exception {
//		when(agentService.getAgentById(agent2.getId())).thenReturn(agent2);
		AgentDTO agentDTO3 = modelMapper.map(agent2, AgentDTO.class);
		when(agentService.delete(any(AgentDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/agents").contentType(MediaType.APPLICATION_JSON).content(asJsonString(agentDTO3)))
		.andExpect(status().isNotFound());
		
		verify(agentService, times(1)).delete(any(AgentDTO.class));
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode récupérant la Liste des agents sans congés dans l'unité organisationnelle")
	void testGetAgentsByUniteOrganisationnelleWithoutConge() throws Exception {
		List<AgentDTO> agents = Arrays.asList(agent1, agent2);
		when(agentService.getAgentsByUniteOrganisationnelleIdWithoutConges(1, "2020")).thenReturn(agents);
		mockMvc.perform(get("/agents/uniteOrganisationnelle/{id}/annee/{annee}/sansConge", 1,2020)).andExpect(status().isOk())
		.andExpect(jsonPath("$[0].nom", is("Fall"))).andExpect(jsonPath("$[0].nom", is("Fall")))
		.andExpect(jsonPath("$[1].nom", is("Diop"))).andExpect(jsonPath("$[1].nom", is("Diop")));
		verify(agentService, times(1)).getAgentsByUniteOrganisationnelleIdWithoutConges(1, "2020");
		verifyNoMoreInteractions(agentService);
	}
	
	@Test
	@DisplayName("Test de la methode récupérant la Liste des agents avec congés dans l'unité organisationnelle")
	void testGetAgentsByUniteOrganisationnelleWithConge() throws Exception {
		List<AgentDTO> agents = Arrays.asList(agent1, agent2);
		when(agentService.getAgentsByUniteOrganisationnelleIdWithConges(1)).thenReturn(agents);
		mockMvc.perform(get("/agents/uniteOrganisationnelle/{id}/avecConge", 1,2020)).andExpect(status().isOk())
		.andExpect(jsonPath("$[0].nom", is("Fall"))).andExpect(jsonPath("$[0].nom", is("Fall")))
		.andExpect(jsonPath("$[1].nom", is("Diop"))).andExpect(jsonPath("$[1].nom", is("Diop")));
		verify(agentService, times(1)).getAgentsByUniteOrganisationnelleIdWithConges(1);
		verifyNoMoreInteractions(agentService);
	}

}
