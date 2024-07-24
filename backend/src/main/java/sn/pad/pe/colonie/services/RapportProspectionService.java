package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.dto.RapportProspectionDTO;

public interface RapportProspectionService {
    RapportProspectionDTO saveRapportProspection(RapportProspectionDTO rapportProspectionDTO);

    List<RapportProspectionDTO> getAllRapportsProspection();

    boolean updateRapportProspection(RapportProspectionDTO rapportProspectionDTO);
    RapportProspectionDTO getRapportProspectionByEtat();
    RapportProspectionDTO getRapportProspectionByDossier(DossierColonie dossierId); 

    boolean deleteRapportProspection(RapportProspectionDTO rapportProspectionDTO);

}
