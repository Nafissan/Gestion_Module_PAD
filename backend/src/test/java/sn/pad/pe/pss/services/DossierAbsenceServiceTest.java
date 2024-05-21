package sn.pad.pe.pss.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Calendar;
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
import sn.pad.pe.pss.bo.DossierAbsence;
import sn.pad.pe.pss.dto.DossierAbsenceDTO;
import sn.pad.pe.pss.repositories.DossierAbsenceRepository;
import sn.pad.pe.pss.services.impl.DossierAbsenceServiceImpl;

/**
 * 
 * @author abdou.diop
 *
 */

@DisplayName("Test Service DossierAbsence")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class DossierAbsenceServiceTest {
	@Spy
	private ModelMapper modelMapper;

	@Mock
	private DossierAbsenceRepository dossierAbsenceRepository;
	@InjectMocks
	private DossierAbsenceServiceImpl dossierAbsenceServiceImpl;

	private static DossierAbsence dossierAbsence;
	private static List<DossierAbsence> dossierAbsences = new ArrayList<>();
	private static DossierAbsenceDTO dossierAbsenceDTO;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierAbsence = new DossierAbsence();
		dossierAbsence.setId(1L);
		dossierAbsence.setAnnee(2020);
		dossierAbsences.add(dossierAbsence);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet DossierAbsence")
	@Test
	void testGetDossierAbsence() {
		List<DossierAbsenceDTO> dossierAbsenceDTOsFromMapper = dossierAbsences.stream()
				.map(dossierAbsence -> modelMapper.map(dossierAbsence, DossierAbsenceDTO.class))
				.collect(Collectors.toList());
		when(dossierAbsenceRepository.findAll()).thenReturn(dossierAbsences);
		List<DossierAbsenceDTO> dossierAbsenceDTOsFromService = dossierAbsenceServiceImpl.getDossierAbsences();
		Assertions.assertEquals(dossierAbsenceDTOsFromMapper.size(), dossierAbsenceDTOsFromService.size());
		verify(dossierAbsenceRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet DossierAbsence by ID: ID exist")
	@Test
	void testGetDossierAbsenceByIdExist() {
		DossierAbsenceDTO dossierAbsenceDTOFromMapper = modelMapper.map(dossierAbsence, DossierAbsenceDTO.class);
		when(dossierAbsenceRepository.findById(dossierAbsence.getId())).thenReturn(Optional.of(dossierAbsence));
		DossierAbsenceDTO dossierAbsenceDTOFromService = dossierAbsenceServiceImpl
				.getDossierAbsenceById(dossierAbsence.getId());
		Assertions.assertEquals(dossierAbsenceDTOFromMapper.getId(), dossierAbsenceDTOFromService.getId());
		verify(dossierAbsenceRepository, Mockito.times(1)).findById(dossierAbsence.getId());
	}

	@Order(3)
	@DisplayName("Get Objet DossierAbsence by ID: ID not exist")
	@Test
	void testGetDossierAbsenceByIdNotExist() {
		when(dossierAbsenceRepository.findById(dossierAbsence.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			dossierAbsenceDTO = dossierAbsenceServiceImpl.getDossierAbsenceById(dossierAbsence.getId());
		});
		Assertions.assertNull(dossierAbsenceDTO);
		verify(dossierAbsenceRepository, Mockito.times(1)).findById(dossierAbsence.getId());
	}

	@Order(4)
	@DisplayName("Create objet DossierAbsence")
	@Test
	void testCreate() {
		DossierAbsenceDTO dossierAbsenceDTOFromMapper = modelMapper.map(dossierAbsence, DossierAbsenceDTO.class);
		when(modelMapper.map(dossierAbsenceDTOFromMapper, DossierAbsence.class)).thenReturn(dossierAbsence);
		when(dossierAbsenceRepository.save(dossierAbsence)).thenReturn(dossierAbsence);
		when(modelMapper.map(dossierAbsence, DossierAbsenceDTO.class)).thenReturn(dossierAbsenceDTOFromMapper);
		DossierAbsenceDTO dossierAbsenceDTOFromService = dossierAbsenceServiceImpl
				.createDossierAbsence(dossierAbsenceDTOFromMapper);
		Assertions.assertEquals(dossierAbsenceDTOFromMapper, dossierAbsenceDTOFromService);
		verify(dossierAbsenceRepository, Mockito.times(1)).save(dossierAbsence);
	}

	@Order(5)
	@DisplayName("Update Objet DossierAbsence: Object exist")
	@Test
	void testUpdateExist() {
		DossierAbsenceDTO dossierAbsenceDTOFromMapper = modelMapper.map(dossierAbsence, DossierAbsenceDTO.class);
		when(modelMapper.map(dossierAbsenceDTOFromMapper, DossierAbsence.class)).thenReturn(dossierAbsence);
		when(dossierAbsenceRepository.findById(dossierAbsence.getId())).thenReturn(Optional.of(dossierAbsence));
		when(dossierAbsenceRepository.save(dossierAbsence)).thenReturn(dossierAbsence);
		updated = dossierAbsenceServiceImpl.updateDossierAbsence(dossierAbsenceDTOFromMapper);
		Assertions.assertTrue(updated);
		Mockito.verify(dossierAbsenceRepository).findById(dossierAbsence.getId());
		Mockito.verify(dossierAbsenceRepository).save(dossierAbsence);
	}

	@Order(6)
	@DisplayName("Update Objet DossierAbsence: Object not exist")
	@Test
	void testUpdateNotExist() {
		DossierAbsenceDTO dossierAbsenceDTOFromMapper = modelMapper.map(dossierAbsence, DossierAbsenceDTO.class);
		when(modelMapper.map(dossierAbsenceDTOFromMapper, DossierAbsence.class)).thenReturn(dossierAbsence);
		when(dossierAbsenceRepository.findById(dossierAbsence.getId())).thenReturn(Optional.empty());
		updated = dossierAbsenceServiceImpl.updateDossierAbsence(dossierAbsenceDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(dossierAbsenceRepository).findById(dossierAbsence.getId());
	}

	@Order(7)
	@DisplayName("Delete objet DossierAbsence By ID: ID exist")
	@Test
	void testDeleteExist() {
		DossierAbsenceDTO dossierAbsenceDTOFromMapper = modelMapper.map(dossierAbsence, DossierAbsenceDTO.class);
		when(modelMapper.map(dossierAbsenceDTOFromMapper, DossierAbsence.class)).thenReturn(dossierAbsence);
		when(dossierAbsenceRepository.findById(dossierAbsence.getId())).thenReturn(Optional.of(dossierAbsence));
		doNothing().when(dossierAbsenceRepository).delete(dossierAbsence);
		deleted = dossierAbsenceServiceImpl.deteleDossierAbsence(dossierAbsenceDTOFromMapper);
		Assertions.assertTrue(deleted);
		Mockito.verify(dossierAbsenceRepository).findById(dossierAbsence.getId());
		Mockito.verify(dossierAbsenceRepository).delete(dossierAbsence);
	}

	@Order(8)
	@DisplayName("Delete objet DossierAbsence By ID: ID not exist")
	@Test
	void testDeleteNotExist() {
		DossierAbsenceDTO dossierAbsenceDTOFromMapper = modelMapper.map(dossierAbsence, DossierAbsenceDTO.class);
		when(modelMapper.map(dossierAbsenceDTOFromMapper, DossierAbsence.class)).thenReturn(dossierAbsence);
		when(dossierAbsenceRepository.findById(dossierAbsence.getId())).thenReturn(Optional.empty());
		deleted = dossierAbsenceServiceImpl.deteleDossierAbsence(dossierAbsenceDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(dossierAbsenceRepository, Mockito.times(1)).findById(dossierAbsence.getId());
	}
	@Order(9)
	@DisplayName("Get Objet DossierAbsence by ANNEE: ANNEE  exist")
	@Test
	void testGetDossierAbsenceByAnneeExist() {
		int annee = Calendar.getInstance().get(Calendar.YEAR);
		when(dossierAbsenceRepository.findDossierAbsenceByAnnee(annee)).thenReturn(dossierAbsences);
		List<DossierAbsenceDTO> dossierAbsenceDTOsFromService = dossierAbsenceServiceImpl.findDossierAbsenceByAnnee(annee);
		Assertions.assertEquals(dossierAbsences.size(), dossierAbsenceDTOsFromService.size());
		verify(dossierAbsenceRepository, Mockito.times(1)).findDossierAbsenceByAnnee(annee);
	}
}
