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

import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.EtapeInterim;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.EtapeInterimDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.EtapeInterimService;
import sn.pad.pe.pss.services.InterimService;

@DisplayName("Test Classe EtapeInterimController")
@ExtendWith(MockitoExtension.class)
class EtapeInterimControllerTest {

	private MockMvc mockMvc;

	@Mock
	private EtapeInterimService etapeInterimService;

	// utiliser par la méthode de la classe à tester
	@Spy
	private ModelMapper modelmapper;

	// utiliser dans cette classe pour faire la mappage
	private static ModelMapper modelMapper;
	@InjectMocks
	private EtapeInterimController etapeinterimController;

	@Mock
	private InterimService interimService;


	private static EtapeInterim etapeInterim1;
	private static EtapeInterim etapeInterim2;
	
	private static EtapeInterimDTO etapeInterimDTO1;
	private static EtapeInterimDTO etapeInterimDTO2;
	
	private static InterimDTO interimDTO1;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		AgentDTO agentDTO1 = new AgentDTO();
	    agentDTO1.setId(1L);
	    
	    
		AgentDTO agentDTO2 = new AgentDTO();
		agentDTO2.setId(2L);
		
		
		Agent agentDepart = new Agent();
		agentDepart.setId(1L);
	    
	    
		Agent agentArrive = new Agent();
		agentArrive.setId(2L);
		
		UniteOrganisationnelle uniteOrganisationnelle = new UniteOrganisationnelle();
		uniteOrganisationnelle.setId(1L);
	
		
		UniteOrganisationnelleDTO uniteOrganisationnelleDTO = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDTO.setId(2L);
		
		UniteOrganisationnelleDTO uniteOrganisationnelleDTO2 = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDTO2.setId(2L);
		
		interimDTO1=new InterimDTO();
		interimDTO1.setId(1L);
		interimDTO1.setAgentDepart(agentDTO1);
		interimDTO1.setAgentArrive(agentDTO2);
		interimDTO1.setUniteOrganisationnelle(uniteOrganisationnelleDTO2);
		etapeInterimDTO1=new EtapeInterimDTO();
		etapeInterimDTO1.setId(1L);
		
		etapeInterimDTO2=new EtapeInterimDTO();
		etapeInterimDTO2.setId(2L);
		etapeInterim1 = new EtapeInterim();
		etapeInterim1.setId(3L);
		
		etapeInterim2 = new EtapeInterim();
		etapeInterim2.setId(4L);
		modelMapper = new ModelMapper();
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(etapeinterimController)
				.build();
	}
	@DisplayName("Test list des etapes interims")
	@Test
	void testGetEtapeInterims() throws Exception {
		etapeInterim1 = modelMapper.map(etapeInterimDTO1,EtapeInterim.class);
		etapeInterim2 = modelMapper.map(etapeInterimDTO2, EtapeInterim.class);
		   
		List<EtapeInterimDTO> etapeInterims = Arrays.asList(etapeInterimDTO1, etapeInterimDTO2);
		
		when(etapeInterimService.getEtapeInterims()).thenReturn(etapeInterims);
		mockMvc.perform(get("/etapeInterims")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1)))
		        .andExpect(jsonPath("$[1].id", is(2)));

		verify(etapeInterimService, times(1)).getEtapeInterims();
		verifyNoMoreInteractions(etapeInterimService);
	}
	@DisplayName("Test  etape interim By Id")
	@Test
	void testGetEtapeInterimsById() throws Exception {

		when(etapeInterimService.getEtapeInterimById(1L)).thenReturn(etapeInterimDTO1);
		mockMvc.perform(get("/etapeInterims/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1)));
	

		verify(etapeInterimService, times(1)).getEtapeInterimById(1L);
		verifyNoMoreInteractions(etapeInterimService);
	}
	@DisplayName("Test methode creer etape interim")
	@Test
	void testCreate() throws Exception {

		EtapeInterimDTO etapeInterimDTO = modelMapper.map(etapeInterim1,EtapeInterimDTO.class);

		when(etapeInterimService.create(any(EtapeInterimDTO.class))).thenReturn(etapeInterimDTO);
		mockMvc.perform(post("/etapeInterims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeInterimDTO)))
				.andExpect(status().isCreated());
		verify(etapeInterimService, times(1)).create(any(EtapeInterimDTO.class));
		verifyNoMoreInteractions(etapeInterimService);
	}
	@DisplayName("Test methode update etape interim")
	@Test
	void testUpdate() throws Exception {
		
		EtapeInterim etapInterim = new EtapeInterim();
		etapInterim.setId(4L);
		etapInterim.setCommentaire("Imputé à la DCH");
		EtapeInterimDTO etapeInterimDTO = modelMapper.map(etapInterim, EtapeInterimDTO.class);

		when(etapeInterimService.update(any(EtapeInterimDTO.class))).thenReturn(true);
		mockMvc.perform(put("/etapeInterims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeInterimDTO)))
				.andExpect(status().isOk());
		
		when(etapeInterimService.update(any(EtapeInterimDTO.class))).thenReturn(false);
		mockMvc.perform(put("/etapeInterims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeInterimDTO)))
		.andExpect(status().isNotFound());
		
		verify(etapeInterimService, times(2)).update(any(EtapeInterimDTO.class));
		verifyNoMoreInteractions(etapeInterimService);
	}
	@DisplayName("Test methode delete etape interim")
	@Test
	void testDelete() throws Exception {
		when(etapeInterimService.delete(any(EtapeInterimDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/etapeInterims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeInterimDTO1)))
				.andExpect(status().isOk());

		when(etapeInterimService.delete(any(EtapeInterimDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/etapeInterims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeInterimDTO1)))
				.andExpect(status().isNotFound());
		verify(etapeInterimService, times(2)).delete(any(EtapeInterimDTO.class));
		verifyNoMoreInteractions(etapeInterimService);
	}

	@DisplayName("Test etape interim By Id interim")
	@Test
	void testGetEtapeInterimsByInterim() throws Exception {
		when(interimService.getInterimById(1L)).thenReturn(interimDTO1);
		when(etapeInterimService.findEtapeInterimsByInterim(interimDTO1)).thenReturn(Arrays.asList(etapeInterimDTO1));
		mockMvc.perform(get("/etapeInterims/interim/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
	
		verify(etapeInterimService, times(1)).findEtapeInterimsByInterim(interimDTO1);
		verifyNoMoreInteractions(etapeInterimService);
	}
	
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
