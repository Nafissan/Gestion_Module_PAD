package sn.pad.pe.pelerinage.dto;

import java.util.Date;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;

public class FormulaireSatisfactionPelerinageDTO {
    private Long id;
    private DossierPelerinage dossierPelerinage;
    private String commentaire;
    private String matricule;
    private String nom;
    private String prenom;
    private Date dateCreation;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public DossierPelerinage getDossierPelerinage() {
        return dossierPelerinage;
    }
    public void setDossierPelerinage(DossierPelerinage dossierPelerinage) {
        this.dossierPelerinage = dossierPelerinage;
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
    public Date getDateCreation() {
        return dateCreation;
    }
    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

}
