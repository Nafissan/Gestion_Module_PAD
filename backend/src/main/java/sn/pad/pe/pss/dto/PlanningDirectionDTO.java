package sn.pad.pe.pss.dto;

/**
 * 
 * @author cheikhibra.samb
 *
 */
public class PlanningDirectionDTO {

	private Long id;
	private String code;
	private String description;
	private String etat;
	private int niveau;
	private int etape;
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

	public PlanningDirectionDTO() {
		super();
	}

	private String nomDirection;
	private String descriptionDirection;

	private DossierCongeDTO dossierConge;

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

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public int getNiveau() {
		return niveau;
	}

	public void setNiveau(int niveau) {
		this.niveau = niveau;
	}

	public int getEtape() {
		return etape;
	}

	public void setEtape(int etape) {
		this.etape = etape;
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

	public DossierCongeDTO getDossierConge() {
		return dossierConge;
	}

	public void setDossierConge(DossierCongeDTO dossierConge) {
		this.dossierConge = dossierConge;
	}
}
