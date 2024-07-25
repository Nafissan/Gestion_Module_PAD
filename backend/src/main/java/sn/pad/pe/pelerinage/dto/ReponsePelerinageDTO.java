package sn.pad.pe.pelerinage.dto;

import sn.pad.pe.pelerinage.bo.FormulaireSatisfactionPelerinage;
import sn.pad.pe.pelerinage.bo.QuestionPelerinage;

public class ReponsePelerinageDTO {
 private Long id;
    private FormulaireSatisfactionPelerinage formulaire;
    private QuestionPelerinage question;
    private String reponse;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public FormulaireSatisfactionPelerinage getFormulaire() {
        return formulaire;
    }
    public void setFormulaire(FormulaireSatisfactionPelerinage formulaire) {
        this.formulaire = formulaire;
    }
    public QuestionPelerinage getQuestion() {
        return question;
    }
    public void setQuestion(QuestionPelerinage question) {
        this.question = question;
    }
    public String getReponse() {
        return reponse;
    }
    public void setReponse(String reponse) {
        this.reponse = reponse;
    }
}
