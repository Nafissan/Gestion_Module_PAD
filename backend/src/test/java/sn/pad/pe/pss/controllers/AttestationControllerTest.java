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
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.AttestationDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.AttestationRepository;
import sn.pad.pe.pss.services.AgentService;
import sn.pad.pe.pss.services.AttestationService;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

/**
 * 
 * @author Adama.THIAW
 *
 */
@ExtendWith(MockitoExtension.class)
class AttestationControllerTest {

	private static AttestationDTO attestationDTO1;

	private MockMvc mockMvc;
	@Mock
	private AttestationService attestationService;
	@Mock
	private AttestationRepository attestationRepository;

	private static List<AttestationDTO> attestationDTOs;
	/*
	 * @Spy private ModelMapper modelMapper;
	 */

	@InjectMocks
	private AttestationController attestationController;

	@Mock
	private UniteOrganisationnelleService uniteOrganisationnelleService;

	@Mock
	private AgentService agentService;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		AgentDTO agentDTO = new AgentDTO();
		UniteOrganisationnelleDTO organisationnelleDTO = new UniteOrganisationnelleDTO();

		attestationDTO1 = new AttestationDTO();
		attestationDTO1.setId(12345L);
		attestationDTO1.setCommentaire("Demande d'attestation");
		attestationDTO1.setAgent(agentDTO);
		attestationDTO1.setUniteOrganisationnelle(organisationnelleDTO);
		attestationDTOs = Arrays.asList(attestationDTO1);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(attestationController).build();
	}

	@DisplayName("Test de la methode create Attestations")
	@Test
	public void testCreate() throws Exception {
		when(attestationService.create(any(AttestationDTO.class))).thenReturn(attestationDTO1);
		mockMvc.perform(post("/attestations/").contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(asJsonString(attestationDTO1))).andExpect(status().isCreated());
		verify(attestationService, times(1)).create(any(AttestationDTO.class));
		verifyNoMoreInteractions(attestationService);

	}

	@DisplayName("Test de la methode Get All Attestation")
	@Test
	public void testGetAttestations() throws Exception {
		when(attestationService.getAttestations()).thenReturn(attestationDTOs);
		mockMvc.perform(get("/attestations").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(12345)))
				.andExpect(jsonPath("$[0].commentaire", is("Demande d'attestation")));
		verify(attestationService, times(1)).getAttestations();
		verifyNoMoreInteractions(attestationService);
	}

