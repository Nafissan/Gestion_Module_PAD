package sn.pad.pss.integrations;

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
import sn.pad.pe.pss.dto.PlanningDirectionDTO;

/**
 * 
 * @author adama.thiaw
 *
 */

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PlanningDirectionControllerIT {

	@Autowired
	private TestRestTemplate restTemplate;
	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	private static PlanningDirectionDTO planningDirectionDTO;
	private static PlanningDirectionDTO planningDirectionDTOSaved;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		planningDirectionDTO = new PlanningDirectionDTO();
		planningDirectionDTOSaved = new PlanningDirectionDTO();
	}

	@DisplayName("Test de la méthode POST")
	@Test
	public void testA() {
		planningDirectionDTO.setId(0L);
		ResponseEntity<DossierCongeDTO> getResponse = restTemplate.getForEntity(getRootUrl() + "/dossierconges/28",
				DossierCongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK.value(), getResponse.getStatusCodeValue());

		planningDirectionDTO.setDossierConge(getResponse.getBody());

		ResponseEntity<PlanningDirectionDTO> postResponse = restTemplate
				.postForEntity(getRootUrl() + "/planningdirections", planningDirectionDTO, PlanningDirectionDTO.class);
		planningDirectionDTOSaved = postResponse.getBody();
		Assertions.assertEquals(HttpStatus.CREATED.value(), postResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET By ID")
//	@Order(2)
	@Test
	public void testB() {
		ResponseEntity<PlanningDirectionDTO> planningCongeResponse = restTemplate.getForEntity(
				getRootUrl() + "/planningdirections/" + planningDirectionDTOSaved.getId(), PlanningDirectionDTO.class);
		Assertions.assertEquals(HttpStatus.OK.value(), planningCongeResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET All")
//	@Order(3)
	@Test
	public void testC() {
		ResponseEntity<PlanningDirectionDTO[]> getResponse = restTemplate
				.getForEntity(getRootUrl() + "/planningdirections", PlanningDirectionDTO[].class);
		Assertions.assertNotNull(getResponse);
		Assertions.assertEquals(HttpStatus.OK.value(), getResponse.getStatusCodeValue());
		Assertions.assertTrue(getResponse.getBody().length >= 1);
	}

	@DisplayName("Test de la méthode Update")
//	@Order(4)
	@Test
	public void testD() {
		ResponseEntity<PlanningDirectionDTO> planningCongeResponse = restTemplate.getForEntity(
				getRootUrl() + "/planningdirections/" + planningDirectionDTOSaved.getId(), PlanningDirectionDTO.class);

		Assertions.assertEquals(HttpStatus.OK.value(), planningCongeResponse.getStatusCodeValue());
		PlanningDirectionDTO planningDirectionDTOToUpdate = planningCongeResponse.getBody();

		planningDirectionDTOToUpdate.setEtat("VALIDE");

		restTemplate.put(getRootUrl() + "/planningdirections", planningDirectionDTO);
		PlanningDirectionDTO planningCongeUpdated = restTemplate.getForObject(
				getRootUrl() + "/planningdirections/" + planningDirectionDTOSaved.getId(), PlanningDirectionDTO.class);

		Assertions.assertNotEquals(planningDirectionDTOToUpdate.getEtat(), planningCongeUpdated.getEtat());
	}

	@Test
	@DisplayName("Test de la méthode Delete")
//	@Order(5)
	public void testE() {
		ResponseEntity<PlanningDirectionDTO> planningCongeResponse = restTemplate.getForEntity(
				getRootUrl() + "/planningdirections/" + planningDirectionDTOSaved.getId(), PlanningDirectionDTO.class);

		Assertions.assertEquals(HttpStatus.OK.value(), planningCongeResponse.getStatusCodeValue());

		PlanningDirectionDTO planningDirectionDTOToDelete = planningCongeResponse.getBody();

		HttpEntity<PlanningDirectionDTO> requestEntity = new HttpEntity<PlanningDirectionDTO>(
				planningDirectionDTOToDelete);
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/planningdirections",
				HttpMethod.DELETE, requestEntity, Void.class);

		Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
