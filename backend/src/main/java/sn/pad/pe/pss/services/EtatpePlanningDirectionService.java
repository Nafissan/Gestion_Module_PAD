package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.EtapePlanningDirectionDTO;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface EtatpePlanningDirectionService {

	public List<EtapePlanningDirectionDTO> getEtatpePlanningDirections();

	public List<EtapePlanningDirectionDTO> getEtatpePlanningDirectionsByPlanningDirection(Long idPlanningDirection);

	public EtapePlanningDirectionDTO getEtatpePlanningDirectionById(Long id);

	public EtapePlanningDirectionDTO createEtatpePlanningDirection(EtapePlanningDirectionDTO etapePlanningDirectionDTO);

	public boolean updateEtatpePlanningDirection(EtapePlanningDirectionDTO etapePlanningDirectionDTO);

	public boolean deteleEtatpePlanningDirection(EtapePlanningDirectionDTO etapePlanningDirectionDTO);

}
