package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

public interface UniteOrganisationnelleService {

	public List<UniteOrganisationnelleDTO> getUniteOrganisationnelles();

	public UniteOrganisationnelleDTO getUniteOrganisationnelleById(Long id);

	public UniteOrganisationnelleDTO getUniteOrganisationnelleByCode(String code);

	public UniteOrganisationnelleDTO create(UniteOrganisationnelleDTO uniteOrganisationnelle);

	public boolean update(UniteOrganisationnelleDTO uniteOrganisationnelle);

	public boolean delete(UniteOrganisationnelleDTO uniteOrganisationnelle) throws ResourceNotFoundException;

	public List<UniteOrganisationnelleDTO> getUnitesOrganisationnellesSuperieures(Long id);

	public List<UniteOrganisationnelleDTO> getUnitesOrganisationnellesInferieures(Long id);

	public List<UniteOrganisationnelleDTO> getUnitesOrganisationnellesSuperieursByNiveau(int niveau);

	public List<UniteOrganisationnelleDTO> getUnitesOrgInferieurByUniteOrgAgentConnecte(AgentDTO a);
	
	public UniteOrganisationnelleDTO findTopByOrderByIdDesc();

}
