package sn.pad.pe.pss.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Conge;
import sn.pad.pe.pss.bo.PlanningConge;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface CongeRepository extends JpaRepository<Conge, Long> {

	Optional<Conge> findCongeByCodeDecision(String codeDecision);

	List<Conge> findCongesByDateDepartAfterAndDateRetourEffectifBefore(Date dateDepart, Date dateRetourEffectif);

	Optional<Conge> findCongeByPlanningCongeAndAgent(PlanningConge planningConge, Agent agent);

	List<Conge> findCongesByAgent(Agent agent);

	List<Conge> findCongesByPlanningConge(PlanningConge planningConge);

	List<Conge> findCongesByPlanningCongeAndEtat(PlanningConge planningConge, String etat);

	List<Conge> findCongesByAnnee(int annee);

	List<Conge> findCongesByPlanningCongeAndAnnee(PlanningConge planningConge, String annee);
}
