package sn.pad.pe.pss.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pss.bo.EtapeValidation;

@Repository
public interface EtapeValidationRepository extends JpaRepository<EtapeValidation, Long> {

	Optional<EtapeValidation> findEtapeValidationByNumeroOrdre(int numeroOrdre);

	Optional<EtapeValidation> findEtapeValidationByAction(String action);
}
