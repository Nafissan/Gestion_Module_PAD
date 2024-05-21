package sn.pad.pe.pss.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
import sn.pad.pe.pss.bo.Absence;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.DossierAbsence;
import sn.pad.pe.pss.bo.PlanningAbsence;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AbsenceDTO;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.DossierAbsenceDTO;
import sn.pad.pe.pss.dto.MotifDTO;
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.AbsenceRepository;
import sn.pad.pe.pss.repositories.AgentRepository;
import sn.pad.pe.pss.repositories.DossierAbsenceRepository;
import sn.pad.pe.pss.repositories.PlanningAbsenceRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.impl.AbsenceServiceImpl;
import sn.pad.pe.pss.services.impl.DossierAbsenceServiceImpl;
import sn.pad.pe.pss.services.impl.PlanningAbsenceServiceImpl;

/**
 * 
 * @author abdou.diop
 *
 */

@ExtendWith(MockitoExtension.class)
@DisplayName("Test Service Absence")
@TestMethodOrder(OrderAnnotation.class)
class AbsenceServiceTest {
	@Spy
	private ModelMapper modelMapper;

	@Mock
	private AbsenceRepository absenceRepository;
	@Mock
	private AgentRepository agentRepository;
	@Mock
	private PlanningAbsenceRepository planningAbsenceRepository;
	@Mock
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;
	@Mock
	private DossierAbsenceRepository dossierAbsenceRepository;
	@InjectMocks
	private AbsenceServiceImpl absenceServiceImpl;
	@Mock
	private DossierAbsenceServiceImpl dossierAbsenceServiceImpl;
	@Mock
	private PlanningAbsenceServiceImpl planningAbsenceServiceImpl;

	private static AbsenceDTO absenceDto;
	private static AbsenceDTO absenceDto2;
	private static List<AbsenceDTO> absenceDTOsFromServiceVerify;
	private static DossierAbsenceDTO dossierAbsenceDto;
	private static AgentDTO agentDTO;
	private static PlanningAbsenceDTO planningAbsenceDTO;
	private static List<PlanningAbsenceDTO> planningAbsenceDTOs;
	private static UniteOrganisationnelleDTO organisationnelleDTO;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierAbsenceDto = new DossierAbsenceDTO();
		dossierAbsenceDto.setId(1L);
		dossierAbsenceDto.setAnnee(2020);

		agentDTO = new AgentDTO();
		agentDTO.setId(1L);
		agentDTO.setMatricule("607043");
		agentDTO.setEmail("ada@gmail.com");
		agentDTO.setPrenom("MS");
		organisationnelleDTO = new UniteOrganisationnelleDTO();
		organisationnelleDTO.setId(1L);
		MotifDTO motifDTO = new MotifDTO();
		planningAbsenceDTO = new PlanningAbsenceDTO();
		planningAbsenceDTO.setId(1L);
		planningAbsenceDTOs = Arrays.asList(planningAbsenceDTO);

