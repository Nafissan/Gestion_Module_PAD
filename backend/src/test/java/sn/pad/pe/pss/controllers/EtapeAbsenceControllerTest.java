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

import sn.pad.pe.pss.dto.AbsenceDTO;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.EtapeAbsenceDTO;
import sn.pad.pe.pss.dto.MotifDTO;
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.EtapeAbsenceService;

/**
 * 
 * @author abdou.diop
 *
 */
@DisplayName("Test EtapeAbsence Controller")
@ExtendWith(MockitoExtension.class)
class EtapeAbsenceControllerTest {
	private MockMvc mockMvc;
	@Mock
	private EtapeAbsenceService etapeabsenceService;
	@InjectMocks
	private EtapeAbsenceController etapeabsenceController;
	@Spy
	private ModelMapper modelMapper;

	private static EtapeAbsenceDTO etapeabsenceDTO1;
	private static EtapeAbsenceDTO etapeabsenceDTO2;
	private static EtapeAbsenceDTO etapeabsenceDTO3;

	private static AbsenceDTO absenceDTO;
	private static List<EtapeAbsenceDTO> etapeabsenceDTO;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		AgentDTO agentDTO = new AgentDTO();
		UniteOrganisationnelleDTO organisationnelleDTO = new UniteOrganisationnelleDTO();
		PlanningAbsenceDTO planningAbsenceDTO = new PlanningAbsenceDTO();
		MotifDTO motifDTO = new MotifDTO();

		absenceDTO = new AbsenceDTO();
		absenceDTO.setId(1L);
		absenceDTO.setEtat("TRANSMIS");
		absenceDTO.setCommentaire("bien");
		absenceDTO.setAgent(agentDTO);
		absenceDTO.setUniteOrganisationnelle(organisationnelleDTO);
		absenceDTO.setPlanningAbsence(planningAbsenceDTO);
		absenceDTO.setMotif(motifDTO);
		
		etapeabsenceDTO1 = new EtapeAbsenceDTO();
		etapeabsenceDTO1.setId(1L);
		etapeabsenceDTO1.setCommentaire("commentaire1");
		etapeabsenceDTO1.setAction("action1");
		etapeabsenceDTO1.setAbsence(absenceDTO);

		etapeabsenceDTO2 = new EtapeAbsenceDTO();
		etapeabsenceDTO2 .setId(2L);
		etapeabsenceDTO2 .setCommentaire("commentaire2");
		etapeabsenceDTO2 .setAction("action2");
		etapeabsenceDTO2.setAbsence(absenceDTO);
		
		etapeabsenceDTO3 = new EtapeAbsenceDTO();
		etapeabsenceDTO3.setId(3L);
		etapeabsenceDTO3.setCommentaire("commentaire3");
		etapeabsenceDTO3.setAction("action3");
		etapeabsenceDTO3.setAbsence(absenceDTO);
		
		etapeabsenceDTO = Arrays.asList(
				etapeabsenceDTO1, 
				etapeabsenceDTO2, 
				etapeabsenceDTO3);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(etapeabsenceController)
				.build();
		
		modelMapper.getConfiguration().setAmbiguityIgnored(true); // Utile pour ignore les ambiguités
	}

	@DisplayName("Test de la methode get All EtapeAbsence")
	@Test
	void testGetEtapeAbsence() throws Exception {
		when(etapeabsenceService.getEtapeAbsence()).thenReturn(etapeabsenceDTO);
		mockMvc.perform(get("/etapeabsences").header("Access-Control-Allow-Origin", "*")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)) //
				.andExpect(jsonPath("$[0].id", is(1)))
				.andExpect(jsonPath("$[0].commentaire", is("commentaire1")))
				.andExpect(jsonPath("$[1].id", is(2)))
				.andExpect(jsonPath("$[1].commentaire", is("commentaire2")))
				.andExpect(jsonPath("$[2].id", is(3)))
				.andExpect(jsonPath("$[2].commentaire", is("commentaire3")));

		verify(etapeabsenceService, times(1)).getEtapeAbsence();

		verifyNoMoreInteractions(etapeabsenceService);
	}

	@DisplayName("Test de la methode get EtapeAbsence By id")
	@Test
	void testGetEtapeAbsenceById() throws Exception {
		when(etapeabsenceService.getEtapeAbsenceById(etapeabsenceDTO1.getId())).thenReturn(etapeabsenceDTO1);
		mockMvc.perform(get("/etapeabsences/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.commentaire", is("commentaire1")));

		verify(etapeabsenceService, times(1)).getEtapeAbsenceById(etapeabsenceDTO1.getId());
		verifyNoMoreInteractions(etapeabsenceService);
	}

	@DisplayName("Test de la methode Create EtapeAbsence")
	@Test
	void testCreateAbsence() throws Exception {
		when(etapeabsenceService.createEtapeAbsence(any(EtapeAbsenceDTO.class))).thenReturn(etapeabsenceDTO2);
		mockMvc.perform(post("/etapeabsences/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeabsenceDTO2)))
				.andExpect(status().isOk());

		verify(etapeabsenceService, times(1)).createEtapeAbsence(any(EtapeAbsenceDTO.class));
		verifyNoMoreInteractions(etapeabsenceService);
	
	
	}

	@DisplayName("Test de la methode Update EtapeAbsence")
	@Test
	void testUpdateEtapeAbsence() throws Exception {
		EtapeAbsenceDTO etapeAbsenceDTO = new EtapeAbsenceDTO();
		etapeAbsenceDTO.setId(1L);
		etapeAbsenceDTO.setCommentaire("Fall");

		when(etapeabsenceService.updateEtapeAbsence(any(EtapeAbsenceDTO.class))).thenReturn(true);
		mockMvc.perform(put("/etapeabsences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeAbsenceDTO)))
				.andExpect(status().isOk());
		
		when(etapeabsenceService.updateEtapeAbsence(any(EtapeAbsenceDTO.class))).thenReturn(false);
		mockMvc.perform(put("/etapeabsences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeAbsenceDTO)))
		.andExpect(status().isNotFound());
		
		verify(etapeabsenceService, times(2)).updateEtapeAbsence(any(EtapeAbsenceDTO.class));
		verifyNoMoreInteractions(etapeabsenceService);
	}

	@DisplayName("Test de la methode Delete EtapeAbsence")
	@Test
	final void testDeleteEtapeAbsence() throws Exception {
		when(etapeabsenceService.deleteEtapeAbsence(any(EtapeAbsenceDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/etapeabsences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeabsenceDTO2)))
				.andExpect(status().isOk());

		when(etapeabsenceService.deleteEtapeAbsence(any(EtapeAbsenceDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/etapeabsences").contentType(MediaType.APPLICATION_JSON).content(asJsonString(etapeabsenceDTO2)))
				.andExpect(status().isNotFound());
		
		verify(etapeabsenceService, times(2)).deleteEtapeAbsence(any(EtapeAbsenceDTO.class));
		verifyNoMoreInteractions(etapeabsenceService);
		
		
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
