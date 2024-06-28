package sn.pad.pe.colonie.dto;

import java.util.Map;

public class FormulaireSatisfactionRequest {
    private FormulaireSatisfactionDTO formulaire;
    private Map<Long, String> reponses;
    public FormulaireSatisfactionDTO getFormulaire() {
        return formulaire;
    }
    public void setFormulaire(FormulaireSatisfactionDTO formulaire) {
        this.formulaire = formulaire;
    }
    public Map<Long, String> getReponses() {
        return reponses;
    }
    public void setReponses(Map<Long, String> reponses) {
        this.reponses = reponses;
    }
}
