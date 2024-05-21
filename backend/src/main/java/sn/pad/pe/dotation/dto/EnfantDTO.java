package sn.pad.pe.dotation.dto;

import java.util.Date;

public class EnfantDTO {

	private long id;
	private String prenom;
	private String nom;
	private String sexe;
	private Date dateNaissance;
	private String numeroExtrait;

	private DotationDTO dotation;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public String getNumeroExtrait() {
		return numeroExtrait;
	}

	public void setNumeroExtrait(String numeroExtrait) {
		this.numeroExtrait = numeroExtrait;
	}

	public DotationDTO getDotation() {
		if (dotation != null)
			return new DotationDTO(dotation.getId(), dotation.getCode(), dotation.getDateDebut(), dotation.getDateFin(),
					dotation.getBeneficiaire(), dotation.getNbreEnfant(), dotation.getObservation(),
					dotation.getStatut(), dotation.getNbreArticleRecu(), dotation.getType(), dotation.getConjoint(),
					dotation.getTypeDotation(), dotation.getNbreAttribution(), dotation.getCreatedAt(),
					dotation.getUpdatedAt());
		else
			return dotation;
	}

	public void setDotation(DotationDTO dotation) {
		this.dotation = dotation;
	}

}