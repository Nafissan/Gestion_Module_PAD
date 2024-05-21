package sn.pad.pss.integrations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;

import org.junit.FixMethodOrder;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
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

import sn.pad.pe.PEBackendApplication;
import sn.pad.pe.pss.dto.FonctionDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@DisplayName("Fonction Controller IT Test ")
public class FonctionControllerIT {

	private static final String NOM_FONCTION = "Expert Odoo";
	@Autowired
	private TestRestTemplate restTemplate;
	@LocalServerPort
	private int port = 8088;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	private static FonctionDTO fonction;
	private static FonctionDTO fonctionCreated;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		fonction = new FonctionDTO();
		fonctionCreated = new FonctionDTO();
	}

//	@Order(1)
	@Test()
	void testA() {
		fonction.setNom("Nouvelle Fonction "+new Date());
		ResponseEntity<FonctionDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/fonctions", fonction,
				FonctionDTO.class);
		fonctionCreated = postResponse.getBody();
		assertEquals(HttpStatus.OK, postResponse.getStatusCode());
	}

//	@Order(2)
	@Test
	final void testB() {
		Long idFonctionCreated = fonctionCreated.getId();
		FonctionDTO fonctionRecup = restTemplate.getForObject(getRootUrl() + "/fonctions/" + idFonctionCreated,
				FonctionDTO.class);
		assertEquals(fonctionCreated.getId(), fonctionRecup.getId());
		assertEquals(fonctionCreated.getNom(), fonctionRecup.getNom());
	}

//	@Order(3)
	@Test
	final void testC() {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<String> entity = new HttpEntity<String>(null, headers);
		ResponseEntity<FonctionDTO[]> response = restTemplate.exchange(getRootUrl() + "/fonctions", HttpMethod.GET, entity,
				FonctionDTO[].class);
		assertNotNull(response.getBody());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertTrue(response.getBody().length>= 1);

	}

//	@Order(4)
	@Test
	public void testD() {

		Long id = fonctionCreated.getId();
		FonctionDTO fonctionToUpdate = restTemplate.getForObject(getRootUrl() + "/fonctions/" + id, FonctionDTO.class);
		fonctionToUpdate.setNom(NOM_FONCTION);
		
		HttpEntity<FonctionDTO> requestEntity = new HttpEntity<FonctionDTO>(fonctionToUpdate);
		restTemplate.exchange(getRootUrl() + "/fonctions/", HttpMethod.PUT, requestEntity, Void.class);
		
		FonctionDTO updatedfonctionDTO = restTemplate.getForObject(getRootUrl() + "/fonctions/" + id,
				FonctionDTO.class);
		
		assertNotNull(updatedfonctionDTO);
		assertEquals(fonctionToUpdate.getId(), updatedfonctionDTO.getId());
		assertEquals(NOM_FONCTION, updatedfonctionDTO.getNom());

	}

	@Test
	public void testE() {

		FonctionDTO fonctionToDelete = restTemplate.getForObject(getRootUrl() + "/fonctions/" + fonctionCreated.getId(), FonctionDTO.class);
		HttpEntity<FonctionDTO> requestEntity = new HttpEntity<FonctionDTO>(fonctionToDelete);
	    restTemplate.exchange(getRootUrl() + "/fonctions/", HttpMethod.DELETE, requestEntity, Void.class);

		fonctionToDelete = restTemplate.getForObject(getRootUrl() + "/fonctions/"+fonctionToDelete.getId(), FonctionDTO.class);
		assertNull(fonctionToDelete.getId());
	}
}
