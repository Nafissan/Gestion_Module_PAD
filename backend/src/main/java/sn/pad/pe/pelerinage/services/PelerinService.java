package sn.pad.pe.pelerinage.services;

import java.util.List;


import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.dto.PelerinDTO;
import sn.pad.pe.pelerinage.dto.PelerinStatsDTO;
import sn.pad.pe.pelerinage.dto.SubstitutDTO;
import sn.pad.pe.pss.dto.AgentDTO;

public interface PelerinService {
  PelerinDTO savePelerin(PelerinDTO pelerinDTO);

    List<PelerinDTO> getPelerinsApte();

    List<PelerinDTO> getPelerinsByAnnee(String annee);

    PelerinStatsDTO getPelerinStatisticsByAnnee(String annee);

    List<PelerinDTO> getAllPelerins();

    List<PelerinDTO> getPelerinsByDossier(DossierPelerinage dossierPelerinage); // Nouvelle méthode

    List<PelerinDTO> getPelerinsByDossierEtat();
    public boolean assignAgentsToPelerinage(AgentDTO agent);
    boolean deletePelerin(PelerinDTO pelerinDTO);

    void deleteAllPelerins();

    boolean updatePelerin(PelerinDTO updatedPelerin);

    boolean sendMessages();
    void assignedSubstitutToPelerins(SubstitutDTO substitutDTO,PelerinDTO pelerinDTO);

    boolean existsByAgentId(Long id);
}
