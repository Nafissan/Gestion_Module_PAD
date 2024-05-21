package sn.pad.pe.pss.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
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
import sn.pad.pe.pss.bo.EtapeAbsence;
import sn.pad.pe.pss.dto.EtapeAbsenceDTO;
import sn.pad.pe.pss.repositories.EtapeAbsenceRepository;
import sn.pad.pe.pss.services.impl.EtapeAbsenceServiceImpl;

/**
 * 
 * @author abdou.diop
 *
 */
@DisplayName("Test Service EtapeAbsence")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class EtapeAbsenceServiceTest {

	private static EtapeAbsence etapeAbsence;
	private static List<EtapeAbsence> etapeAbsences = new ArrayList<>();
	private static EtapeAbsenceDTO etapeAbsenceDTO;
	private static boolean updated;
	private static boolean deleted;
	@Mock
	private EtapeAbsenceRepository etapeAbsenceRepository;
	@InjectMocks
	private EtapeAbsenceServiceImpl etapeAbsenceServiceImpl;

	@Spy
	private ModelMapper modelMapper;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		etapeAbsence = new EtapeAbsence();
		etapeAbsence.setId(4L);
		etapeAbsence.setCommentaire("commentaire1");
		etapeAbsences.add(etapeAbsence);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet EtapeAbsence")
	@Test
	void testGetEtapeAbsence() {
		List<EtapeAbsenceDTO> etapeAbsenceDTOsFromMapper = etapeAbsences.stream()
				.map(etapeAbsence -> modelMapper.map(etapeAbsence, EtapeAbsenceDTO.class)).collect(Collectors.toList());
		when(etapeAbsenceRepository.findAll()).thenReturn(etapeAbsences);
		List<EtapeAbsenceDTO> etapeAbsenceDTOsFromService = etapeAbsenceServiceImpl.getEtapeAbsence();
		Assertions.assertEquals(etapeAbsenceDTOsFromMapper.size(), etapeAbsenceDTOsFromService.size());
		verify(etapeAbsenceRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet EtapeAbsence by ID: ID exist")
	@Test
	void testGetEtapeAbsenceByIdExist() {
		EtapeAbsenceDTO etapeAbsenceDTOFromMapper = modelMapper.map(etapeAbsence, EtapeAbsenceDTO.class);
		when(etapeAbsenceRepository.findById(etapeAbsence.getId())).thenReturn(Optional.of(etapeAbsence));
		EtapeAbsenceDTO etapeAbsenceDTOFromService = etapeAbsenceServiceImpl.getEtapeAbsenceById(etapeAbsence.getId());
		Assertions.assertEquals(etapeAbsenceDTOFromMapper.getId(), etapeAbsenceDTOFromService.getId());
		verify(etapeAbsenceRepository, Mockito.times(1)).findById(etapeAbsence.getId());
	}

	@Order(3)
	@DisplayName("Get Objet EtapeAbsence by ID: ID not exist")
	@Test
	void testGetEtapeAbsenceByIdNotEXist() {
		when(etapeAbsenceRepository.findById(etapeAbsence.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			etapeAbsenceDTO = etapeAbsenceServiceImpl.getEtapeAbsenceById(etapeAbsence.getId());
		});
		Assertions.assertNull(etapeAbsenceDTO);
		verify(etapeAbsenceRepository, Mockito.times(1)).findById(etapeAbsence.getId());
	}

	@Order(4)
	@DisplayName("Create objet EtapeAbsence")
	@Test
	void testCreateEtapeAbsence() {
		EtapeAbsenceDTO etapeAbsenceDTOFromMapper = modelMapper.map(etapeAbsence, EtapeAbsenceDTO.class);
		when(modelMapper.map(etapeAbsenceDTOFromMapper, EtapeAbsence.class)).thenReturn(etapeAbsence);
		when(etapeAbsenceRepository.save(etapeAbsence)).thenReturn(etapeAbsence);
		when(modelMapper.map(etapeAbsence, EtapeAbsenceDTO.class)).thenReturn(etapeAbsenceDTOFromMapper);
		EtapeAbsenceDTO etapeAbsenceDTOFromService = etapeAbsenceServiceImpl
				.createEtapeAbsence(etapeAbsenceDTOFromMapper);
		Assertions.assertEquals(etapeAbsenceDTOFromMapper, etapeAbsenceDTOFromService);
		verify(etapeAbsenceRepository, Mockito.times(1)).save(etapeAbsence);
	}

	@Order(5)
	@DisplayName("Update Objet EtapeAbsence: Object exist")
	@Test
	void testUpdateEtapeAbsenceExist() {
		EtapeAbsenceDTO etapeAbsenceDTOFromMapper = modelMapper.map(etapeAbsence, EtapeAbsenceDTO.class);
		when(modelMapper.map(etapeAbsenceDTOFromMapper, EtapeAbsence.class)).thenReturn(etapeAbsence);
		when(etapeAbsenceRepository.findById(etapeAbsence.getId())).thenReturn(Optional.of(etapeAbsence));
		when(etapeAbsenceRepository.save(etapeAbsence)).thenReturn(etapeAbsence);
		updated = etapeAbsenceServiceImpl.updateEtapeAbsence(etapeAbsenceDTOFromMapper);
		Assertions.assertTrue(updated);
		Mockito.verify(etapeAbsenceRepository).findById(etapeAbsence.getId());
		Mockito.verify(etapeAbsenceRepository).save(etapeAbsence);
	}

	@Order(6)
	@DisplayName("Update Objet EtapeAbsence: Object not exist")
	@Test
	void testUpdateEtapeAbsenceNotExist() {
		EtapeAbsenceDTO etapeAbsenceDTOFromMapper = modelMapper.map(etapeAbsence, EtapeAbsenceDTO.class);
		when(etapeAbsenceRepository.findById(etapeAbsence.getId())).thenReturn(Optional.empty());
		updated = etapeAbsenceServiceImpl.updateEtapeAbsence(etapeAbsenceDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(etapeAbsenceRepository, Mockito.times(1)).findById(etapeAbsence.getId());
		Mockito.verify(etapeAbsenceRepository, Mockito.times(0)).save(etapeAbsence);
	}

	@Order(7)
	@DisplayName("Delete objet DossierConge By ID: ID exist")
	@Test
	void testDeleteEtapeAbsenceExist() {
		EtapeAbsenceDTO etapeAbsenceDTOFromMapper = modelMapper.map(etapeAbsence, EtapeAbsenceDTO.class);
		when(etapeAbsenceRepository.findById(etapeAbsence.getId())).thenReturn(Optional.of(etapeAbsence));
		doNothing().when(etapeAbsenceRepository).delete(etapeAbsence);
		deleted = etapeAbsenceServiceImpl.deleteEtapeAbsence(etapeAbsenceDTOFromMapper);
		Assertions.assertTrue(deleted);
		Mockito.verify(etapeAbsenceRepository).findById(etapeAbsence.getId());
		Mockito.verify(etapeAbsenceRepository).delete(etapeAbsence);
	}
	@Order(8)
	@DisplayName("Delete objet DossierConge By ID: ID not exist")
	@Test
	void testDeleteEtapeAbsenceNotExist() {
		EtapeAbsenceDTO etapeAbsenceDTOFromMapper = modelMapper.map(etapeAbsence, EtapeAbsenceDTO.class);
		when(etapeAbsenceRepository.findById(etapeAbsence.getId())).thenReturn(Optional.empty());
		deleted = etapeAbsenceServiceImpl.deleteEtapeAbsence(etapeAbsenceDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(etapeAbsenceRepository, Mockito.times(1)).findById(etapeAbsence.getId());
		Mockito.verify(etapeAbsenceRepository, Mockito.times(0)).delete(etapeAbsence);
	}

}
