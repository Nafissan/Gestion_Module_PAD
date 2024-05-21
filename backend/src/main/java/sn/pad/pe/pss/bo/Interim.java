package sn.pad.pe.pss.bo;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author cheikhibra.samb
 *
 */
@Entity
public class Interim implements Serializable {

	/**
	 * 
	 */

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date dateSaisie;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date dateDepart;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date dateRetour;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date dateRetourEffective;
	private String commentaire;
	private String etat;

	private int annee;

	private int niveau;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "AGENT_DEPART", referencedColumnName = "id", nullable = false)
	private Agent agentDepart;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "AGENT_ARRIVE", referencedColumnName = "id", nullable = false)
	private Agent agentArrive;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "interim", cascade = CascadeType.ALL)
	private Set<EtapeInterim> etapeInterims = new HashSet<EtapeInterim>(0);

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_UG", referencedColumnName = "id", nullable = false)
	private UniteOrganisationnelle uniteOrganisationnelle;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_DOSSIER_INTERIM", referencedColumnName = "id", nullable = false)
	private DossierInterim dossierInterim;

	@OneToOne
	@JoinColumn(name = "ID_File_MD", referencedColumnName = "id")
	private FileMetaData fileMetaData;

	public Interim() {
		super();
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

	public Date getDateRetour() {
		return dateRetour;
	}

	public void setDateRetour(Date dateRetour) {
		this.dateRetour = dateRetour;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Date getDateDepart() {
		return dateDepart;
	}

	public void setDateDepart(Date dateDepart) {
		this.dateDepart = dateDepart;
	}

	public Date getDateRetourEffective() {
		return dateRetourEffective;
	}

	public void setDateRetourEffective(Date dateRetourEffective) {
		this.dateRetourEffective = dateRetourEffective;
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

	@Column(name = "annee", nullable = true)
	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public int getNiveau() {
		return niveau;
	}

	public void setNiveau(int niveau) {
		this.niveau = niveau;
	}

	public Agent getAgentDepart() {
		return agentDepart;
	}

	public void setAgentDepart(Agent agentDepart) {
		this.agentDepart = agentDepart;
	}

	public Agent getAgentArrive() {
		return agentArrive;
	}

	public void setAgentArrive(Agent agentArrive) {
		this.agentArrive = agentArrive;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public Set<EtapeInterim> getEtapeInterims() {
		return etapeInterims;
	}

	public void setEtapeInterims(Set<EtapeInterim> etapeInterims) {
		this.etapeInterims = etapeInterims;
	}

	public UniteOrganisationnelle getUniteOrganisationnelle() {
		return uniteOrganisationnelle;
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelle uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public DossierInterim getDossierInterim() {
		return dossierInterim;
	}

	public void setDossierInterim(DossierInterim dossierInterim) {
		this.dossierInterim = dossierInterim;
	}

	public FileMetaData getFileMetaData() {
		return fileMetaData;
	}

	public void setFileMetaData(FileMetaData fileMetaData) {
		this.fileMetaData = fileMetaData;
	}

}
