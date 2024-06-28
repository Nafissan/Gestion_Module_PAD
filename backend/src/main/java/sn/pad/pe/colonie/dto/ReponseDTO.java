package sn.pad.pe.colonie.dto;

import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.bo.Question;

public class ReponseDTO {
    private Long id;
    private FormulaireSatisfaction formulaire;
    private Question question;
    private String reponse;

    public FormulaireSatisfaction getFormulaire() {
        return formulaire;
    }

    public void setFormulaire(FormulaireSatisfaction formulaire) {
        this.formulaire = formulaire;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReponse() {
        return reponse;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

}
