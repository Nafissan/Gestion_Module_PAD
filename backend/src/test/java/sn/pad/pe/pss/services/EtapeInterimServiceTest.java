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
import sn.pad.pe.pss.bo.EtapeInterim;
import sn.pad.pe.pss.bo.Interim;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.EtapeInterimDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.EtapeInterimRepository;
import sn.pad.pe.pss.repositories.InterimRepository;
import sn.pad.pe.pss.services.impl.EtapeInterimServiceImpl;

@DisplayName("Test Service EtapeInterim")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class EtapeInterimServiceTest {
	@Mock 
	private EtapeInterimRepository etapeInterimRepository;
	@Mock 
	private InterimRepository interimRepository;
	@InjectMocks
	private EtapeInterimServiceImpl etapeInterimServiceImpl;
	@Spy
	private ModelMapper modelMapper;
	private static EtapeInterimDTO etapeInterimDTO;
	private static EtapeInterimDTO etapeInterimDTOVerify;
	private static List<EtapeInterimDTO> etapeInterimDTOs;
	private static InterimDTO interimDTO;
	private static AgentDTO  agentDepart;
	private static AgentDTO  agentArrive;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDTO;
	private static boolean updated;
	private static boolean deleted;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		agentDepart = new AgentDTO();
		agentDepart.setId(1L);
	    
		agentArrive = new AgentDTO();
		agentArrive.setId(2L);
		
		uniteOrganisationnelleDTO = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDTO.setId(1L);
	
		interimDTO = new InterimDTO();
		interimDTO.setId(1L);
		interimDTO.setAgentDepart(agentDepart);
		interimDTO.setAgentArrive(agentArrive);
		interimDTO.setUniteOrganisationnelle(uniteOrganisationnelleDTO);
		
		etapeInterimDTO = new EtapeInterimDTO();
		etapeInterimDTO.setId(1L);
		etapeInterimDTO.setInterim(interimDTO);
		etapeInterimDTOs = Arrays.asList(etapeInterimDTO);
	}

	@BeforeEach
	void setUp() throws Exception {
	}
	@Order(1)
	@DisplayName("Liste objet EtapeInterim")
	@Test
	final void testGetEtapeInterims() {
		List<EtapeInterim> etapeInterims = etapeInterimDTOs.stream()
				.map(etapeInterim -> modelMapper.map(etapeInterim, EtapeInterim.class)).collect(Collectors.toList());
		when(etapeInterimRepository.findAll()).thenReturn(etapeInterims);
		List<EtapeInterimDTO> etapeInterimDTOsFromService = etapeInterimServiceImpl.getEtapeInterims();
		Assertions.assertEquals(etapeInterimDTOs.size(), etapeInterimDTOsFromService.size());
		verify(etapeInterimRepository, Mockito.times(1)).findAll();
	}
	@Order(2)
	@DisplayName("Liste objet EtapeInterim by Interim")
	@Test
	final void testFindEtapeInterimsByInterim() {
		Interim interim = modelMapper.map(interimDTO, Interim.class);
		when(modelMapper.map(interimDTO, Interim.class)).thenReturn(interim);
		List<EtapeInterim> etapeInterims = etapeInterimDTOs.stream()
				.map(etapeInterim -> modelMapper.map(etapeInterim, EtapeInterim.class)).collect(Collectors.toList());
		when(etapeInterimRepository.findEtapeInterimsByInterim(interim)).thenReturn(etapeInterims);
		List<EtapeInterimDTO> etapeInterimDTOsFromService = etapeInterimServiceImpl.findEtapeInterimsByInterim(interimDTO);
		Assertions.assertEquals(etapeInterimDTOs.size(), etapeInterimDTOsFromService.size());
		verify(etapeInterimRepository, Mockito.times(1)).findEtapeInterimsByInterim(interim);
	}
	@Order(3)
	@DisplayName("Get Objet EtapeInterim By ID: ID exist")
	@Test
	final void testGetEtapeInterimByIdExist() {
		EtapeInterim etapeInterim = modelMapper.map(etapeInterimDTO, EtapeInterim.class);
		when(etapeInterimRepository.findById(etapeInterim.getId())).thenReturn(Optional.of(etapeInterim));
		EtapeInterimDTO  etapeInterimDTOFromService = etapeInterimServiceImpl.getEtapeInterimById(etapeInterim.getId());
		Assertions.assertEquals(etapeInterimDTO.getId(), etapeInterimDTOFromService.getId());
		verify(etapeInterimRepository, Mockito.times(1)).findById(etapeInterim.getId());
	}
	@Order(4)
	@DisplayName("Get Objet EtapeInterim by ID: ID not exist")
	@Test
	final void testGetEtapeInterimByIdNotExist() {
		EtapeInterim etapeInterim = modelMapper.map(etapeInterimDTO, EtapeInterim.class);
		when(etapeInterimRepository.findById(etapeInterim.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			etapeInterimDTOVerify = etapeInterimServiceImpl.getEtapeInterimById(etapeInterim.getId());
		});
		Assertions.assertNull(etapeInterimDTOVerify);
		verify(etapeInterimRepository, Mockito.times(1)).findById(etapeInterim.getId());
	}
	@Order(5)
	@DisplayName("Create objet EtapeInterim")
	@Test
	final void testCreate() {
		EtapeInterim etapeInterim = modelMapper.map(etapeInterimDTO, EtapeInterim.class);
		when(modelMapper.map(etapeInterimDTO, EtapeInterim.class)).thenReturn(etapeInterim);
		when(etapeInterimRepository.save(etapeInterim)).thenReturn(etapeInterim);
		when(modelMapper.map(etapeInterim, EtapeInterimDTO.class)).thenReturn(etapeInterimDTO);
		EtapeInterimDTO etapeInterimDTOFromService = etapeInterimServiceImpl
				.create(etapeInterimDTO);
		Assertions.assertEquals(etapeInterimDTO, etapeInterimDTOFromService);
		verify(etapeInterimRepository, Mockito.times(1)).save(etapeInterim);
	}
	@Order(6)
	@DisplayName("Update Objet EtapeInterim: Object exist")
	@Test
	final void testUpdateExist() {
		EtapeInterim etapeInterim = modelMapper.map(etapeInterimDTO, EtapeInterim.class);
		when(modelMapper.map(etapeInterimDTO, EtapeInterim.class)).thenReturn(etapeInterim);
		when(etapeInterimRepository.findById(etapeInterim.getId())).thenReturn(Optional.of(etapeInterim));
		when(etapeInterimRepository.save(etapeInterim)).thenReturn(etapeInterim);
		updated = etapeInterimServiceImpl.update(etapeInterimDTO);
		Assertions.assertTrue(updated);
		Mockito.verify(etapeInterimRepository).findById(etapeInterim.getId());
		Mockito.verify(etapeInterimRepository).save(etapeInterim);
	}
	@Order(7)
	@DisplayName("Update Objet EtapeInterim: Object not exist")
	@Test
	final void testUpdateNotExist() {
		EtapeInterim etapeInterim = modelMapper.map(etapeInterimDTO, EtapeInterim.class);
		when(etapeInterimRepository.findById(etapeInterim.getId())).thenReturn(Optional.empty());
		updated = etapeInterimServiceImpl.update(etapeInterimDTO);
		Assertions.assertFalse(updated);
		Mockito.verify(etapeInterimRepository, Mockito.times(1)).findById(etapeInterim.getId());
		Mockito.verify(etapeInterimRepository, Mockito.times(0)).save(etapeInterim);
	}
	@Order(8)
	@DisplayName("Delete objet EtapeInterim By ID: ID exist")
	@Test
	final void testDeleteExist() {
		EtapeInterim etapeInterim = modelMapper.map(etapeInterimDTO, EtapeInterim.class);
		when(etapeInterimRepository.findById(etapeInterim.getId())).thenReturn(Optional.of(etapeInterim));
		doNothing().when(etapeInterimRepository).delete(etapeInterim);
		deleted = etapeInterimServiceImpl.delete(etapeInterimDTO);
		Assertions.assertTrue(deleted);
		Mockito.verify(etapeInterimRepository).findById(etapeInterim.getId());
		Mockito.verify(etapeInterimRepository).delete(etapeInterim);
	}
	@Order(9)
	@DisplayName("Delete objet EtapeInterim By ID: ID not exist")
	@Test
	final void testDeleteNotExist() {
		EtapeInterim etapeInterim = modelMapper.map(etapeInterimDTO, EtapeInterim.class);
		when(etapeInterimRepository.findById(etapeInterim.getId())).thenReturn(Optional.empty());
		deleted = etapeInterimServiceImpl.delete(etapeInterimDTO);
		Assertions.assertFalse(deleted);
		Mockito.verify(etapeInterimRepository, Mockito.times(1)).findById(etapeInterim.getId());
		Mockito.verify(etapeInterimRepository, Mockito.times(0)).delete(etapeInterim);
	}

}
