package sn.pad.pe.pss.controllers;

import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.configurations.mail.MessageManager;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.CompteDTO;
import sn.pad.pe.pss.dto.MailDTO;
import sn.pad.pe.pss.services.AgentService;
import sn.pad.pe.pss.services.CompteService;
import sn.pad.pe.pss.services.ParametreService;

@PropertySource("classpath:application.properties")
@RestController
public class MailController {

	@Autowired
	private AgentService agentService;

	@Autowired
	private CompteService compteService;

	@Autowired
	private ParametreService parametreService;

	@PostMapping("/send-mail/agents")
	public ResponseEntity<Message> sendDirections(HttpServletRequest request, @RequestBody MailDTO mailDTO) {
		Message msg = null;
		try {
			MessageManager.sendMail(mailDTO);
			msg = new Message(new Date(), "Message envoyé avec succès", mailDTO.getDestinataires().toString());
		} catch (Exception exception) {
			msg = new Message(new Date(), "Message non envoyé", mailDTO.getDestinataires().toString());
		}

		return ResponseEntity.ok().body(msg);
	}

	@PostMapping("/send-mail/agents/password")
	public ResponseEntity<Message> changePassword(HttpServletRequest request, @RequestBody AgentDTO agentDTO) {

		AgentDTO agentDTOEmail = agentService.findAgentByEmail(agentDTO.getEmail());
		CompteDTO compteDTO = compteService.getCompteByAgent(agentDTOEmail.getId());

		String token = UUID.randomUUID().toString();

		agentService.createPasswordTokenForAgent(agentDTOEmail, token);
		request.getLocale();

		String urlprojet = parametreService.chercherListParametreByCode("PATH_PROJET").get(0).getLibelleparametre();
//		String urlprojet = "http://localhost:4200/pss-ui/change-password";
		String lien = "Cliquez sur ce lien " + urlprojet + "/compte/" + compteDTO.getId() + "/token/" + token;
		MailDTO mailDTO = new MailDTO();
		mailDTO.setEmetteur("DCH ");
		mailDTO.setContenu("Mot de passe oublié " + lien);
		mailDTO.setLien(lien);
		mailDTO.setDestinataires(Arrays.asList(agentDTOEmail.getEmail()));
		Message msg = null;

		try {
			MessageManager.sendMail(mailDTO);
			msg = new Message(new Date(), "Message envoyé avec succès", mailDTO.getDestinataires().toString());
		} catch (Exception exception) {
			msg = new Message(new Date(), "Message non envoyé", mailDTO.getDestinataires().toString());
		}

		return ResponseEntity.ok().body(msg);

	}

}
