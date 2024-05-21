package sn.pad.pe.partenariat.dto;

public class EntrepriseDTO {
	private long id;
	private String nom;
	private String code;

	private String email;
	private String telephone;
	private String adresse;
	private String fax;
	private String siteWeb;
	private String contact;
	private String raisonsociale;
	private PaysDTO pays;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public PaysDTO getPays() {
		return pays;
	}

	public void setPays(PaysDTO pays) {
		this.pays = pays;
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

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getRaisonsociale() {
		return raisonsociale;
	}

	public void setRaisonsociale(String raisonsociale) {
		this.raisonsociale = raisonsociale;
	}

}
