package sn.pad.pe.colonie.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.colonie.bo.DossierColonie;

public interface  DossierColonieRepository extends JpaRepository<DossierColonie, Long>{
    Optional<DossierColonie> findFirstByEtatIn(List<String> etats);

    Optional<DossierColonie> findByAnnee(String annee);

    List<DossierColonie> findByEtat(String string);

}
