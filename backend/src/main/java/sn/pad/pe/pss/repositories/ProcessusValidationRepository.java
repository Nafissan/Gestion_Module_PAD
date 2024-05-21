package sn.pad.pe.pss.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pss.bo.ProcessusValidation;

@Repository
public interface ProcessusValidationRepository extends JpaRepository<ProcessusValidation, Long> {

	Optional<ProcessusValidation> findProcessusValidationByLibelle(String libelle);
}
