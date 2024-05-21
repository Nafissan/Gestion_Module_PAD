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
import sn.pad.pe.pss.dto.PrivilegeDTO;
import sn.pad.pe.pss.repositories.PrivilegeRepository;
import sn.pad.pe.pss.services.impl.PrivilegeServiceImpl;

@DisplayName("Test Service Privilege")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class PrivilegeServiceTest {

	@InjectMocks
	private PrivilegeServiceImpl privilegeServiceImpl;
	@Mock
	private PrivilegeRepository privilegeRepository;
	@Spy
	private ModelMapper modelMapper;

	private static PrivilegeDTO privilegeDto;
	private static PrivilegeDTO privilegeDtoVerify;
	private static List<PrivilegeDTO> privilegeDtos;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		privilegeDto = new PrivilegeDTO();
		privilegeDto.setNom("CREATE");
		privilegeDto.setDescription("Droit de créer un objet");

		privilegeDtos = Arrays.asList(privilegeDto);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet Privilege")
	@Test
	final void testGetPrivileges() {
		List<Privilege> privileges = privilegeDtos.stream()
				.map(privilege -> modelMapper.map(privilege, Privilege.class)).collect(Collectors.toList());
		when(privilegeRepository.findAll()).thenReturn(privileges);
		List<PrivilegeDTO> privilegeDTOsFromService = privilegeServiceImpl.getPrivileges();
		Assertions.assertEquals(privilegeDtos.size(), privilegeDTOsFromService.size());
		verify(privilegeRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet Privilege By ID: ID exist")
	@Test
	final void testGetPrivilegeByIdExist() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(privilegeRepository.findById(privilege.getNom())).thenReturn(Optional.of(privilege));
		PrivilegeDTO privilegeDTOFromService = privilegeServiceImpl.getPrivilegeById(privilege.getNom());
		Assertions.assertEquals(privilegeDto.getNom(), privilegeDTOFromService.getNom());
		verify(privilegeRepository, Mockito.times(1)).findById(privilege.getNom());
	}

	@Order(3)
	@DisplayName("Get Objet Privilege By ID: ID not exist")
	@Test
	final void testGetPrivilegeByIdNotExist() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(privilegeRepository.findById(privilege.getNom())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			privilegeDtoVerify = privilegeServiceImpl.getPrivilegeById(privilege.getNom());
		});
		Assertions.assertNull(privilegeDtoVerify);
		verify(privilegeRepository, Mockito.times(1)).findById(privilege.getNom());
	}

	@Order(4)
	@DisplayName("Create objet Privilege")
	@Test
	final void testCreate() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(modelMapper.map(privilegeDto, Privilege.class)).thenReturn(privilege);
		when(privilegeRepository.save(privilege)).thenReturn(privilege);
		when(modelMapper.map(privilege, PrivilegeDTO.class)).thenReturn(privilegeDto);
		PrivilegeDTO privilegeDTOFromService = privilegeServiceImpl.create(privilegeDto);
		Assertions.assertEquals(privilegeDto, privilegeDTOFromService);
		verify(privilegeRepository, Mockito.times(1)).save(privilege);
	}

	@Order(5)
	@DisplayName("Update Objet Privilege: Object exist")
	@Test
	final void testUpdateExist() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(modelMapper.map(privilegeDto, Privilege.class)).thenReturn(privilege);
		when(privilegeRepository.findById(privilege.getNom())).thenReturn(Optional.of(privilege));
		when(privilegeRepository.save(privilege)).thenReturn(privilege);
		updated = privilegeServiceImpl.update(privilegeDto);
		Assertions.assertTrue(updated);
		Mockito.verify(privilegeRepository).findById(privilege.getNom());
		Mockito.verify(privilegeRepository).save(privilege);
	}

	@Order(6)
	@DisplayName("Update Objet Privilege: Object not exist")
	@Test
	final void testUpdateNotExist() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(privilegeRepository.findById(privilege.getNom())).thenReturn(Optional.empty());
		updated = privilegeServiceImpl.update(privilegeDto);
		Assertions.assertFalse(updated);
		Mockito.verify(privilegeRepository, Mockito.times(1)).findById(privilege.getNom());
		Mockito.verify(privilegeRepository, Mockito.times(0)).save(privilege);
	}

	@Order(7)
	@DisplayName("Delete objet Privilege By ID: ID exist")
	@Test
	final void testDeleteExist() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(privilegeRepository.findById(privilege.getNom())).thenReturn(Optional.of(privilege));
		doNothing().when(privilegeRepository).delete(privilege);
		deleted = privilegeServiceImpl.delete(privilegeDto);
		Assertions.assertTrue(deleted);
		Mockito.verify(privilegeRepository).findById(privilege.getNom());
		Mockito.verify(privilegeRepository).delete(privilege);
	}

	@Order(8)
	@DisplayName("Delete objet Privilege By ID: ID not exist")
	@Test
	final void testDeleteNotExist() {
		Privilege privilege = modelMapper.map(privilegeDto, Privilege.class);
		when(privilegeRepository.findById(privilege.getNom())).thenReturn(Optional.empty());
		deleted = privilegeServiceImpl.delete(privilegeDto);
		Assertions.assertFalse(deleted);
		Mockito.verify(privilegeRepository, Mockito.times(1)).findById(privilege.getNom());
		Mockito.verify(privilegeRepository, Mockito.times(0)).delete(privilege);
	}

}
