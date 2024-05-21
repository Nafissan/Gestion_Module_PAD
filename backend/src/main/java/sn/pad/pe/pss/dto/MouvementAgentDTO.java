package sn.pad.pe.pss.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class MouvementAgentDTO {

	private Long id;
	private Date dateDepart;
	private Date dateArrivee;

	private Date createdAt;
	private Date updatedAt;

	@JsonProperty("uniteDepart")
	private UniteOrganisationnelleDTO uniteDepartDTO;

	@JsonProperty("uniteArrivee")
	private UniteOrganisationnelleDTO uniteArriveeDTO;

	@JsonProperty("agent")
	private AgentDTO agentDTO;

	public MouvementAgentDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateDepart() {
		return dateDepart;
	}

	public void setDateDepart(Date dateDepart) {
		this.dateDepart = dateDepart;
	}

	public Date getDateArrivee() {
		return dateArrivee;
	}

	public void setDateArrivee(Date dateArrivee) {
		this.dateArrivee = dateArrivee;
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

	public UniteOrganisationnelleDTO getUniteDepartDTO() {
		return uniteDepartDTO;
	}

	public void setUniteDepartDTO(UniteOrganisationnelleDTO uniteDepartDTO) {
		this.uniteDepartDTO = uniteDepartDTO;
	}

	public UniteOrganisationnelleDTO getUniteArriveeDTO() {
		return uniteArriveeDTO;
	}

	public void setUniteArriveeDTO(UniteOrganisationnelleDTO uniteArriveeDTO) {
		this.uniteArriveeDTO = uniteArriveeDTO;
	}

	public AgentDTO getAgentDTO() {
		return agentDTO;
	}

	public void setAgentDTO(AgentDTO agentDTO) {
		this.agentDTO = agentDTO;
	}

}
