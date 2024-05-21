package sn.pad.pe.pss.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
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
import sn.pad.pe.pss.bo.Fonction;
import sn.pad.pe.pss.bo.NiveauHierarchique;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.FonctionDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.AgentRepository;
import sn.pad.pe.pss.repositories.FonctionRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.impl.AgentServiceImpl;

@DisplayName("Test Service Agent")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class AgentServiceTest {

	private static Agent agent;
	private static AgentDTO agentDTO_1;
	List<AgentDTO> agentsDTOsFromService_1;
	private static UniteOrganisationnelleDTO organisationnelleDTO;
	@Mock
	private AgentRepository agentRepository;
	@Mock
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;
	@Mock
	private FonctionRepository fonctionRepository;
	@InjectMocks
	private AgentServiceImpl agentServiceImpl;
	@Spy
	private ModelMapper modelMapper;
	private static boolean updated;
	private static boolean deleted;
	private static Fonction fonction;
	private static FonctionDTO fonctionDTO;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		organisationnelleDTO = new UniteOrganisationnelleDTO();
		organisationnelleDTO.setId(1L);
		agent = new Agent();
		agent.setMatricule("607043");
		agent.setEmail("ada@gmail.com");
		agent.setId(1L);
		fonctionDTO = new FonctionDTO();
		fonctionDTO.setId(1L);
		fonctionDTO.setNom("Développeur Full Stack");
		agent.setFonction(fonction);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@Test
	@DisplayName("Liste objet Agent")
	final void testGetAgents() {
		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);
		List<AgentDTO> agentsDTOsFromMapper = Arrays.asList(agentDTO);
		when(agentRepository.findAll()).thenReturn(Arrays.asList(agent));
		List<AgentDTO> agentsDTOsFromService = agentServiceImpl.getAgents();
		assertEquals(agentsDTOsFromService.size(), agentsDTOsFromMapper.size());
		verify(agentRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@Test
	@DisplayName("Recherche objet Agent By ID: ID exist")
	final void testGetAgentByIdExist() {
		AgentDTO agentDTOFromMapper = modelMapper.map(agent, AgentDTO.class);
		when(agentRepository.findById(agent.getId())).thenReturn(Optional.of(agent));
		AgentDTO agentDTOFromService = agentServiceImpl.getAgentById(agent.getId());
		Assertions.assertEquals(agentDTOFromMapper.getId(), agentDTOFromService.getId());
		verify(agentRepository, Mockito.times(1)).findById(agent.getId());
	}

	@Order(3)
	@Test
	@DisplayName("Recherche objet Agent By ID: ID not exist")
	final void testGetAgentByIdNotExist() {
		when(agentRepository.findById(agent.getId())).thenReturn(Optional.empty());

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			agentDTO_1 = agentServiceImpl.getAgentById(agent.getId());
		});
		Assertions.assertNull(agentDTO_1);
		verify(agentRepository, Mockito.times(1)).findById(agent.getId());
	}

	@Order(4)
	@Test
	@DisplayName("Création d'un objet agent")
	final void testCreate() {
		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);

		when(modelMapper.map(agentDTO, Agent.class)).thenReturn(agent);
		when(agentRepository.save(agent)).thenReturn(agent);
		when(modelMapper.map(agent, AgentDTO.class)).thenReturn(agentDTO);

		AgentDTO agentsaved = agentServiceImpl.create(modelMapper.map(agent, AgentDTO.class));

		assertEquals(agentsaved, agentDTO);
		verify(agentRepository, Mockito.times(1)).save(agent);
	}

	@Order(5)
	@DisplayName("Modification d'un objet agent: Object exist")
	@Test
	public void testUpdateExist() {
		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);

		when(modelMapper.map(agentDTO, Agent.class)).thenReturn(agent);
		when(agentRepository.findById(agent.getId())).thenReturn(Optional.of(agent));
		when(agentRepository.save(agent)).thenReturn(agent);

		agent.setMatricule("111303");
		Boolean updated = agentServiceImpl.update(agentDTO);
		assertTrue(updated);
		assertEquals("111303", agent.getMatricule());
		verify(agentRepository, Mockito.times(1)).findById(agent.getId());
		verify(agentRepository, Mockito.times(1)).save(agent);
	}

	@Order(6)
	@DisplayName("Modification d'un objet agent: Object not exist")
	@Test
	final void testUpdateNotExist() {
		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);
		when(agentRepository.findById(agent.getId())).thenReturn(Optional.empty());
		updated = agentServiceImpl.update(agentDTO);
		Assertions.assertFalse(updated);
		Mockito.verify(agentRepository, Mockito.times(1)).findById(agent.getId());
		Mockito.verify(agentRepository, Mockito.times(0)).save(agent);
	}

	@Order(7)
	@DisplayName("Suppression d'un objet agent: ID exist")
	@Test
	final void testDeleteExist() {
		when(agentRepository.findById(agent.getId())).thenReturn(Optional.of(agent));
		Boolean deleted = agentServiceImpl.delete(modelMapper.map(agent, AgentDTO.class));
		assertTrue(deleted);
		verify(agentRepository, Mockito.times(1)).findById(1L);
		verify(agentRepository, Mockito.times(1)).delete(agent);
	}

	@Order(8)
	@DisplayName("Suppression d'un objet agent: ID not exist")
	@Test
	final void testDeleteNotExist() {
		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);
		when(agentRepository.findById(agent.getId())).thenReturn(Optional.empty());
		deleted = agentServiceImpl.delete(agentDTO);
		Assertions.assertFalse(deleted);
		Mockito.verify(agentRepository, Mockito.times(1)).findById(agent.getId());
		Mockito.verify(agentRepository, Mockito.times(0)).delete(agent);
	}

	@Order(9)
	@Test
	@DisplayName("Recherche objet Agent By Matricule")
	final void getAgent() {
		AgentDTO agentDTOFromMapper = modelMapper.map(agent, AgentDTO.class);
		when(agentRepository.findAgentByMatricule(agent.getMatricule())).thenReturn(agent);
		AgentDTO agentDTOFromService = agentServiceImpl.getAgent(agent.getMatricule());
		Assertions.assertEquals(agentDTOFromMapper.getId(), agentDTOFromService.getId());
		verify(agentRepository, Mockito.times(1)).findAgentByMatricule(agent.getMatricule());
	}

	@Order(10)
	@Test
	@DisplayName("Recherche Agent sans compte")
	public void getAgentsWithoutCompte() {
		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);
		List<AgentDTO> agentsDTOsFromMapper = Arrays.asList(agentDTO);
		when(agentRepository.getAgentsWithoutCompte()).thenReturn(Arrays.asList(agent));
		List<AgentDTO> agentsDTOsFromService = agentServiceImpl.getAgentsWithoutCompte();
		assertEquals(agentsDTOsFromService.size(), agentsDTOsFromMapper.size());
		verify(agentRepository, Mockito.times(1)).getAgentsWithoutCompte();
	}

	@SuppressWarnings("deprecation")
	@Order(11)
	@Test
	@DisplayName("Recherche Agent By UniteOrganisationnelle: Unite exist ")
	public void getAgentsByUniteOrganisationnelleIdWithoutCongesExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);
		List<AgentDTO> agentsDTOsFromMapper = Arrays.asList(agentDTO);

		when(agentRepository.findAgentsWithoutConge(uniteOrganisationnelle.getId(),
				String.valueOf(new Date().getYear()))).thenReturn(Arrays.asList(agent));
		List<AgentDTO> agentsDTOsFromService = agentServiceImpl.getAgentsByUniteOrganisationnelleIdWithoutConges(
				uniteOrganisationnelle.getId(), String.valueOf(new Date().getYear()));
		assertEquals(agentsDTOsFromService.size(), agentsDTOsFromMapper.size());
		verify(agentRepository, Mockito.times(1)).findAgentsWithoutConge(uniteOrganisationnelle.getId(),
				String.valueOf(new Date().getYear()));
	}

	@SuppressWarnings("deprecation")
	@Order(12)
	@Test
	@DisplayName("Recherche Agent By UniteOrganisationnelle: Unite not exist ")
	public void getAgentsByUniteOrganisationnelleIdWithoutCongesNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			agentsDTOsFromService_1 = agentServiceImpl.getAgentsByUniteOrganisationnelleIdWithoutConges(
					uniteOrganisationnelle.getId(), String.valueOf(new Date().getYear()));
		});
		assertNull(agentsDTOsFromService_1);
		verify(agentRepository, Mockito.times(0)).findAgentsWithoutConge(uniteOrganisationnelle.getId(),
				String.valueOf(new Date().getYear()));
	}

	@Order(13)
	@Test
	@DisplayName("Recherche Agent By UniteOrganisationnelle: Unite exist ")
	public void getAgentsByUniteOrganisationnelleIdWithCongesExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);
		List<AgentDTO> agentsDTOsFromMapper = Arrays.asList(agentDTO);

		when(agentRepository.findAgentsWithConge(uniteOrganisationnelle.getId())).thenReturn(Arrays.asList(agent));
		List<AgentDTO> agentsDTOsFromService = agentServiceImpl
				.getAgentsByUniteOrganisationnelleIdWithConges(uniteOrganisationnelle.getId());
		assertEquals(agentsDTOsFromService.size(), agentsDTOsFromMapper.size());
		verify(agentRepository, Mockito.times(1)).findAgentsWithConge(uniteOrganisationnelle.getId());
	}

	@Order(14)
	@Test
	@DisplayName("Recherche Agent By UniteOrganisationnelle: Unite not exist ")
	public void getAgentsByUniteOrganisationnelleIdWithCongesNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			agentsDTOsFromService_1 = agentServiceImpl
					.getAgentsByUniteOrganisationnelleIdWithConges(uniteOrganisationnelle.getId());
		});

		assertNull(agentsDTOsFromService_1);
		verify(agentRepository, Mockito.times(0)).findAgentsWithConge(uniteOrganisationnelle.getId());
	}

	@Order(15)
	@Test
	@DisplayName("Recherche Agent By UniteOrganisationnelle: Unite exist")
	public void getAgentsByUniteOrganisationnelleExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);
		List<AgentDTO> agentsDTOsFromMapper = Arrays.asList(agentDTO);

		when(agentRepository.findByUniteOrganisationnelle(uniteOrganisationnelle)).thenReturn(Arrays.asList(agent));
		List<AgentDTO> agentsDTOsFromService = agentServiceImpl
				.getAgentsByUniteOrganisationnelle(uniteOrganisationnelle.getId());
		assertEquals(agentsDTOsFromService.size(), agentsDTOsFromMapper.size());
		verify(agentRepository, Mockito.times(1)).findByUniteOrganisationnelle(uniteOrganisationnelle);
	}

	@Order(16)
	@Test
	@DisplayName("Recherche Agent By UniteOrganisationnelle : Unite not exist")
	public void getAgentsByUniteOrganisationnelleNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			agentsDTOsFromService_1 = agentServiceImpl
					.getAgentsByUniteOrganisationnelle(uniteOrganisationnelle.getId());
		});
		assertNull(agentsDTOsFromService_1);
		verify(agentRepository, Mockito.times(0)).findByUniteOrganisationnelle(uniteOrganisationnelle);
	}

	@Order(17)
	@Test
	@DisplayName("Recherche Agent Responsable: Unite exist")
	public void getAgentResponsableExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId()))
				.thenReturn(Optional.of(uniteOrganisationnelle));

		when(agentRepository.findAgentByUniteOrganisationnelleAndEstChef(uniteOrganisationnelle, true))
				.thenReturn(Arrays.asList(agent));
		AgentDTO agentsDTOFromService = agentServiceImpl.getAgentResponsable(uniteOrganisationnelle.getId());
		assertEquals(agentsDTOFromService.getId(), organisationnelleDTO.getId());
		verify(agentRepository, Mockito.times(1)).findAgentByUniteOrganisationnelleAndEstChef(uniteOrganisationnelle,
				true);
	}

	@Order(18)
	@Test
	@DisplayName("Recherche Agent Responsable: Unite not exist")
	public void getAgentResponsableNotExist() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		when(uniteOrganisationnelleRepository.findById(uniteOrganisationnelle.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			agentDTO_1 = agentServiceImpl.getAgentResponsable(uniteOrganisationnelle.getId());
		});
		assertNull(agentDTO_1);
		verify(agentRepository, Mockito.times(0)).findAgentByUniteOrganisationnelleAndEstChef(uniteOrganisationnelle,
				true);
	}

	@Order(19)
	@Test
	@DisplayName("Recherche Agent By fonction")
	public void existFonctionDansAgent() {
		when(modelMapper.map(fonctionDTO, Fonction.class)).thenReturn(fonction);

		when(agentRepository.findByFonction(fonction)).thenReturn(Arrays.asList(agent));
		boolean exists = agentServiceImpl.existFonctionDansAgent(fonctionDTO);
		assertFalse(exists);
		verify(agentRepository, Mockito.times(1)).findByFonction(fonction);
	}

	@Order(20)
	@Test
	@DisplayName("Recherche Agent By NiveauHierarchique")
	public void getAllAgentByestChefAndNiveauHierarchique() {
		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);

		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		NiveauHierarchique niveauHierarchique = new NiveauHierarchique();
		niveauHierarchique.setId(1L);
		niveauHierarchique.setPosition(1);
		uniteOrganisationnelle.setNiveauHierarchique(niveauHierarchique);
		agent.setUniteOrganisationnelle(uniteOrganisationnelle);

		List<AgentDTO> agentsDTOsFromMapper = Arrays.asList(agentDTO);
		when(agentRepository.findAll()).thenReturn(Arrays.asList(agent));
		List<AgentDTO> agentsDTOsFromService = agentServiceImpl.getAllAgentByestChefAndNiveauHierarchique(true, 1);
		assertEquals(agentsDTOsFromService.size(), agentsDTOsFromMapper.size());
		verify(agentRepository, Mockito.times(1)).findAll();
	}

	@Order(21)
	@Test
	@DisplayName("Recherche Agent By NiveauHierarchique")
	public void getAllAgentByestChefAndNiveauHierarchiqueBIS() {
		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);

		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		NiveauHierarchique niveauHierarchique = new NiveauHierarchique();
		niveauHierarchique.setId(1L);
		niveauHierarchique.setPosition(1);
		uniteOrganisationnelle.setNiveauHierarchique(niveauHierarchique);
		agent.setUniteOrganisationnelle(uniteOrganisationnelle);

		List<AgentDTO> agentsDTOsFromMapper = Arrays.asList(agentDTO);
		when(agentRepository.findAll()).thenReturn(Arrays.asList(agent));
		List<AgentDTO> agentsDTOsFromService = agentServiceImpl.getAllAgentByestChefAndNiveauHierarchique(true, 0);
		assertNotEquals(agentsDTOsFromService.size(), agentsDTOsFromMapper.size());
		verify(agentRepository, Mockito.times(1)).findAll();
	}

	@Order(22)
	@Test
	@DisplayName("Création liste objet agent")
	@Disabled
	public void createAll() {
		AgentDTO agentDTO = modelMapper.map(agent, AgentDTO.class);

		List<AgentDTO> agentsDTOsFromMapper = Arrays.asList(agentDTO);
		when(modelMapper.map(agentDTO, Agent.class)).thenReturn(agent);
		when(agentRepository.save(agent)).thenReturn(agent);
		when(modelMapper.map(agent, AgentDTO.class)).thenReturn(agentDTO);

		List<AgentDTO> agentsaved = agentServiceImpl.createAll(agentsDTOsFromMapper);

		assertEquals(agentsaved.size(), agentsDTOsFromMapper.size());
		verify(agentRepository, Mockito.times(1)).save(agent);
	}
}
