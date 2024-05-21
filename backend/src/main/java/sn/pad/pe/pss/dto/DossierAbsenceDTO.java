package sn.pad.pe.pss.dto;

/**
 * 
 * @author cheikhibra.samb
 *
 */
public class DossierAbsenceDTO {

	private Long id;
	private String code;
	private String description;
	private int annee;
	/**
	 * Agent Responsable de la création
	 */
	private String matricule;
	private String prenom;
	private String nom;
	private String fonction;
	/**
	 * Direction
	 */
	private String codeDirection;

	private UniteOrganisationnelleDTO uniteOrganisationnelle;

	public DossierAbsenceDTO() {
		super();
	}

	private String nomDirection;
	private String descriptionDirection;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMatricule() {
		return matricule;
	}

	public void setMatricule(String matricule) {
		this.matricule = matricule;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getFonction() {
		return fonction;
	}

	public void setFonction(String fonction) {
		this.fonction = fonction;
	}

	public String getCodeDirection() {
		return codeDirection;
	}

	public void setCodeDirection(String codeDirection) {
		this.codeDirection = codeDirection;
	}

	public String getNomDirection() {
		return nomDirection;
	}

	public void setNomDirection(String nomDirection) {
		this.nomDirection = nomDirection;
	}

	public String getDescriptionDirection() {
		return descriptionDirection;
	}

	public void setDescriptionDirection(String descriptionDirection) {
		this.descriptionDirection = descriptionDirection;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public UniteOrganisationnelleDTO getUniteOrganisationnelle() {
		return uniteOrganisationnelle;
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelleDTO uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

}
