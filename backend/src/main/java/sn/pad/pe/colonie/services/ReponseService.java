package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.dto.ReponseDTO;

public interface  ReponseService {
    
    public List<ReponseDTO> saveReponses(List<ReponseDTO> reponses);

    public void deleteReponsesByFormulaireId(Long formulaireId);
    public List<ReponseDTO> updateReponses(List<ReponseDTO> reponses);

    public List<ReponseDTO> getReponsesByFormulaireId(FormulaireSatisfaction formulaireId);
}

