package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.PlanningDirectionDTO;

/**
 * 
 * @author mamadouseydou.diallo
 * 
 */
public interface PlanningDirectionService {

	public List<PlanningDirectionDTO> getPlanningDirections();

	public List<PlanningDirectionDTO> getPlanningDirectionsByDossierConge(Long idDossierConge);

	public PlanningDirectionDTO getPlanningDirectionsByCodeDirectionAndDossierConge(String codeDirection,
			Long idDossierConge);

	public PlanningDirectionDTO getPlanningDirectionById(Long id);

	public PlanningDirectionDTO createPlanningDirection(PlanningDirectionDTO planningDirectionDTO);

	public boolean updatePlanningDirection(PlanningDirectionDTO planningDirectionDTO);

	public boolean detelePlanningDirection(PlanningDirectionDTO planningDirectionDTO);

}
