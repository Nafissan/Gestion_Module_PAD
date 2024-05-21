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
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.dto.EtapeAttestationDTO;
import sn.pad.pe.pss.services.EtapeAttestationService;

@ExtendWith(MockitoExtension.class)
class EtapeAttestationControllerTest {
	
	private MockMvc mockMvc;

	private static EtapeAttestationDTO etapeAttestationDTO1;
	
	private static EtapeAttestationDTO etapeAttestationDTO2;
	
	@Mock
	private EtapeAttestationService etapeAttestationService;
	
	@Spy
	private ModelMapper modelmapper;
	
	@InjectMocks
	private EtapeAttestationController etapeAttestationController;
	
	private static List<EtapeAttestationDTO> etapeAttestationDTOs;
	
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		etapeAttestationDTO1= new EtapeAttestationDTO();
		etapeAttestationDTO1.setId(2L);
		etapeAttestationDTO1.setCommentaire("cest un test");
			
		etapeAttestationDTOs = Arrays.asList(etapeAttestationDTO1);	
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(etapeAttestationController)
				.build();
	}
	
	@DisplayName("Test de la methode get All  EtapeAttestations")
	@Test
	void testGetEtapeAttestations() throws Exception {
		
		List<EtapeAttestationDTO> etapeAttestations = Arrays.asList(etapeAttestationDTO1, etapeAttestationDTO2);
	    when(etapeAttestationService.getEtapeAttestations()).thenReturn(etapeAttestations);
	    mockMvc.perform(get("/etapeAttestations").header("Access-Control-Allow-Origin", "*"))
	            .andExpect(status().isOk() )
	            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
	            .andExpect(jsonPath("$[0].id", is(2)))
	            .andExpect(jsonPath("$[0].commentaire", is("cest un test")));
	    verify(etapeAttestationService, Mockito.times(1)).getEtapeAttestations();
	    verifyNoMoreInteractions(etapeAttestationService);
	}
	
	@DisplayName("Test de la methode get EtapeAttestation By id")
	@Test
	void testGetEtapeAttestationgentById() throws Exception {
		
		 when(etapeAttestationService.getEtapeAttestationById(2L)).thenReturn(etapeAttestationDTO1);
	        mockMvc.perform(get("/etapeAttestations/{id}", 2))
	                .andExpect(status().isOk())
	                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
	                .andExpect(jsonPath("$.id", is(2))).andExpect(jsonPath("$.commentaire", is("cest un test")));

	        verify(etapeAttestationService, times(1)).getEtapeAttestationById(2L);
	        verifyNoMoreInteractions(etapeAttestationService);
	}
	@DisplayName("Test de la methode Create  EtapeAttestation")
	@Test
	void testCreate() throws Exception{
		
		EtapeAttestationDTO etapeAttestationDTO = new EtapeAttestationDTO();
		when(etapeAttestationService.create(etapeAttestationDTO)).thenReturn(etapeAttestationDTO);
        mockMvc.perform(
                post("/etapeAttestations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(etapeAttestationDTO)))
                .andExpect(status().isCreated());
        verify(etapeAttestationService, times(1)).create(etapeAttestationDTO);
        verifyNoMoreInteractions(etapeAttestationService);
	}
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	@DisplayName("Test de la methode Update  EtapeAttestation")
	@Test
	void testUpdate() throws Exception {
		etapeAttestationDTO1.setCommentaire("Mise à jour");
		when(etapeAttestationService.update(etapeAttestationDTO1)).thenReturn(true);

        mockMvc.perform(
                put("/etapeAttestations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(etapeAttestationDTO1)))
                .andExpect(status().isOk());
        
        when(etapeAttestationService.update(etapeAttestationDTO1)).thenReturn(false);
        mockMvc.perform(
        		put("/etapeAttestations")
        		.contentType(MediaType.APPLICATION_JSON)
        		.content(asJsonString(etapeAttestationDTO1)))
        .andExpect(status().isNotFound());
        
        verify(etapeAttestationService, times(2)).update(etapeAttestationDTO1);
        verifyNoMoreInteractions(etapeAttestationService);
	}
	
	@DisplayName("Test de la methode Delete  EtapeAttestation")
	@Test
	void testDelete() throws Exception {
		EtapeAttestationDTO etapeAttestationToDelete = new EtapeAttestationDTO();
		
		when(etapeAttestationService.delete(etapeAttestationToDelete)).thenReturn(true);
        mockMvc.perform(
                delete("/etapeAttestations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(etapeAttestationToDelete)))
                .andExpect(status().isOk());
        
		when(etapeAttestationService.delete(etapeAttestationToDelete)).thenReturn(false);
        mockMvc.perform(
                delete("/etapeAttestations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(etapeAttestationToDelete)))
                .andExpect(status().isNotFound());
        verify(etapeAttestationService, times(2)).delete(etapeAttestationToDelete);
        verifyNoMoreInteractions(etapeAttestationService);
	}

	@DisplayName("Création multiple d'étape")
	@Test
	void testCreateMany() throws Exception {
		when(etapeAttestationService.createMany(any(List.class))).thenReturn(etapeAttestationDTO1);
		mockMvc.perform(post("/etapeAttestations/many").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeAttestationDTOs)))
		.andExpect(status().isCreated());
		
		verify(etapeAttestationService, times(1)).createMany(any(List.class));
		verifyNoMoreInteractions(etapeAttestationService);
	}
	
	@DisplayName("Modification multiple d'étape")
	@Test
	void testUpdateMany() throws Exception {
		when(etapeAttestationService.updateMany(any(List.class))).thenReturn(true);
		mockMvc.perform(put("/etapeAttestations/many").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeAttestationDTOs)))
		.andExpect(status().isOk());
		
		when(etapeAttestationService.updateMany(any(List.class))).thenReturn(false);
		mockMvc.perform(put("/etapeAttestations/many").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeAttestationDTOs)))
		.andExpect(status().isNotFound());
		
		verify(etapeAttestationService, times(2)).updateMany(any(List.class));
		verifyNoMoreInteractions(etapeAttestationService);
	}
}
