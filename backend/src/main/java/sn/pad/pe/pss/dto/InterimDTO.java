package sn.pad.pe.pss.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.DossierInterim;
import sn.pad.pe.pss.bo.EtapeInterim;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class InterimDTO {

	private Long id;
	private Date dateSaisie;
	private Date dateDepart;
	private Date dateRetour;
	private Date dateRetourEffective;
	private String commentaire;
	private String etat;
	private int annee;

	private int niveau;
	private Date createdAt;
	private Date updatedAt;

	@JsonIgnore
	@JsonProperty("agentDepart")
	private AgentDTO agentDepart;

	@JsonIgnore
	@JsonProperty("agentArrive")
	private AgentDTO agentArrive;

	@JsonIgnore
	@JsonProperty("uniteOrganisationnelle")
	private UniteOrganisationnelleDTO uniteOrganisationnelle;

	private DossierInterimDTO dossierInterim;

	private FileMetaData fileMetaData;

	
	public InterimDTO() {
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

	public void setDateSaisie(Date dateSaisie) {
		this.dateSaisie = dateSaisie;
	}

	public Date getDateDepart() {
		return dateDepart;
	}

	public void setDateDepart(Date dateDepart) {
		this.dateDepart = dateDepart;
	}

	public Date getDateRetour() {
		return dateRetour;
	}

	public void setDateRetour(Date dateRetour) {
		this.dateRetour = dateRetour;
	}

	public Date getDateRetourEffective() {
		return dateRetourEffective;
	}

	public void setDateRetourEffective(Date dateRetourEffective) {
		this.dateRetourEffective = dateRetourEffective;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public int getNiveau() {
		return niveau;
	}

	public void setNiveau(int niveau) {
		this.niveau = niveau;
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

	public AgentDTO getAgentDepart() {
		return new AgentDTO(agentDepart.getId(), agentDepart.getMatricule(), agentDepart.getNom(),
				agentDepart.getPrenom(), agentDepart.getDateNaissance(), agentDepart.getLieuNaissance(),
				agentDepart.getAdresse(), agentDepart.getMatrimoniale(), agentDepart.getPhoto(), agentDepart.getSexe(),
				agentDepart.getEmail(), agentDepart.getTelephone(), agentDepart.getDateEngagement(),
				agentDepart.getDatePriseService(), agentDepart.isEstChef(), agentArrive.getFonction(),
				agentDepart.getCreatedAt(), agentDepart.getUpdatedAt());
	}

	public void setAgentDepart(AgentDTO agentDepart) {
		this.agentDepart = agentDepart;
	}

	public AgentDTO getAgentArrive() {
		return new AgentDTO(agentArrive.getId(), agentArrive.getMatricule(), agentArrive.getNom(),
				agentArrive.getPrenom(), agentArrive.getDateNaissance(), agentArrive.getLieuNaissance(),
				agentArrive.getAdresse(), agentArrive.getMatrimoniale(), agentArrive.getPhoto(), agentArrive.getSexe(),
				agentArrive.getEmail(), agentArrive.getTelephone(), agentArrive.getDateEngagement(),
				agentArrive.getDatePriseService(), agentArrive.isEstChef(), agentArrive.getFonction(),
				agentArrive.getCreatedAt(), agentArrive.getUpdatedAt());
	}

	public void setAgentArrive(AgentDTO agentArrive) {
		this.agentArrive = agentArrive;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public UniteOrganisationnelleDTO getUniteOrganisationnelle() {
		return new UniteOrganisationnelleDTO(uniteOrganisationnelle.getId(), uniteOrganisationnelle.getCode(),
				uniteOrganisationnelle.getNom(), uniteOrganisationnelle.getDescription(),
				uniteOrganisationnelle.getNiveauHierarchique());
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelleDTO uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public DossierInterimDTO getDossierInterim() {
		return dossierInterim;
	}

	public void setDossierInterim(DossierInterimDTO dossierInterim) {
		this.dossierInterim = dossierInterim;
	}

	public FileMetaData getFileMetaData() {
		return fileMetaData;
	}

	public void setFileMetaData(FileMetaData fileMetaData) {
		this.fileMetaData = fileMetaData;
	}

}
