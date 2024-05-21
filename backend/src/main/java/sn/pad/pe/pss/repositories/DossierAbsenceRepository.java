package sn.pad.pe.pss.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.DossierAbsence;

/**
 * 
 * @author abdou.diop
 *
 */
public interface DossierAbsenceRepository extends JpaRepository<DossierAbsence, Long> {

	Optional<DossierAbsence> findDossierAbsenceByCode(String code);

	Optional<DossierAbsence> findDossierAbsenceById(Long id);

	Optional<DossierAbsence> findDossierAbsenceByCodeDirection(String codeDirection);
//	DossierAbsence findDossierAbsenceByCodeDirectionAndAnnee(String codeDirection, int annee);

//	List<DossierAbsence> findDossierAbsencesByDossierConge(DossierConge dossierConge);

//	Optional<DossierAbsence> findDossierAbsenceByCodeDirectionAndDossierConge(String codeDirection,
//			DossierConge dossierConge);

//	List<PlanningDirection> findPlanningDirectionByEtatAndDossierConge(String etat,
//			DossierConge dossierConge);

	List<DossierAbsence> findDossierAbsenceByAnnee(int annee);

}
