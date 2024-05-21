package sn.pad.pe.partenariat.dto;

import java.util.Date;

import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

public class PointFocalDTO {

	private long id;
	private String code;
	private boolean active;

	private UniteOrganisationnelleDTO unite;
	private AgentDTO agent;

	private Date createdAt;
	private Date updatedAt;

	public PointFocalDTO() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public AgentDTO getAgent() {
		UniteOrganisationnelleDTO uniteDto = agent.getUniteOrganisationnelle();
		uniteDto.setUniteSuperieure(null);
		agent.setUniteOrganisationnelle(uniteDto);
		return agent;
	}

	public void setAgent(AgentDTO agent) {
		this.agent = agent;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public UniteOrganisationnelleDTO getUnite() {
		unite.setUniteSuperieure(null);
		return unite;
	}

	public void setUnite(UniteOrganisationnelleDTO unite) {
		this.unite = unite;
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
