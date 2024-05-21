package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.PlanningAbsenceDTO;

/**
 * 
 * @author abdou.diop
 *
 */
public interface PlanningAbsenceService {

	public PlanningAbsenceDTO getPlanningAbsenceById(Long id);

	public PlanningAbsenceDTO createPlanningAbsence(PlanningAbsenceDTO planningAbsenceDTO);

	public List<PlanningAbsenceDTO> getPlanningAbsences();

	public List<PlanningAbsenceDTO> getPlanningAbsencesByDossierAbsence(Long idDossierAbsence);

	public List<PlanningAbsenceDTO> getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(Long idDossierAbsence,
			Long idUniteOrganisationnelle);

	public List<PlanningAbsenceDTO> getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelles(Long idDossierAbsence,
			List<Long> idUniteOrganisationnelles);

	public List<PlanningAbsenceDTO> getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(
			Long idDossierAbsence, Long idUniteOrganisationnelle, String etat);

	public boolean updatePlanningAbsence(PlanningAbsenceDTO planningAbsenceDTO);

	public boolean detelePlanningAbsence(PlanningAbsenceDTO planningAbsenceDTO);

}
