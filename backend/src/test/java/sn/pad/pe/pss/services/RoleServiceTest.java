package sn.pad.pe.pss.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Privilege;
import sn.pad.pe.pss.bo.Role;
import sn.pad.pe.pss.dto.PrivilegeDTO;
import sn.pad.pe.pss.dto.RoleDTO;
import sn.pad.pe.pss.repositories.PrivilegeRepository;
import sn.pad.pe.pss.repositories.RoleRepository;
import sn.pad.pe.pss.services.impl.RoleServiceImpl;

@DisplayName("Test Service Role")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class RoleServiceTest {

	@InjectMocks
	private RoleServiceImpl roleServiceImpl;
	@Mock
	private RoleRepository roleRepository;
	@Mock
	private PrivilegeRepository privilegeRepository;
	@Spy
	private ModelMapper modelMapper;
	private static boolean updated;
	private static boolean deleted;

	private static RoleDTO roleDTO;
	private static RoleDTO roleDTOVerify;
	private static List<RoleDTO> roleDTOs;
	
	private static PrivilegeDTO privilegeDto;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		roleDTO = new RoleDTO();
		roleDTO.setId(1L);
		roleDTO.setNomRole("RESP_CONGE");
		roleDTO.setDescription("Responsable Conge");

		roleDTOs = Arrays.asList(roleDTO);
		
		privilegeDto = new PrivilegeDTO();
		privilegeDto.setNom("CREATE");
		privilegeDto.setDescription("Droit de créer un objet");

	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet Role")
	@Test
	final void testGetRoles() {
		List<Role> roles = roleDTOs.stream().map(role -> modelMapper.map(role, Role.class))
				.collect(Collectors.toList());
		when(roleRepository.findAll()).thenReturn(roles);
		List<RoleDTO> roleDTOsFromService = roleServiceImpl.getRoles();
		Assertions.assertEquals(roleDTOs.size(), roleDTOsFromService.size());
		verify(roleRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet Role By ID: ID exist")
	@Test
	final void testGetRoleByIdExist() {
		Role role = modelMapper.map(roleDTO, Role.class);
		when(roleRepository.findById(role.getId())).thenReturn(Optional.of(role));
		RoleDTO roleDTOFromService = roleServiceImpl.getRoleById(role.getId());
		Assertions.assertEquals(roleDTO.getId(), roleDTOFromService.getId());
		verify(roleRepository, Mockito.times(1)).findById(role.getId());
	}

	@Order(3)
	@DisplayName("Get Objet Role By ID: ID not exist")
	@Test
	final void testGetRoleByIdNotExist() {
		Role role = modelMapper.map(roleDTO, Role.class);
		when(roleRepository.findById(role.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			roleDTOVerify = roleServiceImpl.getRoleById(roleDTO.getId());
		});
		Assertions.assertNull(roleDTOVerify);
		verify(roleRepository, Mockito.times(1)).findById(role.getId());
	}

	@Order(4)
	@DisplayName("Create objet Role")
	@Test
	final void testCreateRoleDTO() {
		Role role = modelMapper.map(roleDTO, Role.class);
		when(modelMapper.map(roleDTO, Role.class)).thenReturn(role);
		when(roleRepository.save(role)).thenReturn(role);
		when(modelMapper.map(role, RoleDTO.class)).thenReturn(roleDTO);
		RoleDTO roleDTOFromService = roleServiceImpl.create(roleDTO);
		Assertions.assertEquals(roleDTO, roleDTOFromService);
		verify(roleRepository, Mockito.times(1)).save(role);
	}

	@Order(5)
	@DisplayName("Create Liste objet Role")
	@Test
	final void testCreateRoleDTOListOfString() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(privilegeRepository.findPrivilegeByNomLike(privilege.getNom())).thenReturn(privilege);
		when(modelMapper.map(privilege, PrivilegeDTO.class)).thenReturn(privilegeDto);
		
		Role role = modelMapper.map(roleDTO, Role.class);
		when(modelMapper.map(roleDTO, Role.class)).thenReturn(role);
		when(roleRepository.save(role)).thenReturn(role);
		when(modelMapper.map(role, RoleDTO.class)).thenReturn(roleDTO);
		RoleDTO roleDTOFromService = roleServiceImpl.create(roleDTO, Arrays.asList(privilegeDto.getNom()));
		Assertions.assertEquals(roleDTO, roleDTOFromService);
		verify(roleRepository, Mockito.times(1)).save(role);
		verify(privilegeRepository, Mockito.times(1)).findPrivilegeByNomLike(privilege.getNom());
	}
	
	@Order(6)
	@DisplayName("Update Objet Role: Object exist")
	@Test
	final void testUpdateRoleDTOExist() {
		Role role = modelMapper.map(roleDTO, Role.class);
		when(modelMapper.map(roleDTO, Role.class)).thenReturn(role);
		when(roleRepository.findById(role.getId())).thenReturn(Optional.of(role));
		when(roleRepository.save(role)).thenReturn(role);
		updated = roleServiceImpl.update(roleDTO);
		Assertions.assertTrue(updated);
		Mockito.verify(roleRepository).findById(role.getId());
		Mockito.verify(roleRepository).save(role);
	}

	@Order(7)
	@DisplayName("Update Objet Role: Object not exist")
	@Test
	final void testUpdateRoleDTONotExist() {
		Role role = modelMapper.map(roleDTO, Role.class);
		when(roleRepository.findById(role.getId())).thenReturn(Optional.empty());
		updated = roleServiceImpl.update(roleDTO);
		Assertions.assertFalse(updated);
		Mockito.verify(roleRepository, Mockito.times(1)).findById(role.getId());
		Mockito.verify(roleRepository, Mockito.times(0)).save(role);
	}
	@Order(8)
	@DisplayName("Update Liste Objet Role: Object exist")
	@Test
	final void testUpdateRoleDTOListOfStringExist() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(privilegeRepository.findPrivilegeByNomLike(privilege.getNom())).thenReturn(privilege);
		when(modelMapper.map(privilege, PrivilegeDTO.class)).thenReturn(privilegeDto);
		
		Role role = modelMapper.map(roleDTO, Role.class);
		when(modelMapper.map(roleDTO, Role.class)).thenReturn(role);
		when(roleRepository.save(role)).thenReturn(role);
		when(modelMapper.map(role, RoleDTO.class)).thenReturn(roleDTO);
		RoleDTO roleDTOFromService = roleServiceImpl.update(roleDTO, Arrays.asList(privilegeDto.getNom()));
		Assertions.assertEquals(roleDTO, roleDTOFromService);
		verify(roleRepository, Mockito.times(1)).save(role);
		verify(privilegeRepository, Mockito.times(1)).findPrivilegeByNomLike(privilege.getNom());
	}
	@Order(8)
	@DisplayName("Update Liste Objet Role: Object not exist")
	@Test
	final void testUpdateRoleDTOListOfStringNotExist() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(privilegeRepository.findPrivilegeByNomLike(privilege.getNom())).thenReturn(privilege);
		when(modelMapper.map(privilege, PrivilegeDTO.class)).thenReturn(privilegeDto);
		
		Role role = modelMapper.map(roleDTO, Role.class);
		when(modelMapper.map(roleDTO, Role.class)).thenReturn(role);
		when(roleRepository.save(role)).thenReturn(null);
		when(modelMapper.map(role, RoleDTO.class)).thenReturn(roleDTO);
		roleDTOVerify = roleServiceImpl.update(roleDTO, Arrays.asList(privilegeDto.getNom()));
		Assertions.assertNull(roleDTOVerify);
		verify(roleRepository, Mockito.times(1)).save(role);
		verify(privilegeRepository, Mockito.times(1)).findPrivilegeByNomLike(privilege.getNom());
	}
	@Order(9)
	@DisplayName("Delete objet Role By ID: ID exist")
	@Test
	final void testDeleteExist() {
		Role role = modelMapper.map(roleDTO, Role.class);
		when(roleRepository.findById(role.getId())).thenReturn(Optional.of(role));
		doNothing().when(roleRepository).delete(role);
		deleted = roleServiceImpl.delete(roleDTO);
		Assertions.assertTrue(deleted);
		Mockito.verify(roleRepository).findById(role.getId());
		Mockito.verify(roleRepository).delete(role);;
	}

	@Order(10)
	@DisplayName("Delete objet Role By ID: ID not exist")
	@Test
	final void testDeleteNotExist() {
		Role role = modelMapper.map(roleDTO, Role.class);
		when(roleRepository.findById(role.getId())).thenReturn(Optional.empty());
		deleted = roleServiceImpl.delete(roleDTO);
		Assertions.assertFalse(deleted);
		Mockito.verify(roleRepository, Mockito.times(1)).findById(role.getId());
		Mockito.verify(roleRepository, Mockito.times(0)).delete(role);
	}

}
