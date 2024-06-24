package sn.pad.pe.colonie.bo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
public class ParticipantColonie implements Serializable{
    private static final long serialVersionUID = 1L;
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
     @ManyToOne
    @JoinColumn(name = "CODE_DOSSIER_COLONIE", referencedColumnName = "id" , nullable = false)
    private DossierColonie codeDossier;
    private String nomEnfant;
    private String prenomEnfant;
    private Date dateNaissance;
    private String lieuNaissance;
    @Enumerated(EnumType.STRING)
    private GroupeSanguin groupeSanguin;
    @Enumerated(EnumType.STRING)
    private Sexe sexe;
    private String matriculeParent;
    private String nomParent;
    private String prenomParent;
    private String status;
    private String matriculeAgent;
    private String nomAgent;
    private String prenomAgent;
    @Lob
    private byte[] ficheSocial;
    @Lob
    private byte[] document;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public DossierColonie getCodeDossier() {
        return codeDossier;
    }
    public void setCodeDossier(DossierColonie codeDossier) {
        this.codeDossier = codeDossier;
    }
    public String getNomEnfant() {
        return nomEnfant;
    }
    public void setNomEnfant(String nomEnfant) {
        this.nomEnfant = nomEnfant;
    }
    public String getPrenomEnfant() {
        return prenomEnfant;
    }
    public void setPrenomEnfant(String prenomEnfant) {
        this.prenomEnfant = prenomEnfant;
    }
    public Date getDateNaissance() {
        return dateNaissance;
    }
    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }
    public String getLieuNaissance() {
        return lieuNaissance;
    }
    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }
    public GroupeSanguin getGroupeSanguin() {
        return groupeSanguin;
    }
    public void setGroupeSanguin(GroupeSanguin groupeSanguin) {
        this.groupeSanguin = groupeSanguin;
    }
    public Sexe getSexe() {
        return sexe;
    }
    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }
    public String getMatriculeParent() {
        return matriculeParent;
    }
    public void setMatriculeParent(String matricule) {
        this.matriculeParent = matricule;
    }
    public String getNomParent() {
        return nomParent;
    }
    public void setNomParent(String nomParent) {
        this.nomParent = nomParent;
    }
    public String getPrenomParent() {
        return prenomParent;
    }
    public void setPrenomParent(String prenomParent) {
        this.prenomParent = prenomParent;
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
    public byte[] getFicheSocial() {
        return ficheSocial;
    }
    public void setFicheSocial(byte[] ficheSocial) {
        this.ficheSocial = ficheSocial;
    }
    public byte[] getDocument() {
        return document;
    }
    public void setDocument(byte[] document) {
        this.document = document;
    }

}
