package sn.pad.pe.pss.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.DossierConge;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface DossierCongeRepository extends JpaRepository<DossierConge, Long> {

	Optional<DossierConge> findDossierCongeByAnnee(String annee);

}
