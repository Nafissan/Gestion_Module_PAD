package sn.pad.pe.colonie.services;
import java.util.List;

import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;

public interface FormulaireSatisfactionService {
    public FormulaireSatisfactionDTO saveFormulaire(FormulaireSatisfactionDTO formulaire);

    public FormulaireSatisfactionDTO getFormulaireByCodeDossier(String code);
   
    public FormulaireSatisfactionDTO getFormulaireById(Long  id);

    public List<FormulaireSatisfactionDTO> getAllFormulaires();

    public void deleteFormulaire(Long id);
}
