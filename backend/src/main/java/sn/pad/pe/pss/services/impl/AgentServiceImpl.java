package sn.pad.pe.pss.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Fonction;
import sn.pad.pe.pss.bo.PasswordResetToken;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.FonctionDTO;
import sn.pad.pe.pss.repositories.AgentRepository;
import sn.pad.pe.pss.repositories.PasswordTokenRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.AgentService;

/**
 *
 * @author Nafissa NDIAYE
 */
@Service
public class AgentServiceImpl implements AgentService {

	@Autowired
	private AgentRepository agentRepository;
	@Autowired
	private PasswordTokenRepository passwordTokenRepository;
	@Autowired
	private UniteOrganisationnelleRepository uniteRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<AgentDTO> getAgents() {
		List<AgentDTO> agentDTO = agentRepository.findAll().stream()
				.map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
		return agentDTO;
	}

	@Override
	public AgentDTO getAgent(String matricule) {
		return modelMapper.map(agentRepository.findAgentByMatricule(matricule), AgentDTO.class);
	}

	@Override
	public AgentDTO getAgentById(Long id) {
		Optional<Agent> agent = agentRepository.findById(id);
		if (agent.isPresent()) {
			return modelMapper.map(agent.get(), AgentDTO.class);
		} else {
			throw new ResourceNotFoundException("Agent not found with id : " + id);
		}
	}

	@Override
	public AgentDTO create(AgentDTO agentDto) {
		Agent agentSaved = modelMapper.map(agentDto, Agent.class);
		return modelMapper.map(agentRepository.save(agentSaved), AgentDTO.class);
	}

