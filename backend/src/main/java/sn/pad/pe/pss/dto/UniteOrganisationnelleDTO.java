package sn.pad.pe.pss.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class UniteOrganisationnelleDTO {

	private Long id;
	private String code;
	private String nom;
	private String description;

	private Date createdAt;
	private Date updatedAt;

	@JsonProperty("niveauHierarchique")
	private NiveauHierarchiqueDTO niveauHierarchique;

	@JsonProperty("uniteSuperieure")
	private UniteOrganisationnelleDTO uniteSuperieure;

	public UniteOrganisationnelleDTO() {
		super();
	}

	public UniteOrganisationnelleDTO(Long id, String code, String nom, String description,
			NiveauHierarchiqueDTO niveauHierarchique) {
		super();
		this.id = id;
		this.code = code;
		this.nom = nom;
		this.description = description;
		this.niveauHierarchique = niveauHierarchique;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public NiveauHierarchiqueDTO getNiveauHierarchique() {
		return niveauHierarchique;
	}

	public void setNiveauHierarchique(NiveauHierarchiqueDTO niveauHierarchique) {
		this.niveauHierarchique = niveauHierarchique;
	}

	public UniteOrganisationnelleDTO getUniteSuperieure() {
		return uniteSuperieure;
	}

	public void setUniteSuperieure(UniteOrganisationnelleDTO uniteSuperieure) {
		this.uniteSuperieure = uniteSuperieure;
	}

	@Override
	public String toString() {
		return "UniteOrganisationnelleDTO [id=" + id + ", code=" + code + ", nom=" + nom + ", description="
				+ description + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", niveauHierarchique="
				+ niveauHierarchique + ", uniteSuperieure=" + uniteSuperieure + "]";
	}

}
