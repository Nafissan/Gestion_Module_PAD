package sn.pad.pe.dotation.services.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.configurations.sms.SmsService;
import sn.pad.pe.dotation.bo.Dotation;
import sn.pad.pe.dotation.bo.Notification;
import sn.pad.pe.dotation.repositories.DotationRepository;
import sn.pad.pe.dotation.repositories.NotificationRepository;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.dto.MailDTO;

@Component
public class Scheduler {
    @Autowired
    private DotationRepository dotationRepository;
    @Autowired
    private NotificationRepository notificationRepository;

    private static final Logger log = LoggerFactory.getLogger(Scheduler.class);
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

	@Scheduled(cron = "0 0 8 ? * MON")
    public void currentTime() {
        // envoie mail pour le module doatation lait
        Notification notificationDotation = notificationRepository.findByModule("DOTATION_LAIT");

        if (notificationDotation.isActive()) {
            List<Dotation> dotations = dotationRepository.findDotationsEncours(Integer.parseInt(getWeekStartDate()),
                    Integer.parseInt(getWeekStartDate()) + 6);
            for (Dotation d : dotations) {
                Agent agentDTOEmail = d.getBeneficiaire();

                // Send sms
                String sms = "Bonjour " + agentDTOEmail.getPrenom() + " " + agentDTOEmail.getNom()
                        + ". Veuillez récupérer dans le mois votre dotation de lait au Service Social du PAD.";

//                SmsService.send(agentDTOEmail.getMatricule(), agentDTOEmail.getTelephone(), sms);

                MailDTO mailDTO = new MailDTO();
                mailDTO.setEmetteur("Service Sociale ");
                // mailDTO.setContenu("Rappel D'attribution de Lait ");
                mailDTO.setDestinataires(Arrays.asList(agentDTOEmail.getEmail()));
                Message msg = null;

                String urlprojet = "http://localhost:8088/G-Demande";
                String lienimage = "assets/images/logoPADold.png";
                String nom = agentDTOEmail.getPrenom() + " " + agentDTOEmail.getNom();

                String html = "<!DOCTYPE html>\r\n"
                        + "\r\n"
                        + "<html lang=\"en\" xmlns:v=\"urn:schemas-microsoft-com:vml\">\r\n"
                        + "\r\n"
                        + "<head>\r\n"
                        + "\r\n"
                        + "<meta charset=\"utf-8\">\r\n"
                        + "\r\n"
                        + "<meta name=\"x-apple-disable-message-reformatting\">\r\n"
                        + "\r\n"
                        + "<meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">\r\n"
                        + "\r\n"
                        + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n"
                        + "\r\n"
                        + "<meta name=\"format-detection\" content=\"telephone=no, date=no, address=no, email=no\">\r\n"
                        + "\r\n"
                        + "<meta name=\"color-scheme\" content=\"light dark\">\r\n"
                        + "\r\n"
                        + "<meta name=\"supported-color-schemes\" content=\"light dark\">\r\n"
                        + "\r\n"
                        + "<!--[if mso]>\r\n"
                        + "\r\n"
                        + "<noscript>\r\n"
                        + "\r\n"
                        + "<xml>\r\n"
                        + "\r\n"
                        + "<o:OfficeDocumentSettings xmlns:o=\"urn:schemas-microsoft-com:office:office\">\r\n"
                        + "\r\n"
                        + "<o:PixelsPerInch>96</o:PixelsPerInch>\r\n"
                        + "\r\n"
                        + "</o:OfficeDocumentSettings>\r\n"
                        + "\r\n"
                        + "</xml>\r\n"
                        + "\r\n"
                        + "</noscript>\r\n"
                        + "\r\n"
                        + "<style>\r\n"
                        + "\r\n"
                        + "td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: \"Segoe UI\", sans-serif; mso-line-height-rule: exactly;}\r\n"
                        + "\r\n"
                        + "</style>\r\n"
                        + "\r\n"
                        + "<![endif]--> <title>Informations</title> <style>\r\n"
                        + "\r\n"
                        + ".hover-text-decoration-underline:hover {\r\n"
                        + "\r\n"
                        + "text-decoration: underline;\r\n"
                        + "\r\n"
                        + "}\r\n"
                        + "\r\n"
                        + "@media (max-width: 600px) {\r\n"
                        + "\r\n"
                        + ".sm-w-full {\r\n"
                        + "\r\n"
                        + "width: 100% !important;\r\n"
                        + "\r\n"
                        + "}\r\n"
                        + "\r\n"
                        + ".sm-py-8 {\r\n"
                        + "\r\n"
                        + "padding-top: 32px !important;\r\n"
                        + "\r\n"
                        + "padding-bottom: 32px !important;\r\n"
                        + "\r\n"
                        + "}\r\n"
                        + "\r\n"
                        + ".sm-px-6 {\r\n"
                        + "\r\n"
                        + "padding-left: 24px !important;\r\n"
                        + "\r\n"
                        + "padding-right: 24px !important;\r\n"
                        + "\r\n"
                        + "}\r\n"
                        + "\r\n"
                        + ".sm-leading-8 {\r\n"
                        + "\r\n"
                        + "line-height: 32px !important;\r\n"
                        + "\r\n"
                        + "}\r\n"
                        + "\r\n"
                        + "}\r\n"
                        + "\r\n"
                        + "</style></head>\r\n"
                        + "\r\n"
                        + "<body style=\"word-break: break-word; -webkit-font-smoothing: antialiased; margin: 0; width: 100%; background-color: #f8fafc; padding: 0\"> <div style=\"display: none\">\r\n"
                        + "\r\n"
                        + "Please confirm your email address in order to activate your account\r\n"
                        + "\r\n"
                        + "&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;\r\n"
                        + "\r\n"
                        + "</div>\r\n"
                        + "\r\n"
                        + "<div role=\"article\" aria-roledescription=\"email\" aria-label=\"Confirm your email address\" lang=\"en\"> <table style=\"width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\r\n"
                        + "\r\n"
                        + "<tr>\r\n"
                        + "\r\n"
                        + "<td align=\"center\" style=\"background-color: #f8fafc\">\r\n"
                        + "\r\n"
                        + "<table class=\"sm-w-full\" style=\"width: 600px\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\r\n"
                        + "\r\n"
                        + "<tr>\r\n"
                        + "\r\n"
                        + "<td align=\"center\" class=\"sm-px-6\">\r\n"
                        + "\r\n"
                        + "<table style=\"width: 100%\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\r\n"
                        + "\r\n"
                        + "<tr>\r\n"
                        + "\r\n"
                        + "<td class=\"sm-px-6\" style=\"border-radius: 4px; background-color: #fff; padding: 48px; text-align: left; font-size: 16px; line-height: 24px; color: #334155; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)\">\r\n"
                        + "\r\n"
                        + "<p class=\"sm-leading-8\" style=\"margin: 0; margin-bottom: 24px; font-size: 20px; font-weight: 600; color: #000\">\r\n"
                        + "\r\n"
                        + "Direction Capital Humain - Service Social\r\n"
                        + "\r\n"
                        + "</p>\r\n"
                        + "\r\n"
                        + "<p style=\"margin: 0; margin-bottom: 16px\">\r\n"
                        + "\r\n"
                        + "Bonjour " + nom + ",<br>\r\n"
                        + "\r\n"
                        + "Merci de recuperer, dans la semaine votre dotation de lait<br>\r\n"
                        + "\r\n"
                        + "au service social du PAD.\r\n"
                        + "\r\n"
                        + "</p>\r\n"
                        + "\r\n"
                        + "<p style=\"margin: 0; margin-bottom: 8px\">Cordialement.</p>\r\n"
                        + "\r\n"
                        + "<table style=\"width: 100%\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\r\n"
                        + "\r\n"
                        + "<tr>\r\n"
                        + "\r\n"
                        + "<td style=\"padding-top: 32px; padding-bottom: 32px\">\r\n"
                        + "\r\n"
                        + "<div style=\"height: 1px; background-color: #e2e8f0; line-height: 1px\">&zwnj;</div>\r\n"
                        + "\r\n"
                        + "</td>\r\n"
                        + "\r\n"
                        + "</tr>\r\n"
                        + "\r\n"
                        + "</table>\r\n"
                        + "\r\n"
                        + "<p style=\"margin: 0; margin-bottom: 16px; font-size: 12px\">Si vous n'etes pas beneficiaire de ce service, vous pouvez ignorer cet e-mail en toute securite.</p>\r\n"
                        + "\r\n"
                        + "</td>\r\n"
                        + "\r\n"
                        + "</tr>\r\n"
                        + "\r\n"
                        + "<tr>\r\n"
                        + "\r\n"
                        + "<td style=\"height: 48px\"></td>\r\n"
                        + "\r\n"
                        + "</tr>\r\n"
                        + "\r\n"
                        + "<tr>\r\n"
                        + "\r\n"
                        + "<td style=\"padding-left: 24px; padding-right: 24px; text-align: center; font-size: 12px; color: #475569\">\r\n"
                        + "\r\n"
                        + "<p style=\"margin: 0; margin-bottom: 16px; text-transform: uppercase\">Team Direction du Digital</p>\r\n"
                        + "\r\n"
                        + "<p style=\"margin: 0; font-style: italic\">Ensemble pour un Port Digital</p>\r\n"
                        + "\r\n"
                        + "<p style=\"cursor: default\">\r\n"
                        + "\r\n"
                        + "<a href=\"http://portail.portdakar.sn/pss-ui\" class=\"hover-text-decoration-underline\" style=\"text-decoration: none; color: #4338ca\">Portail d'entreprise</a>\r\n"
                        + "\r\n"
                        + "&bull;\r\n"
                        + "\r\n"
                        + "<a href=\"https://www.portdakar.sn/\" class=\"hover-text-decoration-underline\" style=\"text-decoration: none; color: #4338ca\">Site Web</a>\r\n"
                        + "\r\n"
                        + "</p>\r\n"
                        + "\r\n"
                        + "</td>\r\n"
                        + "\r\n"
                        + "</tr>\r\n"
                        + "\r\n"
                        + "</table>\r\n"
                        + "\r\n"
                        + "</td>\r\n"
                        + "\r\n"
                        + "</tr>\r\n"
                        + "\r\n"
                        + "</table>\r\n"
                        + "\r\n"
                        + "</td>\r\n"
                        + "\r\n"
                        + "</tr>\r\n"
                        + "\r\n"
                        + "</table> </div>\r\n"
                        + "\r\n"
                        + "</body>\r\n"
                        + "\r\n"
                        + "</html>";

                mailDTO.setContenu(html);
                Map<String, Object> model = new HashMap<>();
                model.put("Name", agentDTOEmail.getPrenom());
                model.put("location", "Bangalore,India");

                try {
                    // MessageManager.sendMail(mailDTO);
                    msg = new Message(new Date(), "Message envoyé avec succès", mailDTO.getDestinataires().toString());
                } catch (Exception exception) {
                    msg = new Message(new Date(), "Message non envoyé", mailDTO.getDestinataires().toString());
                }
            }
        }
        // envoie mail pour les autres types de module
        else {

        }
    }

    public static String getWeekStartDate() {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("dd");
        while (calendar.get(Calendar.DAY_OF_WEEK) != Calendar.MONDAY) {
            calendar.add(Calendar.DATE, -1);
        }
        return sdf.format(calendar.getTime());
    }

    public static String getWeekEndDate() {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("dd");
        while (calendar.get(Calendar.DAY_OF_WEEK) != Calendar.MONDAY) {
            calendar.add(Calendar.DATE, 1);
        }
        calendar.add(Calendar.DATE, -3);
        return sdf.format(calendar.getTime());
    }

//	public static MailResponse sendEmail(@RequestBody Agent agent) {
//		Map<String, Object> model = new HashMap<>();
//		model.put("Name", agent.getPrenom());
//		model.put("location", "Bangalore,India");
//		return mailService.sendEmail(agent, model);
//	}
}
