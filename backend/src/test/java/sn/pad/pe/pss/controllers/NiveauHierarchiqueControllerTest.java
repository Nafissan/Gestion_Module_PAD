package sn.pad.pe.pss.controllers;

import static org.hamcrest.core.Is.is;
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
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.dto.NiveauHierarchiqueDTO;
import sn.pad.pe.pss.services.NiveauHierarchiqueService;

/**
 * 
 * @author adama.thiaw
 *
 */
@DisplayName("Test controlleur NiveauHierarchique")
@ExtendWith(MockitoExtension.class)
class NiveauHierarchiqueControllerTest {
	
	private MockMvc mockMvc;
	@Mock
	private NiveauHierarchiqueService niveauHierarchiqueService;
	@InjectMocks
	private NiveauHierarchiqueController niveauHierarchiqueController;

	private static NiveauHierarchiqueDTO nivHierarchiqueDTO1;
	private static NiveauHierarchiqueDTO nivHierarchiqueDTO2;
	private static NiveauHierarchiqueDTO nivHierarchiqueDTO3;
	private static List<NiveauHierarchiqueDTO> niveauxList;

	@BeforeAll
	public static void setUpBeforeClass() throws Exception {
		nivHierarchiqueDTO1 = new NiveauHierarchiqueDTO();
		nivHierarchiqueDTO1.setId(1L);
		nivHierarchiqueDTO1.setLibelle("Niveau1");
		nivHierarchiqueDTO1.setPosition(1);

		nivHierarchiqueDTO2 = new NiveauHierarchiqueDTO();
		nivHierarchiqueDTO2.setId(2L);
		nivHierarchiqueDTO2.setLibelle("Niveau2");
		nivHierarchiqueDTO2.setPosition(2);

		nivHierarchiqueDTO3 = new NiveauHierarchiqueDTO();
		nivHierarchiqueDTO3.setId(3L);
		nivHierarchiqueDTO3.setLibelle("Niveau3");
		nivHierarchiqueDTO3.setPosition(3);

		niveauxList = Arrays.asList(nivHierarchiqueDTO1, nivHierarchiqueDTO2, nivHierarchiqueDTO3);
	}

