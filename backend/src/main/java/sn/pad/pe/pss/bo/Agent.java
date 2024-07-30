package sn.pad.pe.pss.bo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
public class Agent implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String matricule;
	private String nom;
	private String prenom;
	private Date dateNaissance;
	private String lieuNaissance;
	private String adresse;
	private String matrimoniale;
	private String photo;
	private String sexe;
	private String email;
	private String telephone;
	private Date dateEngagement;
	private Date datePriseService;
	private boolean estChef;
	private String profil;
	private String religion;
	private String typeContrat;
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_FONCTION", referencedColumnName = "id", nullable = false)
	private Fonction fonction;

	// superieure
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_UNITE_ORG", referencedColumnName = "id", nullable = false)
	private UniteOrganisationnelle uniteOrganisationnelle;
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "agents")
	private List<EtapeValidation> etapeValidations;
	public Agent() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMatricule() {
		return matricule;
	}

	public void setMatricule(String matricule) {
		this.matricule = matricule;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
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

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getMatrimoniale() {
		return matrimoniale;
	}

	public void setMatrimoniale(String matrimoniale) {
		this.matrimoniale = matrimoniale;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Date getDateEngagement() {
		return dateEngagement;
	}

	public void setDateEngagement(Date dateEngagement) {
		this.dateEngagement = dateEngagement;
	}

	public Date getDatePriseService() {
		return datePriseService;
	}

	public void setDatePriseService(Date datePriseService) {
		this.datePriseService = datePriseService;
	}

	public boolean isEstChef() {
		return estChef;
	}

	public void setEstChef(boolean estChef) {
		this.estChef = estChef;
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

	public Fonction getFonction() {
		return fonction;
	}

	public void setFonction(Fonction fonction) {
		this.fonction = fonction;
	}

	public UniteOrganisationnelle getUniteOrganisationnelle() {
		return uniteOrganisationnelle;
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelle uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public List<EtapeValidation> getEtapeValidations() {
		return etapeValidations;
	}

	public void setEtapeValidations(List<EtapeValidation> etapeValidations) {
		this.etapeValidations = etapeValidations;
	}

	public String getProfil() {
		return profil;
	}

	public void setProfil(String profil) {
		this.profil = profil;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getReligion() {
		return religion;
	}

	public void setReligion(String religion) {
		this.religion = religion;
	}

	public String getTypeContrat() {
		return typeContrat;
	}

	public void setTypeContrat(String typeContrat) {
		this.typeContrat = typeContrat;
	}

}
