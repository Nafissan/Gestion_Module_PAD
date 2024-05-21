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
import sn.pad.pe.pss.bo.DossierAbsence;
import sn.pad.pe.pss.bo.PlanningAbsence;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.DossierAbsenceDTO;
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.DossierAbsenceRepository;
import sn.pad.pe.pss.repositories.PlanningAbsenceRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.impl.PlanningAbsenceServiceImpl;

@DisplayName("Test Service PlanningAbsence")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class PlanningAbsenceServiceTest {
	@Mock
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;
	@Mock
	private DossierAbsenceRepository dossierAbsenceRepository;
	@Mock
	private PlanningAbsenceRepository planningAbsenceRepository;
	@InjectMocks
	private PlanningAbsenceServiceImpl planningAbsenceServiceImpl;
	@Spy
	private ModelMapper modelMapper;
	private static PlanningAbsenceDTO planningAbsenceDto;
	private static PlanningAbsenceDTO planningAbsenceDtoVerify;
	private static List<PlanningAbsenceDTO> planningAbsenceDtos;
	private static UniteOrganisationnelleDTO organisationnelleDto;
	private static DossierAbsenceDTO dossierAbsenceDto;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		organisationnelleDto = new UniteOrganisationnelleDTO();
		organisationnelleDto.setId(1L);
		organisationnelleDto.setCode("DD");
		organisationnelleDto.setDescription("Direction du Digital");

		dossierAbsenceDto = new DossierAbsenceDTO();
		dossierAbsenceDto.setId(1L);
		dossierAbsenceDto.setDescription("bien");

		planningAbsenceDto = new PlanningAbsenceDTO();
		planningAbsenceDto.setId(1L);
		planningAbsenceDto.setDateCreation(new Date());
		planningAbsenceDto.setEtat("SAISI");
		planningAbsenceDto.setUniteOrganisationnelle(organisationnelleDto);
		planningAbsenceDto.setDossierAbsence(dossierAbsenceDto);

		planningAbsenceDtos = Arrays.asList(planningAbsenceDto);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet PlanningAbsence")
	@Test
	final void testGetPlanningAbsences() {
		List<PlanningAbsence> planningAbsences = planningAbsenceDtos.stream()
				.map(planning -> modelMapper.map(planning, PlanningAbsence.class)).collect(Collectors.toList());
		when(planningAbsenceRepository.findAll()).thenReturn(planningAbsences);
		List<PlanningAbsenceDTO> planningAbsenceDTOsFromService = planningAbsenceServiceImpl.getPlanningAbsences();
		Assertions.assertEquals(planningAbsences.size(), planningAbsenceDTOsFromService.size());
		verify(planningAbsenceRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet PlanningAbsence By ID: ID exist")
	@Test
	final void testGetPlanningAbsenceByIdExist() {
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDto, PlanningAbsence.class);
		when(planningAbsenceRepository.findById(planningAbsence.getId())).thenReturn(Optional.of(planningAbsence));
		PlanningAbsenceDTO planningAbsenceDTOFromService = planningAbsenceServiceImpl
				.getPlanningAbsenceById(planningAbsence.getId());
		Assertions.assertEquals(planningAbsenceDto.getId(), planningAbsenceDTOFromService.getId());
		verify(planningAbsenceRepository, Mockito.times(1)).findById(planningAbsence.getId());
	}

	@Order(3)
	@DisplayName("Get Objet PlanningAbsence By ID: ID not exist")
	@Test
	final void testGetPlanningAbsenceByIdNotExist() {
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDto, PlanningAbsence.class);
		when(planningAbsenceRepository.findById(planningAbsence.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			planningAbsenceDtoVerify = planningAbsenceServiceImpl.getPlanningAbsenceById(planningAbsence.getId());
		});
		Assertions.assertNull(planningAbsenceDtoVerify);
		verify(planningAbsenceRepository, Mockito.times(1)).findById(planningAbsence.getId());
	}

	@Order(4)
	@DisplayName("Get Objet PlanningAbsence By DossierAbsence and UniteOrganisationnelle")
	@Test
	final void testGetPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle() {
		DossierAbsence dossierAbsence = modelMapper.map(dossierAbsenceDto, DossierAbsence.class);
		when(dossierAbsenceRepository.findDossierAbsenceById(dossierAbsence.getId()))
				.thenReturn(Optional.of(dossierAbsence));
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		List<PlanningAbsence> planningAbsences = planningAbsenceDtos.stream()
				.map(planning -> modelMapper.map(planning, PlanningAbsence.class)).collect(Collectors.toList());
		when(planningAbsenceRepository.findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(dossierAbsence,
				uniteOrganisationnelle)).thenReturn(planningAbsences);
		List<PlanningAbsenceDTO> planningAbsenceDTOsFromService = planningAbsenceServiceImpl
				.getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(dossierAbsenceDto.getId(),
						organisationnelleDto.getId());
		Assertions.assertEquals(planningAbsences.size(), planningAbsenceDTOsFromService.size());
		verify(planningAbsenceRepository, Mockito.times(1))
				.findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(dossierAbsence, uniteOrganisationnelle);
	}

	@Order(5)
	@DisplayName("Get Objet PlanningAbsence By DossierAbsence")
	@Test
	final void testGetPlanningAbsencesByDossierAbsence() {
		DossierAbsence dossierAbsence = modelMapper.map(dossierAbsenceDto, DossierAbsence.class);
		when(dossierAbsenceRepository.findById(dossierAbsence.getId())).thenReturn(Optional.of(dossierAbsence));
		List<PlanningAbsence> planningAbsences = planningAbsenceDtos.stream()
				.map(planning -> modelMapper.map(planning, PlanningAbsence.class)).collect(Collectors.toList());
		when(planningAbsenceRepository.findPlanningAbsenceesByDossierAbsence(dossierAbsence))
				.thenReturn(planningAbsences);
		List<PlanningAbsenceDTO> planningAbsenceDTOsFromService = planningAbsenceServiceImpl
				.getPlanningAbsencesByDossierAbsence(dossierAbsenceDto.getId());
		Assertions.assertEquals(planningAbsences.size(), planningAbsenceDTOsFromService.size());
		verify(planningAbsenceRepository, Mockito.times(1)).findPlanningAbsenceesByDossierAbsence(dossierAbsence);

	}

	@Order(6)
	@DisplayName("Get Objet PlanningAbsence By DossierAbsence and List UniteOrganisationnelle")
	@Test
	final void testGetPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelles() {
		DossierAbsence dossierAbsence = modelMapper.map(dossierAbsenceDto, DossierAbsence.class);
		when(dossierAbsenceRepository.findDossierAbsenceById(dossierAbsence.getId()))
				.thenReturn(Optional.of(dossierAbsence));
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		List<PlanningAbsence> planningAbsences = planningAbsenceDtos.stream()
				.map(planning -> modelMapper.map(planning, PlanningAbsence.class)).collect(Collectors.toList());
		when(planningAbsenceRepository.findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(dossierAbsence,
				uniteOrganisationnelle)).thenReturn(planningAbsences);
		List<PlanningAbsenceDTO> planningAbsenceDTOsFromService = planningAbsenceServiceImpl
				.getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelles(dossierAbsenceDto.getId(),
						Arrays.asList(organisationnelleDto.getId()));
		Assertions.assertEquals(planningAbsences.size(), planningAbsenceDTOsFromService.size());
		verify(planningAbsenceRepository, Mockito.times(1))
				.findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(dossierAbsence, uniteOrganisationnelle);
	}

	@Order(7)
	@DisplayName("Get Objet PlanningAbsence By DossierAbsence, UniteOrganisationnelle and Etat")
	@Test
	final void testGetPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat() {
		String etat = "SAISI";
		DossierAbsence dossierAbsence = modelMapper.map(dossierAbsenceDto, DossierAbsence.class);
		when(dossierAbsenceRepository.findDossierAbsenceById(dossierAbsence.getId()))
				.thenReturn(Optional.of(dossierAbsence));
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDto,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		List<PlanningAbsence> planningAbsences = planningAbsenceDtos.stream()
				.map(planning -> modelMapper.map(planning, PlanningAbsence.class)).collect(Collectors.toList());
		when(planningAbsenceRepository.findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(
				dossierAbsence, uniteOrganisationnelle, etat)).thenReturn(planningAbsences);
		List<PlanningAbsenceDTO> planningAbsenceDTOsFromService = planningAbsenceServiceImpl
				.getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(dossierAbsenceDto.getId(),
						organisationnelleDto.getId(), etat);
		Assertions.assertEquals(planningAbsences.size(), planningAbsenceDTOsFromService.size());
		verify(planningAbsenceRepository, Mockito.times(1))
				.findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(dossierAbsence,
						uniteOrganisationnelle, etat);
	}

	@Order(8)
	@DisplayName("Create objet PlanningAbsence")
	@Test
	final void testCreatePlanningAbsence() {
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDto, PlanningAbsence.class);
		when(modelMapper.map(planningAbsenceDto, PlanningAbsence.class)).thenReturn(planningAbsence);
		when(planningAbsenceRepository.save(planningAbsence)).thenReturn(planningAbsence);
		when(modelMapper.map(planningAbsence, PlanningAbsenceDTO.class)).thenReturn(planningAbsenceDto);
		PlanningAbsenceDTO planningAbsenceDTOFromService = planningAbsenceServiceImpl
				.createPlanningAbsence(planningAbsenceDto);
		Assertions.assertEquals(planningAbsenceDto, planningAbsenceDTOFromService);
		verify(planningAbsenceRepository, Mockito.times(1)).save(planningAbsence);
	}

	@Order(9)
	@DisplayName("Update Objet PlanningAbsence: Object exist")
	@Test
	final void testUpdatePlanningAbsenceExist() {
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDto, PlanningAbsence.class);
		when(modelMapper.map(planningAbsenceDto, PlanningAbsence.class)).thenReturn(planningAbsence);
		when(planningAbsenceRepository.findById(planningAbsence.getId())).thenReturn(Optional.of(planningAbsence));
		when(planningAbsenceRepository.save(planningAbsence)).thenReturn(planningAbsence);
		updated = planningAbsenceServiceImpl.updatePlanningAbsence(planningAbsenceDto);
		Assertions.assertTrue(updated);
		Mockito.verify(planningAbsenceRepository).findById(planningAbsence.getId());
		Mockito.verify(planningAbsenceRepository).save(planningAbsence);
	}

	@Order(10)
	@DisplayName("Update Objet PlanningAbsence: Object exist")
	@Test
	final void testUpdatePlanningAbsenceNotExist() {
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDto, PlanningAbsence.class);
		when(planningAbsenceRepository.findById(planningAbsence.getId())).thenReturn(Optional.empty());
		updated = planningAbsenceServiceImpl.updatePlanningAbsence(planningAbsenceDto);
		Assertions.assertFalse(updated);
		Mockito.verify(planningAbsenceRepository, Mockito.times(1)).findById(planningAbsence.getId());
		Mockito.verify(planningAbsenceRepository, Mockito.times(0)).save(planningAbsence);
	}

	@Order(11)
	@DisplayName("Delete objet PlanningAbsence By ID: ID exist")
	@Test
	final void testDetelePlanningAbsenceExist() {
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDto, PlanningAbsence.class);
		when(modelMapper.map(planningAbsenceDto, PlanningAbsence.class)).thenReturn(planningAbsence);
		when(planningAbsenceRepository.findPlanningAbsenceById(planningAbsence.getId())).thenReturn(Optional.of(planningAbsence));
		doNothing().when(planningAbsenceRepository).delete(planningAbsence);
		deleted = planningAbsenceServiceImpl.detelePlanningAbsence(planningAbsenceDto);
		Assertions.assertTrue(deleted);
		Mockito.verify(planningAbsenceRepository).findPlanningAbsenceById(planningAbsence.getId());
		Mockito.verify(planningAbsenceRepository).delete(planningAbsence);
	}

	@Order(12)
	@DisplayName("Delete objet PlanningAbsence By ID: ID not exist")
	@Test
	final void testDetelePlanningAbsencenotExist() {
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDto, PlanningAbsence.class);
		when(planningAbsenceRepository.findPlanningAbsenceById(planningAbsence.getId())).thenReturn(Optional.empty());
		deleted = planningAbsenceServiceImpl.detelePlanningAbsence(planningAbsenceDto);
		Assertions.assertFalse(deleted);
		Mockito.verify(planningAbsenceRepository, Mockito.times(1)).findPlanningAbsenceById(planningAbsence.getId());
		Mockito.verify(planningAbsenceRepository, Mockito.times(0)).delete(planningAbsence);
	}

}
