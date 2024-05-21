package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pss.bo.Absence;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.PlanningAbsence;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

/**
 * 
 * @author abdou.diop
 *
 */
@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {

	Absence findAbsencetById(Long id);

	List<Absence> findAbsencesByUniteOrganisationnelle(UniteOrganisationnelle uniteOrganisationnelle);

	List<Absence> findAbsencesByAgent(Agent agent);

	List<Absence> findAbsencesByPlanningAbsence(PlanningAbsence planningAbsence);

	List<Absence> findAbsencesByAnnee(int annee);

	List<Absence> findAbsencesByUniteOrganisationnelleAndAnnee(UniteOrganisationnelle uniteOrganisationnelle,
			int annee);

	List<Absence> findAbsencesByUniteOrganisationnelleAndAnneeAndMois(UniteOrganisationnelle uniteOrganisationnelle,
			int annee, String mois);

	List<Absence> findAbsencesByAnneeAndMois(int annee, String mois);
}
