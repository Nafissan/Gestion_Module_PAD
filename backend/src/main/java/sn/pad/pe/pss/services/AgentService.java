package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.FonctionDTO;

public interface AgentService {

	public List<AgentDTO> getAgents();

	public AgentDTO getAgent(String matricule);

	public AgentDTO getAgentById(Long id);

	public AgentDTO create(AgentDTO agent);

	public boolean update(AgentDTO agent);

	public boolean delete(AgentDTO agentDTO) throws ResourceNotFoundException;

	public List<AgentDTO> getAgentsWithoutCompte();

//	public List<AgentDTO> getAgentsByUniteOrganisationnelleId(long id);

	public List<AgentDTO> getAgentsByUniteOrganisationnelleIdWithoutConges(long id, String annee);

	public List<AgentDTO> getAgentsByUniteOrganisationnelleIdWithConges(long id);

	public List<AgentDTO> getAgentsByUniteOrganisationnelle(long idUniteOrganisationnelle);

//	public List<AgentDTO> getAllAgentsByUniteOrganisationnelleId(long id);

	public List<AgentDTO> getAllAgentByestChefAndNiveauHierarchique(boolean estChef, int niveauHierarchique);

	public AgentDTO getAgentResponsable(long idUniteOrganisationnelle);

	public boolean existFonctionDansAgent(FonctionDTO uneFonction);

	public List<AgentDTO> createAll(List<AgentDTO> agentsDto);

	public List<AgentDTO> getAllChefByUniteOrganisationnelleInferieures(List<Long> idUniteOrganisationnelles);

	public AgentDTO findAgentByEmail(String email);

	public void createPasswordTokenForAgent(AgentDTO agentDTO, String token);

	public AgentDTO getAgentResponsableDCH();
    public List<String> getAllAgentsMatricules();

	public List<AgentDTO> getAgentsAssures();
	public AgentDTO getAgentByMatricule(String matricule);
    public List<String> getAgentsEmails();

}
