package sn.pad.pe.partenariat.dto;

import java.util.Date;
import java.util.List;

import sn.pad.pe.pss.dto.FileMetaDataDTO;

public class ComiteDTO {

	private Long id;
	private String code;
	private String libelle;
	private boolean active;

	private List<PointFocalDTO> pointfocals;

	private Date createdAt;
	private Date updatedAt;
	private FileMetaDataDTO fileMetaData;

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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public List<PointFocalDTO> getPointfocals() {
		return pointfocals;
	}

	public void setPointfocals(List<PointFocalDTO> pointfocals) {
		this.pointfocals = pointfocals;
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

	public FileMetaDataDTO getFileMetaData() {
		return fileMetaData;
	}

	public void setFileMetaData(FileMetaDataDTO fileMetaData) {
		this.fileMetaData = fileMetaData;
	}

}
