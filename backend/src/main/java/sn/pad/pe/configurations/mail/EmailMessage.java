package sn.pad.pe.configurations.mail;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.Properties;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
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

    public int sendMail(MailDTO mail) {
        Authenticator authenticator = new Authenticator(this.senderSMTP, this.senderPasswordSMTP);
        Properties props = System.getProperties();
        props.put("mail.smtp.host", this.smtp_host);
        props.put("mail.smtp.port", this.smtp_port);
        props.put("mail.smtp.starttls.enable", this.smtp_starttls);
        props.put("mail.smtp.auth", this.smtp_auth);

        Session session = Session.getDefaultInstance(props, authenticator);
        Message emailMessage = new MimeMessage(session);

        try {
            emailMessage.setFrom(new InternetAddress(this.getSender()));
            for (String email : mail.getDestinataires()) {
                emailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            }
            emailMessage.setSubject(mail.getObjet());

            Multipart multipart = new MimeMultipart();

            // Add the email body
            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(mail.getContenu(), "text/html");
            multipart.addBodyPart(messageBodyPart);

            // Add the attachment if it exists
            if (mail.getFile() != null && !mail.getFile().isEmpty()) {
                File attachment = convertBase64ToFile(mail.getFile(), "pieceJointe", "application/pdf");
                addAttachment(multipart, attachment);
            }

            emailMessage.setContent(multipart);

            Transport.send(emailMessage);
            return 1;

        } catch (AddressException e) {
            e.printStackTrace();
            return 0;
        } catch (MessagingException e) {
            e.printStackTrace();
            return 0;
        } catch (IOException e) {
            e.printStackTrace();
            return 0;
        }
    }

    private File convertBase64ToFile(String base64, String fileName, String fileType) throws IOException {
        byte[] decodedBytes = Base64.getDecoder().decode(base64);
        File tempFile = File.createTempFile(fileName, "." + getFileExtension(fileType));
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(decodedBytes);
        }
        return tempFile;
    }

    private String getFileExtension(String mimeType) {
        switch (mimeType) {
            case "application/pdf":
                return "pdf";
            case "image/jpeg":
                return "jpg";
            case "image/png":
                return "png";
            default:
                return "tmp";
        }
    }

    private void addAttachment(Multipart multipart, File file) throws MessagingException {
        BodyPart messageBodyPart = new MimeBodyPart();
        DataSource source = new FileDataSource(file);
        messageBodyPart.setDataHandler(new javax.activation.DataHandler(source));
        messageBodyPart.setFileName(file.getName());
        multipart.addBodyPart(messageBodyPart);
    }

    // Getters and setters...

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
}