	@Override
	public boolean update(AgentDTO agentDTO) {
		Optional<Agent> agentUpdate = agentRepository.findById(agentDTO.getId());
		boolean isUpdated = false;
		if (agentUpdate.isPresent()) {
			agentRepository.save(modelMapper.map(agentDTO, Agent.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(AgentDTO agentDTO) {
		Optional<Agent> agentUpdate = agentRepository.findById(agentDTO.getId());
		boolean isDeleleted = false;
		if (agentUpdate.isPresent()) {
			Agent agentToDelete = agentUpdate.get();
			agentRepository.delete(agentToDelete);
			isDeleleted = true;
		}
		return isDeleleted;
	}

    @Override
    public List<String> getAgentsEmails() {
        List<AgentDTO> agents = getAgents();
        return agents.stream()
                .map(AgentDTO::getEmail)
                .collect(Collectors.toList());
    }
	@Override
	public List<AgentDTO> getAgentsWithoutCompte() {
		List<AgentDTO> agentDTO = agentRepository.getAgentsWithoutCompte().stream()
				.map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
		return agentDTO;
	}

//	@Override
//	public List<AgentDTO> getAgentsByUniteOrganisationnelleId(long id) {
//		Optional<UniteOrganisationnelle> unite = uniteRepository.findById(id);
//		if (unite.isPresent()) {
//			agentRepository.findByUniteOrganisationnelle(unite.get());
//			List<AgentDTO> agentDTO = agentRepository.findByUniteOrganisationnelle(unite.get()).stream()
//					.map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
//			return agentDTO;
//		} else {
//			throw new ResourceNotFoundException("Unité Organisationnelle not found");
//		}
//	}

	@Override
	public List<AgentDTO> getAgentsByUniteOrganisationnelleIdWithoutConges(long id, String annee) {
		Optional<UniteOrganisationnelle> unite = uniteRepository.findById(id);
		if (unite.isPresent()) {
			List<AgentDTO> agentDTO = agentRepository.findAgentsWithoutConge(unite.get().getId(), annee).stream()
					.map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
			return agentDTO;
		} else {
			throw new ResourceNotFoundException("Unité Organisationnelle not found");
		}
	}

	@Override
	public List<AgentDTO> getAgentsByUniteOrganisationnelleIdWithConges(long id) {
		Optional<UniteOrganisationnelle> unite = uniteRepository.findById(id);
		if (unite.isPresent()) {
			List<AgentDTO> agentDTO = agentRepository.findAgentsWithConge(unite.get().getId()).stream()
					.map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
			return agentDTO;
		} else {
			throw new ResourceNotFoundException("Unité Organisationnelle not found");
		}
	}
	@Override
    public AgentDTO getAgentByMatricule(String matricule) {
        Agent agent = agentRepository.findAgentByMatricule(matricule);
        if (agent == null) {
            throw new ResourceNotFoundException("Agent not found with matricule: " + matricule);
        }
        return modelMapper.map(agent,AgentDTO.class);
    }
	@Override
	public List<AgentDTO> getAgentsByUniteOrganisationnelle(long idUniteOrganisationnelle) {
		Optional<UniteOrganisationnelle> unite = uniteRepository.findById(idUniteOrganisationnelle);
		if (unite.isPresent()) {
			List<AgentDTO> agentDTO = agentRepository.findByUniteOrganisationnelle(unite.get()).stream()
					.map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
			return agentDTO;
		} else {
			throw new ResourceNotFoundException("Unité Organisationnelle not found");
		}
	}

//	@Override
//	public List<AgentDTO> getAllAgentsByUniteOrganisationnelleId(long id) {
//		List<AgentDTO> agents = new ArrayList<>();
//		agents.add(null);
//		agents.addAll(getAgentsByUniteOrganisationnelle(id));
//		for (UniteOrganisationnelleDTO unite : uniteService.getUnitesOrganisationnellesInferieures(id)) {
//			agents.addAll(getAgentsByUniteOrganisationnelle(unite.getId()));
//		}
//		agents.removeIf(Objects::isNull);
//		return agents;
//	}

	@Override
	public AgentDTO getAgentResponsable(long idUniteOrganisationnelle) {
		Optional<UniteOrganisationnelle> unite = uniteRepository.findById(idUniteOrganisationnelle);
		if (unite.isPresent()) {
			List<AgentDTO> agentDTO = agentRepository.findAgentByUniteOrganisationnelleAndEstChef(unite.get(), true)
					.stream().map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
			return agentDTO.get(0);
		} else {
			throw new ResourceNotFoundException("Agent Responsable not found with id : " + idUniteOrganisationnelle);
		}
	}

	@Override
	public boolean existFonctionDansAgent(FonctionDTO uneFonction) {
		Fonction fonction = modelMapper.map(uneFonction, Fonction.class);
		return agentRepository.findByFonction(fonction).isEmpty();

	}

	@Override
	public List<AgentDTO> createAll(List<AgentDTO> agentsDto) {
		List<Agent> agentsToSave = agentsDto.stream().map(agent -> modelMapper.map(agent, Agent.class))
				.collect(Collectors.toList());

		List<Agent> agentsSaved = agentRepository.saveAll(agentsToSave);

		return agentsSaved.stream().map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
//		for (AgentDTO agent : agentsDto) {
//			try {
//				create(agent);
//				agentsDto.remove(agent);
//			} catch (Exception e) {
//			//	e.printStackTrace();
//			}
//		}
//		return agentsDto;
	}

	@Override
	public List<AgentDTO> getAllAgentByestChefAndNiveauHierarchique(boolean estChef, int niveau) {
		List<Agent> agents = agentRepository.findAll();
		List<Agent> agentsChef = new ArrayList<>();

		for (Agent agent : agents) {
			if (agent.getUniteOrganisationnelle().getNiveauHierarchique().getPosition() == niveau) {
				agentsChef.add(agent);
			}
		}
		return agentsChef.stream().map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<AgentDTO> getAllChefByUniteOrganisationnelleInferieures(List<Long> idUniteOrganisationnelles) {

		List<Agent> agents = new ArrayList<>();

		for (Long idUniteOrganisationnelle : idUniteOrganisationnelles) {
			Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteRepository
					.findById(idUniteOrganisationnelle);

			List<Agent> agts = agentRepository.findAgentByUniteOrganisationnelleAndEstChef(uniteOrganisationnelle.get(),
					true);

			agents.addAll(agts);
		}
		List<AgentDTO> agentDTOs = agents.stream().map(agent -> modelMapper.map(agent, AgentDTO.class))
				.collect(Collectors.toList());

		return agentDTOs;
	}

	@Override
	public AgentDTO findAgentByEmail(String email) {
		Optional<Agent> agent = agentRepository.findAgentByEmail(email);
		if (agent.isPresent()) {
			return modelMapper.map(agent.get(), AgentDTO.class);
		} else {
			throw new ResourceNotFoundException("Agent not found with email : " + email);
		}
	}

	@Override
	public void createPasswordTokenForAgent(AgentDTO agentDTO, String token) {
		Agent agent = modelMapper.map(agentDTO, Agent.class);
		PasswordResetToken myToken = new PasswordResetToken(token, agent);
		passwordTokenRepository.save(myToken);
	}

	@Override
	public AgentDTO getAgentResponsableDCH() {
		String code = "UO015";
		Optional<Agent> agent = Optional.of(agentRepository.findAgentResponsableDCH(code));
		if (agent.isPresent()) {
			return modelMapper.map(agent.get(), AgentDTO.class);
		} else {
			throw new ResourceNotFoundException("Agent not found with id : " + code);
		}

	}

	@Override
	public List<AgentDTO> getAgentsAssures() {
		List<AgentDTO> agentDTO = agentRepository.getAgentsAssures().stream()
				.map(agent -> modelMapper.map(agent, AgentDTO.class)).collect(Collectors.toList());
		return agentDTO;
	}
	@Override
    public List<String> getAllAgentsMatricules() {
		List<AgentDTO> agents = getAgents();
        return agents.stream()
                              .map(AgentDTO::getMatricule)
                              .collect(Collectors.toList());
    }
}
