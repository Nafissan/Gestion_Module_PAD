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

import java.util.ArrayList;
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
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.bo.Fonction;
import sn.pad.pe.pss.dto.FonctionDTO;
import sn.pad.pe.pss.services.FonctionService;

/**
 * 
 * @author charle.sarr
 *
 */
@ExtendWith(MockitoExtension.class)
public class FonctionControllerTest {

	private MockMvc mockMvc;
	@Mock
	private FonctionService fonctionService;
	@Spy
	private ModelMapper modelmapper;
	@SpyBean
	private ModelMapper modelMapper;
	@InjectMocks
	private FonctionController fonctionController;
	private static Fonction fonction;
	private static FonctionDTO fonctionDTO1;
	private static FonctionDTO fonctionDTO2;
	private static List<FonctionDTO> listeFonctionDTO;

	@BeforeEach
	public void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(fonctionController)
				.build();
	}

	@BeforeAll
	public static void setUpBeforeClass() throws Exception {

		listeFonctionDTO = new ArrayList<>();
		fonction = new Fonction();
		fonction.setId(1L);
		fonction.setNom("uneFonction");

		fonctionDTO1 = new FonctionDTO();
		fonctionDTO1.setId(3L);
		fonctionDTO1.setNom("FonctionDTO1");

		fonctionDTO2 = new FonctionDTO();
		fonctionDTO2.setId(2L);
		fonctionDTO2.setNom("FonctionDTO2");

		listeFonctionDTO.add(fonctionDTO1);
		listeFonctionDTO.add(fonctionDTO2);

	}

	@Test
	public void getFonctionsTest() throws Exception {

		when(fonctionService.getFonctions()).thenReturn(listeFonctionDTO);
		mockMvc.perform(get("/fonctions")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
//	            .andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].id", is(3))).andExpect(jsonPath("$[0].nom", is("FonctionDTO1")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].nom", is("FonctionDTO2")));
		verify(fonctionService, Mockito.times(1)).getFonctions();
		verifyNoMoreInteractions(fonctionService);
	}

	@Test
	public void getFonctionByIdTest() throws Exception {
		when(fonctionService.getFonctionById(fonctionDTO2.getId())).thenReturn(fonctionDTO2);
		mockMvc.perform(get("/fonctions/{id}", 2)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.id", is(2))).andExpect(jsonPath("$.nom", is("FonctionDTO2")));
		verify(fonctionService, times(1)).getFonctionById(2L);
		verifyNoMoreInteractions(fonctionService);
	}

	@Test
	public void createTest() throws Exception {

		FonctionDTO fonctionDTO = new FonctionDTO();
		when(fonctionService.create(any(FonctionDTO.class))).thenReturn(fonctionDTO);
		mockMvc.perform(post("/fonctions").contentType(MediaType.APPLICATION_JSON).content(asJsonString(fonctionDTO)))
				.andExpect(status().isOk());
		verifyNoMoreInteractions(fonctionService);
		verify(fonctionService, times(1)).create(any(FonctionDTO.class));
	}

	@Test
	public void updateTest() throws Exception {

		when(fonctionService.update(any(FonctionDTO.class))).thenReturn(true);
		mockMvc.perform(put("/fonctions").contentType(MediaType.APPLICATION_JSON).content(asJsonString(fonctionDTO2)))
				.andExpect(status().isOk());

		when(fonctionService.update(any(FonctionDTO.class))).thenReturn(false);
		mockMvc.perform(
				put("/fonctions").contentType(MediaType.APPLICATION_JSON).content(asJsonString(fonctionDTO1)))
				.andExpect(status().isNotFound());
		verifyNoMoreInteractions(fonctionService);
		verify(fonctionService, times(2)).update(any(FonctionDTO.class));
	}


	@Test
	public void deleteTest() throws Exception {
		FonctionDTO fonctionToDelete = new FonctionDTO();
		when(fonctionService.delete(any(FonctionDTO.class))).thenReturn(true);

		mockMvc.perform(
				delete("/fonctions").contentType(MediaType.APPLICATION_JSON).content(asJsonString(fonctionToDelete)))
				.andExpect(status().isOk());
		verify(fonctionService, times(1)).delete(any(FonctionDTO.class));
		verifyNoMoreInteractions(fonctionService);
	}

	@Test
	public void deleteControllerFailedTest() throws Exception {
		FonctionDTO fonctionToDelete = new FonctionDTO();
		when(fonctionService.delete(any(FonctionDTO.class))).thenReturn(false);

		mockMvc.perform(
				delete("/fonctions").contentType(MediaType.APPLICATION_JSON).content(asJsonString(fonctionToDelete)))
				.andExpect(status().isNotFound());
		verify(fonctionService, times(1)).delete(any(FonctionDTO.class));
		verifyNoMoreInteractions(fonctionService);

	}

	@DisplayName("Test de la methode create getFonctionByUniteOrganisationnelle")

	@Test
	public void getFonctionByUniteOrganisationnelleTest() throws Exception {
		when(fonctionService.getFonctionByUniteOrganisationnelle(2L)).thenReturn(listeFonctionDTO);
		mockMvc.perform(get("/fonctions/uniteOrganisationnelle/{id}", 2)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8)).andExpect(jsonPath("$[0].id", is(3)))
				.andExpect(jsonPath("$[0].nom", is("FonctionDTO1"))).andExpect(jsonPath("$[1].id", is(2)))
				.andExpect(jsonPath("$[1].nom", is("FonctionDTO2")));
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Test
	public void getFonctionByIdFailedTest() throws Exception {
		when(fonctionService.getFonctionById(fonctionDTO2.getId())).thenReturn(null);
		mockMvc.perform(get("/fonctions/{id}", 2)).andExpect(status().isNotFound());
		verify(fonctionService, times(1)).getFonctionById(2L);
		verifyNoMoreInteractions(fonctionService);
	}
	
	@Test
	public void getFonctionByNomTest() throws Exception {
		List<FonctionDTO> fonctions =  new ArrayList<FonctionDTO>();
		fonctions.add(fonctionDTO2);
		when(fonctionService.getFonctionByNom(fonctionDTO2.getNom())).thenReturn(fonctions);
		mockMvc.perform(get("/fonctions/nom/{nom}", fonctionDTO2.getNom())).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		verify(fonctionService, times(1)).getFonctionByNom(fonctionDTO2.getNom());
		verifyNoMoreInteractions(fonctionService);
	}
	
}
