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
public class Absence implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date dateDepart;
	private Date dateRetourPrevisionnelle;
	private Date dateRetourEffectif;
	private Date dateSaisie;
	private String etat;
	private String mois;
	private int annee;
	private String commentaire;
	private int dureeRestante;
	private int niveau;
	private String etape;
	private int etape_validation;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CODE_AGENT", referencedColumnName = "id", nullable = false)
	private Agent agent;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "absence", orphanRemoval = true, cascade = CascadeType.REMOVE)
	private Set<EtapeAbsence> etapeAbsences = new HashSet<EtapeAbsence>(0);

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CODE_UNITE_ORG", referencedColumnName = "id", nullable = false)
	private UniteOrganisationnelle uniteOrganisationnelle;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "motif", referencedColumnName = "id", nullable = false)
	private Motif motif;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_PLANNING", referencedColumnName = "id", nullable = false)
	private PlanningAbsence planningAbsence;

	public Absence() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateDepart() {
		return dateDepart;
	}

	public void setDateDepart(Date dateDepart) {
		this.dateDepart = dateDepart;
	}

	public Date getDateRetourPrevisionnelle() {
		return dateRetourPrevisionnelle;
	}

	public void setDateRetourPrevisionnelle(Date dateRetourPrevisionnelle) {
		this.dateRetourPrevisionnelle = dateRetourPrevisionnelle;
	}

	public Date getDateRetourEffectif() {
		return dateRetourEffectif;
	}

	public void setDateRetourEffectif(Date dateRetourEffectif) {
		this.dateRetourEffectif = dateRetourEffectif;
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

	public String getMois() {
		return mois;
	}

	public void setMois(String mois) {
		this.mois = mois;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public Motif getMotif() {
		return motif;
	}

	public int getNiveau() {
		return niveau;
	}

	public void setNiveau(int niveau) {
		this.niveau = niveau;
	}

	public String getEtape() {
		return etape;
	}

	public void setEtape(String etape) {
		this.etape = etape;
	}

	public void setMotif(Motif motif) {
		this.motif = motif;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public int getDureeRestante() {
		return dureeRestante;
	}

	public void setDureeRestante(int dureeRestante) {
		this.dureeRestante = dureeRestante;
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

	public Set<EtapeAbsence> getEtapeAbsences() {
		return etapeAbsences;
	}

	public void setEtapeAbsences(Set<EtapeAbsence> etapeAbsences) {
		this.etapeAbsences = etapeAbsences;
	}

	public UniteOrganisationnelle getUniteOrganisationnelle() {
		return uniteOrganisationnelle;
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelle uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public PlanningAbsence getPlanningAbsence() {
		return planningAbsence;
	}

	public void setPlanningAbsence(PlanningAbsence planningAbsence) {
		this.planningAbsence = planningAbsence;
	}

	public int getEtape_validation() {
		return etape_validation;
	}

	public void setEtape_validation(int etape_validation) {
		this.etape_validation = etape_validation;
	}

}
