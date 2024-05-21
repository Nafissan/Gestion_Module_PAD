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

import sn.pad.pe.pss.dto.RoleDTO;
import sn.pad.pe.pss.services.RoleService;

@DisplayName("Test Classe RoleController")
@ExtendWith(MockitoExtension.class)
class RoleControllerTest {

	private MockMvc mockMvc;

	@Mock
	private RoleService roleService;
	@InjectMocks
	private RoleController roleController;

	private static RoleDTO role1;
	private static RoleDTO role2;

	private static List<String> privileges;


	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		privileges = Arrays.asList("CREATE", "UPDATE");
		
		role1 = new RoleDTO();
		role1.setId(1L);;
		role1.setNomRole("ADMIN1");

		role2 = new RoleDTO();
		role2.setId(1L);
		role2.setNomRole("USER1");
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(roleController)
				.build();
	}

	@DisplayName("Test de la methode get All  Roles")
	@Test
	void testGetRoles() throws Exception {

		List<RoleDTO> roles = Arrays.asList(role1, role2);
		when(roleService.getRoles()).thenReturn(roles);
		mockMvc.perform(get("/roles")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].nomRole", is("ADMIN1")))
				.andExpect(jsonPath("$[1].nomRole", is("USER1")));
		verify(roleService, times(1)).getRoles();
		verifyNoMoreInteractions(roleService);
	}

	@DisplayName("Test de la methode get RoleDTO By id")
	@Test
	void testGetRoleById() throws Exception {

		when(roleService.getRoleById(1L)).thenReturn(role1);
		mockMvc.perform(get("/roles/{name}", 1L)).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
		        .andExpect(jsonPath("$.nomRole", is("ADMIN1")));
		verify(roleService, times(1)).getRoleById(1L);
		verifyNoMoreInteractions(roleService);
	}

	@DisplayName("Test de la methode Create  RoleDTO")
	@Test
	void testCreate() throws Exception {

		RoleDTO roleDTO = new RoleDTO();
		roleDTO.setId(1L);;
		roleDTO.setNomRole("ADMIN1");
		when(roleService.create(any(RoleDTO.class))).thenReturn(roleDTO);
		mockMvc.perform(post("/roles")
				.contentType(MediaType.APPLICATION_JSON).content(asJsonString(roleDTO)))
				.andExpect(status().isCreated());
		verify(roleService, times(1)).create(any(RoleDTO.class));
	}


	@DisplayName("Test de la methode Update  RoleDTO")
	@Test
	void testUpdate() throws Exception {
		RoleDTO roleDto = new RoleDTO();
		roleDto.setId(1L);
		roleDto.setNomRole("ADMIN1");

		when(roleService.update(any(RoleDTO.class))).thenReturn(true);
		mockMvc.perform(put("/roles")
				.contentType(MediaType.APPLICATION_JSON).content(asJsonString(roleDto)))
				.andExpect(status().isOk());
		
		when(roleService.update(any(RoleDTO.class))).thenReturn(false);
		mockMvc.perform(put("/roles")
				.contentType(MediaType.APPLICATION_JSON).content(asJsonString(roleDto)))
		.andExpect(status().isNotFound());
		
		verify(roleService, times(2)).update(any(RoleDTO.class));
		verifyNoMoreInteractions(roleService);
	}

	@DisplayName("Test de la methode Delete  RoleDTO")
	@Test
	final void testDelete() throws Exception {

		when(roleService.delete(any(RoleDTO.class))).thenReturn(true);
		mockMvc.perform(delete("/roles")
		.contentType(MediaType.APPLICATION_JSON).content(asJsonString(role1)))
		.andExpect(status().isOk());
		
		when(roleService.delete(any(RoleDTO.class))).thenReturn(false);
		mockMvc.perform(delete("/roles")
				.contentType(MediaType.APPLICATION_JSON).content(asJsonString(role1)))
		.andExpect(status().isNotFound());
		
		verify(roleService,times(2)).delete(any(RoleDTO.class));
		verifyNoMoreInteractions(roleService);	
	}

	@DisplayName("Test de la methode Create avec une liste de privilèges")
	@Test
	void testCreateRoleWithPrivileges() throws Exception {

		RoleDTO roleDTO = new RoleDTO();
		roleDTO.setId(1L);;
		roleDTO.setNomRole("ADMIN1");
		
		when(roleService.create(any(RoleDTO.class), any(List.class))).thenReturn(roleDTO);
		mockMvc.perform(post("/roles/{privileges}", privileges)
				.contentType(MediaType.APPLICATION_JSON).content(asJsonString(roleDTO)))
				.andExpect(status().isCreated());
		verify(roleService, times(1)).create(any(RoleDTO.class), any(List.class));
	}
	
	@DisplayName("Test de la methode Modification avec une liste de privilèges")
	@Test
	void testUpdateRoleWithPrivileges() throws Exception {
		
		RoleDTO roleDTO = new RoleDTO();
		roleDTO.setId(1L);;
		roleDTO.setNomRole("ADMIN1");
		
		when(roleService.update(any(RoleDTO.class), any(List.class))).thenReturn(roleDTO);
		mockMvc.perform(put("/roles/{privileges}", privileges)
				.contentType(MediaType.APPLICATION_JSON).content(asJsonString(roleDTO)))
		.andExpect(status().isOk());
		verify(roleService, times(1)).update(any(RoleDTO.class), any(List.class));
	}
	
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
