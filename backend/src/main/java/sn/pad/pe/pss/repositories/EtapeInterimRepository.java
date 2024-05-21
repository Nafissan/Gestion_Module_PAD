package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.EtapeInterim;
import sn.pad.pe.pss.bo.Interim;

public interface EtapeInterimRepository extends JpaRepository<EtapeInterim, Long> {

	List<EtapeInterim> findEtapeInterimsByInterim(Interim interim);
//	List<EtapeInterim> findEtapeInterimsByInterimByAgentDepart(Agent agent);
//	List<EtapeInterim> findEtapeInterimsByInterimByUniteOrganisationnelle(UniteOrganisationnelle organisationnelle);

}
