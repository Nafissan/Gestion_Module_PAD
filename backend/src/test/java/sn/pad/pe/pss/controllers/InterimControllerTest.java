package sn.pad.pe.pss.controllers;

import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
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

import java.io.InputStream;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Interim;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.AgentService;
import sn.pad.pe.pss.services.InterimService;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

@DisplayName("Test Classe InterimController")
@ExtendWith(MockitoExtension.class)
class InterimControllerTest {

	private MockMvc mockMvc;

	@Mock
	private InterimService interimService;

	@Spy
	private ModelMapper modelmapper;

	@InjectMocks
	private InterimController interimController;
	
	@Mock
	private UniteOrganisationnelleService uniteOrganisationnelleService;

	@Mock
	private AgentService agentService;
	
	private static InterimDTO interimDTO1;
	private static InterimDTO interimDTO2;
	private static List<InterimDTO> interimDTOs;
	
	private static AgentDTO  agentDTO1;
	private static AgentDTO  agentDTO2;
	
	private static Agent  agentDepart;
	private static Agent  agentArrive;

	private static UniteOrganisationnelle uniteOrganisationnelle;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDTO;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDTO2;
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		agentDTO1 = new AgentDTO();
	    agentDTO1.setId(1L);
	    
		agentDTO2 = new AgentDTO();
		agentDTO2.setId(2L);
		
		agentDepart = new Agent();
		agentDepart.setId(1L);
	    
		agentArrive = new Agent();
		agentArrive.setId(2L);
		
		uniteOrganisationnelle = new UniteOrganisationnelle();
		uniteOrganisationnelle.setId(1L);
	
		
		uniteOrganisationnelleDTO = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDTO.setId(2L);
		
		uniteOrganisationnelleDTO2 = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDTO2.setId(2L);
		interimDTO1=new InterimDTO();
		interimDTO1.setId(1L);
		interimDTO1.setAgentDepart(agentDTO1);
		interimDTO1.setAgentArrive(agentDTO2);
		interimDTO1.setUniteOrganisationnelle(uniteOrganisationnelleDTO2);
		
		interimDTO2=new InterimDTO();
		interimDTO2.setId(2L);
		
		interimDTO2=new InterimDTO();
		interimDTO2.setId(1L);
		interimDTO2.setAgentDepart(agentDTO1);
		interimDTO2.setAgentArrive(agentDTO2);
		
		interimDTO2.setAgentDepart(agentDTO2);
		interimDTO2.setAgentArrive(agentDTO1);
		interimDTO2.setUniteOrganisationnelle(uniteOrganisationnelleDTO);
		
		interimDTOs = Arrays.asList(interimDTO1, interimDTO2);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(interimController)
				.build();
	}

	@DisplayName("Test methode liste interims")
	@Test
	void testGetInterims() throws Exception {
		List<InterimDTO> interims = Arrays.asList(interimDTO1, interimDTO2);
		
		when(interimService.getInterims()).thenReturn(interims);
		mockMvc.perform(get("/interims")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(1)));
		        //.andExpect(jsonPath("$[1].id", is(2)));

		verify(interimService, times(1)).getInterims();
		verifyNoMoreInteractions(interimService);
	}

	@DisplayName("Test methode find interims By Id")
	@Test
	void testGetInterimsById() throws Exception {

		when(interimService.getInterimById(2L)).thenReturn(interimDTO2);
		mockMvc.perform(get("/interims/{id}", 2)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1)));
	

		verify(interimService, times(1)).getInterimById(2L);
		verifyNoMoreInteractions(interimService);
	}

	@DisplayName("Test methode creer  interim")
	@Test
	void testCreate() throws Exception {
		when(interimService.create(any(InterimDTO.class))).thenReturn(interimDTO1);
		mockMvc.perform(post("/interims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(interimDTO1)))
				.andExpect(status().isCreated());
		verify(interimService, times(1)).create(any(InterimDTO.class));
		verifyNoMoreInteractions(interimService);
	}

	@DisplayName("Test methode update interim")
	@Test
	void testUpdate() throws Exception {
		
		Interim interim = new Interim();
		interim.setId(4L);
		interim.setCommentaire("Imputer à la DCH");

		when(interimService.update(any(InterimDTO.class))).thenReturn(true);

		mockMvc.perform(put("/interims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(interimDTO2)))
				.andExpect(status().isOk());
		
		when(interimService.update(any(InterimDTO.class))).thenReturn(false);
		mockMvc.perform(put("/interims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(interimDTO2)))
		.andExpect(status().isNotFound());
		verify(interimService, times(2)).update(any(InterimDTO.class));
		verifyNoMoreInteractions(interimService);
	}

	@DisplayName("Test methode delete interim")
	@Test
	void testDelete() throws Exception {
		when(interimService.delete(any(InterimDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/interims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(interimDTO1)))
				.andExpect(status().isOk());

		when(interimService.delete(any(InterimDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/interims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(interimDTO1)))
		.andExpect(status().isNotFound());

		verify(interimService, times(2)).delete(any(InterimDTO.class));
		verifyNoMoreInteractions(interimService);
	}
	
	@DisplayName("Test methode find interims By Id Unité Organisationnelle")
	@Test
	void testGetInterimsByUniteORG() throws Exception {
		UniteOrganisationnelleDTO unite = interimDTO1.getUniteOrganisationnelle();
		when(uniteOrganisationnelleService.getUniteOrganisationnelleById(2L)).thenReturn(unite);
		when(interimService.getInterimsByUniteOrganisationnelles(unite)).thenReturn(interimDTOs);
		mockMvc.perform(get("/interims/uniteOrganisationnelle/{id}", 2)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));

		verify(interimService, times(1)).getInterimsByUniteOrganisationnelles(unite);
		verifyNoMoreInteractions(interimService);
	}
	
	@DisplayName("Test methode find interims By Id Agent")
	@Test
	void testGetInterimsByAgent() throws Exception {
		when(agentService.getAgentById(2L)).thenReturn(agentDTO1);
		when(interimService.findInterimsByAgent(agentDTO1)).thenReturn(interimDTOs);
		mockMvc.perform(get("/interims/agent/{id}", 2)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(interimService, times(1)).findInterimsByAgent(agentDTO1);
		verifyNoMoreInteractions(interimService);
	}
	
	@DisplayName("Test methode find interims By Id DossierInterim")
	@Test
	void testGetInterimsByDossierInterim() throws Exception {
		when(interimService.getInterimByDossierInterim(1L)).thenReturn(interimDTOs);
		mockMvc.perform(get("/interims/dossierInterim/{idDossierInterim}", 1)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(interimService, times(1)).getInterimByDossierInterim(1L);
		verifyNoMoreInteractions(interimService);
	}
	
	@Test
	void testUploadFile() throws Exception {
		InputStream is = this.getClass().getClassLoader().getResourceAsStream("interim.pdf");
		MockMultipartFile mockMultipartFile = new MockMultipartFile("file", "interim.pdf", "multipart/form-data", is);
		MvcResult result = mockMvc
				.perform(MockMvcRequestBuilders.multipart("/interims/{id}/upload", 1).file(mockMultipartFile)
						.contentType(MediaType.MULTIPART_FORM_DATA))
				.andExpect(MockMvcResultMatchers.status().is(200)).andReturn();
		assertEquals(200, result.getResponse().getStatus());
	}

	@Test
	void testDownloadFile() throws Exception {
		mockMvc.perform(get("/interims/{id}/download", 1).contentType(MediaType.APPLICATION_OCTET_STREAM))
				.andExpect(MockMvcResultMatchers.status().is(200)).andReturn();
	}
	
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
