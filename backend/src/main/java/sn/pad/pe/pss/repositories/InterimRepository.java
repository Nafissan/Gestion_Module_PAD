package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.DossierInterim;
import sn.pad.pe.pss.bo.Interim;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

public interface InterimRepository extends JpaRepository<Interim, Long> {

	Interim findIntermById(Long id);

	List<Interim> findInterimsByUniteOrganisationnelle(UniteOrganisationnelle uniteOrganisationnelle);

	List<Interim> findInterimsByAgentDepart(Agent agent);

	List<Interim> findInterimsByDossierInterim(DossierInterim dossierInterim);

	List<Interim> findInterimsByUniteOrganisationnelleAndAnnee(UniteOrganisationnelle organisationnelle, int annee);
}
