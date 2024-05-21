package sn.pad.pss.integrations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

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
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.AttestationDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class AttestationControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	private static AttestationDTO attestationDTO;
	private static AttestationDTO attestationDTOSaved;
	@LocalServerPort
	private int port = 8088;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		attestationDTO = new AttestationDTO();
		attestationDTOSaved = new AttestationDTO();
	}

//	@Order(1)
	@Test
	void testA() {
		ResponseEntity<AgentDTO> responseAgent = restTemplate.exchange(getRootUrl() + "/agents/1", HttpMethod.GET, null,
				AgentDTO.class);
		assertEquals(HttpStatus.OK, responseAgent.getStatusCode());

		ResponseEntity<UniteOrganisationnelleDTO> responseUnite = restTemplate
				.getForEntity(getRootUrl() + "/uniteOrganisationnelles/1", UniteOrganisationnelleDTO.class);
		assertEquals(HttpStatus.OK, responseUnite.getStatusCode());

		attestationDTO.setId(0L);
		attestationDTO.setCommentaire("comment 1");
		attestationDTO.setAgent(responseAgent.getBody());
		attestationDTO.setUniteOrganisationnelle(responseUnite.getBody());

		ResponseEntity<AttestationDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/attestations",
				attestationDTO, AttestationDTO.class);
		attestationDTOSaved = postResponse.getBody();
		assertEquals(postResponse.getStatusCodeValue(), HttpStatus.CREATED.value());
	}

//	@Order(2)
	@Test
	void testB() {
		ResponseEntity<AttestationDTO[]> response = restTemplate.exchange(getRootUrl() + "/attestations",
				HttpMethod.GET, null, AttestationDTO[].class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertTrue(response.getBody().length >= 1);
	}

//	@Order(3)
	@Test
	void testC() {
		ResponseEntity<Object> responseEntity = restTemplate.exchange(
				getRootUrl() + "/attestations/" + attestationDTOSaved.getId(), HttpMethod.GET, null, Object.class);
		assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
	}

//	@Order(4)
	@Test
	void testD() {
		AttestationDTO attestationDTO = restTemplate
				.getForObject(getRootUrl() + "/attestations/" + attestationDTOSaved.getId(), AttestationDTO.class);
		attestationDTO.setCommentaire("updated attestation");
		restTemplate.put(getRootUrl() + "/attestations/", attestationDTO);
		AttestationDTO updatedAttestation = restTemplate
				.getForObject(getRootUrl() + "/attestations/" + attestationDTOSaved.getId(), AttestationDTO.class);
		assertEquals(attestationDTO.getCommentaire(), updatedAttestation.getCommentaire());
	}

//	@Order(5)
	@Test
	void testE() {
		ResponseEntity<AttestationDTO> response = restTemplate
				.getForEntity(getRootUrl() + "/attestations/" + attestationDTOSaved.getId(), AttestationDTO.class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		HttpEntity<AttestationDTO> requestEntity = new HttpEntity<AttestationDTO>(response.getBody()); // mappage de l'objet
																									// à supprimer
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/attestations/", HttpMethod.DELETE,
				requestEntity, Void.class);
		assertEquals(responseEntity.getStatusCodeValue(), 200);
	}

}
