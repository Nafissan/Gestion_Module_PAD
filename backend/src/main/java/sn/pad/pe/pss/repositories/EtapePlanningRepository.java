package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.EtapePlanningDirection;
import sn.pad.pe.pss.bo.PlanningDirection;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface EtapePlanningRepository extends JpaRepository<EtapePlanningDirection, Long> {

	List<EtapePlanningDirection> findEtapePlanningDirectionsByPlanningDirection(PlanningDirection planningDirection);
}
