package sn.pad.pe.pelerinage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.bo.Pelerin;
import java.util.List;
import java.util.Optional;

import sn.pad.pe.pss.bo.Agent;


@Repository

public interface PelerinRepository extends JpaRepository<Pelerin, Long>{
    List<Pelerin> findByDossierPelerinage(DossierPelerinage dossierPelerinage);
    List<Pelerin> findByStatus(String status);
    List<Pelerin> findByDossierPelerinageAndStatus(DossierPelerinage dossierP,String status);
    Optional<Pelerin> findByAgent(Agent agent);
    boolean existsByAgentId(Long agentId);

}
