package sn.pad.pe.colonie.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.dto.DossierColonieDTO;

public interface FormulaireSatisfactionRepository extends JpaRepository<FormulaireSatisfaction, Long> {
    FormulaireSatisfaction findByCodeDossier(DossierColonieDTO dossierColonie);

}