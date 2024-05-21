package sn.pad.pe.pss.bo;

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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author cheikhibra.samb
 *
 */
@Entity
public class UniteOrganisationnelle implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String code;
	private String nom;
	@Column(unique = true)
	private String description;
	@Column
	private Boolean isRemoved;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "CODE_SUP_ORG", referencedColumnName = "id")
	private UniteOrganisationnelle uniteSuperieure;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CODE_NIV_HIER", referencedColumnName = "id", nullable = false)
	private NiveauHierarchique niveauHierarchique;

	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "uniteOrganisationnelle")
	private List<Fonction> fonction;

	public UniteOrganisationnelle() {
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

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public UniteOrganisationnelle getUniteSuperieure() {
		return uniteSuperieure;
	}

	public void setUniteSuperieure(UniteOrganisationnelle uniteSuperieure) {
		this.uniteSuperieure = uniteSuperieure;
	}

	public NiveauHierarchique getNiveauHierarchique() {
		return niveauHierarchique;
	}

	public void setNiveauHierarchique(NiveauHierarchique niveauHierarchique) {
		this.niveauHierarchique = niveauHierarchique;
	}

	public Boolean getIsRemoved() {
		return isRemoved;
	}

	public void setIsRemoved(Boolean isRemoved) {
		this.isRemoved = isRemoved;
	}

}
