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
import sn.pad.pe.pss.dto.DossierAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

/**
 * 
 * @author diop.modou
 *
 */

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DossierAbsenceControllerIT {

	@Autowired
	private TestRestTemplate restTemplate;
	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	private static DossierAbsenceDTO dossierAbsenceDTO;
	private static DossierAbsenceDTO dossierAbsenceDTOSaved;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		dossierAbsenceDTO = new DossierAbsenceDTO();
		dossierAbsenceDTOSaved = new DossierAbsenceDTO();
	}

	@SuppressWarnings("deprecation")
	@DisplayName("Test de la méthode Create")
//	@Order(1)
	@Test
	final void testA() {
		ResponseEntity<UniteOrganisationnelleDTO> responseUnite = restTemplate.getForEntity(
				getRootUrl() + "/uniteOrganisationnelles/1",
				UniteOrganisationnelleDTO.class);
		assertEquals(HttpStatus.OK, responseUnite.getStatusCode());

		dossierAbsenceDTO.setCode("code");
		dossierAbsenceDTO.setAnnee(new Date().getYear());
		dossierAbsenceDTO.setUniteOrganisationnelle(responseUnite.getBody());

		ResponseEntity<DossierAbsenceDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/dossierabsences",
				dossierAbsenceDTO, DossierAbsenceDTO.class);
		dossierAbsenceDTOSaved = postResponse.getBody();
		assertNotNull(postResponse);
		assertNotNull(postResponse.getBody());
		assertEquals(HttpStatus.CREATED.value(), postResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET By ID")
//	@Order(2)
	@Test
	final void testB() {

		ResponseEntity<DossierAbsenceDTO> response = restTemplate.getForEntity(
				getRootUrl() + "/dossierabsences/" + dossierAbsenceDTOSaved.getId(), DossierAbsenceDTO.class);
		assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET All")
//	@Order(3)
	@Test
	final void testC() {

		ResponseEntity<DossierAbsenceDTO[]> getResponse = restTemplate.getForEntity(getRootUrl() + "/dossierabsences",
				DossierAbsenceDTO[].class);
		assertTrue(getResponse.getBody().length >= 1);
	}

	@DisplayName("Test de la méthode Update")
//	@Order(4)
	@Test
	public void testD() {
		DossierAbsenceDTO dossierAbsenceDTO = restTemplate.getForObject(
				getRootUrl() + "/dossierabsences/" + dossierAbsenceDTOSaved.getId(), DossierAbsenceDTO.class);
		Assertions.assertNotNull(dossierAbsenceDTO);

		dossierAbsenceDTO.setAnnee(new Date().getYear());
		restTemplate.put(getRootUrl() + "/dossierabsences", dossierAbsenceDTO);
		DossierAbsenceDTO dossierAbsenceUpdated = restTemplate.getForObject(
				getRootUrl() + "/dossierabsences/" + dossierAbsenceDTOSaved.getId(), DossierAbsenceDTO.class);
		
		assertEquals(new Date().getYear(), dossierAbsenceUpdated.getAnnee());
	}

	@Test
	@DisplayName("Test de la méthode Delete")
//	@Order(5)
	public void testE() {

		DossierAbsenceDTO dossierAbsenceDTO = restTemplate.getForObject(getRootUrl() + "/dossierabsences/"+dossierAbsenceDTOSaved.getId(),
				DossierAbsenceDTO.class);

		HttpEntity<DossierAbsenceDTO> requestEntity = new HttpEntity<DossierAbsenceDTO>(dossierAbsenceDTO);
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/dossierabsences",
				HttpMethod.DELETE, requestEntity, Void.class);
		Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
