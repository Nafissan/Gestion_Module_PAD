package sn.pad.pe.dotation.bo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pad_dl_suvi_dotation")
public class SuiviDotation implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private int nbreArticleAttribue;
	private String matriculeAgent;
	private String nomAgent;
	private String prenomAgent;
	private Date dateAttribution;
	private String etat;
	private String mois;
	private int annee;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "dotationId", referencedColumnName = "id")
	private Dotation dotation;
	@OneToOne
	@JoinColumn(name = "suiviStockId", referencedColumnName = "id")
	private SuiviStock suiviStock;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "categorieLaitId", referencedColumnName = "id")
	private CategorieLait categorieLait;

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

	public Dotation getDotation() {
		return dotation;
	}

	public void setDotation(Dotation dotation) {
		this.dotation = dotation;
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

	public SuiviStock getSuiviStock() {
		return suiviStock;
	}

	public void setSuiviStock(SuiviStock suiviStock) {
		this.suiviStock = suiviStock;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public CategorieLait getCategorieLait() {
		return categorieLait;
	}

	public void setCategorieLait(CategorieLait categorieLait) {
		this.categorieLait = categorieLait;
	}

}