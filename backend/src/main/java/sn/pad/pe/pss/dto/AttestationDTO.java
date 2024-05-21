package sn.pad.pe.pss.dto;

import java.util.Date;

/**
 * 
 * @author cheikhibra.samb p
 */

public class AttestationDTO {

	private Long id;
	private Date dateSaisie;
	private String commentaire;
	private String etat;

	private Date createdAt;
	private Date updatedAt;

	private AgentDTO agent;

	private UniteOrganisationnelleDTO uniteOrganisationnelle;

	private FileMetaDataDTO fileMetaData;
	private String fonctionDemandeur;
	private String uniteDemandeur;
	private String directeurSectorielDCH;

	public AttestationDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateSaisie() {
		return dateSaisie;
	}

	public AgentDTO getAgent() {
		return new AgentDTO(agent.getId(), agent.getMatricule(), agent.getNom(), agent.getPrenom(),
				agent.getDateNaissance(), agent.getLieuNaissance(), agent.getAdresse(), agent.getMatrimoniale(),
				agent.getPhoto(), agent.getSexe(), agent.getEmail(), agent.getTelephone(), agent.getDateEngagement(),
				agent.getDatePriseService(), agent.isEstChef(), agent.getCreatedAt(), agent.getUpdatedAt());
	}

	public void setAgent(AgentDTO agent) {
		this.agent = agent;
	}

	public void setDateSaisie(Date dateSaisie) {
		this.dateSaisie = dateSaisie;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
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

	public UniteOrganisationnelleDTO getUniteOrganisationnelle() {

		return new UniteOrganisationnelleDTO(uniteOrganisationnelle.getId(), uniteOrganisationnelle.getCode(),
				uniteOrganisationnelle.getNom(), uniteOrganisationnelle.getDescription(),
				uniteOrganisationnelle.getNiveauHierarchique());
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelleDTO uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public FileMetaDataDTO getFileMetaData() {
		return fileMetaData;
	}

	public void setFileMetaData(FileMetaDataDTO fileMetaData) {
		this.fileMetaData = fileMetaData;
	}

	public String getFonctionDemandeur() {
		return fonctionDemandeur;
	}

	public void setFonctionDemandeur(String fonctionDemandeur) {
		this.fonctionDemandeur = fonctionDemandeur;
	}

	public String getUniteDemandeur() {
		return uniteDemandeur;
	}

	public void setUniteDemandeur(String uniteDemandeur) {
		this.uniteDemandeur = uniteDemandeur;
	}

	public String getDirecteurSectorielDCH() {
		return directeurSectorielDCH;
	}

	public void setDirecteurSectorielDCH(String directeurSectorielDCH) {
		this.directeurSectorielDCH = directeurSectorielDCH;
	}

}
