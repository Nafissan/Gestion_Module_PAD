package sn.pad.pe.pss.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class PrivilegeDTO {

	private String nom;
	private String description;

	private Date createdAt;
	private Date updatedAt;

	@JsonIgnore
	private List<RoleDTO> roles;
	@JsonIgnore
	private RessourceDTO ressource;

	public PrivilegeDTO() {
		super();
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

	public List<RoleDTO> getRoles() {
		return roles;
	}

	public void setRoles(List<RoleDTO> roles) {
		this.roles = roles;
	}

	public RessourceDTO getRessource() {
		return ressource;
	}

	public void setRessource(RessourceDTO ressource) {
		this.ressource = ressource;
	}
}
