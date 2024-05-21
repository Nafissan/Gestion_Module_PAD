package sn.pad.pss.integrations;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

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
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

/**
 * 
 * @author diop.modou
 *
 */

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PlanningAbsennceControllerIT {

	@Autowired
	private TestRestTemplate restTemplate;
	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	private static PlanningAbsenceDTO planningAbsenceDTO;
	private static PlanningAbsenceDTO planningAbsenceDTOSaved;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		planningAbsenceDTO = new PlanningAbsenceDTO();
		planningAbsenceDTOSaved = new PlanningAbsenceDTO();

	}

	@DisplayName("Test de la méthode Create")
//	@Order(1)
	@Test
	final void testA() {
		ResponseEntity<UniteOrganisationnelleDTO> responseUniDto = restTemplate.getForEntity(
				getRootUrl() + "/uniteOrganisationnelles/1",
				UniteOrganisationnelleDTO.class);
		assertEquals(HttpStatus.OK, responseUniDto.getStatusCode());

		ResponseEntity<DossierAbsenceDTO> responseDA = restTemplate.getForEntity(
				getRootUrl() + "/dossierabsences/106", DossierAbsenceDTO.class);
		assertEquals(HttpStatus.OK.value(), responseDA.getStatusCodeValue());
		
		planningAbsenceDTO.setId(0L);
		planningAbsenceDTO.setUniteOrganisationnelle(responseUniDto.getBody());
		planningAbsenceDTO.setDossierAbsence(responseDA.getBody());

		ResponseEntity<PlanningAbsenceDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/planningabsences",
				planningAbsenceDTO, PlanningAbsenceDTO.class);
		planningAbsenceDTOSaved = postResponse.getBody();

		assertEquals(HttpStatus.CREATED.value(), postResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET By ID")
//	@Order(2)
	@Test
	final void testB() {
		ResponseEntity<PlanningAbsenceDTO> planningCongeResponse = restTemplate.getForEntity(
				getRootUrl() + "/planningabsences/" + planningAbsenceDTOSaved.getId(), PlanningAbsenceDTO.class);
		assertEquals(HttpStatus.OK.value(), planningCongeResponse.getStatusCodeValue());
	}

	@DisplayName("Test de la méthode GET All")
//	@Order(3)
	@Test
	final void testC() {

		ResponseEntity<PlanningAbsenceDTO[]> getResponse = restTemplate.getForEntity(getRootUrl() + "/planningabsences",
				PlanningAbsenceDTO[].class);
		assertTrue(getResponse.getBody().length >= 1);
	}

	@DisplayName("Test de la méthode Update")
//	@Order(4)
	@Test
	public void testD() {
		PlanningAbsenceDTO planningCongeDTO = restTemplate.getForObject(getRootUrl() + "/planningabsences/"+ planningAbsenceDTOSaved.getId(),
				PlanningAbsenceDTO.class);
		Assertions.assertNotNull(planningCongeDTO);
		planningCongeDTO.setEtat("VALIDE");

		restTemplate.put(getRootUrl() + "/planningabsences", planningCongeDTO);
		PlanningAbsenceDTO planningCongeUpdated = restTemplate.getForObject(getRootUrl() + "/planningabsences/"+ planningAbsenceDTOSaved.getId(),
				PlanningAbsenceDTO.class);
		assertEquals("VALIDE", planningCongeUpdated.getEtat());
	}

	@Test
	@DisplayName("Test de la méthode Delete")
//	@Order(5)
	public void testE() {

		PlanningAbsenceDTO planningCongeDTO = restTemplate.getForObject(getRootUrl() + "/planningabsences/"+ planningAbsenceDTOSaved.getId(),
				PlanningAbsenceDTO.class);

		HttpEntity<PlanningAbsenceDTO> requestEntity = new HttpEntity<PlanningAbsenceDTO>(planningCongeDTO);
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/planningabsences",
				HttpMethod.DELETE, requestEntity, Void.class);
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
