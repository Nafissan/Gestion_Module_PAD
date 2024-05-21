package sn.pad.pss.integrations;

import java.util.Date;

import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
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
import sn.pad.pe.pss.dto.DossierCongeDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DossierCongeControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;
	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	private static DossierCongeDTO dossierCongeDTO;
	private static DossierCongeDTO dossierCongeDTOSaved;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierCongeDTO = new DossierCongeDTO();
		dossierCongeDTOSaved = new DossierCongeDTO();

	}

	@DisplayName("Test de la méthode POST")
//	@Order(1)
	@Test
	final void testA() {
		dossierCongeDTO.setId(0L);
		dossierCongeDTO.setAnnee("" + new Date().getYear());
		dossierCongeDTO.setDescription("Dossier conge N° 204");
		ResponseEntity<DossierCongeDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/dossierconges",
				dossierCongeDTO, DossierCongeDTO.class);
		dossierCongeDTOSaved = postResponse.getBody();
		Assertions.assertEquals(HttpStatus.CREATED, postResponse.getStatusCode());

	}

	@DisplayName("Test de la méthode GET by Id")
//	@Order(2)
	@Test
	final void testB() {
		ResponseEntity<DossierCongeDTO> getResponse = restTemplate
				.getForEntity(getRootUrl() + "/dossierconges/" + dossierCongeDTOSaved.getId(), DossierCongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK.value(), getResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET ALL")
//	@Order(3)
	@Test
	final void testC() {
		ResponseEntity<Object> getResponse = restTemplate.getForEntity(getRootUrl() + "/dossierconges", Object.class);
		Assertions.assertNotNull(getResponse.getBody());
		Assertions.assertEquals(HttpStatus.OK.value(), getResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode Update")
//	@Order(4)
	@Test
	public void testD() {
		ResponseEntity<DossierCongeDTO> getResponse = restTemplate
				.getForEntity(getRootUrl() + "/dossierconges/" + dossierCongeDTOSaved.getId(), DossierCongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK.value(), getResponse.getStatusCodeValue());

		DossierCongeDTO dossierCongeDTOToUpdate = getResponse.getBody();
		dossierCongeDTOToUpdate.setDescription("update");

		// Mise à jour de l'entité dossier conge
		restTemplate.put(getRootUrl() + "/dossierconges/", getResponse.getBody());

		DossierCongeDTO dossierCongeDTOupdated = restTemplate
				.getForObject(getRootUrl() + "/dossierconges/" + dossierCongeDTOSaved.getId(), DossierCongeDTO.class);

		Assertions.assertEquals(dossierCongeDTOToUpdate.getDescription(), dossierCongeDTOupdated.getDescription());
	}

	@Test
	@DisplayName("Test de la méthode Delete")
//	@Order(5)
	public void testE() {
		DossierCongeDTO dossierCongeDTO = restTemplate
				.getForObject(getRootUrl() + "/dossierconges/" + dossierCongeDTOSaved.getId(), DossierCongeDTO.class);

		HttpEntity<DossierCongeDTO> requestEntity = new HttpEntity<DossierCongeDTO>(dossierCongeDTO);
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/dossierconges", HttpMethod.DELETE,
				requestEntity, Void.class);

		Assertions.assertEquals(HttpStatus.OK.value(), responseEntity.getStatusCodeValue());
	}

}
