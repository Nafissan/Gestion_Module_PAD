package sn.pad.pe.partenariat.bo;

import java.util.Collection;
import java.util.Date;

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
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pad_part_convention")
public class Convention implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(unique = true, nullable = false)
	private String code;
	@Column(unique = true)
	private String libelle;
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Temporal(TemporalType.DATE)
	private Date dateSignature;
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Temporal(TemporalType.DATE)
	private Date dateFin;
	@Column
	private int statut;
	@Column
	private boolean active;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pad_part_convention_partenaires", joinColumns = @JoinColumn(name = "convention_code", referencedColumnName = "code"), inverseJoinColumns = @JoinColumn(name = "prospect_code", referencedColumnName = "code"))
	private Collection<Prospect> partenaires;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pad_part_convention_domaines", joinColumns = @JoinColumn(name = "convention_code", referencedColumnName = "code"), inverseJoinColumns = @JoinColumn(name = "domaine_code", referencedColumnName = "code"))
	private Collection<Domaine> domaines;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "type_partenariat_code", referencedColumnName = "code", nullable = true)
	private TypePartenariat type;

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

	public Date getDateSignature() {
		return dateSignature;
	}

	public void setDateSignature(Date dateSignature) {
		this.dateSignature = dateSignature;
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

	public Collection<Prospect> getPartenaires() {
		return partenaires;
	}

	public void setPartenaires(Collection<Prospect> partenaires) {
		this.partenaires = partenaires;
	}

	public Collection<Domaine> getDomaines() {
		return domaines;
	}

	public void setDomaines(Collection<Domaine> domaines) {
		this.domaines = domaines;
	}

	public TypePartenariat getType() {
		return type;
	}

	public void setType(TypePartenariat type) {
		this.type = type;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
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
