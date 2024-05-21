package sn.pad.pss.integrations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
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
import sn.pad.pe.pss.dto.AttestationDTO;
import sn.pad.pe.pss.dto.EtapeAttestationDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EtapeAttestationControllerIT {

	@Autowired
	private TestRestTemplate restTemplate;

	private static EtapeAttestationDTO etapeAttestationDTO;
	private static EtapeAttestationDTO etapeAttestationDTOSaved;

	@LocalServerPort
	private int port = 8088;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		etapeAttestationDTO = new EtapeAttestationDTO();
		etapeAttestationDTOSaved = new EtapeAttestationDTO();
	}

//	@Order(1)
	@Test
	void testA() {
		ResponseEntity<AttestationDTO> responseAttestation = restTemplate.exchange(getRootUrl() + "/attestations/51",
				HttpMethod.GET, null, AttestationDTO.class);
		assertEquals(responseAttestation.getStatusCode(), HttpStatus.OK);

		etapeAttestationDTO.setId(0L);
		etapeAttestationDTO.setCommentaire("etape 2");
		etapeAttestationDTO.setTitre("titre 2");
		etapeAttestationDTO.setAttestation(responseAttestation.getBody());

		ResponseEntity<EtapeAttestationDTO> postResponse = restTemplate
				.postForEntity(getRootUrl() + "/etapeAttestations", etapeAttestationDTO, EtapeAttestationDTO.class);
		etapeAttestationDTOSaved = postResponse.getBody();
		assertEquals(postResponse.getStatusCodeValue(), HttpStatus.CREATED.value());
	}

//	@Order(2)
	@Test
	void testB() {
		EtapeAttestationDTO etapeAttestationDTOFound = restTemplate.getForObject(getRootUrl() + "/etapeAttestations/1",
				EtapeAttestationDTO.class);
		System.out.println(etapeAttestationDTOFound.getCommentaire());
		assertNotNull(etapeAttestationDTOFound);
	}

//	@Order(4)
	@Test
	void testD() {
		ResponseEntity<EtapeAttestationDTO[]> response = restTemplate.exchange(getRootUrl() + "/etapeAttestations",
				HttpMethod.GET, null, EtapeAttestationDTO[].class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertTrue(response.getBody().length >= 1);
	}

//	@Order(3)
	@Test
	void testC() {
		EtapeAttestationDTO etapeAttestationDTO = restTemplate.getForObject(
				getRootUrl() + "/etapeAttestations/" + etapeAttestationDTOSaved.getId(), EtapeAttestationDTO.class);
		etapeAttestationDTO.setCommentaire("updated attestation");

		restTemplate.put(getRootUrl() + "/etapeAttestations/", etapeAttestationDTO);
		
		ResponseEntity<EtapeAttestationDTO> responseEntity = restTemplate.getForEntity(
				getRootUrl() + "/etapeAttestations/" + etapeAttestationDTOSaved.getId(), EtapeAttestationDTO.class);

		EtapeAttestationDTO etapeUpdated = responseEntity.getBody();
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(etapeAttestationDTO.getCommentaire(), etapeUpdated.getCommentaire());
		assertNotNull(etapeAttestationDTO.getCommentaire());
	}

//	@Order(5)
	@Test
	void testE() {
		EtapeAttestationDTO etapeAttestationDTO = restTemplate.getForObject(
				getRootUrl() + "/etapeAttestations/" + etapeAttestationDTOSaved.getId(), EtapeAttestationDTO.class);
		assertNotNull(etapeAttestationDTO);
		HttpEntity<EtapeAttestationDTO> requestEntity = new HttpEntity<EtapeAttestationDTO>(etapeAttestationDTO); // l'obj
																													// //
																													// //
																													// supprimer
		ResponseEntity<EtapeAttestationDTO> response = restTemplate.exchange(getRootUrl() + "/etapeAttestations/",
				HttpMethod.DELETE, requestEntity, EtapeAttestationDTO.class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

}
