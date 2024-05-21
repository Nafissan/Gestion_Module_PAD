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

import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;
import sn.pad.pe.pss.services.helpers.GenerationCode;


@DisplayName("Test Classe UniteOrganisationnelleController")
@ExtendWith(MockitoExtension.class)
class UniteOrganisationnelleControllerTest {

	private MockMvc mockMvc;
	@Mock
	private UniteOrganisationnelleService uniteOrganisationnelleService;
	private GenerationCode generer;
	@Spy
	private ModelMapper modelmapper;

	@InjectMocks
	private UniteOrganisationnelleController uniteOrganisationnelleController;

	private static UniteOrganisationnelleDTO uniteOrganisationnelle1;
	private static UniteOrganisationnelleDTO uniteOrganisationnelle2;

	// utiliser dans cette classe pour faire la mappage
	private static ModelMapper modelMapper;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		uniteOrganisationnelle1 = new UniteOrganisationnelleDTO();
		uniteOrganisationnelle1.setId(1L);
		uniteOrganisationnelle1.setCode("DD05280");

		uniteOrganisationnelle2 = new UniteOrganisationnelleDTO();
		uniteOrganisationnelle2.setCode("DD05281");

		modelMapper = new ModelMapper();
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(uniteOrganisationnelleController)
				.build();
	}

	@Test
	@DisplayName("Test de la methode get All  UniteOrganisationnelleDTOs")
	void testGetUniteOrganisationnelleDTOs() throws Exception {

		List<UniteOrganisationnelleDTO> uniteOrganisationnelles = Arrays.asList(uniteOrganisationnelle1, uniteOrganisationnelle2);
		when(uniteOrganisationnelleService.getUniteOrganisationnelles()).thenReturn(uniteOrganisationnelles);
		mockMvc.perform(get("/uniteOrganisationnelles")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].code", is("DD05280"))).andExpect(jsonPath("$[0].code", is("DD05280")))
				.andExpect(jsonPath("$[1].code", is("DD05281"))).andExpect(jsonPath("$[1].code", is("DD05281")));
		verify(uniteOrganisationnelleService, times(1)).getUniteOrganisationnelles();
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}

	@Test
	@DisplayName("Test de la methode get UniteOrganisationnelleDTO By id")
	void testGetUniteOrganisationnelleDTOById() throws Exception {
		
		when(uniteOrganisationnelleService.getUniteOrganisationnelleById(1L)).thenReturn(uniteOrganisationnelle1);
		mockMvc.perform(get("/uniteOrganisationnelles/{id}", 1)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
		.andExpect(jsonPath("$.code", is("DD05280"))).andExpect(jsonPath("$.code", is("DD05280")));
		
		verify(uniteOrganisationnelleService, times(1)).getUniteOrganisationnelleById(1L);
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}
	
	@Test
	@DisplayName("Test de la methode get UniteOrganisationnelleDTO By code")
	void testGetUniteOrganisationnelleDTOByCode() throws Exception {
		final String CODE = "DD05280";
		when(uniteOrganisationnelleService.getUniteOrganisationnelleByCode(CODE)).thenReturn(uniteOrganisationnelle1);
		mockMvc.perform(get("/uniteOrganisationnelles/code/{code}", CODE)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.code", is(CODE)));

		verify(uniteOrganisationnelleService, times(1)).getUniteOrganisationnelleByCode(CODE);
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}

	@Test
	@DisplayName("Test de la methode Create  UniteOrganisationnelleDTO")
	void testCreate() throws Exception {

		UniteOrganisationnelleDTO uniteOrganisationnelleDTO = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDTO.setCode("DD05280");
		UniteOrganisationnelleDTO uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDTO, UniteOrganisationnelleDTO.class);

		when(uniteOrganisationnelleService.create(any(UniteOrganisationnelleDTO.class))).thenReturn(uniteOrganisationnelle);
		mockMvc.perform(post("/uniteOrganisationnelles").contentType(MediaType.APPLICATION_JSON).content(asJsonString(uniteOrganisationnelleDTO)))
				.andExpect(status().isOk());
		verify(uniteOrganisationnelleService, times(1)).create(any(UniteOrganisationnelleDTO.class));
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Test
	@DisplayName("Test de la methode Update  UniteOrganisationnelleDTO")
	void testUpdate() throws Exception {
		UniteOrganisationnelleDTO uniteOrganisationnelleDto = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDto.setId(1L);
		uniteOrganisationnelleDto.setCode("DD05280");
		
		when(uniteOrganisationnelleService.update(any(UniteOrganisationnelleDTO.class))).thenReturn(true);

		mockMvc.perform(put("/uniteOrganisationnelles").contentType(MediaType.APPLICATION_JSON).content(asJsonString(uniteOrganisationnelleDto)))
				.andExpect(status().isOk());
		verify(uniteOrganisationnelleService, times(1)).update(any(UniteOrganisationnelleDTO.class));
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}
	
	@Test
	@DisplayName("Test de la methode Update  UniteOrganisationnelleDTO invalid")
	void testUpdateInvalidObject() throws Exception {
		UniteOrganisationnelleDTO uniteOrganisationnelleDto = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDto.setId(1L);
		uniteOrganisationnelleDto.setCode("DD05280");

		when(uniteOrganisationnelleService.update(any(UniteOrganisationnelleDTO.class))).thenReturn(false);
		
		mockMvc.perform(put("/uniteOrganisationnelles").contentType(MediaType.APPLICATION_JSON).content(asJsonString(uniteOrganisationnelleDto)))
		.andExpect(status().isNotFound());
		verify(uniteOrganisationnelleService, times(1)).update(any(UniteOrganisationnelleDTO.class));
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}
	
	@Test
	@DisplayName("Suppression d'un UniteOrganisationnelleDTO)")
	final void testDelete() throws Exception {
		when(uniteOrganisationnelleService.delete(any(UniteOrganisationnelleDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/uniteOrganisationnelles").contentType(MediaType.APPLICATION_JSON).content(asJsonString(uniteOrganisationnelle1)))
				.andExpect(status().isOk());

		verify(uniteOrganisationnelleService, times(1)).delete(any(UniteOrganisationnelleDTO.class));
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}
	
	@Test
	@DisplayName("Suppression d'un UniteOrganisationnelleDTO inexistant")
	final void testDeleteInvalidObject() throws Exception {
		when(uniteOrganisationnelleService.delete(any(UniteOrganisationnelleDTO.class))).thenReturn(false);
		UniteOrganisationnelleDTO uniteOrganisationnelleDTO3 = modelMapper.map(uniteOrganisationnelle2, UniteOrganisationnelleDTO.class);
		mockMvc.perform(delete("/uniteOrganisationnelles").contentType(MediaType.APPLICATION_JSON).content(asJsonString(uniteOrganisationnelleDTO3)))
		.andExpect(status().isNotFound());
		
		verify(uniteOrganisationnelleService, times(1)).delete(any(UniteOrganisationnelleDTO.class));
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}
	
	@Test
	@DisplayName("Test de la methode Recupération des unités organisationnelles supérieures selon l'identifiant fournit en paramètre")
	void testGetUniteOrganisationnellesSuperieures() throws Exception {
		
		when(uniteOrganisationnelleService.getUnitesOrganisationnellesSuperieures(1L)).thenReturn(Arrays.asList(uniteOrganisationnelle1,uniteOrganisationnelle2));
		mockMvc.perform(get("/uniteOrganisationnelles/superieures/{id}", 1)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(uniteOrganisationnelleService, times(1)).getUnitesOrganisationnellesSuperieures(1L);
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}
	
	@Test
	@DisplayName("Test de la methode Recupération des unités organisationnelles inférieures selon l'identifiant fournit en paramètre")
	void testGetUniteOrganisationnellesInferieures() throws Exception {
		
		when(uniteOrganisationnelleService.getUnitesOrganisationnellesInferieures(1L)).thenReturn(Arrays.asList(uniteOrganisationnelle1,uniteOrganisationnelle2));
		mockMvc.perform(get("/uniteOrganisationnelles/inferieures/{id}", 1)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(uniteOrganisationnelleService, times(1)).getUnitesOrganisationnellesInferieures(1L);
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}
	
	@Test
	@DisplayName("Test de la methode Recupération des unités organisationnelles superieur par niveau")
	void testGetUniteOrganisationnellesSupByNiveau() throws Exception {
		
		when(uniteOrganisationnelleService.getUnitesOrganisationnellesSuperieursByNiveau(1)).thenReturn(Arrays.asList(uniteOrganisationnelle1,uniteOrganisationnelle2));
		mockMvc.perform(get("/uniteOrganisationnelles/niveau/{id}", 1)).andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
		
		verify(uniteOrganisationnelleService, times(1)).getUnitesOrganisationnellesSuperieursByNiveau(1);
		verifyNoMoreInteractions(uniteOrganisationnelleService);
	}
}
