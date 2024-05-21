package sn.pad.pe.pss.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Date;
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
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Conge;
import sn.pad.pe.pss.bo.HistoriqueConge;
import sn.pad.pe.pss.bo.PlanningConge;
import sn.pad.pe.pss.dto.HistoriqueCongeDTO;
import sn.pad.pe.pss.repositories.CongeRepository;
import sn.pad.pe.pss.repositories.HistoriqueCongeRepository;
import sn.pad.pe.pss.services.impl.HistoriqueCongeServiceImpl;

@DisplayName("Test Service HistoriqueConge")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class HistoriqueCongeServiceTest {

	@InjectMocks
	private HistoriqueCongeServiceImpl historiqueCongeServiceImpl;
	@Mock
	private HistoriqueCongeRepository historiqueCongeRepository;
	@Spy
	private ModelMapper modelMapper;

	private static HistoriqueConge historiqueConge1;
	private static HistoriqueConge historiqueConge2;
	private static HistoriqueConge historiqueConge3;
	private static HistoriqueConge historiqueConge4;
	private static HistoriqueCongeDTO HistoriqueCongeDTO;
	private static boolean updated;
	private static boolean deleted;
	private static Conge conge;
	private static Agent agent;
	private static PlanningConge planningConge;
	@Mock
	private CongeRepository congeRepository;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		agent = new Agent();
		agent.setMatricule("607043");
		agent.setEmail("ada@gmail.com");
		agent.setId(1L);

		planningConge = new PlanningConge();
		planningConge.setCode("PL-2020-DCH");
		planningConge.setDateCreation(new Date());
		planningConge.setEtat("SAISI");

		conge = new Conge();
		conge.setId(1L);
		conge.setAgent(agent);
		conge.setPlanningConge(planningConge);

		historiqueConge1 = new HistoriqueConge();
		historiqueConge1.setId(1L);
		historiqueConge1.setConge(conge);

		historiqueConge2 = new HistoriqueConge();
		historiqueConge2.setId(2L);
		historiqueConge2.setConge(conge);

		historiqueConge3 = new HistoriqueConge();
		historiqueConge3.setId(3L);
		historiqueConge3.setConge(conge);

		historiqueConge4 = new HistoriqueConge();
		historiqueConge4.setId(4L);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet HistoriqueConge")
	@Test
	final void testGetHistoriqueConges() {
		List<HistoriqueCongeDTO> historiqueCongeDTOsFromMappers = Arrays
				.asList(historiqueConge1, historiqueConge2, historiqueConge3).stream()
				.map(historiqueConge -> modelMapper.map(historiqueConge, HistoriqueCongeDTO.class))
				.collect(Collectors.toList());
		when(historiqueCongeRepository.findAll())
				.thenReturn(Arrays.asList(historiqueConge1, historiqueConge2, historiqueConge3));
		List<HistoriqueCongeDTO> historiqueCongeDTOsFromService = historiqueCongeServiceImpl.getHistoriqueConges();
		Assertions.assertEquals(historiqueCongeDTOsFromMappers.size(), historiqueCongeDTOsFromService.size());
		verify(historiqueCongeRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get objet HistoriqueConge By Conge: Conge exist")
	@Test
	final void testGetHistoriqueCongesByCongeExist() {
		when(congeRepository.findById(conge.getId())).thenReturn(Optional.of(conge));
		when(historiqueCongeRepository.findHistoriqueCongesByConge(conge))
				.thenReturn(Arrays.asList(historiqueConge1, historiqueConge2, historiqueConge3));
		List<HistoriqueCongeDTO> dossierCongeDTOsFromService = historiqueCongeServiceImpl
				.getHistoriqueCongesByConge(conge.getId());
		Assertions.assertEquals(dossierCongeDTOsFromService.size(),
				Arrays.asList(historiqueConge1, historiqueConge2, historiqueConge3).size());
		verify(historiqueCongeRepository, Mockito.times(1)).findHistoriqueCongesByConge(conge);
	}

	@Order(3)
	@DisplayName("Get objet HistoriqueConge By Conge: Conge not exist")
	@Test
	final void testGetHistoriqueCongesByCongeNotExist() {
		when(congeRepository.findById(conge.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			historiqueCongeServiceImpl.getHistoriqueCongesByConge(conge.getId());
		});
		Assertions.assertNull(HistoriqueCongeDTO);
		verify(historiqueCongeRepository, Mockito.times(0)).findById(historiqueConge4.getId());
	}

	@Order(4)
	@DisplayName("Get objet HistoriqueConge By ID: ID exist")
	@Test
	final void testGetHistoriqueCongeByIdExist() {
		HistoriqueCongeDTO historiqueCongeDTOFromMapper = modelMapper.map(historiqueConge1, HistoriqueCongeDTO.class);
		when(historiqueCongeRepository.findById(historiqueConge1.getId())).thenReturn(Optional.of(historiqueConge1));
		HistoriqueCongeDTO dossierCongeDTOFromService = historiqueCongeServiceImpl
				.getHistoriqueCongeById(historiqueConge1.getId());
		Assertions.assertEquals(historiqueCongeDTOFromMapper.getId(), dossierCongeDTOFromService.getId());
		verify(historiqueCongeRepository, Mockito.times(1)).findById(historiqueConge1.getId());
	}

	@Order(5)
	@DisplayName("Get objet HistoriqueConge By ID: ID not exist")
	@Test
	final void testGetHistoriqueCongeByIdEXist() {
		when(historiqueCongeRepository.findById(historiqueConge1.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			HistoriqueCongeDTO = historiqueCongeServiceImpl.getHistoriqueCongeById(historiqueConge1.getId());
		});
		Assertions.assertNull(HistoriqueCongeDTO);
		verify(historiqueCongeRepository, Mockito.times(1)).findById(historiqueConge1.getId());
	}

	@Order(6)
	@DisplayName("Create objet HistoriqueConge")
	@Test
	final void testCreateHistoriqueConge() {
		HistoriqueCongeDTO historiqueCongeDTOFromMapper = modelMapper.map(historiqueConge1, HistoriqueCongeDTO.class);

		when(modelMapper.map(historiqueCongeDTOFromMapper, HistoriqueConge.class)).thenReturn(historiqueConge1);
		when(historiqueCongeRepository.save(historiqueConge1)).thenReturn(historiqueConge1);
		when(modelMapper.map(historiqueConge1, HistoriqueCongeDTO.class)).thenReturn(historiqueCongeDTOFromMapper);
		HistoriqueCongeDTO historiqueCongeDTOFromService = historiqueCongeServiceImpl
				.createHistoriqueConge(historiqueCongeDTOFromMapper);
		Assertions.assertEquals(historiqueCongeDTOFromMapper.getId(), historiqueCongeDTOFromService.getId());
		verify(historiqueCongeRepository, Mockito.times(1)).save(historiqueConge1);
	}

	@Order(6)
	@DisplayName("Update objet HistoriqueConge: Object exist")
	@Test
	final void testUpdateHistoriqueCongeExist() {
		HistoriqueCongeDTO historiqueCongeDTOFromMapper = modelMapper.map(historiqueConge2, HistoriqueCongeDTO.class);

		when(modelMapper.map(historiqueCongeDTOFromMapper, HistoriqueConge.class)).thenReturn(historiqueConge2);
		when(historiqueCongeRepository.findById(historiqueConge2.getId())).thenReturn(Optional.of(historiqueConge2));
		when(historiqueCongeRepository.save(historiqueConge2)).thenReturn(historiqueConge2);

		boolean updated = historiqueCongeServiceImpl.updateHistoriqueConge(historiqueCongeDTOFromMapper);

		Assertions.assertTrue(Optional.of(historiqueConge2).isPresent());
		Assertions.assertTrue(updated);
		Mockito.verify(historiqueCongeRepository).findById(historiqueConge2.getId());
		Mockito.verify(historiqueCongeRepository).save(historiqueConge2);
	}

	@Order(7)
	@DisplayName("Update objet HistoriqueConge: Object not exist")
	@Test
	final void testUpdateHistoriqueCongeNotExist() {
		HistoriqueCongeDTO historiqueCongeDTOFromMapper = modelMapper.map(historiqueConge2, HistoriqueCongeDTO.class);

		when(modelMapper.map(historiqueCongeDTOFromMapper, HistoriqueConge.class)).thenReturn(historiqueConge2);
		when(historiqueCongeRepository.findById(historiqueConge2.getId())).thenReturn(Optional.empty());
		updated = historiqueCongeServiceImpl.updateHistoriqueConge(historiqueCongeDTOFromMapper);
		Assertions.assertTrue(Optional.of(historiqueConge2).isPresent());
		Assertions.assertFalse(updated);
		Mockito.verify(historiqueCongeRepository, Mockito.times(1)).findById(historiqueConge2.getId());
		Mockito.verify(historiqueCongeRepository, Mockito.times(0)).save(historiqueConge2);
	}

	@Order(8)
	@DisplayName("Delete objet HistoriqueConge By ID: ID exist")
	@Test
	final void testDeteleHistoriqueCongeExist() {
		HistoriqueCongeDTO historiqueCongeDTOFromMapper = modelMapper.map(historiqueConge2, HistoriqueCongeDTO.class);

		when(modelMapper.map(historiqueCongeDTOFromMapper, HistoriqueConge.class)).thenReturn(historiqueConge2);
		when(historiqueCongeRepository.findById(historiqueConge2.getId())).thenReturn(Optional.of(historiqueConge2));
		doNothing().when(historiqueCongeRepository).delete(historiqueConge2);

		boolean deleted = historiqueCongeServiceImpl.deteleHistoriqueConge(historiqueCongeDTOFromMapper);
		Assertions.assertTrue(Optional.of(historiqueConge2).isPresent());
		Assertions.assertTrue(deleted);
		Mockito.verify(historiqueCongeRepository, Mockito.times(1)).findById(historiqueConge2.getId());
		Mockito.verify(historiqueCongeRepository, Mockito.times(1)).delete(historiqueConge2);
	}

	@Order(8)
	@DisplayName("Delete objet HistoriqueConge By ID: ID not exist")
	@Test
	final void testDeteleHistoriqueCongeNotExist() {
		HistoriqueCongeDTO historiqueCongeDTOFromMapper = modelMapper.map(historiqueConge2, HistoriqueCongeDTO.class);
		when(modelMapper.map(historiqueCongeDTOFromMapper, HistoriqueConge.class)).thenReturn(historiqueConge2);
		when(historiqueCongeRepository.findById(historiqueConge2.getId())).thenReturn(Optional.empty());
		deleted = historiqueCongeServiceImpl.deteleHistoriqueConge(historiqueCongeDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(historiqueCongeRepository, Mockito.times(1)).findById(historiqueConge2.getId());
		Mockito.verify(historiqueCongeRepository, Mockito.times(0)).delete(historiqueConge2);
	}

}
