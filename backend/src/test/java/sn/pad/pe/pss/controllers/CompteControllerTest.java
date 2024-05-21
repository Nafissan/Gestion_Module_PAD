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

import sn.pad.pe.pss.dto.CompteDTO;
import sn.pad.pe.pss.services.CompteService;

@ExtendWith(MockitoExtension.class)
public class CompteControllerTest {
	private static CompteDTO compteDto1;
	private static CompteDTO compteDto2;

	private MockMvc mockMvc;
	
	@Mock
	private CompteService compteService;
	
	@InjectMocks
	private CompteController compteController;
	
	@BeforeAll
	public static void setUpBeforeClass() throws Exception {
		compteDto1 = new CompteDTO("ndoye@gmail.com","1234",true);
		compteDto1.setId(1L);
        compteDto2 = new CompteDTO("seydou@gmail.com","1234",true);
	}

	@BeforeEach
	public void setUp() throws Exception {
        mockMvc = MockMvcBuilders
                .standaloneSetup(compteController)
                .build();
	}

	@Test
	public void testGetComptes() throws Exception{
		List<CompteDTO> comptes = Arrays.asList(compteDto1, compteDto2);
	    when(compteService.getComptes()).thenReturn(comptes);
	    mockMvc.perform(get("/comptes"))
	            .andExpect(status().isOk())
	            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
	            .andExpect(jsonPath("$[0].username", is(compteDto1.getUsername())))
	            .andExpect(jsonPath("$[1].username", is(compteDto2.getUsername())));
	    verify(compteService, Mockito.times(1)).getComptes();
	    verifyNoMoreInteractions(compteService);
	}

	@Test
	public void testGetCompteById() throws Exception {
        when(compteService.getCompteById(1L)).thenReturn(compteDto1);
        mockMvc.perform(get("/comptes/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.username", is(compteDto1.getUsername())));

        verify(compteService, times(1)).getCompteById(1L);
        verifyNoMoreInteractions(compteService);
	}

	@Test
	public void testCreate() throws Exception {
		when(compteService.create(compteDto1)).thenReturn(compteDto1);
        mockMvc.perform(
                post("/comptes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(compteDto1)))
                .andExpect(status().isCreated());
        verify(compteService, times(1)).create(compteDto1);
        verifyNoMoreInteractions(compteService);
	}

	@Test
	public void testUpdate() throws Exception {
		compteDto1.setUsername("ndoye.mbengue");
		when(compteService.update(compteDto1)).thenReturn(true);
        mockMvc.perform(
                put("/comptes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(compteDto1)))
                .andExpect(status().isOk());
        
		when(compteService.update(compteDto1)).thenReturn(false);
        mockMvc.perform(
                put("/comptes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(compteDto1)))
                .andExpect(status().isNotFound());
        
        verify(compteService, times(2)).update(compteDto1);
	}
	
	@Test
	public void testUpdateMany() throws Exception {
		compteDto1.setUsername("ndoye.mbengue");
		List<CompteDTO> comptes = Arrays.asList(compteDto1);
		when(compteService.updateMany(comptes)).thenReturn(true);
        mockMvc.perform(
                put("/comptes/many")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(comptes)))
                .andExpect(status().isOk());
        
		when(compteService.updateMany(comptes)).thenReturn(false);
        mockMvc.perform(
                put("/comptes/many")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(comptes)))
                .andExpect(status().isNotFound());
        
        verify(compteService, times(2)).updateMany(comptes);
	}
	
	@Test
	public void testUpdateCompteWithNewPAssword() throws Exception {
		final String OLD_PASSWORD = "oldpass"; 
		final String NEW_PASSWORD = "newpass"; 
		when(compteService.update(compteDto1, OLD_PASSWORD, NEW_PASSWORD)).thenReturn(true);
        mockMvc.perform(
                put("/comptes/{oldPassword}/{newPassword}",OLD_PASSWORD,NEW_PASSWORD)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(compteDto1)))
                .andExpect(status().isOk());
        
		when(compteService.update(compteDto1, OLD_PASSWORD, NEW_PASSWORD)).thenReturn(false);
        mockMvc.perform(
        		put("/comptes/{oldPassword}/{newPassword}",OLD_PASSWORD,NEW_PASSWORD)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(compteDto1)))
                .andExpect(status().isNotFound());
        
        verify(compteService, times(2)).update(compteDto1, OLD_PASSWORD, NEW_PASSWORD);
	}
	@Test
	public void testDelete() throws Exception {
		CompteDTO compteToDelete = new CompteDTO();
		
		when(compteService.delete(compteToDelete)).thenReturn(true);
        mockMvc.perform(
                delete("/comptes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(compteToDelete)))
                .andExpect(status().isOk());
        
        when(compteService.delete(compteToDelete)).thenReturn(false);
        mockMvc.perform(
        		delete("/comptes")
        		.contentType(MediaType.APPLICATION_JSON)
        		.content(asJsonString(compteToDelete)))
        .andExpect(status().isNotFound());
        verify(compteService, times(2)).delete(compteToDelete);
        verifyNoMoreInteractions(compteService);
	}
	
	@Test
	public void testGetCompteByUsername() throws Exception {
		final String USERNAME = "Fall";
		CompteDTO compteDto3 = new CompteDTO(USERNAME,"1234",true);
        when(compteService.getCompteByUsername(USERNAME)).thenReturn(compteDto3);
        mockMvc.perform(get("/comptes/username/"+USERNAME))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.username", is(USERNAME)));

        verify(compteService, times(1)).getCompteByUsername(USERNAME);
        verifyNoMoreInteractions(compteService);
	}

	 /*
     * converts a Java object into JSON representation
     */
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
}
