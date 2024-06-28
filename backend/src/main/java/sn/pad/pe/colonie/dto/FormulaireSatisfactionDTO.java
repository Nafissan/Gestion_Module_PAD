package sn.pad.pe.colonie.dto;

import java.util.Date;
import sn.pad.pe.colonie.bo.DossierColonie;

public class FormulaireSatisfactionDTO {
  
    private Long id;

    private DossierColonie  codeDossier;

    private Date dateCreation;
    private String commentaire;
    private String matricule;
    private String nom;
    private String prenom;
    public Long getId() {
        return id;
    }

    public DossierColonie  getCodeDossier() {
        return codeDossier;
    }

    public void setCodeDossier(DossierColonie  codeDossier) {
        this.codeDossier = codeDossier;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
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
