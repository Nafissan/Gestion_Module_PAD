package sn.pad.pe.pss.dto;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class RoleDTO {

	private Long id;
	private String nomRole;
	private String description;

	@JsonIgnore
	private Date createdAt;
	@JsonIgnore
	private Date updatedAt;

	private Set<PrivilegeDTO> privileges;

	public RoleDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomRole() {
		return nomRole;
	}

	public void setNomRole(String nomRole) {
		this.nomRole = nomRole;
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

	public Set<PrivilegeDTO> getPrivileges() {
		return privileges;
	}

	public void setPrivileges(Set<PrivilegeDTO> privileges) {
		this.privileges = privileges;
	}

}
