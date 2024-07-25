package sn.pad.pe.pelerinage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pelerinage.bo.FormulaireSatisfactionPelerinage;
import java.util.List;
import sn.pad.pe.pelerinage.bo.DossierPelerinage;

@Repository

public interface FormulaireSatisfactionPelerinageRepository extends JpaRepository<FormulaireSatisfactionPelerinage, Long>{
    List<FormulaireSatisfactionPelerinage> findByDossierPelerinage(DossierPelerinage dossierPelerinage);
}
