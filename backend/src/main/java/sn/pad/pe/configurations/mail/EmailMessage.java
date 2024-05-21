package sn.pad.pe.configurations.mail;

import java.util.Properties;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import sn.pad.pe.pss.dto.MailDTO;

public class EmailMessage {
	private String attachmentFilePathList;
	private String sender;
	private String senderPassword;
	private String senderSMTP;
	private String senderPasswordSMTP;
	private String smtp_host;
	private String smtp_port;
	private String smtp_auth;
	private String smtp_starttls;

	public String getSenderSMTP() {
		return senderSMTP;
	}

	public void setSenderSMTP(String senderSMTP) {
		this.senderSMTP = senderSMTP;
	}

	public String getSenderPasswordSMTP() {
		return senderPasswordSMTP;
	}

	public void setSenderPasswordSMTP(String senderPasswordSMTP) {
		this.senderPasswordSMTP = senderPasswordSMTP;
	}

	public String getSenderPassword() {
		return senderPassword;
	}

	public void setSenderPassword(String senderPassword) {
		this.senderPassword = senderPassword;
	}

	public EmailMessage() {
		this.sender = MailConfig.smtp_expediteur;
		this.senderPassword = MailConfig.smtp_mot_de_passe;
		this.smtp_host = MailConfig.smtp_hote;
		this.smtp_port = MailConfig.smtp_port;
		this.smtp_starttls = MailConfig.smtp_starttls;
		this.smtp_auth = MailConfig.smtp_auth;
		this.senderSMTP = MailConfig.smtp_utilisateur;
		this.senderPasswordSMTP = MailConfig.smtp_mot_de_passe;
	}

	public int sendMail(MailDTO mails) {
		Authenticator authenticator = new Authenticator(this.senderSMTP, this.senderPasswordSMTP);
		Properties props = System.getProperties();
		props.put("mail.smtp.host", this.smtp_host);
		props.put("mail.smtp.port", this.smtp_port);
		props.put("mail.smtp.starttls.enable", this.smtp_starttls);
		props.put("mail.smtp.auth", this.smtp_auth);

		// Setup authentication, get session
		Session session = Session.getDefaultInstance(props, authenticator);

		// Define message
		Message emailMessage = new MimeMessage(session);
		try {

			emailMessage.setFrom(new InternetAddress(this.getSender()));
			for (String email : mails.getDestinataires()) {
				emailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
			}
			emailMessage.setSubject(mails.getObjet());

			// Create the message part
			BodyPart messageBodyPart = new MimeBodyPart();

			// Fill the message
			messageBodyPart.setContent(mails.getContenu(), "text/html");

			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			// Part two is attachment
			messageBodyPart = new MimeBodyPart();

			// Put parts in message
			emailMessage.setContent(multipart);

			// Send the message

			Transport.send(emailMessage);

		} catch (AddressException e) {
			return 0;

		} catch (MessagingException e) {
			return 0;
		}
		return 1;

	}

	public String getAttachmentFilePathList() {
		return attachmentFilePathList;
	}

	public void setAttachmentFilePathList(String attachmentFilePathList) {
		this.attachmentFilePathList = attachmentFilePathList;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

}