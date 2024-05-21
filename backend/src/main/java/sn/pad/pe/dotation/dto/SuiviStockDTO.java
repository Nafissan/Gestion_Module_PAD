package sn.pad.pe.dotation.dto;

import java.util.Date;

public class SuiviStockDTO {

	private long id;
	private String libelle;
	private String matriculeAgent;
	private String nomAgent;
	private String prenomAgent;
	private String operation;
	private Date dateOperation;
	private int quantite;
	private String observation;
	private String mois;

	private StockDTO stock;

	private FournisseurDTO fournisseur;

	private MarqueDTO marque;

	private CategorieLaitDTO categorieLait;

	private Date createdAt;
	private Date updatedAt;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
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

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public Date getDateOperation() {
		return dateOperation;
	}

	public void setDateOperation(Date dateOperation) {
		this.dateOperation = dateOperation;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public StockDTO getStock() {
		return stock;
	}

	public void setStock(StockDTO stock) {
		this.stock = stock;
	}

	public FournisseurDTO getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(FournisseurDTO fournisseur) {
		this.fournisseur = fournisseur;
	}

	public MarqueDTO getMarque() {
		return marque;
	}

	public void setMarque(MarqueDTO marque) {
		this.marque = marque;
	}

	public String getMois() {
		return mois;
	}

	public void setMois(String mois) {
		this.mois = mois;
	}

	public CategorieLaitDTO getCategorieLait() {
		return categorieLait;
	}

	public void setCategorieLait(CategorieLaitDTO categorieLait) {
		this.categorieLait = categorieLait;
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