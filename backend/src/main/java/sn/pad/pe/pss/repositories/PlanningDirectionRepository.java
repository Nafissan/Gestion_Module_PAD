package sn.pad.pe.pss.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.DossierConge;
import sn.pad.pe.pss.bo.PlanningDirection;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface PlanningDirectionRepository extends JpaRepository<PlanningDirection, Long> {

	Optional<PlanningDirection> findPlanningDirectionByCode(String code);

	Optional<PlanningDirection> findPlanningDirectionByCodeDirection(String codeDirection);

	List<PlanningDirection> findPlanningDirectionsByDossierConge(DossierConge dossierConge);

	Optional<PlanningDirection> findPlanningDirectionByCodeDirectionAndDossierConge(String codeDirection,
			DossierConge dossierConge);

	List<PlanningDirection> findPlanningDirectionByEtatAndDossierConge(String etat, DossierConge dossierConge);

}
