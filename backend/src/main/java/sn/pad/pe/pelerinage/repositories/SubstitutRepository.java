package sn.pad.pe.pelerinage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.bo.Pelerin;
import sn.pad.pe.pelerinage.bo.Substitut;
import java.util.List;
import java.util.Optional;

@Repository

public interface SubstitutRepository extends JpaRepository<Substitut, Long>{
    List<Substitut> findByDossierPelerinage(DossierPelerinage dossierPelerinage);
    Optional<Substitut> findByRemplacantDe(Pelerin remplacantDe);
}
