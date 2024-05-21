package sn.pad.pe.pss.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class AbsenceDTO {

	private Long id;
	private Date dateDepart;
	private Date dateRetourPrevisionnelle;
	private Date dateRetourEffectif;
	private Date dateSaisie;
	private String etat;
	private String mois;
	private int annee;
	private String commentaire;
	private int dureeRestante;
	private Date createdAt;
	private Date updatedAt;
	private int niveau;
	private String etape;
	private int etape_validation;

	@JsonProperty("agent")
	private AgentDTO agent;

	@JsonProperty("uniteOrganisationnelle")
	private UniteOrganisationnelleDTO uniteOrganisationnelle;

	@JsonProperty("planningAbsence")
	private PlanningAbsenceDTO planningAbsence;

	@JsonProperty("motif")
	private MotifDTO motif;

	public AbsenceDTO() {
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

	public Date getDateRetourPrevisionnelle() {
		return dateRetourPrevisionnelle;
	}

	public void setDateRetourPrevisionnelle(Date dateRetourPrevisionnelle) {
		this.dateRetourPrevisionnelle = dateRetourPrevisionnelle;
	}

	public Date getDateRetourEffectif() {
		return dateRetourEffectif;
	}

	public void setDateRetourEffectif(Date dateRetourEffectif) {
		this.dateRetourEffectif = dateRetourEffectif;
	}

	public Date getDateSaisie() {
		return dateSaisie;
	}

	public void setDateSaisie(Date dateSaisie) {
		this.dateSaisie = dateSaisie;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public String getMois() {
		return mois;
	}

	public void setMois(String mois) {
		this.mois = mois;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public String getEtape() {
		return etape;
	}

	public void setEtape(String etape) {
		this.etape = etape;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public int getDureeRestante() {
		return dureeRestante;
	}

	public void setDureeRestante(int dureeRestante) {
		this.dureeRestante = dureeRestante;
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

	public int getNiveau() {
		return niveau;
	}

	public void setNiveau(int niveau) {
		this.niveau = niveau;
	}

	public AgentDTO getAgent() {
		return new AgentDTO(agent.getId(), agent.getMatricule(), agent.getNom(), agent.getPrenom(),
				agent.getDateNaissance(), agent.getLieuNaissance(), agent.getAdresse(), agent.getMatrimoniale(),
				agent.getPhoto(), agent.getSexe(), agent.getEmail(), agent.getTelephone(), agent.getProfil(),
				agent.getDateEngagement(), agent.getDatePriseService(), agent.isEstChef(), agent.getCreatedAt(),
				agent.getUpdatedAt());
	}

	public void setAgent(AgentDTO agent) {
		this.agent = agent;
	}

	public UniteOrganisationnelleDTO getUniteOrganisationnelle() {

		return new UniteOrganisationnelleDTO(uniteOrganisationnelle.getId(), uniteOrganisationnelle.getCode(),
				uniteOrganisationnelle.getNom(), uniteOrganisationnelle.getDescription(),
				uniteOrganisationnelle.getNiveauHierarchique());
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelleDTO uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

	public MotifDTO getMotif() {
		return motif;
	}

	public void setMotif(MotifDTO motif) {
		this.motif = motif;
	}

	public PlanningAbsenceDTO getPlanningAbsence() {

		return new PlanningAbsenceDTO(planningAbsence.getId(), planningAbsence.getCode(),
				planningAbsence.getDateCreation(), planningAbsence.getEtat(), planningAbsence.getDescription());
	}

	public void setPlanningAbsence(PlanningAbsenceDTO planningAbsence) {
		this.planningAbsence = planningAbsence;
	}

	public int getEtape_validation() {
		return etape_validation;
	}

	public void setEtape_validation(int etape_validation) {
		this.etape_validation = etape_validation;
	}

}
