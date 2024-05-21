package sn.pad.pe.pss.bo;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author cheikhibra.samb
 *
 */
@Entity
public class Attestation implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Date dateSaisie;
	private String commentaire;
	private String etat;
	private String fonctionDemandeur;
	private String uniteDemandeur;
	private String directeurSectorielDCH;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_AGENT", referencedColumnName = "id", nullable = false)
	private Agent agent;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "attestation", orphanRemoval = true, cascade = CascadeType.REMOVE)
	private Set<EtapeAttestation> etapeAttestations = new HashSet<EtapeAttestation>(0);

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_UG", referencedColumnName = "id", nullable = false)
	private UniteOrganisationnelle uniteOrganisationnelle;

	@OneToOne
	@JoinColumn(name = "ID_File_MD", referencedColumnName = "id")
	private FileMetaData fileMetaData;

	public Attestation() {
		super();
	}

	public FileMetaData getFileMetaData() {
		return fileMetaData;
	}

	public void setFileMetaData(FileMetaData fileMetaData) {
		this.fileMetaData = fileMetaData;
	}

	public Set<EtapeAttestation> getEtapeAttestations() {
		return etapeAttestations;
	}

	public void setEtapeAttestations(Set<EtapeAttestation> etapeAttestations) {
		this.etapeAttestations = etapeAttestations;
	}

	public UniteOrganisationnelle getUniteOrganisationnelle() {
		return uniteOrganisationnelle;
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelle uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateSaisie() {
		return dateSaisie;
	}

	public void setDateSaisie(Date dateSaisie) {
		this.dateSaisie = dateSaisie;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
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

	public Agent getAgent() {
		return agent;
	}

	public void setAgent(Agent agent) {
		this.agent = agent;
	}

	public Set<EtapeAttestation> getHistoriqueAttestations() {
		return etapeAttestations;
	}

	public void setHistoriqueAttestations(Set<EtapeAttestation> etapeAttestations) {
		this.etapeAttestations = etapeAttestations;
	}

	public String getFonctionDemandeur() {
		return fonctionDemandeur;
	}

	public void setFonctionDemandeur(String fonctionDemandeur) {
		this.fonctionDemandeur = fonctionDemandeur;
	}

	public String getUniteDemandeur() {
		return uniteDemandeur;
	}

	public void setUniteDemandeur(String uniteDemandeur) {
		this.uniteDemandeur = uniteDemandeur;
	}

	public String getDirecteurSectorielDCH() {
		return directeurSectorielDCH;
	}

	public void setDirecteurSectorielDCH(String directeurSectorielDCH) {
		this.directeurSectorielDCH = directeurSectorielDCH;
	}

}
