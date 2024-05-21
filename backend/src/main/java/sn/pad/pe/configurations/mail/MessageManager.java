package sn.pad.pe.configurations.mail;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import sn.pad.pe.pss.dto.MailDTO;

public class MessageManager {

	public String readFile(File file) {
		BufferedReader readerBuffer = null;
		try {
			readerBuffer = new BufferedReader(new FileReader(file));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		String str = "";
		String line = null;
		try {
			while ((line = readerBuffer.readLine()) != null) {
				str += line;
			}
		} catch (IOException e) {
			// e.printStackTrace();
		}
		return str;
	}

	public static int sendMail(MailDTO mail) {
		EmailMessage em;
		int sent = 0;
		if (mail.getDestinataires() != null) {
			em = new EmailMessage();
			sent = em.sendMail(mail);
		}
		return sent;
	}
}