	@BeforeEach
	public void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(niveauHierarchiqueController)
				.build();
	}
	@Order(1)
	@DisplayName("Test de la méthode GetNiveauxHierarchiques (SUCCESS)")
	@Test
	public void testGetNiveauxHierarchiques() throws Exception {
		when(niveauHierarchiqueService.getNiveauxHierarchique()).thenReturn(niveauxList);
	    mockMvc.perform(get("/niveauxHierarchiques"))
	            .andExpect(status().isOk())
	            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
	            .andExpect(jsonPath("$[0].libelle", is("Niveau1")))
	            .andExpect(jsonPath("$[0].position", is(1)))
	            .andExpect(jsonPath("$[1].libelle", is("Niveau2")))
	            .andExpect(jsonPath("$[1].position", is(2)))
	            .andExpect(jsonPath("$[2].libelle", is("Niveau3")))
	            .andExpect(jsonPath("$[2].position", is(3)));
	    verify(niveauHierarchiqueService, Mockito.times(1)).getNiveauxHierarchique();
	    verifyNoMoreInteractions(niveauHierarchiqueService);
	}
    
	@Order(2)
	@DisplayName("Test de la méthode GetNiveauHierarchiqueById (SUCCESS)")
	@Test
	public void testGetNiveauHierarchiqueById() throws Exception {
        when(niveauHierarchiqueService.getNiveauHierarchiqueById(1L)).thenReturn(nivHierarchiqueDTO1);
        mockMvc.perform(get("/niveauxHierarchiques/{id}",1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.libelle", is("Niveau1")))
                .andExpect(jsonPath("$.position", is(1)));

        verify(niveauHierarchiqueService, times(1)).getNiveauHierarchiqueById(1L);
        verifyNoMoreInteractions(niveauHierarchiqueService);
	}
	
	@Order(3)
	@DisplayName("Test de la méthode create (SUCCESS)")
	@Test
	public void testCreate() throws Exception {
		NiveauHierarchiqueDTO niveauHierarchiqueDTO = new NiveauHierarchiqueDTO();
		when(niveauHierarchiqueService.create(niveauHierarchiqueDTO)).thenReturn(niveauHierarchiqueDTO);
        mockMvc.perform(
                post("/niveauxHierarchiques")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(niveauHierarchiqueDTO)))
                .andExpect(status().isCreated());
        verify(niveauHierarchiqueService, times(1)).create(niveauHierarchiqueDTO);
        verifyNoMoreInteractions(niveauHierarchiqueService);
	}
	
	@Order(4)
	@DisplayName("Test de la méthode update (SUCCESS)")
	@Test
	public void testUpdate() throws Exception {
		nivHierarchiqueDTO1.setLibelle("Niveau1 modifié");
		when(niveauHierarchiqueService.update(nivHierarchiqueDTO1)).thenReturn(true);

        mockMvc.perform(
                put("/niveauxHierarchiques")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(nivHierarchiqueDTO1)))
                .andExpect(status().isOk());
        verify(niveauHierarchiqueService, times(1)).update(nivHierarchiqueDTO1);
        verifyNoMoreInteractions(niveauHierarchiqueService);
	}
	
	@Order(4)
	@DisplayName("Test de la méthode delete (SUCCESS)")
	@Test
	public void testDelete() throws Exception {
		NiveauHierarchiqueDTO nivHierarchDeleted = new NiveauHierarchiqueDTO();
		when(niveauHierarchiqueService.delete(nivHierarchDeleted)).thenReturn(true);

        mockMvc.perform(
                delete("/niveauxHierarchiques")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(nivHierarchDeleted)))
                .andExpect(status().isOk());
        verify(niveauHierarchiqueService, times(1)).delete(nivHierarchDeleted);
        verifyNoMoreInteractions(niveauHierarchiqueService);
	}
	public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
	@Order(5)
	@DisplayName("Test de la méthode GetNiveauxHierarchiques (FAILED)")
	@Test
	public void testGetNiveauxHierarchiquesFailed() throws Exception {
		when(niveauHierarchiqueService.getNiveauHierarchiqueById(1L)).thenReturn(null);
	    mockMvc.perform(get("/niveauxHierarchiques/{id}",1L))
	            .andExpect(status().isNotFound());
	    verify(niveauHierarchiqueService, Mockito.times(1)).getNiveauHierarchiqueById(1L);
	    verifyNoMoreInteractions(niveauHierarchiqueService);
	}
	
	@Order(6)
	@DisplayName("Test de la méthode GetNiveauxHierarchiquesBy position (SUCCESS)")
	@Test
	public void testGetNiveauxHierarchiqueByPosition() throws Exception {
		when(niveauHierarchiqueService.getNiveauHierarchiqueByPosition(1)).thenReturn(nivHierarchiqueDTO1);
		mockMvc.perform(get("/niveauxHierarchiques/position/{position}",1))
		.andExpect(status().isOk());
		verify(niveauHierarchiqueService, Mockito.times(1)).getNiveauHierarchiqueByPosition(1);
		verifyNoMoreInteractions(niveauHierarchiqueService);
	}
	
	@Order(7)
	@DisplayName("Test de la méthode GetNiveauxHierarchiquesBy position (FAILED)")
	@Test
	public void testGetNiveauxHierarchiqueByPositionFailed() throws Exception {
		when(niveauHierarchiqueService.getNiveauHierarchiqueByPosition(1)).thenReturn(null);
		mockMvc.perform(get("/niveauxHierarchiques/position/{position}",1))
		.andExpect(status().isNotFound());
		verify(niveauHierarchiqueService, Mockito.times(1)).getNiveauHierarchiqueByPosition(1);
		verifyNoMoreInteractions(niveauHierarchiqueService);
	}
	
	@Order(8)
	@DisplayName("Test de la méthode create (FAILED)")
	@Test
	public void testCreateFailed() throws Exception {
		NiveauHierarchiqueDTO niveauHierarchiqueDTO = new NiveauHierarchiqueDTO();
		when(niveauHierarchiqueService.create(niveauHierarchiqueDTO)).thenReturn(null);
        mockMvc.perform(
                post("/niveauxHierarchiques")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(niveauHierarchiqueDTO)))
                .andExpect(status().isFound());
        verify(niveauHierarchiqueService, times(1)).create(niveauHierarchiqueDTO);
        verifyNoMoreInteractions(niveauHierarchiqueService);
	}
	
	@Order(9)
	@DisplayName("Test de la méthode update (FAILED)")
	@Test
	public void testUpdateFailed() throws Exception {
		nivHierarchiqueDTO1.setLibelle("Niveau1 modifié");
		when(niveauHierarchiqueService.update(nivHierarchiqueDTO1)).thenReturn(false);

        mockMvc.perform(
                put("/niveauxHierarchiques")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(nivHierarchiqueDTO1)))
                .andExpect(status().isNotFound());
        verify(niveauHierarchiqueService, times(1)).update(nivHierarchiqueDTO1);
        verifyNoMoreInteractions(niveauHierarchiqueService);
	}
	
	@Order(10)
	@DisplayName("Test de la méthode delete (FAILED)")
	@Test
	public void testDeleteFailed() throws Exception {
		NiveauHierarchiqueDTO nivHierarchDeleted = new NiveauHierarchiqueDTO();
		when(niveauHierarchiqueService.delete(nivHierarchDeleted)).thenReturn(false);

        mockMvc.perform(
                delete("/niveauxHierarchiques")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(nivHierarchDeleted)))
                .andExpect(status().isNotFound());
        verify(niveauHierarchiqueService, times(1)).delete(nivHierarchDeleted);
        verifyNoMoreInteractions(niveauHierarchiqueService);
	}
}
