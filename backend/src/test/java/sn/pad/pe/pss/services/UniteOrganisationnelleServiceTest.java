package sn.pad.pe.pss.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
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
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.FonctionDTO;
import sn.pad.pe.pss.dto.NiveauHierarchiqueDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.helpers.GenerationCode;
import sn.pad.pe.pss.services.impl.UniteOrganisationnelleServiceImpl;

@DisplayName("Test Service UniteOrganisationnelle")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class UniteOrganisationnelleServiceTest {
	@InjectMocks
	private UniteOrganisationnelleServiceImpl uniteOrganisationnelleServiceImpl;
	@Mock
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;
	@Mock
	private GenerationCode generer;
	@Spy
	private ModelMapper modelMapper;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDto;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDtoSuperieur;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDtoInferieur;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDtoVerify;
	private static List<UniteOrganisationnelleDTO> uniteOrganisationnellesDtoVerify;
	private static List<UniteOrganisationnelleDTO> uniteOrganisationnelleDtos;
	private static NiveauHierarchiqueDTO nivHierarchiqueDTO_1;
	private static NiveauHierarchiqueDTO nivHierarchiqueDTO_2;
	private static NiveauHierarchiqueDTO nivHierarchiqueDTO_3;
	private static boolean updated;
	private static boolean deleted;
	private static FonctionDTO fonctionDTO;
	private static AgentDTO agentDTO;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		fonctionDTO = new FonctionDTO();
		fonctionDTO.setId(1L);
		
		agentDTO = new AgentDTO();
		agentDTO.setId(1L);
		agentDTO.setFonction(fonctionDTO);
		
		nivHierarchiqueDTO_1 = new NiveauHierarchiqueDTO();
		nivHierarchiqueDTO_1.setId(1L);
		nivHierarchiqueDTO_1.setLibelle("Niveau1");
		nivHierarchiqueDTO_1.setPosition(1);

		nivHierarchiqueDTO_2 = new NiveauHierarchiqueDTO();
		nivHierarchiqueDTO_2.setId(2L);
		nivHierarchiqueDTO_2.setLibelle("Niveau2");
		nivHierarchiqueDTO_2.setPosition(1);

		nivHierarchiqueDTO_3 = new NiveauHierarchiqueDTO();
		nivHierarchiqueDTO_3.setId(3L);
		nivHierarchiqueDTO_3.setLibelle("Niveau3");
		nivHierarchiqueDTO_3.setPosition(1);

		uniteOrganisationnelleDtoSuperieur = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDtoSuperieur.setId(2L);
		uniteOrganisationnelleDtoSuperieur.setCode("DD05282");
		uniteOrganisationnelleDtoSuperieur.setNiveauHierarchique(nivHierarchiqueDTO_1);

		uniteOrganisationnelleDto = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDto.setId(1L);
		uniteOrganisationnelleDto.setCode("DD05281");
		uniteOrganisationnelleDto.setUniteSuperieure(uniteOrganisationnelleDtoSuperieur);
		uniteOrganisationnelleDto.setNiveauHierarchique(nivHierarchiqueDTO_2);
		fonctionDTO.setUniteOrganisationnelle(Arrays.asList(uniteOrganisationnelleDto));
		agentDTO.setUniteOrganisationnelle(uniteOrganisationnelleDto);

		uniteOrganisationnelleDtoInferieur = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDtoInferieur.setId(3L);
		uniteOrganisationnelleDtoInferieur.setCode("DD05283");
		uniteOrganisationnelleDtoInferieur.setNiveauHierarchique(nivHierarchiqueDTO_3);

		uniteOrganisationnelleDtoInferieur.setUniteSuperieure(uniteOrganisationnelleDto);

		uniteOrganisationnelleDtos = Arrays.asList(uniteOrganisationnelleDto);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet UniteOrganisationnelle")
	@Test
	final void testGetUniteOrganisationnelles() {
		List<UniteOrganisationnelle> etapeInterims = uniteOrganisationnelleDtos.stream()
				.map(unite -> modelMapper.map(unite, UniteOrganisationnelle.class)).collect(Collectors.toList());
		when(uniteOrganisationnelleRepository.findAll()).thenReturn(etapeInterims);
		List<UniteOrganisationnelleDTO> uniteOrganisationnelleDTOsFromService = uniteOrganisationnelleServiceImpl
				.getUniteOrganisationnelles();
		Assertions.assertEquals(uniteOrganisationnelleDtos.size(), uniteOrganisationnelleDTOsFromService.size());
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet UniteOrganisationnelle by ID: ID exist")
	@Test
	final void testGetUniteOrganisationnelleByIdExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));
		UniteOrganisationnelleDTO uniteOrganisationnelleDTOFromService = uniteOrganisationnelleServiceImpl
				.getUniteOrganisationnelleById(uniteOrganisationnelle.getId());
		Assertions.assertEquals(uniteOrganisationnelleDto.getId(), uniteOrganisationnelleDTOFromService.getId());
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());
	}

	@Order(3)
	@DisplayName("Get Objet UniteOrganisationnelle by ID: ID not exist")
	@Test
	final void testGetUniteOrganisationnelleByIdNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			uniteOrganisationnelleDtoVerify = uniteOrganisationnelleServiceImpl
					.getUniteOrganisationnelleById(uniteOrganisationnelle.getId());
		});
		Assertions.assertNull(uniteOrganisationnelleDtoVerify);
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());
	}

	@Order(4)
	@DisplayName("Get Objet UniteOrganisationnelle by CODE: CODE exist")
	@Test
	final void testGetUniteOrganisationnelleByCodeExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findUniteOrganisationnelleByCode(uniteOrganisationnelle.getCode()))
				.thenReturn(Optional.of(uniteOrganisationnelle));
		UniteOrganisationnelleDTO uniteOrganisationnelleDTOFromService = uniteOrganisationnelleServiceImpl
				.getUniteOrganisationnelleByCode(uniteOrganisationnelle.getCode());
		Assertions.assertEquals(uniteOrganisationnelleDto.getId(), uniteOrganisationnelleDTOFromService.getId());
		verify(uniteOrganisationnelleRepository, Mockito.times(1))
				.findUniteOrganisationnelleByCode(uniteOrganisationnelle.getCode());

	}

	@Order(5)
	@DisplayName("Get Objet UniteOrganisationnelle by CODE: CODE not exist")
	@Test
	final void testGetUniteOrganisationnelleByCodeNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findUniteOrganisationnelleByCode(uniteOrganisationnelle.getCode()))
				.thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			uniteOrganisationnelleDtoVerify = uniteOrganisationnelleServiceImpl
					.getUniteOrganisationnelleByCode(uniteOrganisationnelle.getCode());
		});
		Assertions.assertNull(uniteOrganisationnelleDtoVerify);
		verify(uniteOrganisationnelleRepository, Mockito.times(1))
				.findUniteOrganisationnelleByCode(uniteOrganisationnelle.getCode());

	}

	@Order(6)
	@DisplayName("Liste objet UniteOrganisationnelle Superieur: Superieur exist")
	@Test
	final void testGetUnitesOrganisationnellesSuperieuresExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		List<UniteOrganisationnelleDTO> uniteOrganisationnelleDTOsFromService = uniteOrganisationnelleServiceImpl
				.getUnitesOrganisationnellesSuperieures(uniteOrganisationnelle.getId());
		Assertions.assertEquals(uniteOrganisationnelleDtos.size(), uniteOrganisationnelleDTOsFromService.size());
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());

	}

	@Order(7)
	@DisplayName("Liste objet UniteOrganisationnelle Superieur: first Superieur null")
	@Test
	final void testGetUnitesOrganisationnellesSuperieuresExistAndFirstNull() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDtoSuperieur,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		List<UniteOrganisationnelleDTO> uniteOrganisationnelleDTOsFromService = uniteOrganisationnelleServiceImpl
				.getUnitesOrganisationnellesSuperieures(uniteOrganisationnelle.getId());
		Assertions.assertEquals(uniteOrganisationnelleDTOsFromService.size(), 0);
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());

	}

	@Order(8)
	@DisplayName("Liste objet UniteOrganisationnelle Superieur: Second Superieur null")
	@Test
	final void testGetUnitesOrganisationnellesSuperieuresExistAndSecondSupNull() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDtoInferieur,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		List<UniteOrganisationnelleDTO> uniteOrganisationnelleDTOsFromService = uniteOrganisationnelleServiceImpl
				.getUnitesOrganisationnellesSuperieures(uniteOrganisationnelle.getId());
		Assertions.assertEquals(uniteOrganisationnelleDTOsFromService.size(),
				Arrays.asList(uniteOrganisationnelleDto, uniteOrganisationnelleDtoSuperieur).size());
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());

	}

	@Order(9)
	@DisplayName("Liste objet UniteOrganisationnelle Superieur: Superieur not exist")
	@Test
	final void testGetUnitesOrganisationnellesSuperieuresNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());
		List<UniteOrganisationnelleDTO> uniteOrganisationnelleDTOsFromService = uniteOrganisationnelleServiceImpl
				.getUnitesOrganisationnellesSuperieures(uniteOrganisationnelle.getId());
		Assertions.assertNull(uniteOrganisationnelleDTOsFromService);
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());
	}

	@Order(10)
	@DisplayName("Liste objet UniteOrganisationnelle Superieur by NiveauHierarchique Equals")
	@Test
	final void testGetUnitesOrganisationnellesSuperieursByNiveauExist() {
		List<UniteOrganisationnelle> etapeInterims = uniteOrganisationnelleDtos.stream()
				.map(unite -> modelMapper.map(unite, UniteOrganisationnelle.class)).collect(Collectors.toList());
		when(uniteOrganisationnelleRepository.findAll()).thenReturn(etapeInterims);
		List<UniteOrganisationnelleDTO> uniteOrganisationnelleDTOsFromService = uniteOrganisationnelleServiceImpl
				.getUnitesOrganisationnellesSuperieursByNiveau(1);
		Assertions.assertEquals(uniteOrganisationnelleDtos.size(), uniteOrganisationnelleDTOsFromService.size());
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findAll();
	}

	@Order(11)
	@DisplayName("Liste objet UniteOrganisationnelle Superieur by NiveauHierarchique Not Equals")
	@Test
	final void testGetUnitesOrganisationnellesSuperieursByNiveauNotExist() {
		List<UniteOrganisationnelle> etapeInterims = uniteOrganisationnelleDtos.stream()
				.map(unite -> modelMapper.map(unite, UniteOrganisationnelle.class)).collect(Collectors.toList());
		when(uniteOrganisationnelleRepository.findAll()).thenReturn(etapeInterims);
		List<UniteOrganisationnelleDTO> uniteOrganisationnelleDTOsFromService = uniteOrganisationnelleServiceImpl
				.getUnitesOrganisationnellesSuperieursByNiveau(4);
		Assertions.assertEquals(uniteOrganisationnelleDTOsFromService.size(), 0);
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findAll();
	}

	@Order(12)
	@DisplayName("Create objet UniteOrganisationnelle")
	@Test
	final void testCreate() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(modelMapper.map(uniteOrganisationnelleDto, UniteOrganisationnelle.class))
				.thenReturn(uniteOrganisationnelle);
		when(generer.uniteOrganisationnelle()).thenReturn(uniteOrganisationnelle.getCode());
		when(uniteOrganisationnelleRepository.save(uniteOrganisationnelle)).thenReturn(uniteOrganisationnelle);
		when(modelMapper.map(uniteOrganisationnelle, UniteOrganisationnelleDTO.class))
				.thenReturn(uniteOrganisationnelleDto);
		UniteOrganisationnelleDTO etapeInterimDTOFromServiceFromService = uniteOrganisationnelleServiceImpl
				.create(uniteOrganisationnelleDto);
		Assertions.assertEquals(uniteOrganisationnelleDto, etapeInterimDTOFromServiceFromService);
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).save(uniteOrganisationnelle);
	}

	@Order(13)
	@DisplayName("Update Objet EtapeInterim: Object exist")
	@Test
	final void testUpdateExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(modelMapper.map(uniteOrganisationnelleDto, UniteOrganisationnelle.class))
				.thenReturn(uniteOrganisationnelle);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));
		when(uniteOrganisationnelleRepository.save(uniteOrganisationnelle)).thenReturn(uniteOrganisationnelle);
		updated = uniteOrganisationnelleServiceImpl.update(uniteOrganisationnelleDto);
		Assertions.assertTrue(updated);
		Mockito.verify(uniteOrganisationnelleRepository).findById(uniteOrganisationnelle.getId());
		Mockito.verify(uniteOrganisationnelleRepository).save(uniteOrganisationnelle);
	}

	@Order(14)
	@DisplayName("Update Objet EtapeInterim: Object not exist")
	@Test
	final void testUpdateNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());
		updated = uniteOrganisationnelleServiceImpl.update(uniteOrganisationnelleDto);
		Assertions.assertFalse(updated);
		Mockito.verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());
		Mockito.verify(uniteOrganisationnelleRepository, Mockito.times(0)).save(uniteOrganisationnelle);
	}

	@Order(15)
	@DisplayName("Delete objet EtapeInterim By ID: ID exist")
	@Test
	final void testDeleteExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));
		doNothing().when(uniteOrganisationnelleRepository).delete(uniteOrganisationnelle);
		deleted = uniteOrganisationnelleServiceImpl.delete(uniteOrganisationnelleDto);
		Assertions.assertTrue(deleted);
		Mockito.verify(uniteOrganisationnelleRepository).findById(uniteOrganisationnelle.getId());
		Mockito.verify(uniteOrganisationnelleRepository).delete(uniteOrganisationnelle);
	}

	@Order(16)
	@DisplayName("Delete objet EtapeInterim By ID: ID not exist")
	@Test
	final void testDeleteNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());
		deleted = uniteOrganisationnelleServiceImpl.delete(uniteOrganisationnelleDto);
		Assertions.assertFalse(deleted);
		Mockito.verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());
		Mockito.verify(uniteOrganisationnelleRepository, Mockito.times(0)).delete(uniteOrganisationnelle);
	}

	@Order(17)
	@DisplayName("Liste objet UniteOrganisationnelle Inferieur: Inferieur exist")
	@Test
	final void testGetUnitesOrganisationnellesInferieuresExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDtoSuperieur,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		UniteOrganisationnelle uniteOrganisationnelleInferieur = modelMapper.map(uniteOrganisationnelleDtoInferieur,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findUniteOrganisationnelleInferieure(uniteOrganisationnelle))
				.thenReturn(Arrays.asList(uniteOrganisationnelleInferieur));

		List<UniteOrganisationnelle> uniteOrganisationnellesFromService = uniteOrganisationnelleServiceImpl
				.findUniteOrganisationnelleInferieure(uniteOrganisationnelleDtoSuperieur.getId());
		Assertions.assertEquals(Arrays.asList(uniteOrganisationnelleInferieur).size(),
				uniteOrganisationnellesFromService.size());
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());
		verify(uniteOrganisationnelleRepository, Mockito.times(1))
				.findUniteOrganisationnelleInferieure(uniteOrganisationnelle);
	}

	@Order(18)
	@DisplayName("Liste objet UniteOrganisationnelle Inferieur: Inferieur not exist")
	@Test
	final void testGetUnitesOrganisationnellesInferieuresNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDtoInferieur,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());

		List<UniteOrganisationnelle> uniteOrganisationnellesFromService = uniteOrganisationnelleServiceImpl
				.findUniteOrganisationnelleInferieure(uniteOrganisationnelleDtoInferieur.getId());
		Assertions.assertNull(uniteOrganisationnellesFromService);
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());
	}

	@Order(19)
	@DisplayName("Liste objet UniteOrganisationnelle Inferieur By IdUniteOrganisationnelle: IdUniteOrganisationnelle exist")
	@Test
	final void testGetUnitesOrganisationnellesInferieuresByIdUniteOrganisationnelleExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		UniteOrganisationnelle uniteOrganisationnelleInferieur = modelMapper.map(uniteOrganisationnelleDtoInferieur,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findUniteOrganisationnelleInferieure(uniteOrganisationnelle))
				.thenReturn(Arrays.asList(uniteOrganisationnelleInferieur));

		List<UniteOrganisationnelleDTO> uniteOrganisationnellesFromService = uniteOrganisationnelleServiceImpl
				.getUnitesOrganisationnellesInferieures(uniteOrganisationnelle.getId());
		Assertions.assertEquals(uniteOrganisationnellesFromService.size(),
				Arrays.asList(uniteOrganisationnelleDtoInferieur).size());
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());
	}

	@Order(20)
	@DisplayName("Liste objet UniteOrganisationnelle Inferieur By IdUniteOrganisationnelle: IdUniteOrganisationnelle not exist")
	@Test
	final void testGetUnitesOrganisationnellesInferieuresByIdUniteOrganisationnelleNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDtoInferieur,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());
        
		Assertions.assertThrows(NoSuchElementException.class, () -> {
			uniteOrganisationnellesDtoVerify = uniteOrganisationnelleServiceImpl
					.getUnitesOrganisationnellesInferieures(uniteOrganisationnelleDtoInferieur.getId());
		});	
		Assertions.assertNull(uniteOrganisationnellesDtoVerify);
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findById(uniteOrganisationnelle.getId());

	}
	@Order(20)
	@DisplayName("Liste objet UniteOrganisationnelle Inferieur By Agent connecté")
	@Test
	final void testGetUnitesOrgInferieurByUniteOrgAgentConnecte() {
		List<UniteOrganisationnelle> etapeInterims = uniteOrganisationnelleDtos.stream()
				.map(unite -> modelMapper.map(unite, UniteOrganisationnelle.class)).collect(Collectors.toList());
		when(uniteOrganisationnelleRepository.findAll()).thenReturn(etapeInterims);
		List<UniteOrganisationnelleDTO> uniteOrganisationnelleDTOsFromService = uniteOrganisationnelleServiceImpl
				.getUnitesOrgInferieurByUniteOrgAgentConnecte(agentDTO);
		Assertions.assertEquals(uniteOrganisationnelleDtos.size(), uniteOrganisationnelleDTOsFromService.size());
		verify(uniteOrganisationnelleRepository, Mockito.times(1)).findAll();
		
	}
}
