package sn.pad.pe.pelerinage.bo;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
@Entity
public class DossierPelerinage  implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String annee;
    @Column( unique = true)
    private String code;
    private String description;
    private String etat;
    @Lob
    private byte[] noteInformationBytes;
    @Lob
    private byte[] rapportPelerinageBytes;
    private String matricule;
    private String prenom;
    private String nom;
    private String fonction;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;
    private String commentaire;
    private String lieuPelerinage;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dossierPelerinage", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<FormulaireSatisfactionPelerinage> formulaireSatisfaction = new ArrayList<FormulaireSatisfactionPelerinage>(0);
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dossierPelerinage", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<Pelerin> pelerins = new ArrayList<Pelerin>(0);
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dossierPelerinage", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<Substitut> substituList = new ArrayList<Substitut>(0);
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dossierPelerinage", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<TirageAgent> agenList = new ArrayList<TirageAgent>(0);
    public static long getSerialversionuid() {
        return serialVersionUID;
    }
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
    public byte[] getNoteInformation() {
        return noteInformationBytes;
    }
    public void setNoteInformation(byte[] noteInformation) {
        this.noteInformationBytes = noteInformation;
    }
    public byte[] getRapportPelerinage() {
        return rapportPelerinageBytes;
    }
    public void setRapportPelerinage(byte[] rapportPelerinage) {
        this.rapportPelerinageBytes = rapportPelerinage;
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
    public List<FormulaireSatisfactionPelerinage> getFormulaireSatisfaction() {
        return formulaireSatisfaction;
    }
    public void setFormulaireSatisfaction(List<FormulaireSatisfactionPelerinage> formulaireSatisfaction) {
        this.formulaireSatisfaction = formulaireSatisfaction;
    }
    public List<Pelerin> getPelerins() {
        return pelerins;
    }
    public void setPelerins(List<Pelerin> pelerins) {
        this.pelerins = pelerins;
    }
    public List<Substitut> getSubstituList() {
        return substituList;
    }
    public void setSubstituList(List<Substitut> substituList) {
        this.substituList = substituList;
    }
    public List<TirageAgent> getAgenList() {
        return agenList;
    }
    public void setAgenList(List<TirageAgent> agenList) {
        this.agenList = agenList;
    }

    // Getters and Setters
    //...
}

