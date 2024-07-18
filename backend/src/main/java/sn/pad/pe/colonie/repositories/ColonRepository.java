package sn.pad.pe.colonie.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.colonie.bo.Colon;
import sn.pad.pe.colonie.bo.DossierColonie;

public interface ColonRepository extends JpaRepository<Colon, Long>{

    List<Colon> findByCodeDossier(DossierColonie dossier);

  

}
