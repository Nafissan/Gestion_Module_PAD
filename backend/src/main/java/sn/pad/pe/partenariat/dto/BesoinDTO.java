package sn.pad.pe.partenariat.dto;

import java.util.Date;
import java.util.List;

import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

public class BesoinDTO {
	private long id;

	private String domaine;
	private String libelle;
	private String code;
	private boolean active;
	private UniteOrganisationnelleDTO unite;
	private PlanprospectionDTO planprospection;

	private List<ProspectDTO> partenaires;
	private List<DomaineDTO> domaines;

	private Date createdAt;
	private Date updatedAt;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<ProspectDTO> getPartenaires() {
		return partenaires;
	}

	public void setPartenaires(List<ProspectDTO> partenaires) {
		this.partenaires = partenaires;
	}

	public List<DomaineDTO> getDomaines() {
		return domaines;
	}

	public void setDomaines(List<DomaineDTO> domaines) {
		this.domaines = domaines;
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

	public String getDomaine() {
		return domaine;
	}

	public void setDomaine(String domaine) {
		this.domaine = domaine;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public UniteOrganisationnelleDTO getUnite() {
		return unite;
	}

	public void setUnite(UniteOrganisationnelleDTO unite) {
		this.unite = unite;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public PlanprospectionDTO getPlanprospection() {
		return planprospection;
	}

	public void setPlanprospection(PlanprospectionDTO planprospection) {
		this.planprospection = planprospection;
	}

}
