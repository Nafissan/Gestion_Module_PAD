package sn.pad.pe.colonie.dto;

import java.util.Date;

import sn.pad.pe.colonie.bo.DossierColonie;


public class RapportProspectionDTO {
   
    private Long id;
    private String rapportProspection;
    private String matricule;
    private String nom;
    private String prenom;
    private Date dateCreation;
    private Date dateValidation;
    private String etat;
    private DossierColonie codeDossierColonie;
    private String matriculeAgent;
    private String nomAgent;
    private String prenomAgent;
    private byte[] rapportProspectionByte;    private String commentaire;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getRapportProspection() {
        return rapportProspection;
    }
    public void setRapportProspection(String rapportProspection) {
        this.rapportProspection = rapportProspection;
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
    public Date getDateValidation() {
        return dateValidation;
    }
    public void setDateValidation(Date dateValidation) {
        this.dateValidation = dateValidation;
    }
    public String getEtat() {
        return etat;
    }
    public void setEtat(String etat) {
        this.etat = etat;
    }
    public DossierColonie getCodeDossierColonie() {
        return codeDossierColonie;
    }
    public void setCodeDossierColonie(DossierColonie codeDossier) {
        this.codeDossierColonie = codeDossier;
    }
    public String getMatriculeAgent() {
        return matriculeAgent;
    }
    public void setMatriculeAgent(String matriculeAgent) {
        this.matriculeAgent = matriculeAgent;
    }
    public String getNomAgent() {
        return nomAgent;
    }
    public void setNomAgent(String nomAgent) {
        this.nomAgent = nomAgent;
    }
    public String getPrenomAgent() {
        return prenomAgent;
    }
    public void setPrenomAgent(String prenomAgent) {
        this.prenomAgent = prenomAgent;
    }

    public byte[] getRapportProspectionByte() {
        return rapportProspectionByte;
    }

    public void setRapportProspectionByte(byte[] rapportProspectionByte) {
        this.rapportProspectionByte = rapportProspectionByte;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

}
