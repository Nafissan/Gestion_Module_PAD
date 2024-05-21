package sn.pad.pe.pss.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
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
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Attestation;
import sn.pad.pe.pss.bo.EtapeAttestation;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.EtapeAttestationDTO;
import sn.pad.pe.pss.repositories.AttestationRepository;
import sn.pad.pe.pss.repositories.EtapeAttestationRepository;
import sn.pad.pe.pss.services.impl.EtapeAttestationServiceImpl;

@DisplayName("Test Service EtapeAttestation")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class EtapeAttestationServiceTest {

	@Mock
	private AttestationRepository attestationRepository;
	@Mock
	private EtapeAttestationRepository etapeAttestationRepository;
	@InjectMocks
	private EtapeAttestationServiceImpl etapeAttestationServiceImpl;
	private static EtapeAttestation etapeAttestation;
	private static List<EtapeAttestation> etapeAttestations = new ArrayList<>();
	private static EtapeAttestationDTO etapeAttestationDTO;
	private static Attestation attestation;
	@Spy
	private ModelMapper modelMapper;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		Agent agent = new Agent();
		agent.setId(1L);
		agent.setMatricule("607043");
		agent.setEmail("ada@gmail.com");
		agent.setPrenom("MS");
		UniteOrganisationnelle unite = new UniteOrganisationnelle();
		unite.setId(1L);
		attestation = new Attestation();
		attestation.setId(1L);
		attestation.setCommentaire("demande1");
		attestation.setAgent(agent);
		attestation.setUniteOrganisationnelle(unite);

		etapeAttestation = new EtapeAttestation();
		etapeAttestation.setId(1L);
		etapeAttestation.setAttestation(attestation);
		etapeAttestations.add(etapeAttestation);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet EtapeAttestation")
	@Test
	final void testGetEtapeAttestations() {
		List<EtapeAttestationDTO> etapeAttestationDTOsFromMapper = etapeAttestations.stream()
				.map(etapeAttestation -> modelMapper.map(etapeAttestation, EtapeAttestationDTO.class))
				.collect(Collectors.toList());
		when(etapeAttestationRepository.findAll()).thenReturn(etapeAttestations);
		List<EtapeAttestationDTO> etapeAttestationDTOsFromService = etapeAttestationServiceImpl.getEtapeAttestations();
		Assertions.assertEquals(etapeAttestationDTOsFromMapper.size(), etapeAttestationDTOsFromService.size());
		verify(etapeAttestationRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet EtapeAttestation by ID: ID exist")
	@Test
	final void testGetEtapeAttestationByIdExist() {
		EtapeAttestationDTO etapeAttestationDTOFromMapper = modelMapper.map(etapeAttestation,
				EtapeAttestationDTO.class);
		when(etapeAttestationRepository.findById(etapeAttestation.getId())).thenReturn(Optional.of(etapeAttestation));
		EtapeAttestationDTO etapeAttestationDTOFromService = etapeAttestationServiceImpl
				.getEtapeAttestationById(etapeAttestation.getId());
		Assertions.assertEquals(etapeAttestationDTOFromMapper.getId(), etapeAttestationDTOFromService.getId());
		verify(etapeAttestationRepository, Mockito.times(1)).findById(etapeAttestation.getId());
	}

	@Order(3)
	@DisplayName("Get Objet EtapeAttestation by ID: ID not exist")
	@Test
	final void testGetEtapeAttestationByIdNotExist() {
		when(etapeAttestationRepository.findById(etapeAttestation.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			etapeAttestationDTO = etapeAttestationServiceImpl.getEtapeAttestationById(etapeAttestation.getId());
		});
		Assertions.assertNull(etapeAttestationDTO);
		verify(etapeAttestationRepository, Mockito.times(1)).findById(etapeAttestation.getId());
	}

	@Order(4)
	@DisplayName("Create objet EtapeAttestation")
	@Test
	final void testCreate() {
		EtapeAttestationDTO etapeAttestationDTOFromMapper = modelMapper.map(etapeAttestation,
				EtapeAttestationDTO.class);
		when(modelMapper.map(etapeAttestationDTOFromMapper, EtapeAttestation.class)).thenReturn(etapeAttestation);
		when(etapeAttestationRepository.save(etapeAttestation)).thenReturn(etapeAttestation);
		when(modelMapper.map(etapeAttestation, EtapeAttestationDTO.class)).thenReturn(etapeAttestationDTOFromMapper);
		EtapeAttestationDTO etapeAttestationDTOFromService = etapeAttestationServiceImpl
				.create(etapeAttestationDTOFromMapper);
		Assertions.assertEquals(etapeAttestationDTOFromMapper, etapeAttestationDTOFromService);
		verify(etapeAttestationRepository, Mockito.times(1)).save(etapeAttestation);
	}

	@Order(5)
	@DisplayName("Create liste objet EtapeAttestation")
	@Test
	final void testCreateMany() {
		EtapeAttestationDTO etapeAttestationDTOFromMapper = modelMapper.map(etapeAttestation,
				EtapeAttestationDTO.class);
		when(modelMapper.map(etapeAttestationDTOFromMapper, EtapeAttestation.class)).thenReturn(etapeAttestation);
		
		List<EtapeAttestation> attestationsFromRepository = new ArrayList<>();
		attestationsFromRepository.add(etapeAttestation);
		List<EtapeAttestationDTO> attestationsFromDTO = new ArrayList<>();
		attestationsFromDTO.add(etapeAttestationDTOFromMapper);
		
		when(etapeAttestationRepository.saveAll(attestationsFromRepository)).thenReturn(attestationsFromRepository);
		EtapeAttestationDTO etapeAttestationDTOsFromService = etapeAttestationServiceImpl
				.createMany(attestationsFromDTO);
		Assertions.assertNotNull(etapeAttestationDTOsFromService);
		verify(etapeAttestationRepository, Mockito.times(1)).saveAll(attestationsFromRepository);
	}

	@Order(6)
	@DisplayName("Update Objet EtapeAttestation: Object exist")
	@Test
	final void testUpdateExist() {
		EtapeAttestationDTO etapeAttestationDTOFromMapper = modelMapper.map(etapeAttestation,
				EtapeAttestationDTO.class);
		when(modelMapper.map(etapeAttestationDTOFromMapper, EtapeAttestation.class)).thenReturn(etapeAttestation);
		when(etapeAttestationRepository.findById(etapeAttestation.getId())).thenReturn(Optional.of(etapeAttestation));
		when(etapeAttestationRepository.save(etapeAttestation)).thenReturn(etapeAttestation);
		updated = etapeAttestationServiceImpl.update(etapeAttestationDTOFromMapper);
		Assertions.assertTrue(updated);
		Mockito.verify(etapeAttestationRepository).findById(etapeAttestation.getId());
		Mockito.verify(etapeAttestationRepository).save(etapeAttestation);
	}

	@Order(7)
	@DisplayName("Update Objet EtapeAttestation: Object not exist")
	@Test
	final void testUpdateNotExist() {
		EtapeAttestationDTO etapeAttestationDTOFromMapper = modelMapper.map(etapeAttestation,
				EtapeAttestationDTO.class);
		when(etapeAttestationRepository.findById(etapeAttestation.getId())).thenReturn(Optional.empty());
		updated = etapeAttestationServiceImpl.update(etapeAttestationDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(etapeAttestationRepository, Mockito.times(1)).findById(etapeAttestation.getId());
		Mockito.verify(etapeAttestationRepository, Mockito.times(0)).save(etapeAttestation);
	}

	@Order(8)
	@DisplayName("Update liste Objet EtapeAttestation: Object exist")
	@Test
	final void testUpdateMany() {
		EtapeAttestationDTO etapeAttestationDTOFromMapper = modelMapper.map(etapeAttestation,
				EtapeAttestationDTO.class);
		when(modelMapper.map(etapeAttestationDTOFromMapper, EtapeAttestation.class)).thenReturn(etapeAttestation);
		when(etapeAttestationRepository.saveAll(etapeAttestations)).thenReturn(etapeAttestations);
		updated = etapeAttestationServiceImpl.updateMany(Arrays.asList(etapeAttestationDTOFromMapper));
		Assertions.assertTrue(updated);
		verify(etapeAttestationRepository, Mockito.times(1)).saveAll(etapeAttestations);
	}

	@Order(9)
	@DisplayName("Delete objet EtapeAttestation By ID: ID exist")
	@Test
	final void testDeleteExist() {
		EtapeAttestationDTO etapeAttestationDTOFromMapper = modelMapper.map(etapeAttestation,
				EtapeAttestationDTO.class);
		when(etapeAttestationRepository.findById(etapeAttestation.getId())).thenReturn(Optional.of(etapeAttestation));
		doNothing().when(etapeAttestationRepository).delete(etapeAttestation);
		deleted = etapeAttestationServiceImpl.delete(etapeAttestationDTOFromMapper);
		Assertions.assertTrue(deleted);
		Mockito.verify(etapeAttestationRepository).findById(etapeAttestation.getId());
		Mockito.verify(etapeAttestationRepository).delete(etapeAttestation);
	}

	@Order(10)
	@DisplayName("Delete objet EtapeAttestation By ID: ID not exist")
	@Test
	final void testDeleteNotExist() {
		EtapeAttestationDTO etapeAttestationDTOFromMapper = modelMapper.map(etapeAttestation,
				EtapeAttestationDTO.class);
		when(etapeAttestationRepository.findById(etapeAttestation.getId())).thenReturn(Optional.empty());
		deleted = etapeAttestationServiceImpl.delete(etapeAttestationDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(etapeAttestationRepository, Mockito.times(1)).findById(etapeAttestation.getId());
		Mockito.verify(etapeAttestationRepository, Mockito.times(0)).delete(etapeAttestation);
	}

}
