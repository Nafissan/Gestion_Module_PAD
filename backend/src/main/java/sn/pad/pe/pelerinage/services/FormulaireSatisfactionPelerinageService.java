package sn.pad.pe.pelerinage.services;

import java.util.List;

import sn.pad.pe.pelerinage.dto.FormulaireSatisfactionPelerinageDTO;

public interface FormulaireSatisfactionPelerinageService {
 FormulaireSatisfactionPelerinageDTO saveFormulaire(FormulaireSatisfactionPelerinageDTO formulaire);

    FormulaireSatisfactionPelerinageDTO updateFormulaire(FormulaireSatisfactionPelerinageDTO formulaireSatisfactionPelerinageDTO);

    List<FormulaireSatisfactionPelerinageDTO> getAllFormulaires();

    List<FormulaireSatisfactionPelerinageDTO> getFormulairesByDossierEtat();

    boolean deleteFormulaire(FormulaireSatisfactionPelerinageDTO formulaire);

    List<FormulaireSatisfactionPelerinageDTO> getFormulairesByAnnee(String annee);
}
