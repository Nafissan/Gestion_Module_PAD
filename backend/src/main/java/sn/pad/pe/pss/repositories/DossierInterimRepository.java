package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.DossierInterim;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface DossierInterimRepository extends JpaRepository<DossierInterim, Long> {

	List<DossierInterim> findDossierInterimByAnnee(int annee);

	DossierInterim findDossierInterimByUniteOrganisationnelleAndAnnee(UniteOrganisationnelle uniteOrganisationnelle,
			int annee);

}
