package sn.pad.pe.colonie.bo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class RapportProspection implements Serializable{
    private static final long serialVersionUID = 1L;
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private byte[] rapportProspection;
    //Agent qui ajoute le rapport
    private String matricule;
    private String nom;
    private String prenom;
    @Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
    private Date dateCreation;
     @Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
    private Date dateValidation;
    private String etat;
    @OneToOne    
    @JoinColumn(name = "CODE_DOSSIER_COLONIE", referencedColumnName = "id" ,nullable = false)
    @JsonBackReference
    private DossierColonie codeDossierColonie;
    //agent qui valide le rapport
    private String matriculeAgent;
    private String nomAgent;
    private String prenomAgent;
    private String commentaire;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public byte[] getRapportProspection() {
        return rapportProspection;
    }
    public void setRapportProspection(byte[] rapportProspection) {
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

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

}
