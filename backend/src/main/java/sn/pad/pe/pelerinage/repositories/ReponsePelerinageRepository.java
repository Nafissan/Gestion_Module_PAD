package sn.pad.pe.pelerinage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pelerinage.bo.FormulaireSatisfactionPelerinage;
import sn.pad.pe.pelerinage.bo.ReponsePelerinage;
import java.util.List;

@Repository

public interface ReponsePelerinageRepository extends JpaRepository<ReponsePelerinage, Long>{
    List<ReponsePelerinage> findByFormulaire(FormulaireSatisfactionPelerinage formulaire);
}
