package sn.pad.pe.pelerinage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
import sn.pad.pe.pelerinage.bo.DossierPelerinage;

@Repository
public interface DossierPelerinageRepository extends JpaRepository<DossierPelerinage, Long> {
    List<DossierPelerinage> findByEtat(String etat);
    Optional<DossierPelerinage> findFirstByEtatIn(List<String> etats);
    Optional<DossierPelerinage> findByAnnee(String annee);}