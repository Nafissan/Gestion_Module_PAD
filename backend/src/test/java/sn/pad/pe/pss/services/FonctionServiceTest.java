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
import sn.pad.pe.pss.bo.Fonction;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.FonctionDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.AgentRepository;
import sn.pad.pe.pss.repositories.FonctionRepository;
import sn.pad.pe.pss.services.impl.FonctionServiceImpl;

@DisplayName("Test Service Fonction")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class FonctionServiceTest {
	@Spy
	private ModelMapper modelMapper;
	@Mock
	private FonctionRepository fonctionRepository;
	@InjectMocks
	private static FonctionServiceImpl fonctionServiceImpl;
	@Mock
	private AgentRepository agentRepository;
	@Mock
	private UniteOrganisationnelleService uniteOrganisationnelleService;

	private static FonctionDTO fonctionDTO;
	private static FonctionDTO fonctionDTOVerify;
	private static List<FonctionDTO> fonctionDTOs;
	private static boolean updated;
	private static boolean deleted;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDto;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		fonctionDTO = new FonctionDTO();
		fonctionDTO.setId(1L);
		fonctionDTO.setNom("Ingénieur");
		
		uniteOrganisationnelleDto = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDto.setId(1L);
		uniteOrganisationnelleDto.setCode("DD05281");
		
		fonctionDTO.setUniteOrganisationnelle(Arrays.asList(uniteOrganisationnelleDto));

		fonctionDTOs = Arrays.asList(fonctionDTO);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet Fonction")
	@Test
	final void testGetFonctions() {
		List<Fonction> fonctions = fonctionDTOs.stream().map(fonction -> modelMapper.map(fonction, Fonction.class))
				.collect(Collectors.toList());
		when(fonctionRepository.findAll()).thenReturn(fonctions);
		List<FonctionDTO> fonctionDTOsFromService = fonctionServiceImpl.getFonctions();
		Assertions.assertEquals(fonctionDTOs.size(), fonctionDTOsFromService.size());
		verify(fonctionRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet Fonction by ID: ID exist")
	@Test
	final void testGetFonctionByIdExist() {
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		when(fonctionRepository.findById(fonction.getId())).thenReturn(Optional.of(fonction));
		FonctionDTO fonctionDTOFromService = fonctionServiceImpl.getFonctionById(fonction.getId());
		Assertions.assertEquals(fonctionDTO.getId(), fonctionDTOFromService.getId());
		verify(fonctionRepository, Mockito.times(1)).findById(fonction.getId());
	}

	@Order(3)
	@DisplayName("Get Objet Fonction by ID: ID not exist")
	@Test
	final void testGetFonctionByIdNotExist() {
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		when(fonctionRepository.findById(fonction.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			fonctionDTOVerify = fonctionServiceImpl.getFonctionById(fonction.getId());
		});
		Assertions.assertNull(fonctionDTOVerify);
		verify(fonctionRepository, Mockito.times(1)).findById(fonction.getId());
	}

	@Order(4)
	@DisplayName("Get Objet Fonction by NOM: NOM exist")
	@Test
	final void testGetFonctionByNom() {
		List<Fonction> fonctions = fonctionDTOs.stream().map(fonction -> modelMapper.map(fonction, Fonction.class))
				.collect(Collectors.toList());
		when(fonctionRepository.findFonctionByNom(fonctionDTO.getNom())).thenReturn(fonctions);
		List<FonctionDTO> fonctionDTOsFromService = fonctionServiceImpl.getFonctionByNom(fonctionDTO.getNom());
		Assertions.assertEquals(fonctionDTOs.size(), fonctionDTOsFromService.size());
		verify(fonctionRepository, Mockito.times(1)).findFonctionByNom(fonctionDTO.getNom());
	}

	@Order(5)
	@DisplayName("Get Objet Fonction by UniteOrganisationnelle")
	@Test
	final void testGetFonctionByUniteOrganisationnelle() {
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		when(uniteOrganisationnelleService.getUniteOrganisationnelleById(uniteOrganisationnelleDto.getId())).thenReturn(uniteOrganisationnelleDto);
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDto, UniteOrganisationnelle.class);
		when(modelMapper.map(uniteOrganisationnelleDto, UniteOrganisationnelle.class)).thenReturn(uniteOrganisationnelle);
	    when(fonctionRepository.findFonctionByUniteOrganisationnelle(Arrays.asList(uniteOrganisationnelle))).thenReturn(Arrays.asList(fonction));
	
	    List<FonctionDTO> fonctionDTOsFromService = fonctionServiceImpl.getFonctionByUniteOrganisationnelle(uniteOrganisationnelle.getId());
	    Assertions.assertEquals(Arrays.asList(fonction).size(), fonctionDTOsFromService.size());
		verify(fonctionRepository, Mockito.times(1)).findFonctionByUniteOrganisationnelle(Arrays.asList(uniteOrganisationnelle));
	}

	@Order(6)
	@DisplayName("Create objet Fonction")
	@Test
	final void testCreate() {
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		when(modelMapper.map(fonctionDTO, Fonction.class)).thenReturn(fonction);
		when(fonctionRepository.save(fonction)).thenReturn(fonction);
		when(modelMapper.map(fonction, FonctionDTO.class)).thenReturn(fonctionDTO);
		FonctionDTO fonctionDTODTOFromService = fonctionServiceImpl.create(fonctionDTO);
		Assertions.assertEquals(fonctionDTO, fonctionDTODTOFromService);
		verify(fonctionRepository, Mockito.times(1)).save(fonction);
	}

	@Order(7)
	@DisplayName("Update Objet Fonction: Object exist")
	@Test
	final void testUpdateExist() {
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		when(modelMapper.map(fonctionDTO, Fonction.class)).thenReturn(fonction);
		when(fonctionRepository.findById(fonction.getId())).thenReturn(Optional.of(fonction));
		when(fonctionRepository.save(fonction)).thenReturn(fonction);
		updated = fonctionServiceImpl.update(fonctionDTO);
		Assertions.assertTrue(updated);
		Mockito.verify(fonctionRepository).findById(fonction.getId());
		Mockito.verify(fonctionRepository).save(fonction);
	}

	@Order(8)
	@DisplayName("Update Objet Fonction: Object not exist")
	@Test
	final void testUpdateNotExist() {
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		when(fonctionRepository.findById(fonction.getId())).thenReturn(Optional.empty());
		updated = fonctionServiceImpl.update(fonctionDTO);
		Assertions.assertFalse(updated);
		Mockito.verify(fonctionRepository, Mockito.times(1)).findById(fonction.getId());
		Mockito.verify(fonctionRepository, Mockito.times(0)).save(fonction);
	}

	@Order(9)
	@DisplayName("Delete objet Fonction By ID: ID exist")
	@Test
	final void testDeleteExist() {
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		when(modelMapper.map(fonctionDTO, Fonction.class)).thenReturn(fonction);
		when(fonctionRepository.findById(fonction.getId())).thenReturn(Optional.of(fonction));
		doNothing().when(fonctionRepository).delete(fonction);
		deleted = fonctionServiceImpl.delete(fonctionDTO);
		Assertions.assertTrue(deleted);
		Mockito.verify(fonctionRepository).findById(fonction.getId());
		Mockito.verify(fonctionRepository).delete(fonction);
	}

	@Order(10)
	@DisplayName("Delete objet Fonction By ID: ID not exist")
	@Test
	final void testDeleteNotExist() {
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		when(modelMapper.map(fonctionDTO, Fonction.class)).thenReturn(fonction);
		when(fonctionRepository.findById(fonction.getId())).thenReturn(Optional.empty());
		deleted = fonctionServiceImpl.delete(fonctionDTO);
		Assertions.assertFalse(deleted);
		Mockito.verify(fonctionRepository, Mockito.times(1)).findById(fonction.getId());
		Mockito.verify(fonctionRepository, Mockito.times(0)).delete(fonction);
	}

}
