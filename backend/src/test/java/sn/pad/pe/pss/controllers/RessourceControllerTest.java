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
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.dto.RessourceDTO;
import sn.pad.pe.pss.services.RessourceService;

@DisplayName("Test Classe RessourcesController")
@ExtendWith(MockitoExtension.class)
class RessourceControllerTest {

	private MockMvc mockMvc;

	@Mock
	private RessourceService ressourceService;

	@InjectMocks
	private RessourceController ressourceController;

	private static RessourceDTO ressource1;
	private static RessourceDTO ressource2;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		ressource1 = new RessourceDTO();
		ressource1.setName("Ressource 1");
		ressource1.setNomRessource("Name 1");
		
		ressource2 = new RessourceDTO();
		ressource2.setNomRessource("Name 2");
		ressource2.setNomRessource("Name 2");

	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(ressourceController)
				.build();
	}

	@Test
	void testGetRessources() throws Exception {
		List<RessourceDTO> ressources = Arrays.asList(ressource1, ressource2);
		when(ressourceService.getRessources()).thenReturn(ressources);
		mockMvc.perform(get("/ressources")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].nomRessource", is("Name 1")))
				.andExpect(jsonPath("$[1].nomRessource", is("Name 2")));
		verify(ressourceService, times(1)).getRessources();
		verifyNoMoreInteractions(ressourceService);
	}

	@Test
	void testGetRessourceById() throws Exception {
		when(ressourceService.getRessourceById("Name 1")).thenReturn(ressource1);
		mockMvc.perform(get("/ressources/{name}", "Name 1")).andExpect(status().isFound())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.nomRessource", is("Name 1")));
		verify(ressourceService, times(1)).getRessourceById("Name 1");
		verifyNoMoreInteractions(ressourceService);
	}

	@Test
	void testCreate() throws Exception {
		RessourceDTO ressourceDTO = new RessourceDTO();
		ressourceDTO.setNomRessource("Name 1");
		ressourceDTO.setNomRessource("Avoir le droit de supprimer un objet");
		when(ressourceService.create(any(RessourceDTO.class))).thenReturn(ressourceDTO);
		mockMvc.perform(post("/ressources").contentType(MediaType.APPLICATION_JSON).content(asJsonString(ressourceDTO)))
				.andExpect(status().isCreated());
		verify(ressourceService, times(1)).create(any(RessourceDTO.class));
		verifyNoMoreInteractions(ressourceService);
	}

	@Test
	void testUpdate() throws Exception {
		ressource1.setNomRessource("Name 45");
		when(ressourceService.update(any(RessourceDTO.class))).thenReturn(true);
		mockMvc.perform(put("/ressources").contentType(MediaType.APPLICATION_JSON).content(asJsonString(ressource1)))
				.andExpect(status().isOk());
		
		when(ressourceService.update(any(RessourceDTO.class))).thenReturn(false);
		mockMvc.perform(put("/ressources").contentType(MediaType.APPLICATION_JSON).content(asJsonString(ressource1)))
				.andExpect(status().isNotFound());
		
		verify(ressourceService, times(2)).update(any(RessourceDTO.class));
		verifyNoMoreInteractions(ressourceService);
	}

	@Test
	void testDelete() throws Exception {
		when(ressourceService.delete(any(RessourceDTO.class))).thenReturn(true);
		mockMvc.perform(
				delete("/ressources").contentType(MediaType.APPLICATION_JSON).content(asJsonString(ressource1)))
				.andExpect(status().isOk());
		
		when(ressourceService.delete(any(RessourceDTO.class))).thenReturn(false);
		mockMvc.perform(
				delete("/ressources").contentType(MediaType.APPLICATION_JSON).content(asJsonString(ressource1)))
		.andExpect(status().isNotFound());
		
		verify(ressourceService, times(2)).delete(any(RessourceDTO.class));
		verifyNoMoreInteractions(ressourceService);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
