package sn.pad.pe.dotation.bo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pad_dl_stock")
public class Stock implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	@Column(unique = true)
	private String annee;
	private boolean active;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "stock")
	private List<SuiviStock> suiviStocks;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
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

	public List<SuiviStock> getSuiviStocks() {
		return suiviStocks;
	}

	public void setSuiviStocks(List<SuiviStock> suiviStocks) {
		this.suiviStocks = suiviStocks;
	}

}