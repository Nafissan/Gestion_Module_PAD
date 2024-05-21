package sn.pad.pe.pss.services.impl;

import sn.pad.pe.configurations.mail.MessageManager;
import sn.pad.pe.pss.dto.MailDTO;
import sn.pad.pe.pss.services.MailService;

public class MailServiceImpl implements MailService {

	@Override
	public void envoi(MailDTO mail) {
		MessageManager.sendMail(mail);
	}
}
