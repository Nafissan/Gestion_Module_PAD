package sn.pad.pe.colonie.dto;
import java.util.Date;

public class DossierColonieDTO  {

    
    private Long id;
    
    private String code;
    
    private String annee;
    
    private String description;
    private String etat;
    //document
    private byte[] noteMinistere;
    private byte[] demandeProspection;
    private byte[] noteInformation;
    private byte[] noteInstruction;
    private RapportProspectionDTO rapportProspection;
    private byte[] rapportMission;
    //agent
    private String matricule;
    private String prenom;
    private String nom;
	private String fonction;

	private Date createdAt;
	private Date updatedAt;
    // Getters and setters
    
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
      public RapportProspectionDTO getRapportProspection() {
        return rapportProspection;
    }

    public void setRapportProspection(RapportProspectionDTO rapportProspection) {
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
}
