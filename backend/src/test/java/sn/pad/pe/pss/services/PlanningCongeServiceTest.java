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
import sn.pad.pe.pss.bo.PlanningConge;
import sn.pad.pe.pss.bo.PlanningDirection;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.PlanningCongeDTO;
import sn.pad.pe.pss.repositories.PlanningCongeRepository;
import sn.pad.pe.pss.repositories.PlanningDirectionRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.impl.PlanningCongeServiceImpl;

@DisplayName("Test Service PlanningConge")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class PlanningCongeServiceTest {

	@InjectMocks
	private PlanningCongeServiceImpl planningCongeServiceImpl;
	@Mock
	private PlanningCongeRepository planningCongeRepository;
	@Mock
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;
	@Mock
	private PlanningDirectionRepository planningDirectionRepository;
	@Spy
	private ModelMapper modelMapper;

	private static PlanningConge planningConge1;
	private static PlanningConge planningConge2;
	private static PlanningConge planningConge3;
	private static PlanningCongeDTO planningCongeDTO;
	private static UniteOrganisationnelle uniteOrganisationnelle1;
	private static UniteOrganisationnelle uniteOrganisationnelle2;
	private static UniteOrganisationnelle uniteOrganisationnelle3;
	private static PlanningDirection planningDirection;
	private static DossierConge dossierConge;
	private static boolean updated;
	private static boolean deleted;

	@SuppressWarnings("deprecation")
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		uniteOrganisationnelle1 = new UniteOrganisationnelle();
		uniteOrganisationnelle1.setId(1L);
		uniteOrganisationnelle1.setCode("607041");
		uniteOrganisationnelle1.setDescription("Direction digitale est la partie IT du PAD.");

		uniteOrganisationnelle2 = new UniteOrganisationnelle();
		uniteOrganisationnelle2.setId(2L);
		uniteOrganisationnelle2.setCode("607042");
		uniteOrganisationnelle2.setDescription("Direction digitale est la partie IT du PAD.");

		uniteOrganisationnelle3 = new UniteOrganisationnelle();
		uniteOrganisationnelle3.setId(3L);
		uniteOrganisationnelle3.setCode("607043");
		uniteOrganisationnelle3.setDescription("Direction digitale est la partie IT du PAD.");

		dossierConge = new DossierConge();
		dossierConge.setId(1L);
		dossierConge.setAnnee(String.valueOf(new Date().getYear()));

		planningDirection = new PlanningDirection();
		planningDirection.setId(1L);
		planningDirection.setCode("PD" + new Date().getYear());
		planningDirection.setCodeDirection("DD");
		planningDirection.setDescription("Planning direction " + new Date().getYear());
		planningDirection.setDescriptionDirection("DD");
		planningDirection.setDossierConge(dossierConge);

		planningConge1 = new PlanningConge();
		planningConge1.setId(1L);
		planningConge1.setEtat("SAISI");
		planningConge1.setCode("PC-B");
		planningConge1.setUniteOrganisationnelle(uniteOrganisationnelle1);
		planningConge1.setPlanningDirection(planningDirection);

		planningConge2 = new PlanningConge();
		planningConge2.setId(2L);
		planningConge2.setEtat("OUVERT");
		planningConge2.setCode("PC-S");
		planningConge2.setUniteOrganisationnelle(uniteOrganisationnelle2);
		planningConge2.setPlanningDirection(planningDirection);

		planningConge3 = new PlanningConge();
		planningConge3.setId(3L);
		planningConge3.setEtat("VALIDE");
		planningConge3.setCode("PC-D");
		planningConge3.setUniteOrganisationnelle(uniteOrganisationnelle3);
		planningConge3.setPlanningDirection(planningDirection);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet PlanningConge")
	@Test
	final void testGetPlanningConges() {
		List<PlanningCongeDTO> planningCongeDTOsFromMappers = Arrays
				.asList(planningConge1, planningConge2, planningConge3).stream()
				.map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());
		when(planningCongeRepository.findAll())
				.thenReturn(Arrays.asList(planningConge1, planningConge2, planningConge3));
		List<PlanningCongeDTO> planningCongeDTOsFromService = planningCongeServiceImpl.getPlanningConges();
		Assertions.assertEquals(planningCongeDTOsFromMappers.size(), planningCongeDTOsFromService.size());
		verify(planningCongeRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Liste objet PlanningConge By PlanningDirection AND UniteOrganisationnelle ")
	@Test
	final void testGetPlanningCongesByPlanningDirectionAndUniteOrganisationnelle() {
		when(planningDirectionRepository.findById(planningDirection.getId()))
				.thenReturn(Optional.of(planningDirection));
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle1.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle1));

		List<PlanningCongeDTO> planningCongeDTOsFromMappers = Arrays.asList(planningConge1).stream()
				.map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());
		when(planningCongeRepository.findPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(planningDirection,
				uniteOrganisationnelle1)).thenReturn(Arrays.asList(planningConge1));
		List<PlanningCongeDTO> planningCongeDTOsFromService = planningCongeServiceImpl
				.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(planningDirection.getId(),
						uniteOrganisationnelle1.getId());
		Assertions.assertEquals(planningCongeDTOsFromMappers.size(), planningCongeDTOsFromService.size());
		verify(planningCongeRepository, Mockito.times(1))
				.findPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(planningDirection,
						uniteOrganisationnelle1);
	}

	@Order(3)
	@DisplayName("Liste objet PlanningConge By PlanningDirection, UniteOrganisationnelle AND Etat ")
	@Test
	final void testGetPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat() {
		when(planningDirectionRepository.findById(planningDirection.getId()))
				.thenReturn(Optional.of(planningDirection));
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle1.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle1));

		List<PlanningCongeDTO> planningCongeDTOsFromMappers = Arrays.asList(planningConge1).stream()
				.map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());
		when(planningCongeRepository.findPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(
				planningDirection, uniteOrganisationnelle1, planningConge1.getEtat()))
						.thenReturn(Arrays.asList(planningConge1));
		List<PlanningCongeDTO> planningCongeDTOsFromService = planningCongeServiceImpl
				.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(planningDirection.getId(),
						uniteOrganisationnelle1.getId(), planningConge1.getEtat());
		Assertions.assertEquals(planningCongeDTOsFromMappers.size(), planningCongeDTOsFromService.size());
		verify(planningCongeRepository, Mockito.times(1))
				.findPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(planningDirection,
						uniteOrganisationnelle1, planningConge1.getEtat());

	}

	@Order(4)
	@DisplayName("Liste objet PlanningConge By PlanningDirection AND liste UniteOrganisationnelle")
	@Test
	final void testGetPlanningCongesByPlanningDirectionAndUniteOrganisationnelles() {
		List<PlanningCongeDTO> planningCongeDTOsFromMappers = Arrays
				.asList(planningConge1, planningConge2, planningConge3).stream()
				.map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());

		when(planningDirectionRepository.findById(planningDirection.getId()))
				.thenReturn(Optional.of(planningDirection));
		List<Long> idUniteOrganisationnelles = Arrays.asList(uniteOrganisationnelle1.getId(),
				uniteOrganisationnelle2.getId(), uniteOrganisationnelle3.getId());
		for (Long idUniteOrganisationnelle : idUniteOrganisationnelles) {
			when(uniteOrganisationnelleRepository.findById(idUniteOrganisationnelle))
					.thenReturn(getUniteOrganisationnelle(idUniteOrganisationnelle));
			when(planningCongeRepository.findPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(
					planningDirection, getUniteOrganisationnelle(idUniteOrganisationnelle).get()))
							.thenReturn(Arrays.asList(getPlanningConge(idUniteOrganisationnelle).get()));
		}
		List<PlanningCongeDTO> planningCongeDTOsFromService = planningCongeServiceImpl
				.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelles(planningDirection.getId(),
						idUniteOrganisationnelles);
		Assertions.assertEquals(planningCongeDTOsFromMappers.size(), planningCongeDTOsFromService.size());
	}

	@Order(5)
	@DisplayName("Liste objet PlanningConge By PlanningDirection ")
	@Test
	final void testGetPlanningCongesByPlanningDirection() {
		when(planningDirectionRepository.findById(planningDirection.getId()))
				.thenReturn(Optional.of(planningDirection));

		List<PlanningCongeDTO> planningCongeDTOsFromMappers = Arrays.asList(planningConge1).stream()
				.map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());
		when(planningCongeRepository.findPlanningCongesByPlanningDirection(planningDirection))
				.thenReturn(Arrays.asList(planningConge1));
		List<PlanningCongeDTO> planningCongeDTOsFromService = planningCongeServiceImpl
				.getPlanningCongesByPlanningDirection(planningDirection.getId());
		Assertions.assertEquals(planningCongeDTOsFromMappers.size(), planningCongeDTOsFromService.size());
		verify(planningCongeRepository, Mockito.times(1)).findPlanningCongesByPlanningDirection(planningDirection);
	}

	@Order(6)
	@DisplayName("Liste objet PlanningConge By ID: ID exist")
	@Test
	final void testGetPlanningCongeByIdEXist() {
		PlanningCongeDTO planningCongeDTOFromMapper = modelMapper.map(planningConge1, PlanningCongeDTO.class);
		when(planningCongeRepository.findById(planningConge1.getId())).thenReturn(Optional.of(planningConge1));
		PlanningCongeDTO planningCongeDTOFromService = planningCongeServiceImpl
				.getPlanningCongeById(planningConge1.getId());
		Assertions.assertEquals(planningCongeDTOFromMapper.getId(), planningCongeDTOFromService.getId());
		verify(planningCongeRepository, Mockito.times(1)).findById(planningConge1.getId());
	}

	@Order(7)
	@DisplayName("Liste objet PlanningConge By ID: ID exist")
	@Test
	final void testGetPlanningCongeByIdNotEXist() {
		when(planningCongeRepository.findById(planningConge1.getId())).thenReturn(Optional.empty());

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			planningCongeDTO = planningCongeServiceImpl.getPlanningCongeById(planningConge1.getId());
		});

		Assertions.assertNull(planningCongeDTO);
		verify(planningCongeRepository, Mockito.times(1)).findById(planningConge1.getId());
	}

	@Order(8)
	@DisplayName("Create objet PlanningConge")
	@Test
	final void testCreatePlanningConge() {
		PlanningCongeDTO planningCongeDTOFromMapper = modelMapper.map(planningConge1, PlanningCongeDTO.class);
		when(modelMapper.map(planningCongeDTOFromMapper, PlanningConge.class)).thenReturn(planningConge1);
		when(planningCongeRepository.save(planningConge1)).thenReturn(planningConge1);
		when(modelMapper.map(planningConge1, PlanningCongeDTO.class)).thenReturn(planningCongeDTOFromMapper);
		PlanningCongeDTO planningCongeDTOFromService = planningCongeServiceImpl
				.createPlanningConge(planningCongeDTOFromMapper);
		Assertions.assertEquals(planningCongeDTOFromMapper, planningCongeDTOFromService);
		verify(planningCongeRepository, Mockito.times(1)).save(planningConge1);
	}

	@Order(9)
	@DisplayName("Update objet PlanningConge: Object exist")
	@Test
	final void testUpdatePlanningCongeExist() {
		PlanningCongeDTO planningCongeDTOFromMapper = modelMapper.map(planningConge1, PlanningCongeDTO.class);
		when(modelMapper.map(planningCongeDTOFromMapper, PlanningConge.class)).thenReturn(planningConge1);
		when(planningCongeRepository.findById(planningConge1.getId())).thenReturn(Optional.of(planningConge1));
		when(planningCongeRepository.save(planningConge1)).thenReturn(planningConge1);

		updated = planningCongeServiceImpl.updatePlanningConge(planningCongeDTOFromMapper);

		Assertions.assertTrue(updated);
		Mockito.verify(planningCongeRepository).findById(planningConge1.getId());
		Mockito.verify(planningCongeRepository).save(planningConge1);
	}

	@Order(10)
	@DisplayName("Update objet PlanningConge: Object not exist")
	@Test
	final void testUpdatePlanningCongeNotExist() {
		PlanningCongeDTO planningCongeDTOFromMapper = modelMapper.map(planningConge1, PlanningCongeDTO.class);
		when(modelMapper.map(planningCongeDTOFromMapper, PlanningConge.class)).thenReturn(planningConge1);
		when(planningCongeRepository.findById(planningConge1.getId())).thenReturn(Optional.empty());
		updated = planningCongeServiceImpl.updatePlanningConge(planningCongeDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(planningCongeRepository, Mockito.times(1)).findById(planningConge1.getId());
		Mockito.verify(planningCongeRepository, Mockito.times(0)).save(planningConge1);
	}

	@Order(11)
	@DisplayName("Delete objet PlanningConge By ID: ID exist")
	@Test
	final void testDetelePlanningCongeEXist() {
		PlanningCongeDTO planningCongeDTOFromMapper = modelMapper.map(planningConge1, PlanningCongeDTO.class);

		when(modelMapper.map(planningCongeDTOFromMapper, PlanningConge.class)).thenReturn(planningConge1);
		when(planningCongeRepository.findById(planningConge1.getId())).thenReturn(Optional.of(planningConge1));
		doNothing().when(planningCongeRepository).delete(planningConge1);

		deleted = planningCongeServiceImpl.detelePlanningConge(planningCongeDTOFromMapper);

		Assertions.assertTrue(deleted);
		Mockito.verify(planningCongeRepository).findById(planningConge1.getId());
		Mockito.verify(planningCongeRepository).delete(planningConge1);
	}

	@Order(12)
	@DisplayName("Delete objet PlanningConge by ID: ID not exist")
	@Test
	final void testDetelePlanningCongeNotEXist() {
		PlanningCongeDTO planningCongeDTOFromMapper = modelMapper.map(planningConge1, PlanningCongeDTO.class);

		when(modelMapper.map(planningCongeDTOFromMapper, PlanningConge.class)).thenReturn(planningConge1);
		when(planningCongeRepository.findById(planningConge1.getId())).thenReturn(Optional.empty());
		deleted = planningCongeServiceImpl.detelePlanningConge(planningCongeDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(planningCongeRepository, Mockito.times(1)).findById(planningConge1.getId());
		Mockito.verify(planningCongeRepository, Mockito.times(0)).delete(planningConge1);
	}

// Methodes utilitaires
	public Optional<UniteOrganisationnelle> getUniteOrganisationnelle(Long idUnite) {
		if (idUnite == 1L)
			return Optional.of(uniteOrganisationnelle1);
		else if (idUnite == 2L)
			return Optional.of(uniteOrganisationnelle1);
		else if (idUnite == 3L)
			return Optional.of(uniteOrganisationnelle1);
		return Optional.empty();
	}

	public Optional<PlanningConge> getPlanningConge(Long idUnite) {
		if (idUnite == 1L)
			return Optional.of(planningConge1);
		else if (idUnite == 2L)
			return Optional.of(planningConge2);
		else if (idUnite == 3L)
			return Optional.of(planningConge3);
		return Optional.empty();
	}
}
