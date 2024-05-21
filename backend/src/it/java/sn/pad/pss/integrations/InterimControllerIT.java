package sn.pad.pss.integrations;



import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import sn.pad.pe.PEBackendApplication;
import sn.pad.pe.pss.bo.Interim;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.DossierInterimDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

 
@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class InterimControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port = 8088;

	private static InterimDTO interimDTO;
	private static InterimDTO interimDTOSaved;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		interimDTO = new InterimDTO();
		interimDTOSaved = new InterimDTO();
	}
//	@Order(1)
	@Test
	void testA() {
		ResponseEntity<UniteOrganisationnelleDTO> responseUG = restTemplate.getForEntity(
				getRootUrl() + "/uniteOrganisationnelles/1", UniteOrganisationnelleDTO.class);
		assertEquals(HttpStatus.OK.value(), responseUG.getStatusCodeValue());

		ResponseEntity<AgentDTO> responseAgentDepart = restTemplate.getForEntity(
				getRootUrl() + "/agents/1",AgentDTO.class);
		assertEquals(HttpStatus.OK, responseAgentDepart.getStatusCode());
		
		ResponseEntity<AgentDTO> responseAgentArrive = restTemplate.getForEntity(
				getRootUrl() + "/agents/2",AgentDTO.class);
		assertEquals(HttpStatus.OK, responseAgentArrive.getStatusCode());

		ResponseEntity<DossierInterimDTO> responseDossierInterim = restTemplate.getForEntity(
				getRootUrl() + "/dossierInterims/30",
				DossierInterimDTO.class);
		
		assertEquals(HttpStatus.OK, responseDossierInterim.getStatusCode());

		interimDTO.setCommentaire("BIEN");

		interimDTO.setAgentDepart(responseAgentDepart.getBody());
		interimDTO.setAgentArrive(responseAgentArrive.getBody());
		interimDTO.setUniteOrganisationnelle(responseUG.getBody());
		interimDTO.setDossierInterim(responseDossierInterim.getBody());

		ResponseEntity<InterimDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/interims", interimDTO,
				InterimDTO.class);
		interimDTOSaved = postResponse.getBody();
		assertEquals(HttpStatus.CREATED, postResponse.getStatusCode());
	}
//	@Order(2)
	@Test
	void testB() {
		ResponseEntity<Interim[]> getResponse = restTemplate.getForEntity(getRootUrl() + "/interims", Interim[].class);
		Assertions.assertNotNull(getResponse);
		Assertions.assertEquals(HttpStatus.OK, getResponse.getStatusCode());
		Assertions.assertTrue(getResponse.getBody().length >= 1);	
	}
	
//	@Order(3)
	@Test
	void testC() {
		ResponseEntity<InterimDTO> response = restTemplate
				.getForEntity(getRootUrl() + "/interims/" + interimDTOSaved.getId(), InterimDTO.class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}


//	@Order(4)
	@Test
	void testD() {
		String commentaire = "VALIDE";
		InterimDTO interim = restTemplate.getForObject(getRootUrl() + "/interims/" + interimDTOSaved.getId(),
				InterimDTO.class);

		interim.setCommentaire(commentaire);
		restTemplate.put(getRootUrl() + "/interims", interim);
		InterimDTO updatedInterim = restTemplate.getForObject(getRootUrl() + "/interims/" + interimDTOSaved.getId(),
				InterimDTO.class);
		assertEquals(commentaire, updatedInterim.getCommentaire());
	}
	
//	@Order(5)
	@Test
	void testE() {
		ResponseEntity<InterimDTO> response = restTemplate.getForEntity(getRootUrl() + "/interims/" + interimDTOSaved.getId(),
				InterimDTO.class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		HttpEntity<InterimDTO> requestEntity = new HttpEntity<InterimDTO>(response.getBody()); // mappage de l'objet à supprimer
		ResponseEntity<InterimDTO> responseEntity = restTemplate.exchange(getRootUrl() + "/interims/", HttpMethod.DELETE,
				requestEntity, InterimDTO.class);
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
