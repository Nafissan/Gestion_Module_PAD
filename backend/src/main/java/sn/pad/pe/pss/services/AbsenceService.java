package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.dto.AbsenceDTO;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

/**
 * 
 * @author abdou.diop
 *
 */
public interface AbsenceService {

	public List<AbsenceDTO> getAbsence();

	public AbsenceDTO getAbsenceById(Long id);

	public AbsenceDTO createAbsence(AbsenceDTO absenceDTO);

	public boolean updateAbsence(AbsenceDTO absenceDTO);

	public boolean deleteAbsence(AbsenceDTO absenceDTO) throws ResourceNotFoundException;

	public List<AbsenceDTO> getAbsencesByUniteOrganisationnelles(UniteOrganisationnelleDTO organisationnelleDTO);

	public List<AbsenceDTO> getAbsencesByUniteOrganisationnellesPLus(Long idOrganisationnelleDTO);

	public List<AbsenceDTO> findAbsencesByAgent(AgentDTO agentDTO);

	public List<AbsenceDTO> getAbsencesByUniteOrganisationnelless(List<Long> idUniteOrganisationnelles);

	public List<AbsenceDTO> findAbsencesByPlanningAbsence(PlanningAbsenceDTO planningAbsenceDTO);

	public List<AbsenceDTO> getAbsenceByDossierAbsence(Long idDossierAbsence);

	public List<AbsenceDTO> getAllAbsencesByAnne(int annee);

	public List<AbsenceDTO> getAbsencesByUniteOrganisationnellesAndAnnee(UniteOrganisationnelleDTO organisationnelleDTO,
			int annee);

	public List<AbsenceDTO> getAbsencesByUniteOrganisationnellesAndAnneeAndMois(List<Long> idUniteOrganisationnelles,
			int annee, String mois);

	public List<AbsenceDTO> getAbsencesByAnneeAndMois(int annee, String mois);
}
