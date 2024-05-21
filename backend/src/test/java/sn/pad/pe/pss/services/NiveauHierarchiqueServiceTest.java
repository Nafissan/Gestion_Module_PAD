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
import sn.pad.pe.pss.bo.NiveauHierarchique;
import sn.pad.pe.pss.dto.NiveauHierarchiqueDTO;
import sn.pad.pe.pss.repositories.NiveauHierarchiqueRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.impl.NiveauHierarchiqueServiceImpl;

/**
 * 
 * @author adama.thiaw
 *
 */
@DisplayName("Test Service NiveauHierarchique")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class NiveauHierarchiqueServiceTest {

	@Mock
	private NiveauHierarchiqueRepository niveauHierarchiqueRepository;

	@Mock
	private UniteOrganisationnelleRepository uniteRepository;

	@InjectMocks
	private NiveauHierarchiqueServiceImpl niveauHierarchiqueServiceImpl;

	@Spy
	private ModelMapper modelMapper;

	private static NiveauHierarchiqueDTO niveauHierarchiqueDTO;
	private static NiveauHierarchiqueDTO niveauHierarchiqueDTOVerify;
	private static List<NiveauHierarchiqueDTO> niveauxHierarchiquesDto;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		niveauHierarchiqueDTO = new NiveauHierarchiqueDTO();
		niveauHierarchiqueDTO.setId(1L);
		niveauHierarchiqueDTO.setLibelle("Niveau1");
		niveauHierarchiqueDTO.setPosition(4);

		niveauxHierarchiquesDto = Arrays.asList(niveauHierarchiqueDTO);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet NiveauHierarchique")
	@Test
	final void testGetComptes() {
		List<NiveauHierarchique> niveauHierarchiques = niveauxHierarchiquesDto.stream()
				.map(niveauHierarchique -> modelMapper.map(niveauHierarchique, NiveauHierarchique.class))
				.collect(Collectors.toList());
		when(niveauHierarchiqueRepository.findAll()).thenReturn(niveauHierarchiques);
		List<NiveauHierarchiqueDTO> niveauHierarchiqueDTOsFromService = niveauHierarchiqueServiceImpl
				.getNiveauxHierarchique();
		Assertions.assertEquals(niveauxHierarchiquesDto.size(), niveauHierarchiqueDTOsFromService.size());
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet NiveauHierarchique By ID: ID exist")
	@Test
	final void testGetNiveauHierarchiqueByIdExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(niveauHierarchiqueRepository.findById(niveauHierarchique.getId()))
				.thenReturn(Optional.of(niveauHierarchique));
		NiveauHierarchiqueDTO niveauHierarchiqueDTOFromService = niveauHierarchiqueServiceImpl
				.getNiveauHierarchiqueById(niveauHierarchique.getId());
		Assertions.assertEquals(niveauHierarchiqueDTO.getId(), niveauHierarchiqueDTOFromService.getId());
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findById(niveauHierarchique.getId());
	}

	@Order(3)
	@DisplayName("Get Objet NiveauHierarchique By ID: ID not exist")
	@Test
	final void testGetNiveauHierarchiqueByIdNoExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(niveauHierarchiqueRepository.findById(niveauHierarchique.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			niveauHierarchiqueDTOVerify = niveauHierarchiqueServiceImpl
					.getNiveauHierarchiqueById(niveauHierarchique.getId());
		});
		Assertions.assertNull(niveauHierarchiqueDTOVerify);
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findById(niveauHierarchique.getId());
	}

	@Order(4)
	@DisplayName("Get Objet NiveauHierarchique By Position: Position exist")
	@Test
	final void testGetNiveauHierarchiqueByPositionExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(niveauHierarchiqueRepository.findByPosition(niveauHierarchique.getPosition()))
				.thenReturn(niveauHierarchique);
		NiveauHierarchiqueDTO niveauHierarchiqueDTOFromService = niveauHierarchiqueServiceImpl
				.getNiveauHierarchiqueByPosition(niveauHierarchique.getPosition());
		Assertions.assertEquals(niveauHierarchiqueDTO.getId(), niveauHierarchiqueDTOFromService.getId());
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findByPosition(niveauHierarchique.getPosition());
	}

	@Order(5)
	@DisplayName("Get Objet NiveauHierarchique By Position: Position not exist")
	@Test
	final void testGetNiveauHierarchiqueByPositionNoExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(niveauHierarchiqueRepository.findByPosition(niveauHierarchique.getPosition())).thenReturn(null);
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			niveauHierarchiqueDTOVerify = niveauHierarchiqueServiceImpl
					.getNiveauHierarchiqueByPosition(niveauHierarchique.getPosition());
		});
		Assertions.assertNull(niveauHierarchiqueDTOVerify);
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findByPosition(niveauHierarchique.getPosition());
	}

	@Order(6)
	@DisplayName("Create objet NiveauHierarchique: Object not exist")
	@Test
	final void testCreateNotExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(niveauHierarchiqueRepository.findByPosition(niveauHierarchique.getPosition())).thenReturn(null);
		when(modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class)).thenReturn(niveauHierarchique);
		when(niveauHierarchiqueRepository.save(niveauHierarchique)).thenReturn(niveauHierarchique);
		when(modelMapper.map(niveauHierarchique, NiveauHierarchiqueDTO.class)).thenReturn(niveauHierarchiqueDTO);
		NiveauHierarchiqueDTO niveauHierarchiqueDTOFromService = niveauHierarchiqueServiceImpl
				.create(niveauHierarchiqueDTO);
		Assertions.assertEquals(niveauHierarchiqueDTO, niveauHierarchiqueDTOFromService);
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findByPosition(niveauHierarchique.getPosition());
		verify(niveauHierarchiqueRepository, Mockito.times(1)).save(niveauHierarchique);
	}

	@Order(7)
	@DisplayName("Create objet NiveauHierarchique: Object exist")
	@Test
	final void testCreateExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(niveauHierarchiqueRepository.findByPosition(niveauHierarchique.getPosition()))
				.thenReturn(niveauHierarchique);
		niveauHierarchiqueDTOVerify = niveauHierarchiqueServiceImpl.create(niveauHierarchiqueDTO);
		Assertions.assertNull(niveauHierarchiqueDTOVerify);
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findByPosition(niveauHierarchique.getPosition());
	}

	@Order(8)
	@DisplayName("Update Objet NiveauHierarchique: Position exist")
	@Test
	final void testUpdatePositionExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(niveauHierarchiqueRepository.findByPosition(niveauHierarchique.getPosition()))
				.thenReturn(niveauHierarchique);
		updated = niveauHierarchiqueServiceImpl.update(niveauHierarchiqueDTO);
		Assertions.assertFalse(updated);
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findByPosition(niveauHierarchique.getPosition());
	}

	@Order(9)
	@DisplayName("Update Objet NiveauHierarchique: Position not exist and Object Exist")
	@Test
	final void testUpdatePositionNotExistAndObjectExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(niveauHierarchiqueRepository.findByPosition(niveauHierarchique.getPosition()))
				.thenReturn(niveauHierarchique);

		when(niveauHierarchiqueRepository.findById(niveauHierarchique.getId()))
				.thenReturn(Optional.of(niveauHierarchique));

		when(modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class)).thenReturn(niveauHierarchique);
		when(niveauHierarchiqueRepository.save(niveauHierarchique)).thenReturn(niveauHierarchique);

		updated = niveauHierarchiqueServiceImpl.update(niveauHierarchiqueDTO);

		Assertions.assertTrue(updated);
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findByPosition(niveauHierarchique.getPosition());
		verify(niveauHierarchiqueRepository, Mockito.times(1)).save(niveauHierarchique);
	}

	@Order(10)
	@DisplayName("Update Objet NiveauHierarchique: Position not exist and Object not Exist")
	@Test
	final void testUpdatePositionNotExistAndObjectNotExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(niveauHierarchiqueRepository.findByPosition(niveauHierarchique.getPosition()))
				.thenReturn(niveauHierarchique);

		when(niveauHierarchiqueRepository.findById(niveauHierarchique.getId())).thenReturn(Optional.empty());

		updated = niveauHierarchiqueServiceImpl.update(niveauHierarchiqueDTO);

		Assertions.assertFalse(updated);
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findByPosition(niveauHierarchique.getPosition());
		verify(niveauHierarchiqueRepository, Mockito.times(0)).save(niveauHierarchique);
	}
	@Order(10)
	@DisplayName("Update Objet NiveauHierarchique: Position different and Object not Exist")
	@Test
	final void testUpdatePositionDifferentAndObjectNotExist() {
		NiveauHierarchique niveauHierarchique = new NiveauHierarchique();
		niveauHierarchique.setId(2L);
		niveauHierarchique.setPosition(4);
		niveauHierarchique.setLibelle("LIBELLE");
		when(niveauHierarchiqueRepository.findByPosition(niveauHierarchique.getPosition()))
		.thenReturn(niveauHierarchique);
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			updated = niveauHierarchiqueServiceImpl.update(niveauHierarchiqueDTO);
		});
		Assertions.assertFalse(updated);
		verify(niveauHierarchiqueRepository, Mockito.times(1)).findByPosition(niveauHierarchique.getPosition());
		verify(niveauHierarchiqueRepository, Mockito.times(0)).save(niveauHierarchique);
	}

	@Order(11)
	@DisplayName("Delete Objet NiveauHierarchique: Object Exist and has no link")
	@Test
	final void testDeleteExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class)).thenReturn(niveauHierarchique);
		when(uniteRepository.existsByNiveauHierarchique(niveauHierarchique)).thenReturn(false);
		when(niveauHierarchiqueRepository.findById(niveauHierarchique.getId()))
				.thenReturn(Optional.of(niveauHierarchique));
		doNothing().when(niveauHierarchiqueRepository).delete(niveauHierarchique);

		deleted = niveauHierarchiqueServiceImpl.delete(niveauHierarchiqueDTO);
		Assertions.assertTrue(deleted);
		Mockito.verify(niveauHierarchiqueRepository).findById(niveauHierarchique.getId());
		Mockito.verify(niveauHierarchiqueRepository).delete(niveauHierarchique);

	}

	@Order(12)
	@DisplayName("Delete Objet NiveauHierarchique: Object Exist and has link")
	@Test
	final void testDeleteNotExist() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class)).thenReturn(niveauHierarchique);
		when(uniteRepository.existsByNiveauHierarchique(niveauHierarchique)).thenReturn(true);
		when(niveauHierarchiqueRepository.findById(niveauHierarchique.getId()))
				.thenReturn(Optional.of(niveauHierarchique));
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			deleted = niveauHierarchiqueServiceImpl.delete(niveauHierarchiqueDTO);
		});
		Mockito.verify(niveauHierarchiqueRepository, Mockito.times(1)).findById(niveauHierarchique.getId());
		Mockito.verify(niveauHierarchiqueRepository, Mockito.times(0)).delete(niveauHierarchique);

	}
	@Order(12)
	@DisplayName("Delete Objet NiveauHierarchique: Object not Exist and has link")
	@Test
	final void testDeleteNotObject() {
		NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		when(modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class)).thenReturn(niveauHierarchique);
		when(uniteRepository.existsByNiveauHierarchique(niveauHierarchique)).thenReturn(true);
		when(niveauHierarchiqueRepository.findById(niveauHierarchique.getId()))
		.thenReturn(Optional.empty());
			deleted = niveauHierarchiqueServiceImpl.delete(niveauHierarchiqueDTO);
		Assertions.assertFalse(deleted);
		Mockito.verify(niveauHierarchiqueRepository, Mockito.times(1)).findById(niveauHierarchique.getId());
		Mockito.verify(niveauHierarchiqueRepository, Mockito.times(0)).delete(niveauHierarchique);
		
	}
}
