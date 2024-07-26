package sn.pad.pe.pelerinage.services;

import java.util.List;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.dto.TirageAgentDTO;
import sn.pad.pe.pss.dto.AgentDTO;

public interface TirageAgentService {
TirageAgentDTO saveTirageAgent(TirageAgentDTO tirageAgentDTO);

    List<TirageAgentDTO> getAllTirageAgents();

    List<TirageAgentDTO> getTirageAgentsByDossier(DossierPelerinage dossierPelerinageId); // Nouvelle méthode

    List<TirageAgentDTO> getTirageAgentsByDossierEtat();

    boolean deleteTirageAgent(TirageAgentDTO tirageAgentDTO);

    void deleteAllTirageAgents();

    boolean assignedAgent(AgentDTO agentDTO);

}
