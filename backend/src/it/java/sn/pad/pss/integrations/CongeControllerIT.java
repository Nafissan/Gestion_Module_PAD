package sn.pad.pss.integrations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Date;

import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
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
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.CongeDTO;
import sn.pad.pe.pss.dto.PlanningCongeDTO;

/**
 * 
 * @author adama.thiaw
 *
 */

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@Disabled
public class CongeControllerIT {

	@Autowired
	private TestRestTemplate restTemplate;
	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	private static CongeDTO congeDTO;
	private static CongeDTO congeDTOSaved;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		congeDTO = new CongeDTO();
		congeDTOSaved = new CongeDTO();
	}

	@DisplayName("Test de la méthode POST")
//	@Order(1)
	@Test
	final void testA() {
		congeDTO.setEtat("SAISI");
		congeDTO.setDescription("Congé annuel");
		congeDTO.setDateDepart(new Date());
		congeDTO.setDateRetourEffectif(new Date());
		congeDTO.setCodeDecision("DC-2020");

		ResponseEntity<AgentDTO> agentResponse = restTemplate.exchange(
				getRootUrl() + "/agents/1", HttpMethod.GET, null,
				AgentDTO.class);
		assertEquals(HttpStatus.OK, agentResponse.getStatusCode());

		ResponseEntity<PlanningCongeDTO> planningCongeResponse = restTemplate.getForEntity(
				getRootUrl() + "/planningconges/1", PlanningCongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK.value(), planningCongeResponse.getStatusCodeValue());

		congeDTO.setAgent(agentResponse.getBody());
		congeDTO.setPlanningConge(planningCongeResponse.getBody());

		ResponseEntity<CongeDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/conges", congeDTO,
				CongeDTO.class);
		congeDTOSaved = postResponse.getBody();
		Assertions.assertEquals(HttpStatus.CREATED, postResponse.getStatusCode());
	}

	@DisplayName("Test de la méthode GET")
//	@Order(2)
	@Test
	final void testB() {
		ResponseEntity<CongeDTO> getResponse = restTemplate
				.getForEntity(getRootUrl() + "/conges/" + congeDTOSaved.getId(), CongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK, getResponse.getStatusCode());
	}

	@DisplayName("Test de la méthode GET")
//	@Order(3)
	@Test
	final void testC() {
		ResponseEntity<CongeDTO[]> getResponse = restTemplate.getForEntity(getRootUrl() + "/conges", CongeDTO[].class);
		Assertions.assertNotNull(getResponse);
		Assertions.assertEquals(HttpStatus.OK, getResponse.getStatusCode());
		Assertions.assertTrue(getResponse.getBody().length >= 1);
	}

	@DisplayName("Test de la méthode Update")
//	@Order(4)
	@Test
	public void testD() {
		ResponseEntity<CongeDTO> getResponse = restTemplate
				.getForEntity(getRootUrl() + "/conges/" + congeDTOSaved.getId(), CongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK, getResponse.getStatusCode());

		CongeDTO congeDTOToUpdate = getResponse.getBody();
		congeDTOToUpdate.setEtat("ANNULE");

		restTemplate.put(getRootUrl() + "/conges/", congeDTOToUpdate);

		CongeDTO updatedCongeDTO = restTemplate.getForObject(getRootUrl() + "/conges/" + congeDTOSaved.getId(),
				CongeDTO.class);
		assertNotNull(updatedCongeDTO);
		Assertions.assertEquals(congeDTOToUpdate.getEtat(), updatedCongeDTO.getEtat());
	}

	@Test
	@DisplayName("Test de la méthode Delete")
//	@Order(5)
	public void testE() {
		ResponseEntity<CongeDTO> getResponse = restTemplate
				.getForEntity(getRootUrl() + "/conges/" + congeDTOSaved.getId(), CongeDTO.class);
		Assertions.assertEquals(HttpStatus.OK, getResponse.getStatusCode());

		CongeDTO congeDTOToDelete = getResponse.getBody();

		HttpEntity<CongeDTO> requestEntity = new HttpEntity<CongeDTO>(congeDTOToDelete);
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/conges", HttpMethod.DELETE,
				requestEntity, Void.class);
		Assertions.assertNotNull(responseEntity);
		Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
