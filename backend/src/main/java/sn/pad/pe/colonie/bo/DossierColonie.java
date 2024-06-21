package sn.pad.pe.colonie.bo;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
@Entity
public class DossierColonie implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    @Column( unique = true)
    private String annee;
    
    private String description;
    private String etat;
    @Lob
    private byte[] noteMinistere;
    @Lob
    private byte[] demandeProspection;
    @Lob
    private byte[] noteInformation;
    @Lob
    private byte[] noteInstruction;
    @Lob
    private byte[] rapportMission;
    //agent
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
    @OneToOne(fetch = FetchType.LAZY,mappedBy = "codeDossier", cascade = CascadeType.ALL, orphanRemoval = true)
    private FormulaireSatisfaction formulaireSatisfaction;
     @OneToOne(fetch = FetchType.LAZY,mappedBy = "codeDossier", cascade = CascadeType.ALL, orphanRemoval = true)
    private RapportProspection rapportProspection;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "codeDossier", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Colon> colons;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
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

    public byte[] getNoteMinistere() {
        return noteMinistere;
    }

    public void setNoteMinistere(byte[] noteMinistere) {
        this.noteMinistere = noteMinistere;
    }
      public byte[] getDemandeProspection() {
        return demandeProspection;
    }

    public void setDemandeProspection(byte[] demandeProspection) {
        this.demandeProspection = demandeProspection;
    }
      public byte[] getNoteInformation() {
        return noteInformation;
    }

    public void setNoteInformation(byte[] noteInformation) {
        this.noteInformation = noteInformation;
    }
      public byte[] getNoteInstruction() {
        return noteInstruction;
    }

    public void setNoteInstruction(byte[] noteInstruction) {
        this.noteInstruction = noteInstruction;
    }
      public RapportProspection getRapportProspection() {
        return rapportProspection;
    }

    public void setRapportProspection(RapportProspection rapportProspection) {
        this.rapportProspection = rapportProspection;
    }

    public byte[] getRapportMission() {
        return rapportMission;
    }

    public void setRapportMission(byte[] rapportMission) {
        this.rapportMission = rapportMission;
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

    public FormulaireSatisfaction getFormulaireSatisfaction() {
        return formulaireSatisfaction;
    }

    public void setFormulaireSatisfaction(FormulaireSatisfaction formulaireSatisfaction) {
        this.formulaireSatisfaction = formulaireSatisfaction;
    }

    public List<Colon> getColons() {
        return colons;
    }

    public void setColons(List<Colon> colons) {
        this.colons = colons;
    }

  
}
