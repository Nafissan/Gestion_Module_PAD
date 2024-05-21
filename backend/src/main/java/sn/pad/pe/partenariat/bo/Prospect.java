package sn.pad.pe.partenariat.bo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "pad_part_prospect")
public class Prospect implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(unique = true, nullable = false)
	private String code;
	private String nom;
	@Column(unique = true)
	private String email;
	@Column(unique = true)
	private String telephone;
	@Column
	private String adresse;
	@Column(unique = true)
	private String fax;
	@Column(unique = true)
	private String siteWeb;
	@Column
	private String representantPrenom;
	@Column
	private String representantNom;
	@Column
	private String representantEmail;
	@Column
	private String representantTelephone;
	@Column
	private double latitude;
	@Column
	private double longitude;
	@Column
	private int statut;
	@Column
	private String nature;
	@Column
	private String profil;
	@Column
	private String objectifAccord;
	@Column
	private int dureeAccord;
	@Column
	private String interetPAD;
	@Column
	private String  interetGobalProspect;

	private boolean active;
	private boolean partenaire;
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Temporal(TemporalType.DATE)
	private Date dateApprobation;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ville", referencedColumnName = "code", nullable = true)
	private Ville ville;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "zone", referencedColumnName = "code", nullable = true)
	private Zone zone;
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "partenaires")
	private List<Convention> convention;

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

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getSiteWeb() {
		return siteWeb;
	}

	public void setSiteWeb(String siteWeb) {
		this.siteWeb = siteWeb;
	}

	public String getRepresentantPrenom() {
		return representantPrenom;
	}

	public void setRepresentantPrenom(String representantPrenom) {
		this.representantPrenom = representantPrenom;
	}

	public String getRepresentantNom() {
		return representantNom;
	}

	public void setRepresentantNom(String representantNom) {
		this.representantNom = representantNom;
	}

	public String getRepresentantEmail() {
		return representantEmail;
	}

	public void setRepresentantEmail(String representantEmail) {
		this.representantEmail = representantEmail;
	}

	public String getRepresentantTelephone() {
		return representantTelephone;
	}

	public void setRepresentantTelephone(String representantTelephone) {
		this.representantTelephone = representantTelephone;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public int getStatut() {
		return statut;
	}

	public void setStatut(int statut) {
		this.statut = statut;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isPartenaire() {
		return partenaire;
	}

	public void setPartenaire(boolean partenaire) {
		this.partenaire = partenaire;
	}

	public Ville getVille() {
		return ville;
	}

	public void setVille(Ville ville) {
		this.ville = ville;
	}

	public List<Convention> getConvention() {
		return convention;
	}

	public void setConvention(List<Convention> convention) {
		this.convention = convention;
	}

	public String getNature() {
		return nature;
	}

	public void setNature(String nature) {
		this.nature = nature;
	}

	public String getProfil() {
		return profil;
	}

	public void setProfil(String profil) {
		this.profil = profil;
	}

	public String getObjectifAccord() {
		return objectifAccord;
	}

	public void setObjectifAccord(String objectifAccord) {
		this.objectifAccord = objectifAccord;
	}

	public int getDureeAccord() {
		return dureeAccord;
	}

	public void setDureeAccord(int dureeAccord) {
		this.dureeAccord = dureeAccord;
	}

	public String getInteretPAD() {
		return interetPAD;
	}

	public void setInteretPAD(String interetPAD) {
		this.interetPAD = interetPAD;
	}

	public String getInteretGobalProspect() {
		return interetGobalProspect;
	}

	public void setInteretGobalProspect(String interetGobalProspect) {
		this.interetGobalProspect = interetGobalProspect;
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

	public Zone getZone() {
		return zone;
	}

	public void setZone(Zone zone) {
		this.zone = zone;
	}

	public Date getDateApprobation() {
		return dateApprobation;
	}

	public void setDateApprobation(Date dateApprobation) {
		this.dateApprobation = dateApprobation;
	}

}
