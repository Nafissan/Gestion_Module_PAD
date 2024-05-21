package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.PlanningCongeDTO;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface PlanningCongeService {

	public PlanningCongeDTO getPlanningCongeById(Long id);

	public PlanningCongeDTO createPlanningConge(PlanningCongeDTO planningCongeDTO);

	public List<PlanningCongeDTO> getPlanningConges();

	public List<PlanningCongeDTO> getPlanningCongesByPlanningDirection(Long idPlanningDirection);

	public List<PlanningCongeDTO> getPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(
			Long idPlanningDirection, Long idUniteOrganisationnelle);

	public List<PlanningCongeDTO> getPlanningCongesByPlanningDirectionAndUniteOrganisationnelles(
			Long idPlanningDirection, List<Long> idUniteOrganisationnelles);

	public List<PlanningCongeDTO> getPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(
			Long idPlanningDirection, Long idUniteOrganisationnelle, String etat);

	public boolean updatePlanningConge(PlanningCongeDTO planningCongeDTO);

	public boolean detelePlanningConge(PlanningCongeDTO planningCongeDTO);
}
