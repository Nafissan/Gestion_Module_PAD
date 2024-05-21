package sn.pad.pe.dotation.dto;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import sn.pad.pe.pss.dto.AgentDTO;

public class DotationDTO {

	private long id;
	private String code;
	private Date dateDebut;
	private Date dateFin;
	@NotNull
	private AgentDTO beneficiaire;
	private int nbreEnfant;
	private String observation;
	private String statut;
	private int nbreArticleRecu;
	private String type;
	@NotEmpty
	private List<EnfantDTO> enfants;
	@NotNull
	private ConjointDTO conjoint;
	@NotNull
	private TypeDotationDTO typeDotation;
	private List<SuiviDotationDTO> suiviDotation;

	private int nbreAttribution;
	private Date createdAt;
	private Date updatedAt;

	public DotationDTO() {
		super();
	}

	public DotationDTO(long id, String code, Date dateDebut, Date dateFin, @NotNull AgentDTO beneficiaire,
			int nbreEnfant, String observation, String statut, int nbreArticleRecu, String type,
			@NotNull ConjointDTO conjoint, @NotNull TypeDotationDTO typeDotation, int nbreAttribution, Date createdAt, Date updatedAt) {
		super();
		this.id = id;
		this.code = code;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.beneficiaire = beneficiaire;
		this.nbreEnfant = nbreEnfant;
		this.observation = observation;
		this.statut = statut;
		this.nbreArticleRecu = nbreArticleRecu;
		this.type = type;
		this.conjoint = conjoint;
		this.typeDotation = typeDotation;
		this.nbreAttribution = nbreAttribution;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public DotationDTO(long id, String code, Date dateDebut, Date dateFin, @NotNull AgentDTO beneficiaire,
			int nbreEnfant, String observation, String statut, int nbreArticleRecu, String type,
			@NotEmpty List<EnfantDTO> enfants, @NotNull ConjointDTO conjoint, @NotNull TypeDotationDTO typeDotation) {
		super();
		this.id = id;
		this.code = code;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.beneficiaire = beneficiaire;
		this.nbreEnfant = nbreEnfant;
		this.observation = observation;
		this.statut = statut;
		this.nbreArticleRecu = nbreArticleRecu;
		this.type = type;
		this.enfants = enfants;
		this.conjoint = conjoint;
		this.typeDotation = typeDotation;
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

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public AgentDTO getBeneficiaire() {
		return beneficiaire;
	}

	public void setBeneficiaire(AgentDTO beneficiaire) {
		this.beneficiaire = beneficiaire;
	}

	public int getNbreEnfant() {
		return nbreEnfant;
	}

	public void setNbreEnfant(int nbreEnfant) {
		this.nbreEnfant = nbreEnfant;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public int getNbreArticleRecu() {
		return nbreArticleRecu;
	}

	public void setNbreArticleRecu(int nbreArticleRecu) {
		this.nbreArticleRecu = nbreArticleRecu;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<EnfantDTO> getEnfants() {
		return enfants;
	}

	public void setEnfants(List<EnfantDTO> enfants) {
		this.enfants = enfants;
	}

	public ConjointDTO getConjoint() {
		return conjoint;
	}

	public void setConjoint(ConjointDTO conjoint) {
		this.conjoint = conjoint;
	}

	public TypeDotationDTO getTypeDotation() {
		return typeDotation;
	}

	public void setTypeDotation(TypeDotationDTO typeDotation) {
		this.typeDotation = typeDotation;
	}

	public List<SuiviDotationDTO> getSuiviDotation() {
		return suiviDotation;
	}

	public void setSuiviDotation(List<SuiviDotationDTO> suiviDotation) {
		this.suiviDotation = suiviDotation;
	}

	public int getNbreAttribution() {
		return nbreAttribution;
	}

	public void setNbreAttribution(int nbreAttribution) {
		this.nbreAttribution = nbreAttribution;
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