package sn.pad.pe.colonie.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.colonie.bo.DossierColonie;

public interface  DossierColonieRepository extends JpaRepository<DossierColonie, Long>{

    Optional<DossierColonie> findByAnnee(String annee);

   Optional<DossierColonie> findByCode(String code);
}
