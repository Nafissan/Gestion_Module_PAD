package sn.pad.pe.pelerinage.bo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import sn.pad.pe.colonie.bo.Question;

@Entity

public class ReponsePelerinage implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "formulaire_id", nullable = false)
    @JsonBackReference(value = "formulaire-reponses")
    private FormulaireSatisfactionPelerinage formulaire;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    @JsonBackReference 
    private Question question;

    @Column(nullable = false)
    private String reponse;

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

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

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getReponse() {
        return reponse;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
    }

}
