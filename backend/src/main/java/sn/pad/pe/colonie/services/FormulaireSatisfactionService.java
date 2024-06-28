package sn.pad.pe.colonie.services;
import java.util.List;
import java.util.Map;

import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;


public interface FormulaireSatisfactionService {
    
    public FormulaireSatisfactionDTO saveFormulaire(FormulaireSatisfactionDTO formulaire,Map<Long, String> reponsesMap);

    public List<FormulaireSatisfactionDTO> getAllFormulaires();

    public boolean  deleteFormulaire(FormulaireSatisfactionDTO formulaire);
}
