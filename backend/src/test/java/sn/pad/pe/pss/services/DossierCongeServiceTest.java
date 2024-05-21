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
import sn.pad.pe.pss.bo.DossierConge;
import sn.pad.pe.pss.dto.DossierCongeDTO;
import sn.pad.pe.pss.repositories.DossierCongeRepository;
import sn.pad.pe.pss.services.impl.DossierCongeServiceImpl;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@DisplayName("Test Service DossierConge")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class DossierCongeServiceTest {

	@Mock
	private DossierCongeRepository dossierCongeRepository;
	@InjectMocks
	private DossierCongeServiceImpl dossierCongeServiceImpl;
	@Spy
	private ModelMapper modelMapper;

	private static DossierConge dossierConge1;
	private static DossierConge dossierConge2;
	private static DossierConge dossierConge3;
	private static DossierConge dossierConge4;
	private static DossierCongeDTO dossierCongeDTO;
	private static boolean updated;
	private static boolean deleted;

	private static List<DossierConge> dossierConges;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierConge1 = new DossierConge();
		dossierConge1.setId(1L);
		dossierConge1.setAnnee("2021");

		dossierConge2 = new DossierConge();
		dossierConge2.setId(2L);
		dossierConge2.setAnnee("2022");

		dossierConge3 = new DossierConge();
		dossierConge3.setId(3L);
		dossierConge3.setAnnee("2023");

		dossierConge4 = new DossierConge();
		dossierConge4.setId(4L);
		dossierConge4.setAnnee("2024");

		dossierConges = new ArrayList<DossierConge>();
		dossierConges.add(dossierConge1);
		dossierConges.add(dossierConge2);
		dossierConges.add(dossierConge3);
		dossierConges.add(dossierConge4);

	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Create objet DossierConge")
	@Test
	final void testCreateDossierCongeDossierCongeString() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge2, DossierCongeDTO.class);
		when(modelMapper.map(dossierCongeDTOFromMapper, DossierConge.class)).thenReturn(dossierConge2);
		when(dossierCongeRepository.save(dossierConge2)).thenReturn(dossierConge2);
		when(modelMapper.map(dossierConge2, DossierCongeDTO.class)).thenReturn(dossierCongeDTOFromMapper);
		DossierCongeDTO dossierCongeDTOFromService = dossierCongeServiceImpl
				.createDossierConge(dossierCongeDTOFromMapper);
		Assertions.assertEquals(dossierCongeDTOFromMapper, dossierCongeDTOFromService);
		verify(dossierCongeRepository, Mockito.times(1)).save(dossierConge2);
	}

	@Order(2)
	@DisplayName("Liste objet DossierConge")
	@Test
	final void getDossierConges() {
		List<DossierCongeDTO> dossierCongeDTOFromMappers = dossierConges.stream()
				.map(dossierconge -> modelMapper.map(dossierconge, DossierCongeDTO.class)).collect(Collectors.toList());
		when(dossierCongeRepository.findAll()).thenReturn(dossierConges);
		List<DossierCongeDTO> dossierCongeDTOsFromService = dossierCongeServiceImpl.getDossierConges();
		Assertions.assertEquals(dossierCongeDTOFromMappers.size(), dossierCongeDTOsFromService.size());
		verify(dossierCongeRepository, Mockito.times(1)).findAll();
	}

	@Order(3)
	@DisplayName("Get Objet DossierConge by ID: ID exist")
	@Test
	final void getDossierCongeByIdExist() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge1, DossierCongeDTO.class);
		when(dossierCongeRepository.findById(dossierConge1.getId())).thenReturn(Optional.of(dossierConge1));
		DossierCongeDTO dossierCongeDTOFromService = dossierCongeServiceImpl.getDossierCongeById(dossierConge1.getId());
		Assertions.assertEquals(dossierCongeDTOFromMapper.getId(), dossierCongeDTOFromService.getId());
		verify(dossierCongeRepository, Mockito.times(1)).findById(dossierConge1.getId());
	}

	@Order(4)
	@DisplayName("Get Objet DossierConge By ID: ID not exist")
	@Test
	final void getDossierCongeByIdNotExist() {
		when(dossierCongeRepository.findById(dossierConge1.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			dossierCongeDTO = dossierCongeServiceImpl.getDossierCongeById(dossierConge1.getId());
		});
		Assertions.assertNull(dossierCongeDTO);
		verify(dossierCongeRepository, Mockito.times(1)).findById(dossierConge1.getId());
	}

	@Order(5)
	@DisplayName("Update Objet DossierConge: Object exist")
	@Test
	final void testUpdateDossierCongeExist() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge2, DossierCongeDTO.class);
		when(modelMapper.map(dossierCongeDTOFromMapper, DossierConge.class)).thenReturn(dossierConge2);
		when(dossierCongeRepository.findById(dossierConge2.getId())).thenReturn(Optional.of(dossierConge2));
		when(dossierCongeRepository.save(dossierConge2)).thenReturn(dossierConge2);
		updated = dossierCongeServiceImpl.updateDossierConge(dossierCongeDTOFromMapper);
		Assertions.assertTrue(updated);
		Mockito.verify(dossierCongeRepository).findById(dossierConge2.getId());
		Mockito.verify(dossierCongeRepository).save(dossierConge2);
	}

	@Order(6)
	@DisplayName("Update Objet DossierConge: Object not exist")
	@Test
	final void testUpdateDossierCongeNotExist() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge2, DossierCongeDTO.class);
		when(modelMapper.map(dossierCongeDTOFromMapper, DossierConge.class)).thenReturn(dossierConge2);
		when(dossierCongeRepository.findById(dossierConge2.getId())).thenReturn(Optional.empty());
		/**
		 * Unnecessary stubbings detected
		 * when(dossierCongeRepository.save(dossierConge2)).thenReturn(dossierConge2);
		 * Clean & maintainable test code requires zero unnecessary code
		 * 
		 */
		updated = dossierCongeServiceImpl.updateDossierConge(dossierCongeDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(dossierCongeRepository, Mockito.times(1)).findById(dossierConge2.getId());
		Mockito.verify(dossierCongeRepository, Mockito.times(0)).save(dossierConge2);
	}

	@Order(7)
	@DisplayName("Delete objet DossierConge By ID: ID exist")
	@Test
	final void testDeteleDossierCongeExist() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge4, DossierCongeDTO.class);
		when(modelMapper.map(dossierCongeDTOFromMapper, DossierConge.class)).thenReturn(dossierConge4);
		when(dossierCongeRepository.findById(dossierConge4.getId())).thenReturn(Optional.of(dossierConge4));
		doNothing().when(dossierCongeRepository).delete(dossierConge4);
		deleted = dossierCongeServiceImpl.deteleDossierConge(dossierCongeDTOFromMapper);
		Assertions.assertTrue(deleted);
		Mockito.verify(dossierCongeRepository).findById(dossierConge4.getId());
		Mockito.verify(dossierCongeRepository).delete(dossierConge4);
	}

	@Order(8)
	@DisplayName("Delete objet DossierConge By ID: ID not exist")
	@Test
	final void testDeteleDossierCongeNotExist() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge4, DossierCongeDTO.class);
		when(modelMapper.map(dossierCongeDTOFromMapper, DossierConge.class)).thenReturn(dossierConge4);
		when(dossierCongeRepository.findById(dossierConge4.getId())).thenReturn(Optional.empty());
		/**
		 * Unnecessary stubbings detected
		 * doNothing().when(dossierCongeRepository).delete(dossierConge4); Clean &
		 * maintainable test code requires zero unnecessary code
		 * 
		 */
		deleted = dossierCongeServiceImpl.deteleDossierConge(dossierCongeDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(dossierCongeRepository, Mockito.times(1)).findById(dossierConge4.getId());
		Mockito.verify(dossierCongeRepository, Mockito.times(0)).delete(dossierConge4);
	}

	@Order(9)
	@DisplayName("Get Objet DossierConge by Annee: Annee exist")
	@Test
	final void getDossierCongeByAnneeExist() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge1, DossierCongeDTO.class);
		when(dossierCongeRepository.findDossierCongeByAnnee(dossierConge1.getAnnee()))
				.thenReturn(Optional.of(dossierConge1));
		DossierCongeDTO dossierCongeDTOFromService = dossierCongeServiceImpl
				.getDossierCongeByAnnee(dossierConge1.getAnnee());
		Assertions.assertEquals(dossierCongeDTOFromMapper.getAnnee(), dossierCongeDTOFromService.getAnnee());
		verify(dossierCongeRepository, Mockito.times(1)).findDossierCongeByAnnee(dossierConge1.getAnnee());
	}

	@Order(10)
	@DisplayName("Get Objet DossierConge by Annee: Annee not exist")
	@Test
	final void getDossierCongeByAnneeNotExist() {
		when(dossierCongeRepository.findDossierCongeByAnnee(dossierConge1.getAnnee())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			dossierCongeDTO = dossierCongeServiceImpl.getDossierCongeByAnnee(dossierConge1.getAnnee());
		});
		Assertions.assertNull(dossierCongeDTO);
		verify(dossierCongeRepository, Mockito.times(0)).findDossierCongeByAnnee(dossierConge2.getAnnee());
	}

}
