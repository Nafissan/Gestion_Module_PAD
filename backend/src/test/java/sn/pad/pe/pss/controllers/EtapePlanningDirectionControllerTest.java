package sn.pad.pe.pss.controllers;

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

import sn.pad.pe.pss.dto.EtapePlanningDirectionDTO;
import sn.pad.pe.pss.services.EtatpePlanningDirectionService;

@ExtendWith(MockitoExtension.class)
class EtapePlanningDirectionControllerTest {

	private MockMvc mockMvc;

	private static EtapePlanningDirectionDTO etapePlaningDirectionDTO1;

	private static EtapePlanningDirectionDTO etapePlaningDirectionDTO2;

	@Mock
	private EtatpePlanningDirectionService etapePlaningDirectionService;

	@Spy
	private ModelMapper modelmapper;

	@InjectMocks
	private EtapePlanningDirectionController etapePlaningDirectionController;

	private static List<EtapePlanningDirectionDTO> etapePlaningDirectionDTOs;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		etapePlaningDirectionDTO1 = new EtapePlanningDirectionDTO();
		etapePlaningDirectionDTO1.setId(2L);
		etapePlaningDirectionDTO1.setDescription("cest un test");

		etapePlaningDirectionDTOs = Arrays.asList(etapePlaningDirectionDTO1);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(etapePlaningDirectionController).build();
	}

	@DisplayName("Test de la methode get All  EtapePlaningDirections")
	@Test
	void testGetEtapePlaningDirections() throws Exception {

		List<EtapePlanningDirectionDTO> etapePlaningDirections = Arrays.asList(etapePlaningDirectionDTO1,
				etapePlaningDirectionDTO2);
		when(etapePlaningDirectionService.getEtatpePlanningDirections()).thenReturn(etapePlaningDirections);
		mockMvc.perform(get("/etapeplannings").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));
		verify(etapePlaningDirectionService, Mockito.times(1)).getEtatpePlanningDirections();
		verifyNoMoreInteractions(etapePlaningDirectionService);
	}

	@DisplayName("Test de la methode get EtapePlaningDirection By id")
	@Test
	void testGetEtapePlaningDirectiongentById() throws Exception {
		when(etapePlaningDirectionService.getEtatpePlanningDirectionById(1L)).thenReturn(etapePlaningDirectionDTO1);
		mockMvc.perform(get("/etapeplannings/{id}", 1L)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));

		verify(etapePlaningDirectionService, times(1)).getEtatpePlanningDirectionById(1L);
		verifyNoMoreInteractions(etapePlaningDirectionService);
	}
	
	@DisplayName("Test de la methode get EtapePlaningDirection By id")
	@Test
	void testGetEtatpePlanningDirectionsByPlanningDirection() throws Exception {
		when(etapePlaningDirectionService.getEtatpePlanningDirectionsByPlanningDirection(1L)).thenReturn(etapePlaningDirectionDTOs);
		mockMvc.perform(get("/etapeplannings/planningDirection/{idPlanningDirection}", 1L)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(etapePlaningDirectionService, times(1)).getEtatpePlanningDirectionsByPlanningDirection(1L);
		verifyNoMoreInteractions(etapePlaningDirectionService);
	}

	@DisplayName("Test de la methode Create  EtapePlaningDirection")
	@Test
	void testCreate() throws Exception {

		when(etapePlaningDirectionService.createEtatpePlanningDirection(any(EtapePlanningDirectionDTO.class)))
				.thenReturn(etapePlaningDirectionDTO1);
		mockMvc.perform(post("/etapeplannings").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(etapePlaningDirectionDTO1))).andExpect(status().isCreated());
		verify(etapePlaningDirectionService, times(1))
				.createEtatpePlanningDirection(any(EtapePlanningDirectionDTO.class));
		verifyNoMoreInteractions(etapePlaningDirectionService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@DisplayName("Test de la methode Update  EtapePlaningDirection")
	@Test
	void testUpdate() throws Exception {
		etapePlaningDirectionDTO1.setDescription("Mise à jour");
		when(etapePlaningDirectionService.updateEtatpePlanningDirection(any(EtapePlanningDirectionDTO.class))).thenReturn(true);

		mockMvc.perform(put("/etapeplannings").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(etapePlaningDirectionDTO1))).andExpect(status().isOk());

		when(etapePlaningDirectionService.updateEtatpePlanningDirection(any(EtapePlanningDirectionDTO.class))).thenReturn(false);
		mockMvc.perform(put("/etapeplannings").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(etapePlaningDirectionDTO1))).andExpect(status().isNotFound());

		verify(etapePlaningDirectionService, times(2)).updateEtatpePlanningDirection(any(EtapePlanningDirectionDTO.class));
		verifyNoMoreInteractions(etapePlaningDirectionService);
	}

	@DisplayName("Test de la methode Delete  EtapePlaningDirection")
	@Test
	void testDelete() throws Exception {
		when(etapePlaningDirectionService.deteleEtatpePlanningDirection(any(EtapePlanningDirectionDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/etapeplannings").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(etapePlaningDirectionDTO1))).andExpect(status().isOk());

		when(etapePlaningDirectionService.deteleEtatpePlanningDirection(any(EtapePlanningDirectionDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/etapeplannings").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(etapePlaningDirectionDTO1))).andExpect(status().isNotFound());

		verify(etapePlaningDirectionService, times(2)).deteleEtatpePlanningDirection(any(EtapePlanningDirectionDTO.class));
		verifyNoMoreInteractions(etapePlaningDirectionService);
	}
}
