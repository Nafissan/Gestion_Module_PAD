package sn.pad.pe.pss.services;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
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

import sn.pad.pe.pss.bo.Parametres;
import sn.pad.pe.pss.dto.ParametresDTO;
import sn.pad.pe.pss.repositories.ParametreRepository;
import sn.pad.pe.pss.services.impl.ParametreDaoImpl;

@DisplayName("Test Service Parametres")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class ParametreDaoTest {
	@Mock
	private ParametreRepository parametreRepository;
	@InjectMocks
	private ParametreDaoImpl parametreDaoImpl;
	@Spy
	private ModelMapper modelMapper;
	private static ParametresDTO parametresDTO;
	private static List<ParametresDTO> parametresDTOs;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		parametresDTO = new ParametresDTO();
		parametresDTO.setIdparametre(1);
		parametresDTO.setCode("PARAM_1115");
		
		parametresDTOs = Arrays.asList(parametresDTO);
	}

	@BeforeEach
	void setUp() throws Exception {
	}
	@Order(1)
	@DisplayName("Liste objet Parametres")
	@Test
	final void testFindAllParametre() {
		List<Parametres> parametres = parametresDTOs.stream()
				.map(param -> modelMapper.map(param, Parametres.class)).collect(Collectors.toList());
		when(parametreRepository.findAll()).thenReturn(parametres);
		List<ParametresDTO> parametresDTOsFromService = parametreDaoImpl.findAllParametre();
		Assertions.assertEquals(parametresDTOs.size(), parametresDTOsFromService.size());
		verify(parametreRepository, Mockito.times(1)).findAll();
	}
	@Order(2)
	@DisplayName("Liste objet Parametres By Code")
	@Test
	final void testChercherListParametreByCode() {
		List<Parametres> parametres = parametresDTOs.stream()
				.map(param -> modelMapper.map(param, Parametres.class)).collect(Collectors.toList());
		when(parametreRepository.findParametresByCode(parametresDTO.getCode())).thenReturn(parametres);
		List<ParametresDTO> parametresDTOsFromService = parametreDaoImpl.chercherListParametreByCode(parametresDTO.getCode());
		Assertions.assertEquals(parametresDTOs.size(), parametresDTOsFromService.size());
		verify(parametreRepository, Mockito.times(1)).findParametresByCode(parametresDTO.getCode());
	}
	@Order(3)
	@DisplayName("Create objet Parametres")
	@Test
	final void testSaveParametre() {
		Parametres parametre = modelMapper.map(parametresDTOs, Parametres.class);
		when(modelMapper.map(parametresDTO, Parametres.class)).thenReturn(parametre);
		when(parametreRepository.save(parametre)).thenReturn(parametre);
		when(modelMapper.map(parametre, ParametresDTO.class)).thenReturn(parametresDTO);
		ParametresDTO parametresDTOFromService = parametreDaoImpl.saveParametre(parametresDTO);
		Assertions.assertEquals(parametresDTO, parametresDTOFromService);
		verify(parametreRepository, Mockito.times(1)).save(parametre);
	}

}
