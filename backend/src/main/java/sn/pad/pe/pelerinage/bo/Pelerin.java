package sn.pad.pe.pelerinage.bo;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import sn.pad.pe.pss.bo.Agent;

@Entity
public class Pelerin implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "DOSSIER_PELERINAGE_ID", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private DossierPelerinage dossierPelerinage;
    @OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "agent_id", referencedColumnName = "id")
	private Agent agent;
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "remplacantDe", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference(value = "remplacant-substitut")
    private Substitut substitut;
    private String type;
    private String status;
    private String matriculeAgent;
    private String nomAgent;
    private String prenomAgent;
    @Lob
    private byte[] documentBytes;
    @Lob
    private byte[] passportBytes;
    @Lob
    private byte[] ficheMedicalBytes;
    public static long getSerialversionuid() {
        return serialVersionUID;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public DossierPelerinage getDossierPelerinage() {
        return dossierPelerinage;
    }
    public void setDossierPelerinage(DossierPelerinage dossierPelerinage) {
        this.dossierPelerinage = dossierPelerinage;
    }
    public Substitut getSubstitut() {
        return substitut;
    }
    public void setSubstitut(Substitut substitut) {
        this.substitut = substitut;
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
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public Agent getAgent() {
        return agent;
    }
    public void setAgent(Agent agent) {
        this.agent = agent;
    }
    
}
