package sn.pad.pss.integrations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;

import sn.pad.pe.PEBackendApplication;
import sn.pad.pe.pss.dto.EtapeAbsenceDTO;


 
@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EtapeAbsenceControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port = 8088;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

//	@Order(1)
	@Test
	void testA() {
		EtapeAbsenceDTO etapeabsenceDTO = new EtapeAbsenceDTO();
		etapeabsenceDTO.setCommentaire("commentaire1");
		etapeabsenceDTO.setAction("action1");
		ResponseEntity<EtapeAbsenceDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/etapeabsences",
		etapeabsenceDTO, EtapeAbsenceDTO.class);
		assertNotNull(postResponse);
		assertNotNull(postResponse.getBody());
	}
	
//	@Order(2)
	@Test
	void testB() {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<String> entity = new HttpEntity<String>(null, headers);
		ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/etapeabsences", HttpMethod.GET, entity,
		String.class);
		assertNotNull(response.getBody());
	}
//	@Order(3)
	@Test
	void testC() {
		EtapeAbsenceDTO etapeabsenceDTO = restTemplate.getForObject(getRootUrl() + "/etapeabsences/2",
		EtapeAbsenceDTO.class);
		assertNotNull(etapeabsenceDTO);
	}
	
//	@Order(4)
	@Test
	void testD() {
		Long id = 2L;
		EtapeAbsenceDTO etapeabsenceDTO = restTemplate.getForObject(getRootUrl() + "/etapeabsences/" + id,
		EtapeAbsenceDTO.class);
		etapeabsenceDTO.setCommentaire("updated EtapeAbsence");
		restTemplate.put(getRootUrl() + "/etapeabsences/" , etapeabsenceDTO);
		EtapeAbsenceDTO updatedEtapeAbsence = restTemplate.getForObject(getRootUrl() + "/etapeabsences/" + id,
		EtapeAbsenceDTO.class);
		assertNotNull(updatedEtapeAbsence);
	}

//	@Order(5)
	@Test
	void testE() {
		Long id = 2L;	
        EtapeAbsenceDTO etapeabsenceDTO = restTemplate.getForObject(getRootUrl() + "/etapeabsences/" + id, EtapeAbsenceDTO.class);
        assertNotNull(etapeabsenceDTO);   
        HttpEntity<EtapeAbsenceDTO> requestEntity = new HttpEntity<EtapeAbsenceDTO> (etapeabsenceDTO); // mappage de l'objet à supprimer
        restTemplate.exchange(getRootUrl() + "/etapeabsences/", HttpMethod.DELETE, requestEntity, Void.class);
        try {
        	etapeabsenceDTO = restTemplate.getForObject(getRootUrl() + "/etapeabsences/" + id, EtapeAbsenceDTO.class);
        } catch (final HttpClientErrorException e) {
             assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
        }
	}


}
