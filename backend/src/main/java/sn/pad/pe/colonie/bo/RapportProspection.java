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
    private Date dateCreation;
    private Date dateValidation;
    private String etat;
    @OneToOne    
    @JoinColumn(name = "CODE_DOSSIER_COLONIE", referencedColumnName = "code" ,unique = true, nullable = false)
    private DossierColonie codeDossier;
    //agent qui valide le rapport
    private String matriculeAgent;
    private String nomAgent;
    private String prenomAgent;
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
    public DossierColonie getCodeDossier() {
        return codeDossier;
    }
    public void setCodeDossier(DossierColonie codeDossier) {
        this.codeDossier = codeDossier;
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

}
