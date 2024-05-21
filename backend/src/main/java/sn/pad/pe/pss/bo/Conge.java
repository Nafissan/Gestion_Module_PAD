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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * 
 * @author cheikhibra.samb
 *
 */
@Entity
public class Conge implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String code;
	private String annee;
	private String mois;
	private int dureePrevisionnelle;
	private int dureeEffective;
	private Date dateDepart;
	private Date dateRetourPrevisionnelle;
	private Date dateRetourEffectif;
	private Date dateSaisie;
	private String etat;
	private int niveau;
	private int etape;
	private String description;
	private String codeDecision;
	private int dureeRestante;
	private Long solde;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_PLANNING", referencedColumnName = "id", nullable = false)
	private PlanningConge planningConge;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CODE_AGENT", referencedColumnName = "id", nullable = false)
	private Agent agent;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "conge", cascade = CascadeType.ALL)
	private Set<HistoriqueConge> historiqueConges = new HashSet<HistoriqueConge>(0);

	public Conge() {
		super();
	}

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

	public String getMois() {
		return mois;
	}

	public void setMois(String mois) {
		this.mois = mois;
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

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public int getNiveau() {
		return niveau;
	}

	public void setNiveau(int niveau) {
		this.niveau = niveau;
	}

	public int getEtape() {
		return etape;
	}

	public void setEtape(int etape) {
		this.etape = etape;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCodeDecision() {
		return codeDecision;
	}

	public void setCodeDecision(String codeDecision) {
		this.codeDecision = codeDecision;
	}

	public int getDureeRestante() {
		return dureeRestante;
	}

	public void setDureeRestante(int dureeRestante) {
		this.dureeRestante = dureeRestante;
	}

	public Long getSolde() {
		return solde;
	}

	public void setSolde(Long solde) {
		this.solde = solde;
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

	public PlanningConge getPlanningConge() {
		return planningConge;
	}

	public void setPlanningConge(PlanningConge planningConge) {
		this.planningConge = planningConge;
	}

	public Agent getAgent() {
		return agent;
	}

	public void setAgent(Agent agent) {
		this.agent = agent;
	}

	public Set<HistoriqueConge> getHistoriqueConges() {
		return historiqueConges;
	}

	public void setHistoriqueConges(Set<HistoriqueConge> historiqueConges) {
		this.historiqueConges = historiqueConges;
	}

	public int getDureePrevisionnelle() {
		return dureePrevisionnelle;
	}

	public void setDureePrevisionnelle(int dureePrevisionnelle) {
		this.dureePrevisionnelle = dureePrevisionnelle;
	}

	public int getDureeEffective() {
		return dureeEffective;
	}

	public void setDureeEffective(int dureeEffective) {
		this.dureeEffective = dureeEffective;
	}

}
