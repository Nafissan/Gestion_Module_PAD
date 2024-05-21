package sn.pad.pe.dotation.bo;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
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
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import sn.pad.pe.pss.bo.Agent;

@Entity
@Table(name = "pad_dl_dotation")
public class Dotation implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String code;
	private Date dateDebut;
	private Date dateFin;
	private int nbreEnfant;
	private String observation;
	private String statut;
	private int nbreArticleRecu;
	private String type;
	private int nbreAttribution;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "agent_id", referencedColumnName = "id")
	private Agent beneficiaire;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "dotation")
	private List<Enfant> enfants;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "conjointId", referencedColumnName = "id", nullable = false)
	private Conjoint conjoint;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "typeDotationId", referencedColumnName = "id")
	private TypeDotation typeDotation;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "dotation", orphanRemoval = true)
	private Set<SuiviDotation> suiviDotations = new HashSet<SuiviDotation>(0);
	@OneToMany
	public List<SuiviDotation> suiviDotation;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public Agent getBeneficiaire() {
		return beneficiaire;
	}

	public void setBeneficiaire(Agent beneficiaire) {
		this.beneficiaire = beneficiaire;
	}

	public int getNbreEnfant() {
		return nbreEnfant;
	}

	public void setNbreEnfant(int nbreEnfant) {
		this.nbreEnfant = nbreEnfant;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public int getNbreArticleRecu() {
		return nbreArticleRecu;
	}

	public void setNbreArticleRecu(int nbreArticleRecu) {
		this.nbreArticleRecu = nbreArticleRecu;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Enfant> getEnfants() {
		return enfants;
	}

	public void setEnfants(List<Enfant> enfants) {
		this.enfants = enfants;
	}

	public Conjoint getConjoint() {
		return conjoint;
	}

	public void setConjoint(Conjoint conjoint) {
		this.conjoint = conjoint;
	}

	public TypeDotation getTypeDotation() {
		return typeDotation;
	}

	public void setTypeDotation(TypeDotation typeDotation) {
		this.typeDotation = typeDotation;
	}

	public Set<SuiviDotation> getSuiviDotations() {
		return suiviDotations;
	}

	public void setSuiviDotations(Set<SuiviDotation> suiviDotations) {
		this.suiviDotations = suiviDotations;
	}

	public int getNbreAttribution() {
		return nbreAttribution;
	}

	public void setNbreAttribution(int nbreAttribution) {
		this.nbreAttribution = nbreAttribution;
	}

	public List<SuiviDotation> getSuiviDotation() {
		return suiviDotation;
	}

	public void setSuiviDotation(List<SuiviDotation> suiviDotation) {
		this.suiviDotation = suiviDotation;
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