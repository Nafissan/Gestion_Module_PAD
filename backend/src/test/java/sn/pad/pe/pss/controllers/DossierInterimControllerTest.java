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

import sn.pad.pe.pss.dto.DossierInterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.DossierInterimService;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@DisplayName("Test controlleur Dossier Intérim")
@ExtendWith(MockitoExtension.class)
class DossierInterimControllerTest {

	private MockMvc mockMvc;
	@Mock
	private DossierInterimService dossierInterimService;
	@InjectMocks
	private DossierInterimController dossierInterimController;
	@Mock
	private UniteOrganisationnelleService uniteOrganisationnelleService;

	private static DossierInterimDTO dossierInterim1;
	private static DossierInterimDTO dossierInterim2;
	private static DossierInterimDTO dossierInterim3;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		UniteOrganisationnelleDTO uniteOrganisationnelle = new UniteOrganisationnelleDTO();

		dossierInterim1 = new DossierInterimDTO();
		dossierInterim1.setId(1L);
		dossierInterim1.setDescription("bien");
		dossierInterim1.setUniteOrganisationnelle(uniteOrganisationnelle);
		dossierInterim1.setAnnee(2021);
		
		dossierInterim2 = new DossierInterimDTO();
		dossierInterim2.setId(2L);
		dossierInterim2.setDescription("mauvais");
		dossierInterim2.setUniteOrganisationnelle(uniteOrganisationnelle);
		dossierInterim1.setAnnee(2020);

		dossierInterim3 = new DossierInterimDTO();
		dossierInterim3.setId(3L);
		dossierInterim3.setDescription("juste");
		dossierInterim3.setUniteOrganisationnelle(uniteOrganisationnelle);
		dossierInterim3.setAnnee(2019);
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(dossierInterimController).build();
	}

	@DisplayName("Liste dossier interim (SUCCESS)")
	@Test
	void testGetDossierInterims() throws Exception {

		when(dossierInterimService.getDossierInterims())
				.thenReturn(Arrays.asList(dossierInterim1, dossierInterim2, dossierInterim3));
		mockMvc.perform(get("/dossierInterims")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].description", is("bien"))).andExpect(jsonPath("$[0].id", is(1)));

		verify(dossierInterimService, times(1)).getDossierInterims();

		verifyNoMoreInteractions(dossierInterimService);
	}

	@DisplayName("Dossier Interim en fonction de l'Id (SUCCESS)")
	@Test
	void testGetAgentById() throws Exception {
		when(dossierInterimService.getDossierInterimById(1L)).thenReturn(dossierInterim1);
		mockMvc.perform(get("/dossierInterims/{id}", 1)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(1))).andExpect(jsonPath("$.description", is("bien")));

		verify(dossierInterimService, times(1)).getDossierInterimById(1L);
		verifyNoMoreInteractions(dossierInterimService);
	}

	@DisplayName("Création interim(SUCCESS)")
	@Test
	void testCreate() throws Exception {
		when(dossierInterimService.createDossierInterim(any(DossierInterimDTO.class))).thenReturn(dossierInterim1);
		mockMvc.perform(
				post("/dossierInterims").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierInterim1)))
				.andExpect(status().isCreated());

		verify(dossierInterimService, times(1)).createDossierInterim(any(DossierInterimDTO.class));
		verifyNoMoreInteractions(dossierInterimService);
	}

	@DisplayName("Modification dossier interim(SUCCESS)")
	@Test
	void testUpdate() throws Exception {
		when(dossierInterimService.updateDossierInterim(any(DossierInterimDTO.class))).thenReturn(true);
		mockMvc.perform(
				put("/dossierInterims/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierInterim1)))
				.andExpect(status().isOk());

		when(dossierInterimService.updateDossierInterim(any(DossierInterimDTO.class))).thenReturn(false);
		mockMvc.perform(
				put("/dossierInterims/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(dossierInterim1)))
				.andExpect(status().isNotFound());

		verify(dossierInterimService, times(2)).updateDossierInterim(any(DossierInterimDTO.class));
		verifyNoMoreInteractions(dossierInterimService);
	}

	@DisplayName("Suppression dossier interim(SUCCESS)")
	@Test
	void testDelete() throws Exception {
		when(dossierInterimService.deteleDossierInterim(any(DossierInterimDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/dossierInterims").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(dossierInterim1))).andExpect(status().isOk());

		when(dossierInterimService.deteleDossierInterim(any(DossierInterimDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/dossierInterims").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(dossierInterim1))).andExpect(status().isNotFound());

		verify(dossierInterimService, times(2)).deteleDossierInterim(any(DossierInterimDTO.class));
		verifyNoMoreInteractions(dossierInterimService);
	}

	@DisplayName("Dossier Interim en fonction de l'unité organisationnelle")
	@Test
	void testGetByCodeDirectionAndDossierInterim() throws Exception {
		UniteOrganisationnelleDTO unite = dossierInterim1.getUniteOrganisationnelle();
		when(uniteOrganisationnelleService.getUniteOrganisationnelleById(1L)).thenReturn(unite);
		when(dossierInterimService.dossierInterimByUniteOrganisationnelleAndAnnee(any(UniteOrganisationnelleDTO.class),any(Integer.class))).thenReturn(dossierInterim1);
		mockMvc.perform(get("/dossierInterims/uniteOrganisationnelle/{idUniteOrganisationnelle}/annee/{annee}", 1,dossierInterim1.getAnnee()))
			.andExpect(status().isOk());

		verify(dossierInterimService, times(1)).dossierInterimByUniteOrganisationnelleAndAnnee(any(UniteOrganisationnelleDTO.class),any(Integer.class));
		verifyNoMoreInteractions(dossierInterimService);
	}
	
	@DisplayName("Dossier Interim en fonction de l'année")
	@Test
	void testGetDossierInterimByAnnee() throws Exception {
		final int ANNEE = 2020;
		when(dossierInterimService.findDossierInterimByAnnee(ANNEE)).thenReturn(Arrays.asList(dossierInterim1));
		mockMvc.perform(get("/dossierInterims/annee/{annee}", ANNEE))
		.andExpect(status().isOk());
		
		verify(dossierInterimService, times(1)).findDossierInterimByAnnee(ANNEE);
		verifyNoMoreInteractions(dossierInterimService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
