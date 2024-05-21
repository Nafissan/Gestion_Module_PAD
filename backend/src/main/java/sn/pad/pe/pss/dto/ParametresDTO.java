package sn.pad.pe.pss.dto;

public class ParametresDTO {
	private int idparametre;
	private String code;
	private String libelleparametre;
	private int valeur;

	public ParametresDTO() {
		super();
	}

	public int getIdparametre() {
		return idparametre;
	}

	public void setIdparametre(int idparametre) {
		this.idparametre = idparametre;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLibelleparametre() {
		return libelleparametre;
	}

	public void setLibelleparametre(String libelleparametre) {
		this.libelleparametre = libelleparametre;
	}

	public int getValeur() {
		return valeur;
	}

	public void setValeur(int valeur) {
		this.valeur = valeur;
	}

}