		absenceDto = new AbsenceDTO();
		absenceDto.setId(1L);
		absenceDto.setDateDepart(new Date());
		absenceDto.setAgent(agentDTO);
		absenceDto.setUniteOrganisationnelle(organisationnelleDTO);
		absenceDto.setPlanningAbsence(planningAbsenceDTO);
		absenceDto.setMotif(motifDTO);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("List des absences")
	@Test
	void testGetAbsence() {
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findAll()).thenReturn(Arrays.asList(absence));
		List<AbsenceDTO> absenceDTOs = absenceServiceImpl.getAbsence();
		Assertions.assertEquals(1, absenceDTOs.size());
	}

	@Order(2)
	@DisplayName("Chercher absences By Id: Id exist")
	@Test
	void testGetAttestationByIdExist() {
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findById(absenceDto.getId())).thenReturn(Optional.of((absence)));
		when(modelMapper.map(absence, AbsenceDTO.class)).thenReturn(absenceDto);

		AbsenceDTO myAbsenceDTO = absenceServiceImpl.getAbsenceById(absenceDto.getId());
		assertEquals(absenceDto, myAbsenceDTO);
	}

	@Order(3)
	@DisplayName("Chercher absences By Id: Id not exist")
	@Test
	void testGetAttestationByIdNotExist() {
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findById(absence.getId())).thenReturn(Optional.empty());

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			absenceDto2 = absenceServiceImpl.getAbsenceById(absenceDto.getId());
		});
		Assertions.assertNull(absenceDto2);
		verify(absenceRepository, Mockito.times(1)).findById(absence.getId());
	}

	@Order(4)
	@DisplayName("Creation absences")
	@Test
	void testCreate() {
		Absence absence = modelMapper.map(absenceDto, Absence.class);

		when(modelMapper.map(absenceDto, Absence.class)).thenReturn(absence);
		when(absenceRepository.save(absence)).thenReturn(absence);
		when(modelMapper.map(absence, AbsenceDTO.class)).thenReturn(absenceDto);

		AbsenceDTO absencesaved = absenceServiceImpl.createAbsence(absenceDto);
		assertEquals(absenceDto, absencesaved);
		verify(absenceRepository, Mockito.times(1)).save(absence);

	}

	@Order(5)
	@DisplayName("Update absences: Object exist")
	@Test
	void testUpdateExist() {
		Absence absence = modelMapper.map(absenceDto, Absence.class);

		absenceDto.setCommentaire("demande12");
		when(absenceRepository.findById(absenceDto.getId())).thenReturn(Optional.of(absence));
		when(modelMapper.map(absenceDto, Absence.class)).thenReturn(absence);
		when(absenceRepository.save(absence)).thenReturn(absence);

		boolean updated = absenceServiceImpl.updateAbsence(absenceDto);

		verify(absenceRepository).save(absence);
		Assertions.assertTrue(updated);
	}

	@Order(6)
	@DisplayName("Update absences: Object not exist")
	@Test
	void testUpdateNotExist() {
		AbsenceDTO absenceDTOFromMapper = absenceDto;
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findById(absence.getId())).thenReturn(Optional.empty());
		updated = absenceServiceImpl.updateAbsence(absenceDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(absenceRepository, Mockito.times(1)).findById(absence.getId());
		Mockito.verify(absenceRepository, Mockito.times(0)).save(absence);
	}

	@Order(7)
	@DisplayName("Delete absences By ID: ID exist")
	@Test
	void testDeleteExist() {
		Absence absence = modelMapper.map(absenceDto, Absence.class);

		when(absenceRepository.findById(absenceDto.getId())).thenReturn(Optional.of(absence));
		when(modelMapper.map(absenceDto, Absence.class)).thenReturn(absence);
		doNothing().when(absenceRepository).delete(absence);

		boolean deleted = absenceServiceImpl.deleteAbsence(absenceDto);
		Assertions.assertTrue(deleted);
	}

	@Order(8)
	@DisplayName("Delete absences By ID: ID not exist")
	@Test
	void testDeleteNotExist() {
		AbsenceDTO absenceDTOFromMapper = absenceDto;
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findById(absence.getId())).thenReturn(Optional.empty());
		deleted = absenceServiceImpl.deleteAbsence(absenceDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(absenceRepository, Mockito.times(1)).findById(absence.getId());
		Mockito.verify(absenceRepository, Mockito.times(0)).delete(absence);
	}

	@Order(9)
	@DisplayName("Chercher absences By Agent")
	@Test
	void findAbsencesByAgent() {
		List<AbsenceDTO> myAbsenceDTOFromMapper = Arrays.asList((absenceDto));
		Agent agent = modelMapper.map(agentDTO, Agent.class);
		when(modelMapper.map(agentDTO, Agent.class)).thenReturn(agent);
//		when(agentRepository.findById(agent.getId())).thenReturn(Optional.of(agent));
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findAbsencesByAgent(any(Agent.class))).thenReturn(Arrays.asList((absence)));

		List<AbsenceDTO> myAbsenceDTOFromService = absenceServiceImpl.findAbsencesByAgent(agentDTO);
		assertEquals(myAbsenceDTOFromMapper.size(), myAbsenceDTOFromService.size());
		verify(absenceRepository, Mockito.times(1)).findAbsencesByAgent(any(Agent.class));
	}

	@Order(10)
	@DisplayName("Chercher absences By UniteOrganisationnelles")
	@Test
	void getAbsencesByUniteOrganisationnelles() {
		List<AbsenceDTO> myAbsenceDTOFromMapper = Arrays.asList((absenceDto));
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(modelMapper.map(organisationnelleDTO, UniteOrganisationnelle.class)).thenReturn(uniteOrganisationnelle);
//		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
//				.thenReturn(Optional.of(uniteOrganisationnelle));
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findAbsencesByUniteOrganisationnelle(any(UniteOrganisationnelle.class)))
				.thenReturn(Arrays.asList((absence)));

		List<AbsenceDTO> myAbsenceDTOFromService = absenceServiceImpl
				.getAbsencesByUniteOrganisationnelles(organisationnelleDTO);
		assertEquals(myAbsenceDTOFromMapper.size(), myAbsenceDTOFromService.size());
		verify(absenceRepository, Mockito.times(1))
				.findAbsencesByUniteOrganisationnelle(any(UniteOrganisationnelle.class));
	}

	@Order(11)
	@DisplayName("Chercher absences By UniteOrganisationnellesPLus")
	@Test
	void getAbsencesByUniteOrganisationnellesPLus() {
		List<AbsenceDTO> myAbsenceDTOFromMapper = Arrays.asList((absenceDto));
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findAbsencesByUniteOrganisationnelle(any(UniteOrganisationnelle.class)))
				.thenReturn(Arrays.asList((absence)));

		List<AbsenceDTO> myAbsenceDTOFromService = absenceServiceImpl
				.getAbsencesByUniteOrganisationnellesPLus(organisationnelleDTO.getId());
		assertEquals(myAbsenceDTOFromMapper.size(), myAbsenceDTOFromService.size());
		verify(absenceRepository, Mockito.times(1))
				.findAbsencesByUniteOrganisationnelle(any(UniteOrganisationnelle.class));

	}

	@Order(12)
	@DisplayName("Chercher absences By UniteOrganisationnelless")
	@Test
	void getAbsencesByUniteOrganisationnelless() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findAbsencesByUniteOrganisationnelle(any(UniteOrganisationnelle.class)))
				.thenReturn(Arrays.asList((absence)));
		List<AbsenceDTO> myAbsenceDTOFromMapper = Arrays.asList((absenceDto));
		List<AbsenceDTO> myAbsenceDTOFromService = absenceServiceImpl
				.getAbsencesByUniteOrganisationnelless(Arrays.asList(uniteOrganisationnelle.getId()));
		assertEquals(myAbsenceDTOFromMapper.size(), myAbsenceDTOFromService.size());
		verify(absenceRepository, Mockito.times(1))
				.findAbsencesByUniteOrganisationnelle(any(UniteOrganisationnelle.class));
	}

	@Order(13)
	@DisplayName("Chercher absences By PlanningAbsence")
	@Test
	void findAbsencesByPlanningAbsence() {
		List<AbsenceDTO> myAbsenceDTOFromMapper = Arrays.asList((absenceDto));
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDTO, PlanningAbsence.class);
		when(modelMapper.map(planningAbsenceDTO, PlanningAbsence.class)).thenReturn(planningAbsence);
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findAbsencesByPlanningAbsence(any(PlanningAbsence.class)))
				.thenReturn(Arrays.asList((absence)));

		List<AbsenceDTO> myAbsenceDTOFromService = absenceServiceImpl.findAbsencesByPlanningAbsence(planningAbsenceDTO);
		assertEquals(myAbsenceDTOFromMapper.size(), myAbsenceDTOFromService.size());
		verify(absenceRepository, Mockito.times(1)).findAbsencesByPlanningAbsence(any(PlanningAbsence.class));
	}

	@Order(14)
	@DisplayName("Chercher absences By DossierAbsence")
	@Test
	public void testGetAbsenceByDossierAbsence() {
		when(dossierAbsenceServiceImpl.getDossierAbsenceById(dossierAbsenceDto.getId())).thenReturn(dossierAbsenceDto);
		DossierAbsence dossierAbsence = modelMapper.map(dossierAbsenceDto, DossierAbsence.class);

		when(planningAbsenceServiceImpl.getPlanningAbsencesByDossierAbsence(dossierAbsence.getId()))
				.thenReturn(planningAbsenceDTOs);

		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findAbsencesByPlanningAbsence(any(PlanningAbsence.class)))
				.thenReturn(Arrays.asList(absence));
		List<AbsenceDTO> absenceDTOsFromServiceVerify = absenceServiceImpl
				.getAbsenceByDossierAbsence(dossierAbsenceDto.getId());
		assertEquals(Arrays.asList(absence).size(), absenceDTOsFromServiceVerify.size());
		verify(absenceRepository, Mockito.times(1)).findAbsencesByPlanningAbsence(any(PlanningAbsence.class));

	}

	@Order(15)
	@DisplayName("Chercher absences By ANNEE: ANNEE exist")
	@Test
	public void testGetAllAbsencesByAnneeExist() {
		int annee = Calendar.getInstance().get(Calendar.YEAR);
		Absence absence = modelMapper.map(absenceDto, Absence.class);
		when(absenceRepository.findAbsencesByAnnee(annee)).thenReturn(Arrays.asList(absence));
		List<AbsenceDTO> absenceDTOsFromServiceVerify = absenceServiceImpl.getAllAbsencesByAnne(annee);
		assertEquals(Arrays.asList(absence).size(), absenceDTOsFromServiceVerify.size());
		verify(absenceRepository, Mockito.times(1)).findAbsencesByAnnee(annee);

	}

	@Order(16)
	@DisplayName("Chercher absences By ANNEE: ANNEE not exist")
	@Test
	public void testGetAllAbsencesByAnneeNotExist() {
		int annee = Calendar.getInstance().get(Calendar.YEAR);
		when(absenceRepository.findAbsencesByAnnee(annee)).thenReturn(Collections.emptyList());
		assertThrows(ResourceNotFoundException.class, () -> {
			absenceDTOsFromServiceVerify = absenceServiceImpl.getAllAbsencesByAnne(annee);
		});
		assertNull(absenceDTOsFromServiceVerify);
		verify(absenceRepository, Mockito.times(1)).findAbsencesByAnnee(annee);

	}
}
