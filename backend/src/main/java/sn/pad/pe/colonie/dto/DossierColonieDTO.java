package sn.pad.pe.colonie.dto;
import java.util.Date;

import java.util.List;


public class DossierColonieDTO  {

    
    private Long id;
    
    private String code;
    
    private String annee;
    
    private String description;
    private String etat;
    //document
    private String noteMinistere;
    private String demandeProspection;
    private String noteInformation;
    private String noteInstruction;
    private RapportProspectionDTO rapportProspection;
    private String rapportMission;
    private byte[] noteMinistereBytes;
    private byte[] demandeProspectionBytes;
    private byte[] noteInformationBytes;
    private byte[] noteInstructionBytes;
    private byte[] rapportMissionBytes;
    //agent

    private String matricule;
    private String prenom;
    private String nom;
	private String fonction;

	private Date createdAt;
	private Date updatedAt;
    private FormulaireSatisfactionDTO formulaireSatisfactionDTO;
    private List<ColonDTO> colons;
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

    public String getNoteMinistere() {
        return noteMinistere;
    }

    public void setNoteMinistere(String noteMinistere) {
        this.noteMinistere = noteMinistere;
    }
      public String getDemandeProspection() {
        return demandeProspection;
    }

    public void setDemandeProspection(String demandeProspection) {
        this.demandeProspection = demandeProspection;
    }
      public String getNoteInformation() {
        return noteInformation;
    }

    public void setNoteInformation(String noteInformation) {
        this.noteInformation = noteInformation;
    }
      public String getNoteInstruction() {
        return noteInstruction;
    }

    public void setNoteInstruction(String noteInstruction) {
        this.noteInstruction = noteInstruction;
    }
      public RapportProspectionDTO getRapportProspection() {
        return rapportProspection;
    }

    public void setRapportProspection(RapportProspectionDTO rapportProspection) {
        this.rapportProspection = rapportProspection;
    }

    public String getRapportMission() {
        return rapportMission;
    }

    public void setRapportMission(String rapportMission) {
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

    public byte[] getNoteMinistereBytes() {
        return noteMinistereBytes;
    }

    public void setNoteMinistereBytes(byte[] noteMinistereBytes) {
        this.noteMinistereBytes = noteMinistereBytes;
    }

    public byte[] getDemandeProspectionBytes() {
        return demandeProspectionBytes;
    }

    public void setDemandeProspectionBytes(byte[] demandeProspectionBytes) {
        this.demandeProspectionBytes = demandeProspectionBytes;
    }

    public byte[] getNoteInformationBytes() {
        return noteInformationBytes;
    }

    public void setNoteInformationBytes(byte[] noteInformationBytes) {
        this.noteInformationBytes = noteInformationBytes;
    }

    public byte[] getNoteInstructionBytes() {
        return noteInstructionBytes;
    }

    public void setNoteInstructionBytes(byte[] noteInstructionBytes) {
        this.noteInstructionBytes = noteInstructionBytes;
    }

    public byte[] getRapportMissionBytes() {
        return rapportMissionBytes;
    }

    public void setRapportMissionBytes(byte[] rapportMissionBytes) {
        this.rapportMissionBytes = rapportMissionBytes;
    }

    public FormulaireSatisfactionDTO getFormulaireSatisfactionDTO() {
        return formulaireSatisfactionDTO;
    }

    public void setFormulaireSatisfactionDTO(FormulaireSatisfactionDTO formulaireSatisfactionDTO) {
        this.formulaireSatisfactionDTO = formulaireSatisfactionDTO;
    }

    public List<ColonDTO> getColons() {
        return colons;
    }

    public void setColons(List<ColonDTO> colons) {
        this.colons = colons;
    }
}
