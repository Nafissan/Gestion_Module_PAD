package sn.pad.pe.partenariat.bo;

import java.io.Serializable;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import sn.pad.pe.pss.bo.FileMetaData;

@Entity
@Table(name = "pad_part_comite")
public class Comite implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true, nullable = false)
	private String code;
	private String libelle;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;
	@Column
	private boolean active;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pad_part_comite_pointfocals", joinColumns = @JoinColumn(name = "comite_code", referencedColumnName = "code"), inverseJoinColumns = @JoinColumn(name = "pointfocal_code", referencedColumnName = "code"))
	private Collection<PointFocal> pointfocals;

	@OneToOne
	@JoinColumn(name = "ID_Fil_DD", referencedColumnName = "id")
	private FileMetaData fileMetaData;

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

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Collection<PointFocal> getPointfocals() {
		return pointfocals;
	}

	public void setPointfocals(Collection<PointFocal> pointfocals) {
		this.pointfocals = pointfocals;
	}

	public FileMetaData getFileMetaData() {
		return fileMetaData;
	}

	public void setFileMetaData(FileMetaData fileMetaData) {
		this.fileMetaData = fileMetaData;
	}

}
