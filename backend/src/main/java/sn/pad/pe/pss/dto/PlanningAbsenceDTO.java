package sn.pad.pe.pss.dto;

import java.util.Date;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class PlanningAbsenceDTO {
	private Long id;
	private String code;
	private Date dateCreation;
	private String etat;
	private String description;

	private int annee;
	private DossierAbsenceDTO dossierAbsence;

	private UniteOrganisationnelleDTO uniteOrganisationnelle;

	public PlanningAbsenceDTO() {
		super();
	}

	public PlanningAbsenceDTO(Long id, String code, Date dateCreation, String etat, String description) {
		this.id = id;
		this.code = code;
		this.dateCreation = dateCreation;
		this.etat = etat;
		this.description = description;
	}

	public PlanningAbsenceDTO(Long id, String code, Date dateCreation, String etat, String description,
			DossierAbsenceDTO dossierAbsence, UniteOrganisationnelleDTO uniteOrganisationnelle) {
		super();
		this.id = id;
		this.code = code;
		this.dateCreation = dateCreation;
		this.etat = etat;
		this.description = description;
		this.dossierAbsence = dossierAbsence;
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public PlanningAbsenceDTO(Long id, String code, Date dateCreation, String etat, String description,
			DossierAbsenceDTO dossierAbsence) {
		super();
		this.id = id;
		this.code = code;
		this.dateCreation = dateCreation;
		this.etat = etat;
		this.description = description;
		this.dossierAbsence = dossierAbsence;
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

	public UniteOrganisationnelleDTO getUniteOrganisationnelle() {
		return uniteOrganisationnelle;
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelleDTO uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public DossierAbsenceDTO getDossierAbsence() {
		return dossierAbsence;
	}

	public void setDossierAbsence(DossierAbsenceDTO dossierAbsence) {
		this.dossierAbsence = dossierAbsence;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

}
