package sn.pad.pe.pss.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Compte;
import sn.pad.pe.pss.dto.CompteDTO;
import sn.pad.pe.pss.repositories.CompteRepository;
import sn.pad.pe.pss.services.impl.CompteServiceImpl;

@DisplayName("Test Service CompteService")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class CompteServiceTest {

	@Mock
	private CompteRepository compteRepository;
	@InjectMocks
	private CompteServiceImpl compteServiceImpl;
	@Spy
	private ModelMapper modelMapper;
	@Mock
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	private static Compte compte;
	private static Compte compte2;
	private static Agent agent;
	private static CompteDTO compteDTO;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		compte = new Compte();
		compte.setId(1L);
		compte.setUsername("ndoye@gmail.com");
		compte.setPassword("1234");
		compte.setEnabled(true);

		compte2 = new Compte();
		compte2.setId(2L);
		compte2.setUsername("ndoye@gmail.com");
		compte2.setPassword("1234");
		compte2.setEnabled(true);

		agent = new Agent();
		agent.setId(1L);
		agent.setMatricule("607043");
		agent.setEmail("ada@gmail.com");
		agent.setPrenom("MS");
		agent.setNom("DIALLO");
		compte2.setAgent(agent);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet Compte")
	@Test
	final void testGetComptes() {
		when(compteRepository.findAll()).thenReturn(Arrays.asList(compte));
		List<CompteDTO> comptesDTO = compteServiceImpl.getComptes();
		assertEquals(comptesDTO.size(), Arrays.asList(compte).size());
		verify(compteRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet Compte by username: username exist")
	@Test
	final void getCompteByUsernameExist() {
		when(compteRepository.findCompteByUsername(compte.getUsername())).thenReturn(compte);
		CompteDTO compteGetDTO = compteServiceImpl.getCompteByUsername(compte.getUsername());
		assertEquals(compteGetDTO, modelMapper.map(compte, CompteDTO.class));
		verify(compteRepository, Mockito.times(1)).findCompteByUsername(compte.getUsername());
	}

	@Order(3)
	@DisplayName("Get Objet Compte by username: username not exist")
	@Test
	final void getCompteByUsernameNotExist() {
		when(compteRepository.findCompteByUsername(compte.getUsername())).thenReturn(null);

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			compteDTO = compteServiceImpl.getCompteByUsername(compte.getUsername());
		});
		Assertions.assertNull(compteDTO);
		verify(compteRepository, Mockito.times(1)).findCompteByUsername(compte.getUsername());
	}

	@Order(4)
	@DisplayName("Get Objet Compte by ID: ID exist")
	@Test
	final void testGetCompteByIdExist() {
		when(compteRepository.findById(compte.getId())).thenReturn(Optional.of(compte));
		CompteDTO compteGetDTO = compteServiceImpl.getCompteById(1L);
		assertEquals(compteGetDTO, modelMapper.map(compte, CompteDTO.class));
		verify(compteRepository, Mockito.times(1)).findById(compte.getId());
	}

	@Order(5)
	@DisplayName("Get Objet Compte by ID: ID not exist")
	@Test
	final void testGetCompteByIdNotExist() {
		when(compteRepository.findById(compte.getId())).thenReturn(Optional.empty());

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			compteDTO = compteServiceImpl.getCompteById(compte.getId());
		});
		Assertions.assertNull(compteDTO);
		verify(compteRepository, Mockito.times(1)).findById(compte.getId());
	}

	@Order(6)
	@DisplayName("Création de l'objet Compte: Compte déja utilsé")
	@Test
	final void testCreateExist() {
		when(compteRepository.findCompteByUsername(compte2.getUsername())).thenReturn(compte2);
		CompteDTO compteDTOFromMapper = modelMapper.map(compte2, CompteDTO.class);
		Assertions.assertThrows(RuntimeException.class, () -> {
			compteDTO = compteServiceImpl.create(compteDTOFromMapper);
		});
		assertNull(compteDTO);
		verify(compteRepository, Mockito.times(0)).save(compte2);
	}

	@Order(7)
	@DisplayName("Création de l'objet Compte: Compte non utilsé")
	@Test
	final void testCreateExistAndPasswordNotExist() {
		when(compteRepository.findCompteByUsername(compte2.getUsername())).thenReturn(null);
		CompteDTO compteDTOFromMapper = modelMapper.map(compte2, CompteDTO.class);
		when(compteRepository.save(any(Compte.class))).thenReturn(compte2);

		compteDTO = compteServiceImpl.create(compteDTOFromMapper);
		assertNotNull(compteDTO);
		verify(compteRepository, Mockito.times(0)).save(compte2);
	}

	@Order(8)
	@DisplayName("Update Objet Compte: Object exist")
	@Test
	final void testUpdateExist() {
		compte.setPassword("12345");
		when(compteRepository.findById(1L)).thenReturn(Optional.of(compte));
		updated = compteServiceImpl.update(modelMapper.map(compte, CompteDTO.class));
		assertTrue(updated);
		assertEquals("12345", compte.getPassword());
		verify(compteRepository, Mockito.times(1)).findById(1L);
		verify(compteRepository, Mockito.times(1)).save(compte);
	}

	@Order(9)
	@DisplayName("Update Objet Compte: Object not exist")
	@Test
	final void testUpdateNotExist() {
		CompteDTO compteDTOFromMapper = modelMapper.map(compte, CompteDTO.class);
		when(compteRepository.findById(compte.getId())).thenReturn(Optional.empty());
		updated = compteServiceImpl.update(compteDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(compteRepository, Mockito.times(1)).findById(compte.getId());
		Mockito.verify(compteRepository, Mockito.times(0)).save(compte);
	}

	@Order(10)
	@DisplayName("Update liste Objet Compte: Object exist")
	@Test
	final void testUpdateManyExist() {
		List<CompteDTO> compteDTOsFromMapper = Arrays.asList(compte).stream()
				.map(c -> modelMapper.map(c, CompteDTO.class)).collect(Collectors.toList());

		when(compteRepository.saveAll(Arrays.asList(compte))).thenReturn(Arrays.asList(compte));
		updated = compteServiceImpl.updateMany(compteDTOsFromMapper);

		assertTrue(updated);
		verify(compteRepository, Mockito.times(1)).saveAll(Arrays.asList(compte));
	}

	@SuppressWarnings("unchecked")
	@Order(11)
	@DisplayName("Update liste Objet Compte: Object not exist")
	@Test
	final void testUpdateManyNotExist() {
		updated = compteServiceImpl.updateMany(Collections.EMPTY_LIST);
		assertFalse(updated);
		verify(compteRepository, Mockito.times(0)).saveAll(Collections.EMPTY_LIST);
	}

	@Order(12)
	@DisplayName("Update Objet Compte: Credentials exist")
	@Test
	final void testUpdateCredentialsExist() {
		CompteDTO compteDTOFromMapper = modelMapper.map(compte, CompteDTO.class);
		String pwd = "1234";
		when(compteRepository.findById(compte.getId())).thenReturn(Optional.of(compte));
		compteDTOFromMapper.setPassword(pwd);
		when(bCryptPasswordEncoder.matches(any(String.class), any(String.class))).thenReturn(true);
		when(compteRepository.save(any(Compte.class))).thenReturn(compte);

		updated = compteServiceImpl.update(compteDTOFromMapper, "1234", "passer");
		assertTrue(updated);
		verify(compteRepository, Mockito.times(1)).findById(compte.getId());
		verify(compteRepository, Mockito.times(1)).save(any(Compte.class));
	}

	@Order(13)
	@DisplayName("Update Objet Compte: Credentials not exist")
	@Test
	final void testUpdateCredentialsNotExist() {
		CompteDTO compteDTOFromMapper = modelMapper.map(compte2, CompteDTO.class);
		when(compteRepository.findById(compte2.getId())).thenReturn(Optional.of(compte2));
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			updated = compteServiceImpl.update(compteDTOFromMapper, "1234", "passer");
		});
		assertTrue(updated);
		verify(compteRepository, Mockito.times(1)).findById(compte2.getId());
	}

	@Order(14)
	@DisplayName("Delete objet Compte by ID: ID exist ")
	@Test
	final void testDeleteExist() {
		when(compteRepository.findById(1L)).thenReturn(Optional.of(compte));
		Boolean deleted = compteServiceImpl.delete(modelMapper.map(compte, CompteDTO.class));
		assertTrue(deleted);
		verify(compteRepository, Mockito.times(1)).findById(1L);
		verify(compteRepository, Mockito.times(1)).delete(compte);
	}

	@Order(15)
	@DisplayName("Delete objet Compte by ID: ID not exist ")
	@Test
	final void testDeleteNotExist() {
		CompteDTO compteDTOFromMapper = modelMapper.map(compte, CompteDTO.class);
		when(compteRepository.findById(compte.getId())).thenReturn(Optional.empty());
		deleted = compteServiceImpl.delete(compteDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(compteRepository, Mockito.times(1)).findById(compte.getId());
		Mockito.verify(compteRepository, Mockito.times(0)).delete(compte);
	}

}
