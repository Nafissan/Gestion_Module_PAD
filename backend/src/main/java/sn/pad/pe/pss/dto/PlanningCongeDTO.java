package sn.pad.pe.pss.dto;

import java.util.Date;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class PlanningCongeDTO {
	private Long id;
	private String code;
	private Date dateCreation;
	private String etat;
	private String description;

	private PlanningDirectionDTO planningDirection;

	private UniteOrganisationnelleDTO uniteOrganisationnelle;

	public PlanningCongeDTO() {
		super();
	}

	public PlanningCongeDTO(Long id, String code, Date dateCreation, String etat, String description,
			PlanningDirectionDTO planningDirection) {
		super();
		this.id = id;
		this.code = code;
		this.dateCreation = dateCreation;
		this.etat = etat;
		this.description = description;
		this.planningDirection = planningDirection;
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

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public PlanningDirectionDTO getPlanningDirection() {
		return planningDirection;
	}

	public void setPlanningDirection(PlanningDirectionDTO planningDirection) {
		this.planningDirection = planningDirection;
	}

	public UniteOrganisationnelleDTO getUniteOrganisationnelle() {
		return uniteOrganisationnelle;
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelleDTO uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}
}
