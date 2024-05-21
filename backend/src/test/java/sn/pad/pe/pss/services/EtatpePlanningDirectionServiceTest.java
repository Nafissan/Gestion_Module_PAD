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
import sn.pad.pe.pss.bo.DossierConge;
import sn.pad.pe.pss.bo.EtapePlanningDirection;
import sn.pad.pe.pss.bo.PlanningDirection;
import sn.pad.pe.pss.dto.EtapePlanningDirectionDTO;
import sn.pad.pe.pss.repositories.EtapePlanningRepository;
import sn.pad.pe.pss.repositories.PlanningDirectionRepository;
import sn.pad.pe.pss.services.impl.EtatpePlanningDirectionServiceImpl;

@DisplayName("Test Service EtapePlanningDirection")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class EtatpePlanningDirectionServiceTest {

	@Mock
	private EtapePlanningRepository etapePlanningRepository;
	@Mock
	private PlanningDirectionRepository planningDirectionRepository;
	@InjectMocks
	private EtatpePlanningDirectionServiceImpl etatpePlanningDirectionServiceImpl;
	@Spy
	private ModelMapper modelMapper;
	private static DossierConge dossierConge1;
	private static PlanningDirection planningDirection;
	private static PlanningDirection planningDirection1;
	private static EtapePlanningDirection etapePlanningDirection1;
	private static EtapePlanningDirection etapePlanningDirection2;
	private static EtapePlanningDirection etapePlanningDirection3;
	private static List<EtapePlanningDirectionDTO> etapePlanningDirectionDTOsFromService;
	private static boolean updated;
	private static boolean deleted;

	@SuppressWarnings("deprecation")
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierConge1 = new DossierConge();
		dossierConge1.setId(1L);
		dossierConge1.setAnnee(String.valueOf(new Date().getYear()));

		planningDirection = new PlanningDirection();
		planningDirection.setId(1L);
		planningDirection.setCode("PD" + new Date().getYear());
		planningDirection.setDescription("Planning direction " + new Date().getYear());
		planningDirection.setDescriptionDirection("DD");
		planningDirection.setDossierConge(dossierConge1);

		etapePlanningDirection1 = new EtapePlanningDirection();
		etapePlanningDirection1.setId(1L);
		etapePlanningDirection1.setPlanningDirection(planningDirection);

		etapePlanningDirection2 = new EtapePlanningDirection();
		etapePlanningDirection2.setId(2L);
		etapePlanningDirection2.setPlanningDirection(planningDirection);

		etapePlanningDirection3 = new EtapePlanningDirection();
		etapePlanningDirection3.setId(3L);
		etapePlanningDirection3.setPlanningDirection(planningDirection);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet EtatpePlanningDirection")
	@Test
	final void testGetEtatpePlanningDirections() {
		List<EtapePlanningDirectionDTO> etapePlanningDirectionDTOsFromMappers = Arrays
				.asList(etapePlanningDirection1, etapePlanningDirection2, etapePlanningDirection3).stream()
				.map(etapePlanningDirection -> modelMapper.map(etapePlanningDirection, EtapePlanningDirectionDTO.class))
				.collect(Collectors.toList());
		when(etapePlanningRepository.findAll())
				.thenReturn(Arrays.asList(etapePlanningDirection1, etapePlanningDirection2, etapePlanningDirection3));
		List<EtapePlanningDirectionDTO> etapePlanningDirectionDTOsFromService = etatpePlanningDirectionServiceImpl
				.getEtatpePlanningDirections();
		Assertions.assertEquals(etapePlanningDirectionDTOsFromMappers.size(),
				etapePlanningDirectionDTOsFromService.size());
		Mockito.verify(etapePlanningRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Liste objet EtatpePlanningDirection By PlanningDirection: PlanningDirection Exist ")
	@Test
	final void testGetEtatpePlanningDirectionsByPlanningDirectionExist() {
		List<EtapePlanningDirectionDTO> etapePlanningDirectionDTOsFromMappers = Arrays
				.asList(etapePlanningDirection1, etapePlanningDirection2, etapePlanningDirection3).stream()
				.map(etapePlanningDirection -> modelMapper.map(etapePlanningDirection, EtapePlanningDirectionDTO.class))
				.collect(Collectors.toList());
		when(planningDirectionRepository.findById(planningDirection.getId()))
				.thenReturn(Optional.of(planningDirection));
		when(etapePlanningRepository.findEtapePlanningDirectionsByPlanningDirection(planningDirection))
				.thenReturn(Arrays.asList(etapePlanningDirection1, etapePlanningDirection2, etapePlanningDirection3));
		List<EtapePlanningDirectionDTO> etapePlanningDirectionDTOsFromService = etatpePlanningDirectionServiceImpl
				.getEtatpePlanningDirectionsByPlanningDirection(planningDirection.getId());

		Assertions.assertEquals(etapePlanningDirectionDTOsFromMappers.size(),
				etapePlanningDirectionDTOsFromService.size());
		Mockito.verify(etapePlanningRepository, Mockito.times(1))
				.findEtapePlanningDirectionsByPlanningDirection(planningDirection);
	}

	@Order(3)
	@DisplayName("Liste objet EtatpePlanningDirection By PlanningDirection: PlanningDirection not Exist ")
	@Test
	final void testGetEtatpePlanningDirectionsByPlanningDirectionNotExist() {
//		when(etapePlanningRepository.findById(etapePlanningDirection1.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(RuntimeException.class, () -> {
			etapePlanningDirectionDTOsFromService = etatpePlanningDirectionServiceImpl
					.getEtatpePlanningDirectionsByPlanningDirection(planningDirection1.getId());
		});
		Assertions.assertNull(etapePlanningDirectionDTOsFromService);
		Mockito.verify(etapePlanningRepository, Mockito.times(0))
				.findEtapePlanningDirectionsByPlanningDirection(planningDirection);
	}

	@Order(4)
	@DisplayName("Get objet EtatpePlanningDirection By ID: ID Exist ")
	@Test
	final void testGetEtatpePlanningDirectionByIdExist() {
		EtapePlanningDirectionDTO etapePlanningDirectionDTOFromMappers = modelMapper.map(etapePlanningDirection1,
				EtapePlanningDirectionDTO.class);
		when(etapePlanningRepository.findById(etapePlanningDirection1.getId()))
				.thenReturn(Optional.of(etapePlanningDirection1));
		EtapePlanningDirectionDTO etapePlanningDirectionDTOFromService = etatpePlanningDirectionServiceImpl
				.getEtatpePlanningDirectionById(planningDirection.getId());
		Assertions.assertEquals(etapePlanningDirectionDTOFromMappers.getId(),
				etapePlanningDirectionDTOFromService.getId());
		Mockito.verify(etapePlanningRepository, Mockito.times(1)).findById(etapePlanningDirection1.getId());
	}

	@Order(5)
	@DisplayName("Get objet EtatpePlanningDirection By ID: ID not Exist ")
	@Test
	final void testGetEtatpePlanningDirectionByIdNotExist() {
		EtapePlanningDirectionDTO etapePlanningDirectionDTOFromMapper = modelMapper.map(etapePlanningDirection1,
				EtapePlanningDirectionDTO.class);
		when(etapePlanningRepository.findById(etapePlanningDirection1.getId())).thenReturn(Optional.empty());

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			etatpePlanningDirectionServiceImpl
					.getEtatpePlanningDirectionById(etapePlanningDirectionDTOFromMapper.getId());
		});

		Mockito.verify(etapePlanningRepository, Mockito.times(1)).findById(etapePlanningDirection1.getId());
	}

	@Order(6)
	@DisplayName("Create objet EtatpePlanningDirection")
	@Test
	final void testCreateEtatpePlanningDirection() {
		EtapePlanningDirectionDTO etapePlanningDirectionDTOFromMapper = modelMapper.map(etapePlanningDirection1,
				EtapePlanningDirectionDTO.class);
		when(modelMapper.map(etapePlanningDirectionDTOFromMapper, EtapePlanningDirection.class))
				.thenReturn(etapePlanningDirection1);
		when(etapePlanningRepository.save(etapePlanningDirection1)).thenReturn(etapePlanningDirection1);
		when(modelMapper.map(etapePlanningDirection1, EtapePlanningDirectionDTO.class))
				.thenReturn(etapePlanningDirectionDTOFromMapper);
		EtapePlanningDirectionDTO etapePlanningDirectionDTOFromService = etatpePlanningDirectionServiceImpl
				.createEtatpePlanningDirection(etapePlanningDirectionDTOFromMapper);

		Assertions.assertEquals(etapePlanningDirectionDTOFromMapper.getId(),
				etapePlanningDirectionDTOFromService.getId());
		verify(etapePlanningRepository, Mockito.times(1)).save(etapePlanningDirection1);

	}

	@Order(7)
	@DisplayName("Update objet EtatpePlanningDirection: Object exist")
	@Test
	final void testUpdateEtatpePlanningDirectionExist() {
		EtapePlanningDirectionDTO etapePlanningDirectionDTOFromMapper = modelMapper.map(etapePlanningDirection2,
				EtapePlanningDirectionDTO.class);

		when(modelMapper.map(etapePlanningDirectionDTOFromMapper, EtapePlanningDirection.class))
				.thenReturn(etapePlanningDirection2);
		when(etapePlanningRepository.findById(etapePlanningDirection2.getId()))
				.thenReturn(Optional.of(etapePlanningDirection2));
		when(etapePlanningRepository.save(etapePlanningDirection2)).thenReturn(etapePlanningDirection2);

		boolean updated = etatpePlanningDirectionServiceImpl
				.updateEtatpePlanningDirection(etapePlanningDirectionDTOFromMapper);

		Assertions.assertTrue(Optional.of(etapePlanningDirection2).isPresent());
		Assertions.assertTrue(updated);
		Mockito.verify(etapePlanningRepository).findById(etapePlanningDirection2.getId());
		Mockito.verify(etapePlanningRepository).save(etapePlanningDirection2);
	}

	@Order(8)
	@DisplayName("Update objet EtatpePlanningDirection: Object not exist")
	@Test
	final void testUpdateEtatpePlanningDirectionNotExist() {
		EtapePlanningDirectionDTO etapePlanningDirectionDTOFromMapper = modelMapper.map(etapePlanningDirection2,
				EtapePlanningDirectionDTO.class);

		when(modelMapper.map(etapePlanningDirectionDTOFromMapper, EtapePlanningDirection.class))
				.thenReturn(etapePlanningDirection2);
		when(etapePlanningRepository.findById(etapePlanningDirection2.getId())).thenReturn(Optional.empty());
		updated = etatpePlanningDirectionServiceImpl.updateEtatpePlanningDirection(etapePlanningDirectionDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(etapePlanningRepository, Mockito.times(1)).findById(etapePlanningDirection2.getId());
		Mockito.verify(etapePlanningRepository, Mockito.times(0)).save(etapePlanningDirection2);
	}

	@Order(9)
	@DisplayName("Suppression objet EtatpePlanningDirection By ID: ID exist")
	@Test
	final void testDeteleEtatpePlanningDirectionExist() {
		EtapePlanningDirectionDTO etapePlanningDirectionDTOFromMapper = modelMapper.map(etapePlanningDirection2,
				EtapePlanningDirectionDTO.class);

		when(modelMapper.map(etapePlanningDirectionDTOFromMapper, EtapePlanningDirection.class))
				.thenReturn(etapePlanningDirection2);
		when(etapePlanningRepository.findById(etapePlanningDirection2.getId()))
				.thenReturn(Optional.of(etapePlanningDirection2));
		doNothing().when(etapePlanningRepository).delete(etapePlanningDirection2);

		boolean deleted = etatpePlanningDirectionServiceImpl
				.deteleEtatpePlanningDirection(etapePlanningDirectionDTOFromMapper);
		Assertions.assertTrue(Optional.of(etapePlanningDirection2).isPresent());
		Assertions.assertTrue(deleted);
		Mockito.verify(etapePlanningRepository).findById(etapePlanningDirection2.getId());
		Mockito.verify(etapePlanningRepository).delete(etapePlanningDirection2);
	}

	@Order(10)
	@DisplayName("Suppression objet EtatpePlanningDirection By ID: ID not exist")
	@Test
	final void testDeteleEtatpePlanningDirectionNotExist() {
		EtapePlanningDirectionDTO etapePlanningDirectionDTOFromMapper = modelMapper.map(etapePlanningDirection2,
				EtapePlanningDirectionDTO.class);
		when(modelMapper.map(etapePlanningDirectionDTOFromMapper, EtapePlanningDirection.class))
				.thenReturn(etapePlanningDirection2);
		when(etapePlanningRepository.findById(etapePlanningDirection2.getId())).thenReturn(Optional.empty());
		deleted = etatpePlanningDirectionServiceImpl.deteleEtatpePlanningDirection(etapePlanningDirectionDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(etapePlanningRepository, Mockito.times(1)).findById(etapePlanningDirection2.getId());
		Mockito.verify(etapePlanningRepository, Mockito.times(0)).delete(etapePlanningDirection2);
	}

}
