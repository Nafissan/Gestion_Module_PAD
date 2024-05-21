package sn.pad.pe.assurance.dto;

import java.util.Date;

import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.FileMetaDataDTO;

public class MembreFamilleDTO {
	private Long id;
	private String code;
	private String nom;
	private String prenom;
	private AgentDTO agent;
	private int age;
	private boolean active;
	private boolean principale;
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

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public AgentDTO getAgent() {
		return agent;
	}

	public void setAgent(AgentDTO agent) {
		this.agent = agent;
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

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public boolean isPrincipale() {
		return principale;
	}

	public void setPrincipale(boolean principale) {
		this.principale = principale;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

}
