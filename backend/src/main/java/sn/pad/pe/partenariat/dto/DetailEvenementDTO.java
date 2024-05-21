package sn.pad.pe.partenariat.dto;

import java.util.Date;

public class DetailEvenementDTO {
	private Long id;
	private Long code;
	private String libelle;
	private String description;
	private EvenementDTO evenement;

	private Date createdAt;
	private Date updatedAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCode() {
		return code;
	}

	public void setCode(Long code) {
		this.code = code;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public EvenementDTO getEvenement() {
		return evenement;
	}

	public void setEvenement(EvenementDTO evenement) {
		this.evenement = evenement;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

}
