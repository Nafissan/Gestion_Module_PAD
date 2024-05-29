package sn.pad.pe.colonie.dto;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class FormulaireSatisfactionDTO {
  
    private Long id;

    private DossierColonieDTO  codeDossier;

    private Date dateCreation;

   
    private Map<QuestionDTO, String> reponses = new HashMap<>();

    private String commentaire;
    //agent qui cree le formulaire
    private String matricule;
    private String nom;
    private String prenom;
    // Constructor, getters and setters
    public Long getId() {
        return id;
    }

    public DossierColonieDTO  getCodeDossier() {
        return codeDossier;
    }

    public void setCodeDossier(DossierColonieDTO  codeDossier) {
        this.codeDossier = codeDossier;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Map<QuestionDTO, String> getReponses() {
        return reponses;
    }

    public void setReponses(Map<QuestionDTO, String> reponses) {
        this.reponses = reponses;
    }

    public void ajouterReponse(QuestionDTO question, String reponse) {
        this.reponses.put(question, reponse);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
}
