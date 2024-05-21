package sn.pad.pe.configurations.mail;

import javax.mail.PasswordAuthentication;

class Authenticator extends javax.mail.Authenticator {
	private PasswordAuthentication authentication;

	public Authenticator(String senderSMTP, String senderPasswordSMTP) {
		authentication = new PasswordAuthentication(senderSMTP, senderPasswordSMTP);
	}

	public PasswordAuthentication getAuthentication() {
		return authentication;
	}

	public void setAuthentication(PasswordAuthentication authentication) {
		this.authentication = authentication;
	}

}