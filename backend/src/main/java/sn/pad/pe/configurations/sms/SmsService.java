package sn.pad.pe.configurations.sms;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class SmsService {

	private static RestTemplate restTemplate = new RestTemplate();

	public static void send(String clientId, String destinataire, String contenu) {

		try {
			final String baseUrl = "http://10.1.1.51:9086/api/notifications/send";
			URI uri = new URI(baseUrl);

			if(contenu != null && destinataire != null && !destinataire.replaceAll("\\s","").equals("")) {
				destinataire = destinataire.replaceAll("\\s","");
				PayloadSms payload = new PayloadSms(clientId, destinataire, contenu);
				ResponseEntity<Object> result = restTemplate.postForEntity(uri, payload, Object.class);
				System.out.println(result);
			}else {
				System.out.println("Format sms Incorrect");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
