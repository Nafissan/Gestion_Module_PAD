package sn.pad.pe.colonie.services;
import java.util.List;
import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;


public interface FormulaireSatisfactionService {
    
    public FormulaireSatisfactionDTO saveFormulaire(FormulaireSatisfactionDTO formulaire);
    public FormulaireSatisfactionDTO updateFormulaire(FormulaireSatisfactionDTO formulaire);

    public List<FormulaireSatisfactionDTO> getAllFormulaires();

    public boolean  deleteFormulaire(FormulaireSatisfactionDTO formulaire);
}
