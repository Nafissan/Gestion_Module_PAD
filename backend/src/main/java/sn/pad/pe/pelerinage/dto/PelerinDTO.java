package sn.pad.pe.pelerinage.dto;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pss.bo.Agent;

public class PelerinDTO {
    private Long id;
    private Agent agent;
    private DossierPelerinage dossierPelerinage;
    private String type;
    private String status;
    private String matriculeAgent;
    private String nomAgent;
    private String prenomAgent;
    private byte[] documentBytes;
    private byte[] passportBytes;
    private byte[] ficheMedicalBytes;
    private String document;
    private String passport;
    private String ficheMedical;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Agent getAgent() {
        return agent;
    }
    public void setAgent(Agent agent) {
        this.agent = agent;
    }
    public DossierPelerinage getDossierPelerinage() {
        return dossierPelerinage;
    }
    public void setDossierPelerinage(DossierPelerinage dossierPelerinage) {
        this.dossierPelerinage = dossierPelerinage;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
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
    public byte[] getDocumentBytes() {
        return documentBytes;
    }
    public void setDocumentBytes(byte[] documentBytes) {
        this.documentBytes = documentBytes;
    }
    public byte[] getPassportBytes() {
        return passportBytes;
    }
    public void setPassportBytes(byte[] passportBytes) {
        this.passportBytes = passportBytes;
    }
    public byte[] getFicheMedicalBytes() {
        return ficheMedicalBytes;
    }
    public void setFicheMedicalBytes(byte[] ficheMedicalBytes) {
        this.ficheMedicalBytes = ficheMedicalBytes;
    }
    public String getDocument() {
        return document;
    }
    public void setDocument(String document) {
        this.document = document;
    }
    public String getPassport() {
        return passport;
    }
    public void setPassport(String passport) {
        this.passport = passport;
    }
    public String getFicheMedical() {
        return ficheMedical;
    }
    public void setFicheMedical(String ficheMedical) {
        this.ficheMedical = ficheMedical;
    }
}
