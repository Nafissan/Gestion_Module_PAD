package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.PlanningConge;
import sn.pad.pe.pss.bo.PlanningDirection;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface PlanningCongeRepository extends JpaRepository<PlanningConge, Long> {

	List<PlanningConge> findPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(
			PlanningDirection planningDirection, UniteOrganisationnelle uniteOrganisationnelle);

	List<PlanningConge> findPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(
			PlanningDirection planningDirection, UniteOrganisationnelle uniteOrganisationnelle, String etat);

	List<PlanningConge> findPlanningCongesByPlanningDirection(PlanningDirection planningDirection);

}
