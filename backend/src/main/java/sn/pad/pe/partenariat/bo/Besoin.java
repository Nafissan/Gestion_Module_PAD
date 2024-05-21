package sn.pad.pe.partenariat.bo;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import sn.pad.pe.pss.bo.UniteOrganisationnelle;

@Entity
@Table(name = "pad_part_besoin")
public class Besoin implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(unique = true, nullable = false)
	private String code;
	private String libelle;
	@Column
	private boolean active;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "code_plan_prospection", referencedColumnName = "code", nullable = true)
	private PlanProspection planprospection;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pad_part_besoin_domaine", joinColumns = @JoinColumn(name = "besoin_code", referencedColumnName = "code"), inverseJoinColumns = @JoinColumn(name = "domaine_code", referencedColumnName = "code"))
	private Collection<Domaine> domaines;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_unite", referencedColumnName = "id", nullable = true)
	private UniteOrganisationnelle unite;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pad_part_besoin_partenaire", joinColumns = @JoinColumn(name = "besoin_code", referencedColumnName = "code"), inverseJoinColumns = @JoinColumn(name = "partenaire_code", referencedColumnName = "code"))
	private Collection<Prospect> partenaires;

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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Collection<Domaine> getDomaines() {
		return domaines;
	}

	public void setDomaines(Collection<Domaine> domaines) {
		this.domaines = domaines;
	}

	public PlanProspection getPlanprospection() {
		return planprospection;
	}

	public void setPlanprospection(PlanProspection planprospection) {
		this.planprospection = planprospection;
	}

	public void setDomaines(List<Domaine> domaines) {
		this.domaines = domaines;
	}

	public UniteOrganisationnelle getUnite() {
		return unite;
	}

	public void setUnite(UniteOrganisationnelle unite) {
		this.unite = unite;
	}

	public Collection<Prospect> getPartenaires() {
		return partenaires;
	}

	public void setPartenaires(Collection<Prospect> partenaires) {
		this.partenaires = partenaires;
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
