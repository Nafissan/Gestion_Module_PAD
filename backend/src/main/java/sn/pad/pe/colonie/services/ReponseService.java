package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.bo.Reponse;
import sn.pad.pe.colonie.dto.ReponseDTO;

public interface  ReponseService {
    List<ReponseDTO> getReponsesByFormulaireId(Long formulaireId); // Nouvelle méthode

    public ReponseDTO saveReponse(ReponseDTO reponses);

    public void deleteReponse(Reponse formulaireId);
    public ReponseDTO updateReponses(ReponseDTO reponses);

    public List<ReponseDTO> getReponses();
}

