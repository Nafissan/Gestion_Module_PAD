package sn.pad.pe.pss.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
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
import sn.pad.pe.pss.bo.DossierConge;
import sn.pad.pe.pss.bo.PlanningDirection;
import sn.pad.pe.pss.dto.DossierCongeDTO;
import sn.pad.pe.pss.dto.PlanningDirectionDTO;
import sn.pad.pe.pss.repositories.DossierCongeRepository;
import sn.pad.pe.pss.repositories.PlanningDirectionRepository;
import sn.pad.pe.pss.services.impl.PlanningDirectionServiceImpl;

@DisplayName("Test Service PlanningDirection")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class PlanningDirectionServiceTest {

	@InjectMocks
	private PlanningDirectionServiceImpl planningDirectionServiceImpl;
	@Mock
	private PlanningDirectionRepository planningDirectionRepository;
	@Mock
	private DossierCongeRepository dossierCongeRepository;
	@Spy
	private ModelMapper modelMapper;

	private static DossierConge dossierConge1;
	private static PlanningDirection planningDirection1;
	private static PlanningDirection planningDirection2;
	private static PlanningDirectionDTO planningDirectionDTO;
	private static List<PlanningDirection> PlanningDirections = new ArrayList<PlanningDirection>();
	private static boolean updated;
	private static boolean deleted;
	private static List<PlanningDirectionDTO> planningDirectionDTOsFromService;
	private static PlanningDirectionDTO planningDirectionDTOFromService;

	@SuppressWarnings("deprecation")
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierConge1 = new DossierConge();
		dossierConge1.setId(1L);
		dossierConge1.setAnnee(String.valueOf(new Date().getYear()));

		planningDirection1 = new PlanningDirection();
		planningDirection1.setId(1L);
		planningDirection1.setCode("PD" + new Date().getYear());
		planningDirection1.setCodeDirection("DD");
		planningDirection1.setDescription("Planning direction " + new Date().getYear());
		planningDirection1.setDescriptionDirection("DD");
		planningDirection1.setDossierConge(dossierConge1);

		planningDirection2 = new PlanningDirection();
		planningDirection2.setId(2L);
		planningDirection2.setCode("PD" + new Date().getYear());
		planningDirection2.setDescription("Planning direction " + new Date().getYear());
		planningDirection2.setDescriptionDirection("DCH");
		planningDirection2.setDossierConge(dossierConge1);

		PlanningDirections.add(planningDirection1);
		PlanningDirections.add(planningDirection2);

	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet PlanningDirection")
	@Test
	final void testGetPlanningDirections() {
		List<PlanningDirectionDTO> planningDirectionDTOsFromMapper = Arrays
				.asList(planningDirection1, planningDirection2).stream()
				.map(pd -> modelMapper.map(pd, PlanningDirectionDTO.class)).collect(Collectors.toList());
		when(planningDirectionRepository.findAll()).thenReturn(Arrays.asList(planningDirection1, planningDirection2));
		List<PlanningDirectionDTO> planningDirectionDTOsFromService = planningDirectionServiceImpl
				.getPlanningDirections();
		Assertions.assertEquals(planningDirectionDTOsFromMapper.size(), planningDirectionDTOsFromService.size());
		Mockito.verify(planningDirectionRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Objet PlanningDirection By ID: ID exist")
	@Test
	final void testGetPlanningDirectionByIdExist() {
		PlanningDirectionDTO planningDirectionDTOFromMapper = modelMapper.map(planningDirection1,
				PlanningDirectionDTO.class);
		when(planningDirectionRepository.findById(planningDirection1.getId()))
				.thenReturn(Optional.of(planningDirection1));
		Assertions.assertTrue(Optional.of(planningDirection1).isPresent());
		PlanningDirectionDTO planningDirectionDTOFromService = planningDirectionServiceImpl
				.getPlanningDirectionById(planningDirection1.getId());
		Assertions.assertEquals(planningDirectionDTOFromMapper.getId(), planningDirectionDTOFromService.getId());
		Mockito.verify(planningDirectionRepository, Mockito.times(1)).findById(planningDirection1.getId());
	}

	@Order(3)
	@DisplayName("Objet PlanningDirection By ID: ID not exist")
	@Test
	final void testGetPlanningDirectionByIdNotExist() {
		when(planningDirectionRepository.findById(planningDirection1.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			planningDirectionDTO = planningDirectionServiceImpl.getPlanningDirectionById(planningDirection1.getId());
		});
		Assertions.assertNull(planningDirectionDTO);
		Mockito.verify(planningDirectionRepository, Mockito.times(1)).findById(planningDirection1.getId());
	}

	@Order(4)
	@DisplayName("Create Objet PlanningDirection")
	@Test
	final void testCreatePlanningDirection() {
		PlanningDirectionDTO planningDirectionDTOFromMapper = modelMapper.map(planningDirection1,
				PlanningDirectionDTO.class);
		when(modelMapper.map(planningDirectionDTOFromMapper, PlanningDirection.class)).thenReturn(planningDirection1);
		when(planningDirectionRepository.save(planningDirection1)).thenReturn(planningDirection1);
		when(modelMapper.map(planningDirection1, PlanningDirectionDTO.class))
				.thenReturn(planningDirectionDTOFromMapper);
		PlanningDirectionDTO planningDirectionDTOFromService = planningDirectionServiceImpl
				.createPlanningDirection(planningDirectionDTOFromMapper);
		Assertions.assertEquals(planningDirectionDTOFromMapper, planningDirectionDTOFromService);
		verify(planningDirectionRepository, Mockito.times(1)).save(planningDirection1);
	}

	@Order(5)
	@DisplayName("Update Objet PlanningDirection: Object exist")
	@Test
	final void testUpdatePlanningDirectionExist() {
		PlanningDirectionDTO planningDirectionDTOFromMapper = modelMapper.map(planningDirection2,
				PlanningDirectionDTO.class);
		when(modelMapper.map(planningDirectionDTOFromMapper, PlanningDirection.class)).thenReturn(planningDirection2);
		when(planningDirectionRepository.findById(planningDirection2.getId()))
				.thenReturn(Optional.of(planningDirection2));
		when(planningDirectionRepository.save(planningDirection2)).thenReturn(planningDirection2);

		boolean updated = planningDirectionServiceImpl.updatePlanningDirection(planningDirectionDTOFromMapper);

		Assertions.assertTrue(Optional.of(planningDirection2).isPresent());
		Assertions.assertTrue(updated);
		Mockito.verify(planningDirectionRepository).findById(planningDirection2.getId());
		Mockito.verify(planningDirectionRepository).save(planningDirection2);
	}

	@Order(6)
	@DisplayName("Update Objet PlanningDirection: Object not exist")
	@Test
	final void testUpdatePlanningDirectionNotExist() {
		PlanningDirectionDTO planningDirectionDTOFromMapper = modelMapper.map(planningDirection1,
				PlanningDirectionDTO.class);
		when(modelMapper.map(planningDirectionDTOFromMapper, PlanningDirection.class)).thenReturn(planningDirection1);
		when(planningDirectionRepository.findById(planningDirection1.getId())).thenReturn(Optional.empty());
		updated = planningDirectionServiceImpl.updatePlanningDirection(planningDirectionDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(planningDirectionRepository, Mockito.times(1)).findById(planningDirection1.getId());
		Mockito.verify(planningDirectionRepository, Mockito.times(0)).save(planningDirection1);
	}

	@Order(7)
	@DisplayName("Suppression de l'objet PlanningDirection by ID: ID exist")
	@Test
	final void testDetelePlanningDirectionExist() {
		PlanningDirectionDTO planningDirectionDTOFromMapper = modelMapper.map(planningDirection2,
				PlanningDirectionDTO.class);
		when(modelMapper.map(planningDirectionDTOFromMapper, PlanningDirection.class)).thenReturn(planningDirection2);
		when(planningDirectionRepository.findById(planningDirection2.getId()))
				.thenReturn(Optional.of(planningDirection2));
		doNothing().when(planningDirectionRepository).delete(planningDirection2);

		deleted = planningDirectionServiceImpl.detelePlanningDirection(planningDirectionDTOFromMapper);
		Assertions.assertTrue(Optional.of(planningDirection2).isPresent());
		Assertions.assertTrue(deleted);
		Mockito.verify(planningDirectionRepository, Mockito.times(1)).findById(planningDirection2.getId());
		Mockito.verify(planningDirectionRepository, Mockito.times(1)).delete(planningDirection2);
	}

	@Order(8)
	@DisplayName("Suppression de l'objet PlanningDirection by ID: ID not exist")
	@Test
	final void testDetelePlanningDirectionNotExist() {
		PlanningDirectionDTO planningDirectionDTOFromMapper = modelMapper.map(planningDirection2,
				PlanningDirectionDTO.class);
		when(modelMapper.map(planningDirectionDTOFromMapper, PlanningDirection.class)).thenReturn(planningDirection2);
		when(planningDirectionRepository.findById(planningDirection2.getId())).thenReturn(Optional.empty());
		deleted = planningDirectionServiceImpl.detelePlanningDirection(planningDirectionDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(planningDirectionRepository, Mockito.times(1)).findById(planningDirection2.getId());
		Mockito.verify(planningDirectionRepository, Mockito.times(0)).delete(planningDirection2);
	}

	@Order(9)
	@DisplayName("Get bjet PlanningDirection by DossierConge: DossierConge exist")
	@Test
	final void testGetPlanningDirectionsByDossierCongeExist() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge1, DossierCongeDTO.class);
		when(dossierCongeRepository.findById(dossierConge1.getId())).thenReturn(Optional.of(dossierConge1));

		List<PlanningDirectionDTO> planningDirectionDTOsFromMapper = Arrays.asList(planningDirection1).stream()
				.map(pd -> modelMapper.map(pd, PlanningDirectionDTO.class)).collect(Collectors.toList());
		when(planningDirectionRepository.findPlanningDirectionsByDossierConge(dossierConge1))
				.thenReturn(Arrays.asList(planningDirection1));
		List<PlanningDirectionDTO> planningDirectionDTOsFromService = planningDirectionServiceImpl
				.getPlanningDirectionsByDossierConge(dossierCongeDTOFromMapper.getId());
		Assertions.assertEquals(planningDirectionDTOsFromMapper.size(), planningDirectionDTOsFromService.size());
		Mockito.verify(planningDirectionRepository, Mockito.times(1))
				.findPlanningDirectionsByDossierConge(dossierConge1);
	}

	@Order(10)
	@DisplayName("Get bjet PlanningDirection by DossierConge: DossierConge not exist")
	@Test
	final void testGetPlanningDirectionsByDossierCongeNotExist() {
		when(dossierCongeRepository.findById(dossierConge1.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			planningDirectionDTOsFromService = planningDirectionServiceImpl
					.getPlanningDirectionsByDossierConge(dossierConge1.getId());
		});
		Assertions.assertNull(planningDirectionDTOsFromService);
		Mockito.verify(planningDirectionRepository, Mockito.times(0))
				.findPlanningDirectionsByDossierConge(dossierConge1);
	}

	@Order(11)
	@DisplayName("Get bjet PlanningDirection by DossierConge And CodeDirection: DossierConge and CodeDirection exist")
	@Test
	final void testGetPlanningDirectionsByCodeDirectionAndDossierCongeExist() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge1, DossierCongeDTO.class);
		when(dossierCongeRepository.findById(dossierConge1.getId())).thenReturn(Optional.of(dossierConge1));
		Assertions.assertTrue(Optional.of(dossierConge1).isPresent());

		PlanningDirectionDTO planningDirectionDTOFromMapper = modelMapper.map(planningDirection1,
				PlanningDirectionDTO.class);
		when(planningDirectionRepository.findPlanningDirectionByCodeDirectionAndDossierConge(
				planningDirection1.getCodeDirection(), dossierConge1)).thenReturn(Optional.of(planningDirection1));
		PlanningDirectionDTO planningDirectionDTOFromService = planningDirectionServiceImpl
				.getPlanningDirectionsByCodeDirectionAndDossierConge(planningDirection1.getCodeDirection(),
						dossierCongeDTOFromMapper.getId());

		Assertions.assertEquals(planningDirectionDTOFromMapper.getId(), planningDirectionDTOFromService.getId());
		Mockito.verify(planningDirectionRepository, Mockito.times(1))
				.findPlanningDirectionByCodeDirectionAndDossierConge(planningDirection1.getCodeDirection(),
						dossierConge1);
	}

	@Order(12)
	@DisplayName("Get bjet PlanningDirection by DossierConge And CodeDirection: DossierConge and CodeDirection exist, PlanningDirection not exist")
	@Test
	final void testGetPlanningDirectionsByCodeDirectionAndDossierCongeExistPlanningDirectionNotExist() {
		DossierCongeDTO dossierCongeDTOFromMapper = modelMapper.map(dossierConge1, DossierCongeDTO.class);
		when(dossierCongeRepository.findById(dossierConge1.getId())).thenReturn(Optional.of(dossierConge1));
		Assertions.assertTrue(Optional.of(dossierConge1).isPresent());

		when(planningDirectionRepository.findPlanningDirectionByCodeDirectionAndDossierConge(
				planningDirection1.getCodeDirection(), dossierConge1)).thenReturn(Optional.empty());

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			planningDirectionDTOFromService = planningDirectionServiceImpl
					.getPlanningDirectionsByCodeDirectionAndDossierConge(planningDirection1.getCodeDirection(),
							dossierCongeDTOFromMapper.getId());
		});
		Assertions.assertNull(planningDirectionDTOFromService);
		Mockito.verify(planningDirectionRepository, Mockito.times(1))
				.findPlanningDirectionByCodeDirectionAndDossierConge(planningDirection1.getCodeDirection(),
						dossierConge1);
	}

	@Order(13)
	@DisplayName("Get bjet PlanningDirection by DossierConge And CodeDirection: DossierConge and CodeDirection not exist")
	@Test
	final void testGetPlanningDirectionsByCodeDirectionAndDossierCongeNotExist() {
		when(dossierCongeRepository.findById(dossierConge1.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			planningDirectionDTOFromService = planningDirectionServiceImpl
					.getPlanningDirectionsByCodeDirectionAndDossierConge("DCH", dossierConge1.getId());
		});
		Assertions.assertNull(planningDirectionDTOFromService);
		Mockito.verify(planningDirectionRepository, Mockito.times(0))
				.findPlanningDirectionByCodeDirectionAndDossierConge(planningDirection1.getCodeDirection(),
						dossierConge1);
	}

}
