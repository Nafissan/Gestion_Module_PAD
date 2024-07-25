package sn.pad.pe.pelerinage.services;

import java.util.List;


import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.dto.SubstitutDTO;
import sn.pad.pe.pss.dto.AgentDTO;

public interface SubstitutService {
 SubstitutDTO saveSubstitut(SubstitutDTO substitutDTO);

    List<SubstitutDTO> getAllSubstituts();

    List<SubstitutDTO> getSubstitutsByDossier(DossierPelerinage dossierPelerinageId); // Nouvelle méthode

    List<SubstitutDTO> getSubstitutsByDossierEtat();

    boolean deleteSubstitut(SubstitutDTO substitutDTO);

    void deleteAllSubstituts();
    SubstitutDTO generateSubstitutDTO(String sexe);
    void assignedSubstitutToPelerin(AgentDTO agent);
}
