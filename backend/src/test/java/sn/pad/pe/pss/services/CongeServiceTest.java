package sn.pad.pe.pss.services;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
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
import sn.pad.pe.pss.bo.DossierConge;
import sn.pad.pe.pss.bo.Fonction;
import sn.pad.pe.pss.bo.PlanningConge;
import sn.pad.pe.pss.bo.PlanningDirection;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.CongeDTO;
import sn.pad.pe.pss.dto.PlanningCongeDTO;
import sn.pad.pe.pss.repositories.AgentRepository;
import sn.pad.pe.pss.repositories.CongeRepository;
import sn.pad.pe.pss.repositories.DossierCongeRepository;
import sn.pad.pe.pss.repositories.PlanningCongeRepository;
import sn.pad.pe.pss.repositories.PlanningDirectionRepository;
import sn.pad.pe.pss.services.impl.CongeServiceImpl;

@DisplayName("Test Service Conge")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class CongeServiceTest {
	@Mock
	private CongeRepository congeRepository;
	@Mock
	private PlanningCongeRepository planningCongeRepository;
	@Mock
	private PlanningCongeService planningCongeService;
	@Mock
	private AgentRepository agentRepository;
	@Mock
	private DossierCongeRepository dossierCongeRepository;
	@Mock
	private PlanningDirectionRepository planningDirectionRepository;
	@InjectMocks
	private CongeServiceImpl congeServiceImpl;
	@Spy
	private ModelMapper modelMapper;

	private static Conge conge1;
	private static Conge conge3;
	private static Conge conge2;
	private static Conge conge4;
	private static CongeDTO congeDTO1;
	private static CongeDTO congeDTO2;
	private static CongeDTO congeDTO;
	private static boolean updated;
	private static boolean deleted;

	private static PlanningConge planningConge;
	private static Agent agent;
	private static Calendar calendar = new GregorianCalendar();
	private static Date dateStart;
	private static Date dateFinish;
	private static ArrayList<Conge> conges;
	private static List<CongeDTO> congeDTOsFromServiceVerify;
	private static DossierConge dossierConge;
	private static PlanningDirection planningDirection;

	@SuppressWarnings("deprecation")
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierConge = new DossierConge();
		dossierConge.setId(1L);
		dossierConge.setAnnee("2021");

		int annee = Calendar.getInstance().get(Calendar.YEAR);

		planningDirection = new PlanningDirection();
		planningDirection.setId(1L);
		planningDirection.setCode("PD" + annee);
		planningDirection.setCodeDirection("DD");
		planningDirection.setDescription("Planning direction " + annee);
		planningDirection.setDescriptionDirection("DD");
		planningDirection.setDossierConge(dossierConge);

		agent = new Agent();
		agent.setId(1L);
		agent.setMatricule("607043");
		agent.setEmail("ada@gmail.com");
		agent.setPrenom("");

		Fonction fonction = new Fonction();
		fonction.setId(1L);
		fonction.setNom("Développeur Full Stack");

		planningConge = new PlanningConge();
		planningConge.setCode("PL-2020-DCH");
		planningConge.setDateCreation(new Date());
		planningConge.setEtat("SAISI");

		conge1 = new Conge();
		conge1.setId(1L);
		conge1.setDateDepart(new Date());
		conge1.setDateRetourPrevisionnelle(new Date());
		conge1.setEtat("SAISI");
		conge1.setAgent(agent);
		conge1.setPlanningConge(planningConge);
		conge1.setAnnee("2021");
		
		conge2 = new Conge();
		conge2.setId(2L);
		conge2.setDateDepart(new Date());
		conge2.setDateRetourPrevisionnelle(new Date());
		conge2.setAgent(agent);
		conge2.setPlanningConge(planningConge);
		conge2.setAnnee("2021");

		conge3 = new Conge();
		conge3.setId(3L);
		conge3.setDateDepart(new Date());
		conge3.setDateRetourPrevisionnelle(new Date());
		conge3.setAgent(agent);
		conge3.setPlanningConge(planningConge);
		conge3.setAnnee("2021");

		conge4 = new Conge();
		conge4.setId(4L);
		conge4.setAgent(agent);
		conge4.setPlanningConge(planningConge);
		conge4.setDateDepart(new Date());
		conge4.setDateRetourPrevisionnelle(new Date());
		conge4.setAgent(agent);
		conge4.setPlanningConge(planningConge);
		conge4.setAnnee("2021");

		calendar.setTime(new Date());
		dateStart = new Date(calendar.get(Calendar.YEAR) - 1, calendar.get(Calendar.MONTH),
				calendar.get(Calendar.DAY_OF_MONTH));
		dateFinish = new Date();

		conges = new ArrayList<Conge>();
		conges.add(conge1);
		conges.add(conge2);
		conges.add(conge3);
		conges.add(conge4);

		AgentDTO agentDTO = new AgentDTO(new Long(1), "607043", "", "", new Date(), "", "", "", "", "", "", "", "", 
				new Date(), new Date(), true, new Date(), new Date());
		PlanningCongeDTO planningCongeDTO = new PlanningCongeDTO();
		planningCongeDTO.setCode("PL-2020-DCH");
		planningCongeDTO.setDateCreation(new Date());
		planningCongeDTO.setEtat("SAISI");

		congeDTO1 = new CongeDTO();
		congeDTO1.setId(1L);
		congeDTO1.setDateDepart(new Date());
		congeDTO1.setDateRetourPrevisionnelle(new Date());
		congeDTO1.setEtat("SAISI");
		congeDTO1.setAgent(agentDTO);
		congeDTO1.setPlanningConge(planningCongeDTO);
		congeDTO1.setAnnee("2021");

		congeDTO2 = new CongeDTO();
		congeDTO2.setId(2L);
		congeDTO2.setDateDepart(new Date());
		congeDTO2.setDateRetourPrevisionnelle(new Date());
		congeDTO2.setAgent(agentDTO);
		congeDTO2.setPlanningConge(planningCongeDTO);
		congeDTO2.setAnnee("2021");

	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Create Objet Conge")
	@Test
	final void testCreateCongeConge() {
		when(agentRepository.findById(agent.getId())).thenReturn(Optional.of(agent));
		when(congeRepository.findCongesByAgent(agent)).thenReturn(Arrays.asList(conge2));	

		CongeDTO congeDTOFromMapper = modelMapper.map(conge2, CongeDTO.class);
		when(modelMapper.map(congeDTOFromMapper, Conge.class)).thenReturn(conge2);
		when(congeRepository.save(conge2)).thenReturn(conge2);
		when(modelMapper.map(conge2, CongeDTO.class)).thenReturn(congeDTOFromMapper);

		CongeDTO congeDTOFromService = congeServiceImpl.createConge(congeDTOFromMapper);
		Assertions.assertEquals(congeDTOFromMapper, congeDTOFromService);
		verify(congeRepository, Mockito.times(1)).save(conge2);
	}

	@Order(2)
	@DisplayName("Liste objet Conge by PlanningConge")
	@Test
	final void getCongesByPlanningConge() {
		when(planningCongeRepository.findById(planningConge.getId())).thenReturn(Optional.of(planningConge));
		when(congeRepository.findCongesByPlanningConge(planningConge))
				.thenReturn(Arrays.asList(conge1, conge2, conge3, conge4));

		List<CongeDTO> congeDTOsFromMapper = Arrays.asList(conge1, conge2, conge3, conge4).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		List<CongeDTO> congeDTOsFromService = congeServiceImpl.getCongesByPlanningConge(planningConge.getId()).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());

		Assertions.assertEquals(congeDTOsFromMapper.size(), congeDTOsFromService.size());
		verify(congeRepository, Mockito.times(1)).findCongesByPlanningConge(planningConge);
	}

	@Order(3)
	@DisplayName("Get Conge by ID: ID exist")
	@Test
	final void testGetCongeByIdExist() {
		Optional<Conge> congeOptional = Optional.of(conge2);
		when(congeRepository.findById(conge2.getId())).thenReturn(congeOptional);
		CongeDTO congeDTOFromMapper = modelMapper.map(congeOptional.get(), CongeDTO.class);
		CongeDTO congeDTOFromService = congeServiceImpl.getCongeById(conge2.getId());
		Assertions.assertEquals(congeDTOFromMapper.getId(), congeDTOFromService.getId());
		verify(congeRepository, Mockito.times(1)).findById(conge2.getId());

	}

	@Order(4)
	@DisplayName("Get Conge by ID: ID not exist")
	@Test
	final void testGetCongeByIdNotExist() {
		when(congeRepository.findById(conge2.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			congeDTO = congeServiceImpl.getCongeById(conge2.getId());
		});
		Assertions.assertNull(congeDTO);
		verify(congeRepository, Mockito.times(1)).findById(conge2.getId());
	}

	@Order(5)
	@DisplayName("Update Conge: Object exist")
	@Test
	final void testUpdateCongeExist() {
		CongeDTO congeDTOFromMapper = modelMapper.map(conge4, CongeDTO.class);
		when(modelMapper.map(congeDTOFromMapper, Conge.class)).thenReturn(conge4);
		Optional<Conge> congeOptional = Optional.of(conge4);
		when(congeRepository.findById(conge4.getId())).thenReturn(congeOptional);
		when(congeRepository.save(conge4)).thenReturn(conge4);

		boolean updated = congeServiceImpl.updateConge(congeDTOFromMapper);
		Assertions.assertTrue(updated);
		verify(congeRepository, Mockito.times(1)).findById(conge4.getId());
		verify(congeRepository, Mockito.times(1)).save(conge4);
	}

	@Order(6)
	@DisplayName("Update Conge: Object not exist")
	@Test
	final void testUpdateCongeNotExist() {
		CongeDTO congeDTOFromMapper = modelMapper.map(conge4, CongeDTO.class);
		when(modelMapper.map(congeDTOFromMapper, Conge.class)).thenReturn(conge4);
		when(congeRepository.findById(conge4.getId())).thenReturn(Optional.empty());
		updated = congeServiceImpl.updateConge(congeDTOFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(congeRepository, Mockito.times(1)).findById(conge4.getId());
	}

	@Order(7)
	@DisplayName("Delete  Conge by ID: ID exist")
	@Test
	final void testDeteleCongeExist() {
		CongeDTO congeDTOFromMapper = modelMapper.map(conge3, CongeDTO.class);
		when(modelMapper.map(congeDTOFromMapper, Conge.class)).thenReturn(conge3);
		Optional<Conge> congeOptional = Optional.of(conge3);
		when(congeRepository.findById(conge3.getId())).thenReturn(congeOptional);
		doNothing().when(congeRepository).delete(conge3);
		deleted = congeServiceImpl.deteleConge(congeDTOFromMapper);
		Assertions.assertTrue(deleted);
		Mockito.verify(congeRepository).findById(conge3.getId());
		Mockito.verify(congeRepository).delete(conge3);
	}

	@Order(8)
	@DisplayName("Delete  Conge by ID: ID not exist")
	@Test
	final void testDeteleCongeNotExist() {
		CongeDTO congeDTOFromMapper = modelMapper.map(conge3, CongeDTO.class);
		when(modelMapper.map(congeDTOFromMapper, Conge.class)).thenReturn(conge3);
		when(congeRepository.findById(conge3.getId())).thenReturn(Optional.empty());
		deleted = congeServiceImpl.deteleConge(congeDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(congeRepository, Mockito.times(1)).findById(conge3.getId());
		Mockito.verify(congeRepository, Mockito.times(0)).delete(conge3);
	}

	@Order(9)
	@DisplayName("Create All Conge")
	@Test
	final void createAllConge() {
		CongeDTO congeDTOFromMapper = modelMapper.map(conge2, CongeDTO.class);
		when(modelMapper.map(congeDTOFromMapper, Conge.class)).thenReturn(conge2);
		when(congeRepository.saveAll(Arrays.asList(conge2))).thenReturn(Arrays.asList(conge2));
		when(modelMapper.map(conge2, CongeDTO.class)).thenReturn(congeDTOFromMapper);

		List<CongeDTO> congeDTOsFromService = congeServiceImpl.createAllConge(Arrays.asList(congeDTOFromMapper));

		Assertions.assertEquals(Arrays.asList(conge2).size(), congeDTOsFromService.size());
		verify(congeRepository, Mockito.times(1)).saveAll(Arrays.asList(conge2));

	}

	@Order(10)
	@DisplayName("Get Conge By PlanningConge And Etat")
	@Test
	final void getCongesByPlanningCongeAndEtat() {
		when(planningCongeRepository.findById(planningConge.getId())).thenReturn(Optional.of(planningConge));

		when(congeRepository.findCongesByPlanningCongeAndEtat(planningConge, conge1.getEtat()))
				.thenReturn(Arrays.asList(conge1, conge2, conge3, conge4));
		PlanningCongeDTO planningCongeDTO = modelMapper.map(planningConge, PlanningCongeDTO.class);
		when(planningCongeRepository.findById(planningCongeDTO.getId())).thenReturn(Optional.of(planningConge));

		List<CongeDTO> congeDTOsFromMapper = Arrays.asList(conge1, conge2, conge3, conge4).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		List<CongeDTO> congeDTOsFromService = congeServiceImpl
				.getCongesByPlanningCongeAndEtat(planningCongeDTO.getId(), conge1.getEtat()).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());

		Assertions.assertEquals(congeDTOsFromMapper.size(), congeDTOsFromService.size());
		verify(congeRepository, Mockito.times(1)).findCongesByPlanningCongeAndEtat(planningConge, conge1.getEtat());
	}

	@Order(11)
	@DisplayName("Get Conge By Agent")
	@Test
	final void getCongeByAgent() {
		when(agentRepository.findById(agent.getId())).thenReturn(Optional.of(agent));
		when(congeRepository.findCongesByAgent(agent)).thenReturn(Arrays.asList(conge1, conge2, conge3, conge4));

		List<CongeDTO> congeDTOsFromMapper = Arrays.asList(conge1, conge2, conge3, conge4).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		List<CongeDTO> congeDTOsFromService = congeServiceImpl.getCongeByAgent(agent.getId()).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());

		Assertions.assertEquals(congeDTOsFromMapper.size(), congeDTOsFromService.size());
		verify(congeRepository, Mockito.times(1)).findCongesByAgent(agent);
	}

	@Order(12)
	@DisplayName("Get Conge By DateBetween")
	@Test
	final void getCongesByDateBetween() {
		List<CongeDTO> congeDTOsFromMapper = Arrays.asList(conge2, conge3).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		when(congeRepository.findCongesByDateDepartAfterAndDateRetourEffectifBefore(dateStart, dateFinish))
				.thenReturn(Arrays.asList(conge2, conge3));
		List<CongeDTO> congeDTOsFromService = congeServiceImpl.getCongesByDateBetween(dateStart, dateFinish).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());

		Assertions.assertEquals(congeDTOsFromMapper.size(), congeDTOsFromService.size());
		verify(congeRepository, Mockito.times(1)).findCongesByDateDepartAfterAndDateRetourEffectifBefore(dateStart,
				dateFinish);
	}

	@Order(13)
	@DisplayName("Get Conge by CodeDecision: CodeDecision exist")
	@Test
	final void getCongeByCodeDecisionExist() {
		Optional<Conge> congeOptional = Optional.of(conge2);
		when(congeRepository.findCongeByCodeDecision(conge2.getCodeDecision())).thenReturn(congeOptional);
		CongeDTO congeDTOFromMapper = modelMapper.map(congeOptional.get(), CongeDTO.class);
		CongeDTO congeDTOFromService = congeServiceImpl.getCongeByCodeDecision(conge2.getCodeDecision());
		Assertions.assertEquals(congeDTOFromMapper.getId(), congeDTOFromService.getId());
		verify(congeRepository, Mockito.times(1)).findCongeByCodeDecision(conge2.getCodeDecision());
	}

	@Order(14)
	@DisplayName("Get Conge by CodeDecision: CodeDecision not exist")
	@Test
	final void getCongeByCodeDecisionNotExist() {
		when(congeRepository.findCongeByCodeDecision(conge2.getCodeDecision())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			congeDTO = congeServiceImpl.getCongeByCodeDecision(conge2.getCodeDecision());
		});
		Assertions.assertNull(congeDTO);
		verify(congeRepository, Mockito.times(1)).findCongeByCodeDecision(conge2.getCodeDecision());
	}

	@Order(15)
	@DisplayName("Update liste Conge: Liste object exist")
	@Test
	final void updateCongeManyExist() {
		CongeDTO congeDTOFromMapper = modelMapper.map(conge4, CongeDTO.class);
		when(modelMapper.map(congeDTOFromMapper, Conge.class)).thenReturn(conge4);
		when(congeRepository.saveAll(Arrays.asList(conge4))).thenReturn(Arrays.asList(conge4));

		updated = congeServiceImpl.updateCongeMany(Arrays.asList(congeDTOFromMapper));
		Assertions.assertTrue(updated);
		Mockito.verify(congeRepository, Mockito.times(1)).saveAll(Arrays.asList(conge4));
	}

	@SuppressWarnings("unchecked")
	@Order(16)
	@DisplayName("Update liste Conge: Liste object not exist")
	@Test
	final void updateCongeManyNotExist() {
		List<CongeDTO> congeDTOsFromMapper = Collections.EMPTY_LIST;
		updated = congeServiceImpl.updateCongeMany(congeDTOsFromMapper);
		Assertions.assertFalse(updated);
		Mockito.verify(congeRepository, Mockito.times(0)).saveAll(conges);
	}

	@Order(17)
	@DisplayName("Liste objet Conge")
	@Test
	final void testGetConges() {
		when(congeRepository.findAll()).thenReturn(Arrays.asList(conge1, conge2, conge3, conge4));

		List<CongeDTO> congeDTOsFromMapper = Arrays.asList(conge1, conge2, conge3, conge4).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		List<CongeDTO> congeDTOsFromService = congeServiceImpl.getConges();

		Assertions.assertEquals(congeDTOsFromMapper.size(), congeDTOsFromService.size());
		verify(congeRepository, Mockito.times(1)).findAll();
	}

	@Order(18)
	@DisplayName("Get liste Conge by DossierConge: DossierConge exist")
	@Test
	final void testGetCongeByDossierConge() {
		when(dossierCongeRepository.getOne(dossierConge.getId())).thenReturn(dossierConge);
		when(planningDirectionRepository.findPlanningDirectionsByDossierConge(dossierConge))
				.thenReturn(Arrays.asList(planningDirection));
		PlanningCongeDTO planningCongeDTO = modelMapper.map(planningConge, PlanningCongeDTO.class);
		when(planningCongeService.getPlanningCongesByPlanningDirection(planningDirection.getId()))
				.thenReturn(Arrays.asList(planningCongeDTO));
		when(congeRepository.findCongesByPlanningConge(any(PlanningConge.class))).thenReturn(conges);

		List<CongeDTO> congeDTOsFromService = congeServiceImpl.getCongeByDossierConge(dossierConge.getId());
		Assertions.assertEquals(conges.size(), congeDTOsFromService.size());
		verify(congeRepository, Mockito.times(1)).findCongesByPlanningConge(any(PlanningConge.class));
	}

	@Order(19)
	@DisplayName("Get liste Conge by ANNEE: ANNEE exist")
	@Test
	final void testGetAllCongeByAnneExist() {
		int annee = Calendar.getInstance().get(Calendar.YEAR);
		when(congeRepository.findCongesByAnnee(annee)).thenReturn(Arrays.asList(conge1, conge2, conge3, conge4));

		List<CongeDTO> congeDTOsFromMapper = Arrays.asList(conge1, conge2, conge3, conge4).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		List<CongeDTO> congeDTOsFromService = congeServiceImpl.getAllCongeByAnne(annee);

		Assertions.assertEquals(congeDTOsFromMapper.size(), congeDTOsFromService.size());
		verify(congeRepository, Mockito.times(1)).findCongesByAnnee(annee);
	}

	@Order(20)
	@DisplayName("Get liste Conge by ANNEE: ANNEE not exist")
	@Test
	final void testGetAllCongeByAnneNotExist() {
		int annee = Calendar.getInstance().get(Calendar.YEAR);
		when(congeRepository.findCongesByAnnee(annee)).thenReturn(Collections.emptyList());
		assertThrows(ResourceNotFoundException.class, () -> {
			congeDTOsFromServiceVerify = congeServiceImpl.getAllCongeByAnne(annee);
		});
		Assertions.assertNull(congeDTOsFromServiceVerify);
		verify(congeRepository, Mockito.times(1)).findCongesByAnnee(annee);
	}
}
