package sn.pad.pe.pelerinage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.bo.TirageAgent;
import java.util.List;

@Repository

public interface TirageAgentRepository extends JpaRepository<TirageAgent, Long>{
    List<TirageAgent> findByDossierPelerinage(DossierPelerinage dossierPelerinage);
}
