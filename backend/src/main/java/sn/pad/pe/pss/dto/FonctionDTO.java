package sn.pad.pe.pss.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 
 * @author cheikhibra.samb
 *
 */
public class FonctionDTO {

	private Long id;
	private String nom;

	private Date createdAt;
	private Date updatedAt;

	@JsonProperty("uniteOrganisationnelle")
	private List<UniteOrganisationnelleDTO> uniteOrganisationnelle;

	/*
	 * public UniteOrganisationnelleDTO getUniteOrganisationnelle() { return
	 * uniteOrganisationnelle; }
	 * 
	 * public void setUniteOrganisationnelle(UniteOrganisationnelleDTO
	 * uniteOrganisationnelle) { this.uniteOrganisationnelle =
	 * uniteOrganisationnelle; }
	 */

	public FonctionDTO(Long id, String nom) {
		super();
		this.id = id;
		this.nom = nom;
	}

	public List<UniteOrganisationnelleDTO> getUniteOrganisationnelle() {
		return uniteOrganisationnelle;
	}

	public void setUniteOrganisationnelle(List<UniteOrganisationnelleDTO> uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public FonctionDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
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
