package sn.pad.pe.partenariat.dto;

import java.util.Date;
import java.util.List;

public class ConventionDTO {

	private long id;
	private String code;
	private String libelle;
	private Date dateSignature;
	private Date dateFin;
	private int statut;
	private boolean active;
	private List<ProspectDTO> partenaires;
	private TypePartenariatDTO type;
	private List<DomaineDTO> domaines;

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

	public List<DomaineDTO> getDomaines() {
		return domaines;
	}

	public void setDomaines(List<DomaineDTO> domaines) {
		this.domaines = domaines;
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

	public List<ProspectDTO> getPartenaires() {
		return partenaires;
	}

	public void setPartenaires(List<ProspectDTO> partenaires) {
		this.partenaires = partenaires;
	}

	public TypePartenariatDTO getType() {
		return type;
	}

	public void setType(TypePartenariatDTO type) {
		this.type = type;
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

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

}
