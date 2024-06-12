package sn.pad.pe.pss.dto;

import java.util.List;



public class MailDTO {

	private String objet;
	private String contenu;
	private String lien;
	private String pieceJointe;
	private String emetteur;  //document
	private String file;
	private List<String> destinataires;

	public MailDTO() {
	}

	public String getObjet() {
		return objet;
	}

	public void setObjet(String objet) {
		this.objet = objet;
	}

	public String getContenu() {
		return contenu;
	}

	public void setContenu(String contenu) {
		this.contenu = contenu;
	}

	public String getLien() {
		return lien;
	}

	public void setLien(String lien) {
		this.lien = lien;
	}

	public String getEmetteur() {
		return emetteur;
	}

	public void setEmetteur(String emetteur) {
		this.emetteur = emetteur;
	}

	public List<String> getDestinataires() {
		return destinataires;
	}

	public void setDestinataires(List<String> destinataires) {
		this.destinataires = destinataires;
	}

	public String getPieceJointe() {
		return pieceJointe;
	}

	public void setPieceJointe(String pieceJointe) {
		this.pieceJointe = pieceJointe;
	}

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

}
