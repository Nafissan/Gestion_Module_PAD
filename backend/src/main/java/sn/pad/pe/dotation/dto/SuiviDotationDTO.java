package sn.pad.pe.dotation.dto;

import java.util.Date;

public class SuiviDotationDTO {

	private long id;
	private int nbreArticleAttribue;
	private String matriculeAgent;
	private String nomAgent;
	private String prenomAgent;
	private Date dateAttribution;
	private String etat;
	private String mois;
	private int annee;
	private DotationDTO dotation;
	private SuiviStockDTO suiviStock;
	private CategorieLaitDTO categorieLait;
	private Date createdAt;

	private Date updatedAt;

	public SuiviDotationDTO() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getNbreArticleAttribue() {
		return nbreArticleAttribue;
	}

	public void setNbreArticleAttribue(int nbreArticleAttribue) {
		this.nbreArticleAttribue = nbreArticleAttribue;
	}

	public String getMatriculeAgent() {
		return matriculeAgent;
	}

	public void setMatriculeAgent(String matriculeAgent) {
		this.matriculeAgent = matriculeAgent;
	}

	public String getNomAgent() {
		return nomAgent;
	}

	public void setNomAgent(String nomAgent) {
		this.nomAgent = nomAgent;
	}

	public String getPrenomAgent() {
		return prenomAgent;
	}

	public void setPrenomAgent(String prenomAgent) {
		this.prenomAgent = prenomAgent;
	}

	public Date getDateAttribution() {
		return dateAttribution;
	}

	public void setDateAttribution(Date dateAttribution) {
		this.dateAttribution = dateAttribution;
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

	public DotationDTO getDotation() {
		if (dotation != null)
			return new DotationDTO(dotation.getId(), dotation.getCode(), dotation.getDateDebut(), dotation.getDateFin(),
					dotation.getBeneficiaire(), dotation.getNbreEnfant(), dotation.getObservation(),
					dotation.getStatut(), dotation.getNbreArticleRecu(), dotation.getType(), dotation.getConjoint(),
					dotation.getTypeDotation(), dotation.getNbreAttribution(), dotation.getCreatedAt(), dotation.getUpdatedAt());
		else
			return dotation;
	}

	public void setDotation(DotationDTO dotation) {
		this.dotation = dotation;
	}

	public SuiviStockDTO getSuiviStock() {
		return suiviStock;
	}

	public void setSuiviStock(SuiviStockDTO suiviStock) {
		this.suiviStock = suiviStock;
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

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public CategorieLaitDTO getCategorieLait() {
		return categorieLait;
	}

	public void setCategorieLait(CategorieLaitDTO categorieLait) {
		this.categorieLait = categorieLait;
	}

}