//	@Order(2)
	@DisplayName("Test de la methode get Attestation By id")
	@Test
	void testGetAttestationgentById() throws Exception {
		when(attestationService.getAttestationById(attestationDTO1.getId())).thenReturn(attestationDTO1);
		mockMvc.perform(get("/attestations/{id}", 12345)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("" + "$.id", is(12345)))
				.andExpect(jsonPath("$.commentaire", is("Demande d'attestation")));
		verify(attestationService, times(1)).getAttestationById(attestationDTO1.getId());
		verifyNoMoreInteractions(attestationService);
	}

	@DisplayName("Test de la methode Update  Attestation")
	@Test
	void testUpdate() throws Exception {
		when(attestationService.update(any(AttestationDTO.class))).thenReturn(true);
		mockMvc.perform(
				put("/attestations").contentType(MediaType.APPLICATION_JSON).content(asJsonString(attestationDTO1)))
				.andExpect(status().isOk());
		
		when(attestationService.update(any(AttestationDTO.class))).thenReturn(false);
		mockMvc.perform(
				put("/attestations").contentType(MediaType.APPLICATION_JSON).content(asJsonString(attestationDTO1)))
		.andExpect(status().isNotFound());
		
		verify(attestationService, times(2)).update(any(AttestationDTO.class));
		verifyNoMoreInteractions(attestationService);

	}

	@DisplayName("Test de la methode Delete  Attestation")
	@Test
	void testDelete() throws Exception {
		when(attestationService.delete(any(AttestationDTO.class))).thenReturn(true);
		mockMvc.perform(
				delete("/attestations").contentType(MediaType.APPLICATION_JSON).content(asJsonString(attestationDTO1)))
				.andExpect(status().isOk());
		
		when(attestationService.delete(any(AttestationDTO.class))).thenReturn(false);
		mockMvc.perform(
				delete("/attestations").contentType(MediaType.APPLICATION_JSON).content(asJsonString(attestationDTO1)))
				.andExpect(status().isNotFound());
		
		verify(attestationService, times(2)).delete(any(AttestationDTO.class));
		verifyNoMoreInteractions(attestationService);

	}

	@Test
	void testUploadFile() throws Exception {
		InputStream is = this.getClass().getClassLoader().getResourceAsStream("agents.pdf");
		MockMultipartFile mockMultipartFile = new MockMultipartFile("file", "agents.pdf", "multipart/form-data", is);
		MvcResult result = mockMvc
				.perform(MockMvcRequestBuilders.multipart("/attestations/{id}/upload", 1).file(mockMultipartFile)
						.contentType(MediaType.MULTIPART_FORM_DATA))
				.andExpect(MockMvcResultMatchers.status().is(200)).andReturn();
		assertEquals(200, result.getResponse().getStatus());
	}

	@Test
	void testDownloadFile() throws Exception {
		mockMvc.perform(get("/attestations/{id}/download", 1).contentType(MediaType.APPLICATION_OCTET_STREAM))
				.andExpect(MockMvcResultMatchers.status().is(200)).andReturn();
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	@DisplayName("Test de la methode Update  Attestation")
	@Test
	void testUpdateFailed() throws Exception {
		when(attestationService.update(any(AttestationDTO.class))).thenReturn(false);
		mockMvc.perform(
				put("/attestations").contentType(MediaType.APPLICATION_JSON).content(asJsonString(attestationDTO1)))
				.andExpect(status().isNotFound());
		verify(attestationService, times(1)).update(any(AttestationDTO.class));
		verifyNoMoreInteractions(attestationService);
	}

	@DisplayName("Test de la methode Update Many Attestation")
	@Test
	void testUpdateMany() throws Exception {
		when(attestationService.updateMany(any(List.class))).thenReturn(true);
		mockMvc.perform(
				put("/attestations/many").contentType(MediaType.APPLICATION_JSON).content(asJsonString(attestationDTOs)))
				.andExpect(status().isOk());
		
		when(attestationService.updateMany(any(List.class))).thenReturn(false);
		mockMvc.perform(
				put("/attestations/many").contentType(MediaType.APPLICATION_JSON).content(asJsonString(attestationDTOs)))
				.andExpect(status().isNotFound());
		
		verify(attestationService, times(2)).updateMany(any(List.class));
		verifyNoMoreInteractions(attestationService);

	}

	@Test
	void testGetAttestationsByUniteORG() throws Exception {
		when(uniteOrganisationnelleService.getUniteOrganisationnelleById(1L)).thenReturn(attestationDTO1.getUniteOrganisationnelle());
		when(attestationService.getAttestationsByUniteOrganisationnelles(any(UniteOrganisationnelleDTO.class))).thenReturn(attestationDTOs);
		mockMvc.perform(get("/attestations/uniteOrganisationnelle/{id}", 1L)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(attestationService, times(1)).getAttestationsByUniteOrganisationnelles(any(UniteOrganisationnelleDTO.class));
		verifyNoMoreInteractions(attestationService);
	}
	
	@Test
	void testGetAttestationsByAgent() throws Exception {
		when(agentService.getAgentById(1L)).thenReturn(attestationDTO1.getAgent());
		when(attestationService.findAttestationsByAgent(any(AgentDTO.class))).thenReturn(attestationDTOs);
		mockMvc.perform(get("/attestations/agent/{id}", 1L)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(attestationService, times(1)).findAttestationsByAgent(any(AgentDTO.class));
		verifyNoMoreInteractions(attestationService);
	}

	@Test
	void testFindAttestationsByEtat() throws Exception {
		when(attestationService.findAttestationsByEtatDifferent("TRANSMIS")).thenReturn(attestationDTOs);
		mockMvc.perform(get("/attestations/etat/different/{etat}", "TRANSMIS")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(attestationService, times(1)).findAttestationsByEtatDifferent("TRANSMIS");
		verifyNoMoreInteractions(attestationService);
	}
}
