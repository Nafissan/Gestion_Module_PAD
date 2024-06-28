package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.bo.Reponse;
import sn.pad.pe.colonie.dto.ReponseDTO;

public interface  ReponseService {
    
    public List<Reponse> saveReponses(List<Reponse> reponses);

    public void deleteReponsesByFormulaireId(Long formulaireId);

    public List<ReponseDTO> getReponsesByFormulaireId(FormulaireSatisfaction formulaireId);
}

