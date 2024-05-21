package sn.pad.pe.partenariat.dto;

import java.util.Date;

public class PartenaireDTO {

	private long id;
	private String nom;
	private String email;
	private String telephone;
	private String adresse;
	private String fax;
	private String siteWeb;
	private String representant_prenom;
	private String representant_nom;
	private String representant_email;
	private String representant_telephone;
	private double latitude;
	private double longitude;
	private int statut;
	private boolean active;

	private VilleDTO ville;

	private Date createdAt;
	private Date updatedAt;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getRepresentant_prenom() {
		return representant_prenom;
	}

	public void setRepresentant_prenom(String representant_prenom) {
		this.representant_prenom = representant_prenom;
	}

	public String getRepresentant_nom() {
		return representant_nom;
	}

	public void setRepresentant_nom(String representant_nom) {
		this.representant_nom = representant_nom;
	}

	public String getRepresentant_email() {
		return representant_email;
	}

	public void setRepresentant_email(String representant_email) {
		this.representant_email = representant_email;
	}

	public String getRepresentant_telephone() {
		return representant_telephone;
	}

	public void setRepresentant_telephone(String representant_telephone) {
		this.representant_telephone = representant_telephone;
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

	public VilleDTO getVille() {
		return ville;
	}

	public void setVille(VilleDTO ville) {
		this.ville = ville;
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
