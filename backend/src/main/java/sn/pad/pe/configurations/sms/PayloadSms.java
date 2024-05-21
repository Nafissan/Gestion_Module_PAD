package sn.pad.pe.configurations.sms;

public class PayloadSms {

	private String emetteur;
	private String recepteur;
	private String contenu;
	private String type = "SMS";

	public PayloadSms(String emetteur, String recepteur, String contenu) {
		super();
		this.emetteur = emetteur;
		this.recepteur = recepteur;
		this.contenu = contenu;
	}

	public String getEmetteur() {
		return emetteur;
	}

	public void setEmetteur(String emetteur) {
		this.emetteur = emetteur;
	}

	public String getRecepteur() {
		return recepteur;
	}

	public void setRecepteur(String recepteur) {
		this.recepteur = recepteur;
	}

	public String getContenu() {
		return contenu;
	}

	public void setContenu(String contenu) {
		this.contenu = contenu;
	}

	public String getType() {
		return type;
	}

}
