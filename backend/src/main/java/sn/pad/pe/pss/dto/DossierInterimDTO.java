package sn.pad.pe.pss.dto;

/**
 * 
 * @author cheikhibra.samb
 *
 */
public class DossierInterimDTO {

	private Long id;
	private String code;
	private int annee;
	private String description;

	/**
	 * Agent Responsable de la création
	 */
	private String matricule;
	private String prenom;
	private String nom;
	private String fonction;
	private String structure;

	private UniteOrganisationnelleDTO uniteOrganisationnelle;

	public DossierInterimDTO() {
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

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
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

	public String getStructure() {
		return structure;
	}

	public void setStructure(String structure) {
		this.structure = structure;
	}

	public UniteOrganisationnelleDTO getUniteOrganisationnelle() {
		return new UniteOrganisationnelleDTO(uniteOrganisationnelle.getId(), uniteOrganisationnelle.getCode(),
				uniteOrganisationnelle.getNom(), uniteOrganisationnelle.getDescription(),
				uniteOrganisationnelle.getNiveauHierarchique());
	}

	public void setUniteOrganisationnelle(UniteOrganisationnelleDTO uniteOrganisationnelle) {
		this.uniteOrganisationnelle = uniteOrganisationnelle;
	}

}
