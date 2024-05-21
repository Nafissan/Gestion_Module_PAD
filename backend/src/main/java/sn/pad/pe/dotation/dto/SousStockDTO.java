package sn.pad.pe.dotation.dto;

import java.util.Date;

import org.checkerframework.common.aliasing.qual.Unique;

public class SousStockDTO {

	private long id;
	private String code;
	private String libelle;
	// Taux Alerte en %
	private int seuilMinimum;
	private int quantiteInitial;
	private int quantiteCourant;
	private int quantiteRestant;
	private int quantiteReference;
	private String type;
	@Unique
	private String annee;
	private boolean active;
	private StockDTO stock;
	private Date createdAt;
	private Date updatedAt;

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

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public int getSeuilMinimum() {
		return seuilMinimum;
	}

	public void setSeuilMinimum(int seuilMinimum) {
		this.seuilMinimum = seuilMinimum;
	}

	public int getQuantiteInitial() {
		return quantiteInitial;
	}

	public void setQuantiteInitial(int quantiteInitial) {
		this.quantiteInitial = quantiteInitial;
	}

	public int getQuantiteCourant() {
		return quantiteCourant;
	}

	public void setQuantiteCourant(int quantiteCourant) {
		this.quantiteCourant = quantiteCourant;
	}

	public int getQuantiteRestant() {
		return quantiteRestant;
	}

	public void setQuantiteRestant(int quantiteRestant) {
		this.quantiteRestant = quantiteRestant;
	}

	public int getQuantiteReference() {
		return quantiteReference;
	}

	public void setQuantiteReference(int quantiteReference) {
		this.quantiteReference = quantiteReference;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAnnee() {
		return annee;
	}

	public void setAnnee(String annee) {
		this.annee = annee;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public StockDTO getStock() {
		return stock;
	}

	public void setStock(StockDTO stock) {
		this.stock = stock;
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