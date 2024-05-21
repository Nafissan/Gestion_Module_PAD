package sn.pad.pss.integrations;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.FixMethodOrder;
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
import sn.pad.pe.pss.bo.Absence;
import sn.pad.pe.pss.dto.AbsenceDTO;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.MotifDTO;
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class AbsenceControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port = 8088;

	private static AbsenceDTO absenceDto;
	private static AbsenceDTO absenceDtoSaved;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		absenceDto = new AbsenceDTO();
		absenceDtoSaved = new AbsenceDTO();
	}

//	@Order(1)
	@Test
	void testA() {
		ResponseEntity<PlanningAbsenceDTO> responsePA = restTemplate.getForEntity(
				getRootUrl() + "/planningabsences/109", PlanningAbsenceDTO.class);
		assertEquals(HttpStatus.OK.value(), responsePA.getStatusCodeValue());

		ResponseEntity<AgentDTO> responseAgent = restTemplate.exchange(
				getRootUrl() + "/agents/1", HttpMethod.GET, null,
				AgentDTO.class);
		assertEquals(HttpStatus.OK, responseAgent.getStatusCode());

		ResponseEntity<MotifDTO> responseMotifDTO = restTemplate
				.getForEntity(getRootUrl() + "/motifs/1", MotifDTO.class);
		assertEquals(HttpStatus.OK, responseMotifDTO.getStatusCode());

		ResponseEntity<UniteOrganisationnelleDTO> responseUnite = restTemplate.getForEntity(
				getRootUrl() + "/uniteOrganisationnelles/1",
				UniteOrganisationnelleDTO.class);
		assertEquals(HttpStatus.OK, responseUnite.getStatusCode());

		absenceDto.setCommentaire("BIEN");
		absenceDto.setMotif(responseMotifDTO.getBody());
		absenceDto.setAgent(responseAgent.getBody());
		absenceDto.setUniteOrganisationnelle(responseUnite.getBody());
		absenceDto.setPlanningAbsence(responsePA.getBody());

		ResponseEntity<AbsenceDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/absences", absenceDto,
				AbsenceDTO.class);
		absenceDtoSaved = postResponse.getBody();
		assertEquals(HttpStatus.OK, postResponse.getStatusCode());
	}

//	@Order(2)
	@Test
	void testB() {
		ResponseEntity<Absence[]> response = restTemplate.getForEntity(getRootUrl() + "/absences", Absence[].class);
		assertTrue(response.getBody().length >= 1);
	}

//	@Order(3)
	@Test
	void testC() {
		ResponseEntity<AbsenceDTO> response = restTemplate
				.getForEntity(getRootUrl() + "/absences/" + absenceDtoSaved.getId(), AbsenceDTO.class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

//	@Order(4)
	@Test
	void testD() {
		String commentaire = "VALIDE";
		AbsenceDTO absence = restTemplate.getForObject(getRootUrl() + "/absences/" + absenceDtoSaved.getId(),
				AbsenceDTO.class);

		absence.setCommentaire(commentaire);
		restTemplate.put(getRootUrl() + "/absences", absence);
		AbsenceDTO updatedAbsence = restTemplate.getForObject(getRootUrl() + "/absences/" + absenceDtoSaved.getId(),
				AbsenceDTO.class);
		assertEquals(commentaire, updatedAbsence.getCommentaire());
	}

//	@Order(5)
	@Test
	void testE() {
		ResponseEntity<AbsenceDTO> response = restTemplate.getForEntity(getRootUrl() + "/absences/" + absenceDtoSaved.getId(),
				AbsenceDTO.class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		HttpEntity<AbsenceDTO> requestEntity = new HttpEntity<AbsenceDTO>(response.getBody()); // mappage de l'objet à supprimer
		ResponseEntity<AbsenceDTO> responseEntity = restTemplate.exchange(getRootUrl() + "/absences/", HttpMethod.DELETE,
				requestEntity, AbsenceDTO.class);
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
