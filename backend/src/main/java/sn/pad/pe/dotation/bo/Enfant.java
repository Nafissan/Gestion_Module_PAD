package sn.pad.pe.dotation.bo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pad_dl_enfant")
public class Enfant implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String prenom;
	private String nom;
	private String sexe;
	private Date dateNaissance;
	@Column(unique = true)
	private String numeroExtrait;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "DOTATION_ID", referencedColumnName = "id", nullable = false)
	private Dotation dotation;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public String getNumeroExtrait() {
		return numeroExtrait;
	}

	public void setNumeroExtrait(String numeroExtrait) {
		this.numeroExtrait = numeroExtrait;
	}

	public Dotation getDotation() {
		return dotation;
	}

	public void setDotation(Dotation dotation) {
		this.dotation = dotation;
	}

}