package sn.pad.pe.dotation.dto;

import java.util.Date;

public class FournisseurDTO {

	private long id;
	private String nomfournisseur;
	private Date dateDe;
	private boolean active;
	private String reffournisseur;
	private String courriel;
	private String tel;
	private String fax;
	private String siteweb;
	private String addresse;
	private String codepostal;
	private String ville;
	private String pays;
	private String commentaire;

	public FournisseurDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getDateDe() {
		return dateDe;
	}

	public void setDateDe(Date dateDe) {
		this.dateDe = dateDe;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getNomfournisseur() {
		return nomfournisseur;
	}

	public void setNomfournisseur(String nomfournisseur) {
		this.nomfournisseur = nomfournisseur;
	}

	public String getReffournisseur() {
		return reffournisseur;
	}

	public void setReffournisseur(String reffournisseur) {
		this.reffournisseur = reffournisseur;
	}

	public String getCourriel() {
		return courriel;
	}

	public void setCourriel(String courriel) {
		this.courriel = courriel;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getSiteweb() {
		return siteweb;
	}

	public void setSiteweb(String siteweb) {
		this.siteweb = siteweb;
	}

	public String getAddresse() {
		return addresse;
	}

	public void setAddresse(String addresse) {
		this.addresse = addresse;
	}

	public String getCodepostal() {
		return codepostal;
	}

	public void setCodepostal(String codepostal) {
		this.codepostal = codepostal;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public String getPays() {
		return pays;
	}

	public void setPays(String pays) {
		this.pays = pays;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

}
