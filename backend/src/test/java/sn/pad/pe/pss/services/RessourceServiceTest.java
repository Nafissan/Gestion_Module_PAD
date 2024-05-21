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
import sn.pad.pe.pss.bo.Ressource;
import sn.pad.pe.pss.dto.RessourceDTO;
import sn.pad.pe.pss.repositories.RessourceRepository;
import sn.pad.pe.pss.services.impl.RessourceServiceImpl;

@DisplayName("Test Service Ressource")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class RessourceServiceTest {

	@InjectMocks
	private RessourceServiceImpl ressourceServiceImpl;
	@Mock
	private RessourceRepository ressourceRepository;
	@Spy
	private ModelMapper modelMapper;
	private static RessourceDTO ressourceDto;
	private static RessourceDTO ressourceDtoVerify;
	private static List<RessourceDTO> ressourceDtos;
	private static boolean updated;
	private static boolean deleted;
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		ressourceDto = new RessourceDTO();
		ressourceDto.setName("G-C");
		ressourceDto.setNomRessource("GESTION CONGE");
		
		ressourceDtos = Arrays.asList(ressourceDto);
	}

	@BeforeEach
	void setUp() throws Exception {
	}
	@Order(1)
	@DisplayName("Liste objet Ressource")
	@Test
	final void testGetRessources() {
		List<Ressource> ressources = ressourceDtos.stream()
				.map(ressource -> modelMapper.map(ressource, Ressource.class)).collect(Collectors.toList());
		when(ressourceRepository.findAll()).thenReturn(ressources);
		List<RessourceDTO> ressourceDTOsFromService = ressourceServiceImpl.getRessources();
		Assertions.assertEquals(ressourceDtos.size(), ressourceDTOsFromService.size());
		verify(ressourceRepository, Mockito.times(1)).findAll();
	}
	@Order(2)
	@DisplayName("Get Objet Ressource By ID: ID exist")
	@Test
	final void testGetRessourceByIdExist() {
		Ressource ressource = modelMapper.map(ressourceDto, Ressource.class);
		when(ressourceRepository.findById(ressource.getName())).thenReturn(Optional.of(ressource));
		RessourceDTO  etapeInterimDTOFromService = ressourceServiceImpl.getRessourceById(ressource.getName());
		Assertions.assertEquals(ressourceDto.getName(), etapeInterimDTOFromService.getName());
		verify(ressourceRepository, Mockito.times(1)).findById(ressource.getName());
	}
	@Order(3)
	@DisplayName("Get Objet Ressource By ID: ID not exist")
	@Test
	final void testGetRessourceByIdNotExist() {
		Ressource ressource = modelMapper.map(ressourceDto, Ressource.class);
		when(ressourceRepository.findById(ressource.getName())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			ressourceDtoVerify = ressourceServiceImpl.getRessourceById(ressource.getName());
		});
		Assertions.assertNull(ressourceDtoVerify);
		verify(ressourceRepository, Mockito.times(1)).findById(ressource.getName());
	}
	@Order(4)
	@DisplayName("Create objet Ressource")
	@Test
	final void testCreate() {
		Ressource ressource = modelMapper.map(ressourceDto, Ressource.class);
		when(modelMapper.map(ressourceDto, Ressource.class)).thenReturn(ressource);
		when(ressourceRepository.save(ressource)).thenReturn(ressource);
		when(modelMapper.map(ressource, RessourceDTO.class)).thenReturn(ressourceDto);
		RessourceDTO ressourceDTOFromService = ressourceServiceImpl
				.create(ressourceDto);
		Assertions.assertEquals(ressourceDto, ressourceDTOFromService);
		verify(ressourceRepository, Mockito.times(1)).save(ressource);
	}
	@Order(5)
	@DisplayName("Update Objet Ressource: Object exist")
	@Test
	final void testUpdateExist() {
		Ressource ressource = modelMapper.map(ressourceDto, Ressource.class);
		when(modelMapper.map(ressourceDto, Ressource.class)).thenReturn(ressource);
		when(ressourceRepository.findById(ressource.getName())).thenReturn(Optional.of(ressource));
		when(ressourceRepository.save(ressource)).thenReturn(ressource);
		updated = ressourceServiceImpl.update(ressourceDto);
		Assertions.assertTrue(updated);
		Mockito.verify(ressourceRepository).findById(ressource.getName());
		Mockito.verify(ressourceRepository).save(ressource);
	}
	@Order(6)
	@DisplayName("Update Objet Ressource: Object not exist")
	@Test
	final void testUpdateNotExist() {
		Ressource ressource = modelMapper.map(ressourceDto, Ressource.class);
		when(ressourceRepository.findById(ressource.getName())).thenReturn(Optional.empty());
		updated = ressourceServiceImpl.update(ressourceDto);
		Assertions.assertFalse(updated);
		Mockito.verify(ressourceRepository, Mockito.times(1)).findById(ressource.getName());
		Mockito.verify(ressourceRepository, Mockito.times(0)).save(ressource);
	}
	@Order(7)
	@DisplayName("Delete objet Ressource By ID: ID exist")
	@Test
	final void testDeleteExist() {
		Ressource ressource = modelMapper.map(ressourceDto, Ressource.class);
		when(ressourceRepository.findById(ressource.getName())).thenReturn(Optional.of(ressource));
		doNothing().when(ressourceRepository).delete(ressource);
		deleted = ressourceServiceImpl.delete(ressourceDto);
		Assertions.assertTrue(deleted);
		Mockito.verify(ressourceRepository).findById(ressource.getName());
		Mockito.verify(ressourceRepository).delete(ressource);
	}
	@Order(8)
	@DisplayName("Delete objet Ressource By ID: ID not exist")
	@Test
	final void testDeleteNotEXist() {
		Ressource ressource = modelMapper.map(ressourceDto, Ressource.class);
		when(ressourceRepository.findById(ressource.getName())).thenReturn(Optional.empty());
		deleted = ressourceServiceImpl.delete(ressourceDto);
		Assertions.assertFalse(deleted);
		Mockito.verify(ressourceRepository, Mockito.times(1)).findById(ressource.getName());
		Mockito.verify(ressourceRepository, Mockito.times(0)).delete(ressource);
	}

}
