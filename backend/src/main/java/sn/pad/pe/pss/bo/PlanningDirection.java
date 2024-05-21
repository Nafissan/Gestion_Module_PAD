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
public class PlanningDirection implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String code;
	private String description;
	private String etat;
	private int niveau;
	private int etape;
	/**
	 * Agent Responsable de la création
	 */
	private String matricule;
	private String prenom;
	private String nom;
	private String fonction;
	/**
	 * Direction
	 */
	private String codeDirection;
	private String nomDirection;
	private String descriptionDirection;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_DOSSIER_CONGE", referencedColumnName = "id", nullable = false)
	private DossierConge dossierConge;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "planningDirection", orphanRemoval = true, cascade = CascadeType.REMOVE)
	private Set<PlanningConge> planningConges = new HashSet<PlanningConge>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "planningDirection", orphanRemoval = true, cascade = CascadeType.REMOVE)
	private Set<EtapePlanningDirection> etapePlanningDirections = new HashSet<EtapePlanningDirection>(0);

	public PlanningDirection() {
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

	public String getCodeDirection() {
		return codeDirection;
	}

	public void setCodeDirection(String codeDirection) {
		this.codeDirection = codeDirection;
	}

	public String getNomDirection() {
		return nomDirection;
	}

	public void setNomDirection(String nomDirection) {
		this.nomDirection = nomDirection;
	}

	public String getDescriptionDirection() {
		return descriptionDirection;
	}

	public void setDescriptionDirection(String descriptionDirection) {
		this.descriptionDirection = descriptionDirection;
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

	public DossierConge getDossierConge() {
		return dossierConge;
	}

	public void setDossierConge(DossierConge dossierConge) {
		this.dossierConge = dossierConge;
	}

	public Set<PlanningConge> getPlanningConges() {
		return planningConges;
	}

	public void setPlanningConges(Set<PlanningConge> planningConges) {
		this.planningConges = planningConges;
	}

	public Set<EtapePlanningDirection> getEtapePlanningDirections() {
		return etapePlanningDirections;
	}

	public void setEtapePlanningDirections(Set<EtapePlanningDirection> etapePlanningDirections) {
		this.etapePlanningDirections = etapePlanningDirections;
	}

}
