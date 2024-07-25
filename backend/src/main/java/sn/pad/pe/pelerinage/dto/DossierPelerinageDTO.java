package sn.pad.pe.pelerinage.dto;

import java.util.Date;

public class DossierPelerinageDTO {

    private Long id;
    private String annee;
    private String code;
    private String description;
    private String etat;
    private byte[] noteInformationBytes;
    private byte[] rapportPelerinageBytes;
    private String noteInformation;
    private String rapportPelerinage;
    private String matricule;
    private String prenom;
    private String nom;
    private String fonction;
    private Date createdAt;
    private Date updatedAt;
    private String commentaire;
    private String lieuPelerinage;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getAnnee() {
        return annee;
    }
    public void setAnnee(String annee) {
        this.annee = annee;
    }
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getEtat() {
        return etat;
    }
    public void setEtat(String etat) {
        this.etat = etat;
    }
    public byte[] getNoteInformationBytes() {
        return noteInformationBytes;
    }
    public void setNoteInformationBytes(byte[] noteInformationBytes) {
        this.noteInformationBytes = noteInformationBytes;
    }
    public byte[] getRapportPelerinageBytes() {
        return rapportPelerinageBytes;
    }
    public void setRapportPelerinageBytes(byte[] rapportPelerinageBytes) {
        this.rapportPelerinageBytes = rapportPelerinageBytes;
    }
    public String getNoteInformation() {
        return noteInformation;
    }
    public void setNoteInformation(String noteInformation) {
        this.noteInformation = noteInformation;
    }
    public String getRapportPelerinage() {
        return rapportPelerinage;
    }
    public void setRapportPelerinage(String rapportPelerinage) {
        this.rapportPelerinage = rapportPelerinage;
    }
    public String getMatricule() {
        return matricule;
    }
    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }
    public String getPrenom() {
        return prenom;
    }
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public String getFonction() {
        return fonction;
    }
    public void setFonction(String fonction) {
        this.fonction = fonction;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    public Date getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    public String getCommentaire() {
        return commentaire;
    }
    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
    public String getLieuPelerinage() {
        return lieuPelerinage;
    }
    public void setLieuPelerinage(String lieuPelerinage) {
        this.lieuPelerinage = lieuPelerinage;
    }

    // Getters and Setters
    //...
}