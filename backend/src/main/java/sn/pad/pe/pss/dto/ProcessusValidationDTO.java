package sn.pad.pe.pss.dto;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public class ProcessusValidationDTO {
	private Long id;
	private String libelle;
	private String description;

	public ProcessusValidationDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
