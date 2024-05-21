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
import sn.pad.pe.pss.bo.DossierInterim;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.DossierInterimDTO;
import sn.pad.pe.pss.dto.NiveauHierarchiqueDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.DossierInterimRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.impl.DossierInterimServiceImpl;

@DisplayName("Test Service DossierInterim")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class DossierInterimServiceTest {
	@Mock
	private DossierInterimRepository dossierInterimRepository;
	@Mock
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;
	@InjectMocks
	private DossierInterimServiceImpl dossierInterimServiceImpl;
	@Spy
	private ModelMapper modelMapper;

	private static DossierInterim dossierInterim;
	private static DossierInterimDTO dossierInterimDTO;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDTO;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		uniteOrganisationnelleDTO = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDTO.setId(3L);
		uniteOrganisationnelleDTO.setCode("607043");
		uniteOrganisationnelleDTO.setDescription("Direction digitale est la partie IT du PAD.");
		uniteOrganisationnelleDTO.setNom("DD");
		NiveauHierarchiqueDTO niveauHierarchiqueDTO = new NiveauHierarchiqueDTO();
		niveauHierarchiqueDTO.setId(1L);
		niveauHierarchiqueDTO.setLibelle("DIRECTION");
		niveauHierarchiqueDTO.setPosition(1);
		uniteOrganisationnelleDTO.setNiveauHierarchique(niveauHierarchiqueDTO);

		dossierInterim = new DossierInterim();
		dossierInterim.setId(1L);
		dossierInterim.setAnnee(2020);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Get liste objet DossierInterim")
	@Test
	final void testGetDossierInterims() {
		List<DossierInterimDTO> dossierInterimDTOsFromMapper = Arrays.asList(dossierInterim).stream()
				.map(di -> modelMapper.map(di, DossierInterimDTO.class)).collect(Collectors.toList());
		when(dossierInterimRepository.findAll()).thenReturn(Arrays.asList(dossierInterim));
		List<DossierInterimDTO> dossierInterimDTOsFromService = dossierInterimServiceImpl.getDossierInterims();
		Assertions.assertEquals(dossierInterimDTOsFromMapper.size(), dossierInterimDTOsFromService.size());
		verify(dossierInterimRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet DossierInterim by ID: ID exist")
	@Test
	final void testGetDossierInterimByIdExist() {
		DossierInterimDTO dossierInterimDTOFromMapper = modelMapper.map(dossierInterim, DossierInterimDTO.class);
		when(dossierInterimRepository.findById(dossierInterim.getId())).thenReturn(Optional.of(dossierInterim));
		DossierInterimDTO dossierInterimDTOFromService = dossierInterimServiceImpl
				.getDossierInterimById(dossierInterim.getId());
		Assertions.assertEquals(dossierInterimDTOFromMapper.getId(), dossierInterimDTOFromService.getId());
		verify(dossierInterimRepository, Mockito.times(1)).findById(dossierInterim.getId());
	}

	@Order(3)
	@DisplayName("Get Objet DossierInterim by ID: ID not exist")
	@Test
	final void testGetDossierInterimByIdNotExist() {
		when(dossierInterimRepository.findById(dossierInterim.getId())).thenReturn(Optional.empty());

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			dossierInterimDTO = dossierInterimServiceImpl.getDossierInterimById(dossierInterim.getId());
		});
		Assertions.assertNull(dossierInterimDTO);
		verify(dossierInterimRepository, Mockito.times(1)).findById(dossierInterim.getId());
	}

	@Order(4)
	@DisplayName("Get Objet DossierInterim by Unite AND Annee: Unite AND Annee exist")
	@Test
	final void testDossierInterimByUniteOrganisationnelleAndAnneeExist() {
		DossierInterimDTO dossierInterimDTOFromMapper = modelMapper.map(dossierInterim, DossierInterimDTO.class);
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDTO,
				UniteOrganisationnelle.class);
		when(modelMapper.map(uniteOrganisationnelleDTO, UniteOrganisationnelle.class))
				.thenReturn(uniteOrganisationnelle);
		when(dossierInterimRepository.findDossierInterimByUniteOrganisationnelleAndAnnee(uniteOrganisationnelle,
				dossierInterim.getAnnee())).thenReturn(dossierInterim);
		when(modelMapper.map(dossierInterim, DossierInterimDTO.class)).thenReturn(dossierInterimDTOFromMapper);

		DossierInterimDTO dossierInterimDTOFromService = dossierInterimServiceImpl
				.dossierInterimByUniteOrganisationnelleAndAnnee(uniteOrganisationnelleDTO, dossierInterim.getAnnee());

		Assertions.assertEquals(dossierInterimDTOFromMapper.getId(), dossierInterimDTOFromService.getId());
		verify(dossierInterimRepository, Mockito.times(1))
				.findDossierInterimByUniteOrganisationnelleAndAnnee(uniteOrganisationnelle, dossierInterim.getAnnee());

	}

	@Order(5)
	@DisplayName("Get Objet DossierInterim by Unite AND Annee: Unite AND Annee not exist")
	@Test
	final void testDossierInterimByUniteOrganisationnelleAndAnneeNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDTO,
				UniteOrganisationnelle.class);
		when(modelMapper.map(uniteOrganisationnelleDTO, UniteOrganisationnelle.class))
				.thenReturn(uniteOrganisationnelle);
		when(dossierInterimRepository.findDossierInterimByUniteOrganisationnelleAndAnnee(uniteOrganisationnelle,
				dossierInterim.getAnnee())).thenReturn(null);

		DossierInterimDTO dossierInterimDTOFromService = dossierInterimServiceImpl
				.dossierInterimByUniteOrganisationnelleAndAnnee(uniteOrganisationnelleDTO, dossierInterim.getAnnee());

		Assertions.assertNull(dossierInterimDTOFromService);
		verify(dossierInterimRepository, Mockito.times(1))
				.findDossierInterimByUniteOrganisationnelleAndAnnee(uniteOrganisationnelle, dossierInterim.getAnnee());
	}

	@Order(6)
	@DisplayName("Get Objet DossierInterim by Annee: Annee exist")
	@Test
	final void testFindDossierInterimByAnnee() {
		List<DossierInterimDTO> dossierInterimDTOsFromMapper = Arrays.asList(dossierInterim).stream()
				.map(di -> modelMapper.map(di, DossierInterimDTO.class)).collect(Collectors.toList());
		when(dossierInterimRepository.findDossierInterimByAnnee(dossierInterim.getAnnee()))
				.thenReturn(Arrays.asList(dossierInterim));
		List<DossierInterimDTO> dossierInterimDTOsFromService = dossierInterimServiceImpl
				.findDossierInterimByAnnee(dossierInterim.getAnnee());
		Assertions.assertEquals(dossierInterimDTOsFromMapper.size(), dossierInterimDTOsFromService.size());
		verify(dossierInterimRepository, Mockito.times(1)).findDossierInterimByAnnee(dossierInterim.getAnnee());
	}

	@Order(7)
	@DisplayName("Create objet DossierInterim")
	@Test
	final void testCreateDossierInterim() {
		DossierInterimDTO dossierInterimDTOFromMapper = modelMapper.map(dossierInterim, DossierInterimDTO.class);
		dossierInterimDTOFromMapper.setUniteOrganisationnelle(uniteOrganisationnelleDTO);

		when(modelMapper.map(dossierInterimDTOFromMapper, DossierInterim.class)).thenReturn(dossierInterim);
		when(dossierInterimRepository.save(dossierInterim)).thenReturn(dossierInterim);
		when(modelMapper.map(dossierInterim, DossierInterimDTO.class)).thenReturn(dossierInterimDTOFromMapper);
		DossierInterimDTO dossierInterimDTOFromService = dossierInterimServiceImpl
				.createDossierInterim(dossierInterimDTOFromMapper);
		Assertions.assertEquals(dossierInterimDTOFromMapper, dossierInterimDTOFromService);
		verify(dossierInterimRepository, Mockito.times(1)).save(dossierInterim);
	}

	@Order(8)
	@DisplayName("Update Objet DossierInterim: Object exist")
	@Test
	final void testUpdateDossierInterimNotExist() {
		DossierInterimDTO dossierInterimDTOFromMapper = modelMapper.map(dossierInterim, DossierInterimDTO.class);
		dossierInterimDTOFromMapper.setUniteOrganisationnelle(uniteOrganisationnelleDTO);
		when(modelMapper.map(dossierInterimDTOFromMapper, DossierInterim.class)).thenReturn(dossierInterim);
		when(dossierInterimRepository.findById(dossierInterim.getId())).thenReturn(Optional.of(dossierInterim));
		when(dossierInterimRepository.save(dossierInterim)).thenReturn(dossierInterim);

		updated = dossierInterimServiceImpl.updateDossierInterim(dossierInterimDTOFromMapper);

		Assertions.assertTrue(updated);
		Mockito.verify(dossierInterimRepository, Mockito.times(1)).findById(dossierInterim.getId());
		Mockito.verify(dossierInterimRepository, Mockito.times(1)).save(dossierInterim);
	}

	@Order(9)
	@DisplayName("Update Objet DossierInterim: Object not exist")
	@Test
	final void testUpdateDossierInterimExist() {
		DossierInterimDTO dossierInterimDTOFromMapper = modelMapper.map(dossierInterim, DossierInterimDTO.class);
		dossierInterimDTOFromMapper.setUniteOrganisationnelle(uniteOrganisationnelleDTO);

		when(modelMapper.map(dossierInterimDTOFromMapper, DossierInterim.class)).thenReturn(dossierInterim);
		when(dossierInterimRepository.findById(dossierInterim.getId())).thenReturn(Optional.empty());
		/**
		 * Unnecessary stubbings detected
		 * when(dossierInterimRepository.save(dossierInterim)).thenReturn(dossierInterim);
		 * Clean & maintainable test code requires zero unnecessary code
		 * 
		 */
		updated = dossierInterimServiceImpl.updateDossierInterim(dossierInterimDTOFromMapper);

		Assertions.assertFalse(updated);
		Mockito.verify(dossierInterimRepository, Mockito.times(1)).findById(dossierInterim.getId());
		Mockito.verify(dossierInterimRepository, Mockito.times(0)).save(dossierInterim);
	}

	@Order(10)
	@DisplayName("Suppression objet DossierInterim by ID: ID exist")
	@Test
	final void testDeteleDossierInterimExist() {
		DossierInterimDTO dossierInterimDTOFromMapper = modelMapper.map(dossierInterim, DossierInterimDTO.class);
		dossierInterimDTOFromMapper.setUniteOrganisationnelle(uniteOrganisationnelleDTO);
		when(modelMapper.map(dossierInterimDTOFromMapper, DossierInterim.class)).thenReturn(dossierInterim);
		when(dossierInterimRepository.findById(dossierInterim.getId())).thenReturn(Optional.of(dossierInterim));
		doNothing().when(dossierInterimRepository).delete(dossierInterim);

		deleted = dossierInterimServiceImpl.deteleDossierInterim(dossierInterimDTOFromMapper);
		Assertions.assertTrue(deleted);
		Mockito.verify(dossierInterimRepository).findById(dossierInterim.getId());
		Mockito.verify(dossierInterimRepository).delete(dossierInterim);
	}

	@Order(10)
	@DisplayName("Suppression objet DossierInterim by ID: ID not exist")
	@Test
	final void testDeteleDossierInterimNotExist() {
		DossierInterimDTO dossierInterimDTOFromMapper = modelMapper.map(dossierInterim, DossierInterimDTO.class);
		dossierInterimDTOFromMapper.setUniteOrganisationnelle(uniteOrganisationnelleDTO);
		when(modelMapper.map(dossierInterimDTOFromMapper, DossierInterim.class)).thenReturn(dossierInterim);
		when(dossierInterimRepository.findById(dossierInterim.getId())).thenReturn(Optional.empty());
		/**
		 * Unnecessary stubbings detected
		 * doNothing().when(dossierInterimRepository).delete(dossierInterim); Clean &
		 * maintainable test code requires zero unnecessary code
		 * 
		 */

		deleted = dossierInterimServiceImpl.deteleDossierInterim(dossierInterimDTOFromMapper);

		Assertions.assertFalse(deleted);
		Mockito.verify(dossierInterimRepository, Mockito.times(1)).findById(dossierInterim.getId());
		Mockito.verify(dossierInterimRepository, Mockito.times(0)).delete(dossierInterim);
	}

}
