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
import sn.pad.pe.pss.dto.PlanningCongeDTO;
import sn.pad.pe.pss.dto.PlanningDirectionDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

/**
 * 
 * @author adama.thiaw
 *
 */

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PlanningCongeControllerIT {

	@Autowired
	private TestRestTemplate restTemplate;
	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	private static PlanningCongeDTO planningCongeDTO;
	private static PlanningCongeDTO planningCongeDTOSaved;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		planningCongeDTO = new PlanningCongeDTO();
		planningCongeDTOSaved = new PlanningCongeDTO();
	}

	@DisplayName("Test de la méthode POST")
//	@Order(1)
	@Test
	final void testA() {
		planningCongeDTO.setId(0L);
		ResponseEntity<UniteOrganisationnelleDTO> uniteOrganisationnelleResponse = restTemplate.getForEntity(
				getRootUrl() + "/uniteOrganisationnelles/1" ,
				UniteOrganisationnelleDTO.class);
		Assertions.assertEquals(HttpStatus.OK.value(), uniteOrganisationnelleResponse.getStatusCodeValue());

		ResponseEntity<PlanningDirectionDTO> planningCongeResponse = restTemplate.getForEntity(
				getRootUrl() + "/planningdirections/23",
				PlanningDirectionDTO.class);

		Assertions.assertEquals(HttpStatus.OK.value(), planningCongeResponse.getStatusCodeValue());

		planningCongeDTO.setPlanningDirection(planningCongeResponse.getBody());
		planningCongeDTO.setUniteOrganisationnelle(uniteOrganisationnelleResponse.getBody());

		ResponseEntity<PlanningCongeDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/planningconges",
				planningCongeDTO, PlanningCongeDTO.class);

		planningCongeDTOSaved = postResponse.getBody();

		Assertions.assertEquals(HttpStatus.CREATED.value(), postResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET By ID")
//	@Order(2)
	@Test
	public void testB() {
		ResponseEntity<PlanningCongeDTO> planningCongeResponse = restTemplate.getForEntity(
				getRootUrl() + "/planningconges/" + planningCongeDTOSaved.getId(), PlanningCongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK.value(), planningCongeResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET All")
//	@Order(3)
	@Test
	public void testC() {
		ResponseEntity<PlanningCongeDTO[]> getResponse = restTemplate.getForEntity(getRootUrl() + "/planningconges",
				PlanningCongeDTO[].class);
		Assertions.assertNotNull(getResponse);
		Assertions.assertEquals(HttpStatus.OK.value(), getResponse.getStatusCodeValue());
		Assertions.assertTrue(getResponse.getBody().length >= 1);
	}

	@DisplayName("Test de la méthode Update")
//	@Order(4)
	@Test
	public void testD() {
		ResponseEntity<PlanningCongeDTO> planningCongeResponse = restTemplate.getForEntity(
				getRootUrl() + "/planningconges/" + planningCongeDTOSaved.getId(), PlanningCongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK.value(), planningCongeResponse.getStatusCodeValue());

		PlanningCongeDTO planningCongeDTOToUpdate = planningCongeResponse.getBody();
		planningCongeDTOToUpdate.setEtat("VALIDE");

		restTemplate.put(getRootUrl() + "/planningconges", planningCongeDTO);

		PlanningCongeDTO planningCongeUpdated = restTemplate.getForObject(
				getRootUrl() + "/planningconges/" + planningCongeDTOSaved.getId(), PlanningCongeDTO.class);

		Assertions.assertNotEquals(planningCongeDTOToUpdate.getEtat(), planningCongeUpdated.getEtat());
	}

	@Test
	@DisplayName("Test de la méthode Delete")
//	@Order(5)
	public void testE() {
		ResponseEntity<PlanningCongeDTO> planningCongeResponse = restTemplate.getForEntity(
				getRootUrl() + "/planningconges/" + planningCongeDTOSaved.getId(), PlanningCongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK.value(), planningCongeResponse.getStatusCodeValue());

		PlanningCongeDTO planningCongeDTOToDelete = planningCongeResponse.getBody();

		HttpEntity<PlanningCongeDTO> requestEntity = new HttpEntity<PlanningCongeDTO>(planningCongeDTOToDelete);
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/planningconges", HttpMethod.DELETE,
				requestEntity, Void.class);

		Assertions.assertNotNull(responseEntity);
		Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
