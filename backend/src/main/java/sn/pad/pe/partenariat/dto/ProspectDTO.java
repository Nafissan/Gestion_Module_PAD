package sn.pad.pe.partenariat.dto;

import java.util.Date;

public class ProspectDTO {

	private long id;
	private String code;
	private String nom;

	private String email;
	private String telephone;
	private String adresse;
	private String fax;
	private String siteWeb;
	private String representantPrenom;
	private String representantNom;
	private String representantEmail;
	private String representantTelephone;
	private double latitude;
	private double longitude;
	private int statut;
	private boolean active;
	private boolean partenaire;
	private ZoneDTO zone;
	private VilleDTO ville;

	private String nature;
	private String profil;
	private String objectifAccord;
	private int dureeAccord;
	private String interetPAD;
	private String interetGobalProspect;

	private Date createdAt;
	private Date updatedAt;
	private Date dateApprobation;

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

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
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

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getSiteWeb() {
		return siteWeb;
	}

	public void setSiteWeb(String siteWeb) {
		this.siteWeb = siteWeb;
	}

	public String getRepresentantPrenom() {
		return representantPrenom;
	}

	public void setRepresentantPrenom(String representantPrenom) {
		this.representantPrenom = representantPrenom;
	}

	public String getRepresentantNom() {
		return representantNom;
	}

	public void setRepresentantNom(String representantNom) {
		this.representantNom = representantNom;
	}

	public String getRepresentantEmail() {
		return representantEmail;
	}

	public void setRepresentantEmail(String representantEmail) {
		this.representantEmail = representantEmail;
	}

	public String getRepresentantTelephone() {
		return representantTelephone;
	}

	public void setRepresentantTelephone(String representantTelephone) {
		this.representantTelephone = representantTelephone;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public int getStatut() {
		return statut;
	}

	public void setStatut(int statut) {
		this.statut = statut;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isPartenaire() {
		return partenaire;
	}

	public void setPartenaire(boolean partenaire) {
		this.partenaire = partenaire;
	}

	public ZoneDTO getZone() {
		return zone;
	}

	public void setZone(ZoneDTO zone) {
		this.zone = zone;
	}

	public VilleDTO getVille() {
		return ville;
	}

	public void setVille(VilleDTO ville) {
		this.ville = ville;
	}

	public String getNature() {
		return nature;
	}

	public void setNature(String nature) {
		this.nature = nature;
	}

	public String getProfil() {
		return profil;
	}

	public void setProfil(String profil) {
		this.profil = profil;
	}

	public String getObjectifAccord() {
		return objectifAccord;
	}

	public void setObjectifAccord(String objectifAccord) {
		this.objectifAccord = objectifAccord;
	}

	public int getDureeAccord() {
		return dureeAccord;
	}

	public void setDureeAccord(int dureeAccord) {
		this.dureeAccord = dureeAccord;
	}

	public String getInteretPAD() {
		return interetPAD;
	}

	public void setInteretPAD(String interetPAD) {
		this.interetPAD = interetPAD;
	}

	public String getInteretGobalProspect() {
		return interetGobalProspect;
	}

	public void setInteretGobalProspect(String interetGobalProspect) {
		this.interetGobalProspect = interetGobalProspect;
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

	public Date getDateApprobation() {
		return dateApprobation;
	}

	public void setDateApprobation(Date dateApprobation) {
		this.dateApprobation = dateApprobation;
	}

}
