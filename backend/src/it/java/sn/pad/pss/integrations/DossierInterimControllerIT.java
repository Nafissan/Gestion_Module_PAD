package sn.pad.pss.integrations;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

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
import sn.pad.pe.pss.dto.DossierInterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

/**
 * 
 * @author diop.modou
 *
 */

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DossierInterimControllerIT {

	@Autowired
	private TestRestTemplate restTemplate;
	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	private static DossierInterimDTO dossierInterimDTO;
	private static DossierInterimDTO dossierInterimDTOSaved;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierInterimDTO = new DossierInterimDTO();
		dossierInterimDTOSaved = new DossierInterimDTO();
	}

	@DisplayName("Test de la méthode Create")
//	@Order(1)
	@Test
	final void testA() {
		ResponseEntity<UniteOrganisationnelleDTO> responseUnite = restTemplate.getForEntity(
				getRootUrl() + "/uniteOrganisationnelles/1",
				UniteOrganisationnelleDTO.class);
		assertEquals(HttpStatus.OK, responseUnite.getStatusCode());

		dossierInterimDTO.setCode("code");
		dossierInterimDTO.setAnnee(new Date().getYear());
		dossierInterimDTO.setUniteOrganisationnelle(responseUnite.getBody());

		ResponseEntity<DossierInterimDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/dossierInterims",
				dossierInterimDTO, DossierInterimDTO.class);
		dossierInterimDTOSaved = postResponse.getBody();
		assertNotNull(postResponse);
		assertNotNull(postResponse.getBody());
		assertEquals(HttpStatus.CREATED.value(), postResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET By ID")
//	@Order(2)
	@Test
	final void testB() {

		ResponseEntity<DossierInterimDTO> response = restTemplate.getForEntity(
				getRootUrl() + "/dossierInterims/" + dossierInterimDTOSaved.getId(), DossierInterimDTO.class);
		assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET All")
//	@Order(3)
	@Test
	final void testC() {

		ResponseEntity<DossierInterimDTO[]> getResponse = restTemplate.getForEntity(getRootUrl() + "/dossierInterims",
				DossierInterimDTO[].class);
		assertTrue(getResponse.getBody().length >= 1);
	}

	@DisplayName("Test de la méthode Update")
//	@Order(4)
	@Test
	public void testD() {
		DossierInterimDTO dossierInterimDTO = restTemplate.getForObject(
				getRootUrl() + "/dossierInterims/" + dossierInterimDTOSaved.getId(), DossierInterimDTO.class);
		Assertions.assertNotNull(dossierInterimDTO);

		dossierInterimDTO.setAnnee(new Date().getYear() - 1);
		restTemplate.put(getRootUrl() + "/dossierInterims", dossierInterimDTO);
		DossierInterimDTO dossierAbsenceUpdated = restTemplate.getForObject(
				getRootUrl() + "/dossierInterims/" + dossierInterimDTOSaved.getId(), DossierInterimDTO.class);
		
		assertEquals(new Date().getYear() - 1, dossierAbsenceUpdated.getAnnee());
	}

	@Test
	@DisplayName("Test de la méthode Delete")
//	@Order(5)
	public void testE() {

		DossierInterimDTO dossierInterimDTO = restTemplate.getForObject(getRootUrl() + "/dossierInterims/"+dossierInterimDTOSaved.getId(),
				DossierInterimDTO.class);

		HttpEntity<DossierInterimDTO> requestEntity = new HttpEntity<DossierInterimDTO>(dossierInterimDTO);
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/dossierInterims",
				HttpMethod.DELETE, requestEntity, Void.class);
		Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
