package sn.pad.pe.pss.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.DossierAbsence;
import sn.pad.pe.pss.bo.PlanningAbsence;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface PlanningAbsenceRepository extends JpaRepository<PlanningAbsence, Long> {

	List<PlanningAbsence> findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(DossierAbsence dossierAbsence,
			UniteOrganisationnelle uniteOrganisationnelle);

	List<PlanningAbsence> findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(
			DossierAbsence dossierAbsence, UniteOrganisationnelle uniteOrganisationnelle, String etat);

	List<PlanningAbsence> findPlanningAbsenceesByDossierAbsence(DossierAbsence dossierAbsence);

	Optional<PlanningAbsence> findPlanningAbsenceById(Long id);
//	PlanningAbsence findPlanningAbsenceByUniteOrganisationnelleAndAnnee(
//			UniteOrganisationnelle uniteOrganisationnelle, int annee);
}
