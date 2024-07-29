package sn.pad.pe.pss.dto;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import sn.pad.pe.partenariat.dto.ComiteDTO;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class AgentDTO {

	private Long id;
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
	private Date createdAt;
	private Date updatedAt;
	private ComiteDTO comite;
	@JsonIgnore
	@JsonProperty("fonction")
	private FonctionDTO fonction;

	@JsonIgnore
	@JsonProperty("uniteOrganisationnelle")
	private UniteOrganisationnelleDTO uniteOrganisationnelle;
	@JsonIgnore
	private Set<EtapeValidationDTO> etapeValidations;

	public AgentDTO() {
		super();
	}

	public AgentDTO(Long id, String matricule, String nom, String prenom, Date dateNaissance, String lieuNaissance,
			String adresse, String matrimoniale, String photo, String sexe, String email, String telephone,
			String profil, Date dateEngagement, Date datePriseService, boolean estChef, Date createdAt,
			Date updatedAt) {
		super();
		this.id = id;
		this.matricule = matricule;
		this.nom = nom;
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
		this.lieuNaissance = lieuNaissance;
		this.adresse = adresse;
		this.matrimoniale = matrimoniale;
		this.photo = photo;
		this.sexe = sexe;
		this.email = email;
		this.telephone = telephone;
		this.profil = profil;
		this.dateEngagement = dateEngagement;
		this.datePriseService = datePriseService;
		this.estChef = estChef;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public AgentDTO(Long id, String matricule, String nom, String prenom, Date dateNaissance, String lieuNaissance,
			String adresse, String matrimoniale, String photo, String sexe, String email, String telephone,
			Date dateEngagement, Date datePriseService, boolean estChef, Date createdAt, Date updatedAt) {
		super();
		this.id = id;
		this.matricule = matricule;
		this.nom = nom;
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
		this.lieuNaissance = lieuNaissance;
		this.adresse = adresse;
		this.matrimoniale = matrimoniale;
		this.photo = photo;
		this.sexe = sexe;
		this.email = email;
		this.telephone = telephone;
		this.dateEngagement = dateEngagement;
		this.datePriseService = datePriseService;
		this.estChef = estChef;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public AgentDTO(Long id, String matricule, String nom, String prenom, Date dateNaissance, String lieuNaissance,
			String photo, String email, String telephone, FonctionDTO fonction,
			UniteOrganisationnelleDTO uniteOrganisationnelle) {
		super();
		this.id = id;
		this.matricule = matricule;
		this.nom = nom;
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
		this.lieuNaissance = lieuNaissance;
		this.photo = photo;
		this.email = email;
		this.telephone = telephone;
		this.fonction = fonction;
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public AgentDTO(Long id, String matricule, String nom, String prenom, Date dateNaissance, String lieuNaissance,
			String adresse, String matrimoniale, String photo, String sexe, String email, String telephone,
			Date dateEngagement, Date datePriseService, boolean estChef, FonctionDTO fonction, Date createdAt,
			Date updatedAt) {
		super();
		this.id = id;
		this.matricule = matricule;
		this.nom = nom;
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
		this.lieuNaissance = lieuNaissance;
		this.adresse = adresse;
		this.matrimoniale = matrimoniale;
		this.photo = photo;
		this.sexe = sexe;
		this.email = email;
		this.telephone = telephone;
		this.dateEngagement = dateEngagement;
		this.datePriseService = datePriseService;
		this.estChef = estChef;
		this.fonction = fonction;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;

	}

	public AgentDTO(Long id, String matricule, String nom, String prenom, Date dateNaissance, String lieuNaissance,
			String adresse, String matrimoniale, String photo, String sexe, String email, String telephone) {
		super();
		this.id = id;
		this.matricule = matricule;
		this.nom = nom;
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
		this.lieuNaissance = lieuNaissance;
		this.adresse = adresse;
		this.matrimoniale = matrimoniale;
		this.photo = photo;
		this.sexe = sexe;
		this.email = email;
		this.telephone = telephone;
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

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
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

	public FonctionDTO getFonction() {
		return fonction;
	}

	public void setFonction(FonctionDTO fonction) {
		this.fonction = fonction;
	}

	public UniteOrganisationnelleDTO getUniteOrganisationnelle() {
		return uniteOrganisationnelle;
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelleDTO uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public Set<EtapeValidationDTO> getEtapeValidations() {
		return etapeValidations;
	}

	public void setEtapeValidations(Set<EtapeValidationDTO> etapeValidations) {
		this.etapeValidations = etapeValidations;
	}

	public String getProfil() {
		return profil;
	}

	public void setProfil(String profil) {
		this.profil = profil;
	}

	public ComiteDTO getComite() {
		return comite;
	}

	public void setComite(ComiteDTO comite) {
		this.comite = comite;
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
