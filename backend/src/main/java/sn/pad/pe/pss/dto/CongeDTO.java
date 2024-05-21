package sn.pad.pe.pss.dto;

import java.util.Date;

/**
 * 
 * @author cheikhibra.samb
 *
 */

public class CongeDTO {
	private Long id;
	private String code;
	private String annee;
	private String mois;
	private int dureePrevisionnelle;
	private int dureeEffective;
	private Date dateDepart;
	private Date dateRetourPrevisionnelle;
	private Date dateRetourEffectif;
	private Date dateSaisie;
	private String etat;
	private int niveau;
	private int etape;
	private String description;
	private String codeDecision;
	private int dureeRestante;
	private Long solde;

	private PlanningCongeDTO planningConge;

	private AgentDTO agent;

	public CongeDTO() {
		super();
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

	public String getMois() {
		return mois;
	}

	public String getAnnee() {
		return annee;
	}

	public void setAnnee(String annee) {
		this.annee = annee;
	}

	public void setMois(String mois) {
		this.mois = mois;
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

	public int getNiveau() {
		return niveau;
	}

	public void setNiveau(int niveau) {
		this.niveau = niveau;
	}

	public int getEtape() {
		return etape;
	}

	public void setEtape(int etape) {
		this.etape = etape;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCodeDecision() {
		return codeDecision;
	}

	public void setCodeDecision(String codeDecision) {
		this.codeDecision = codeDecision;
	}

	public int getDureeRestante() {
		return dureeRestante;
	}

	public void setDureeRestante(int dureeRestante) {
		this.dureeRestante = dureeRestante;
	}

	public Long getSolde() {
		return solde;
	}

	public void setSolde(Long solde) {
		this.solde = solde;
	}

	public PlanningCongeDTO getPlanningConge() {
		return new PlanningCongeDTO(planningConge.getId(), planningConge.getCode(), planningConge.getDateCreation(),
				planningConge.getEtat(), planningConge.getDescription(), planningConge.getPlanningDirection());
	}

	public void setPlanningConge(PlanningCongeDTO planningConge) {
		this.planningConge = planningConge;
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

	public int getDureePrevisionnelle() {
		return dureePrevisionnelle;
	}

	public void setDureePrevisionnelle(int dureePrevisionnelle) {
		this.dureePrevisionnelle = dureePrevisionnelle;
	}

	public int getDureeEffective() {
		return dureeEffective;
	}

	public void setDureeEffective(int dureeEffective) {
		this.dureeEffective = dureeEffective;
	}

}
