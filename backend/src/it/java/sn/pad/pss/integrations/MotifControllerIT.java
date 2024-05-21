package sn.pad.pss.integrations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.FixMethodOrder;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import sn.pad.pe.PEBackendApplication;
import sn.pad.pe.pss.dto.MotifDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MotifControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	private static MotifDTO motifDTO;
	private static MotifDTO motifDTOSaved;
	@LocalServerPort
	private int port = 8088;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		motifDTO = new MotifDTO();
		motifDTOSaved = new MotifDTO();
	}

//	@Order(1)
	@Test
	void testA() {
		motifDTO.setDescription("Description");
		ResponseEntity<MotifDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/motifs", motifDTO,
				MotifDTO.class);
		motifDTOSaved = postResponse.getBody();
		assertEquals(HttpStatus.OK, postResponse.getStatusCode());
	}

//	@Order(2)
	@Test
	void testB() {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<String> entity = new HttpEntity<String>(null, headers);
		ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/motifs", HttpMethod.GET, entity,
				String.class);
		assertTrue(response.getBody().length() >= 1);;
	}

//	@Order(3)
	@Test
	void testC() {
		ResponseEntity<MotifDTO> responseMotifDTO = restTemplate.getForEntity(getRootUrl() + "/motifs/"+ motifDTOSaved.getId(), MotifDTO.class);
		assertEquals(HttpStatus.OK, responseMotifDTO.getStatusCode());
	}

	@Order(4)
	@Test
	void testD() {
		MotifDTO motifDTOToUpdate = restTemplate.getForObject(getRootUrl() + "/motifs/" + motifDTOSaved.getId(), MotifDTO.class);
		motifDTO.setDescription("updated motif");
		
		HttpEntity<MotifDTO> requestEntity = new HttpEntity<MotifDTO>(motifDTOToUpdate);
		
		ResponseEntity<MotifDTO> responseEntity = restTemplate.exchange(getRootUrl() + "/motifs/",HttpMethod.PUT, requestEntity, MotifDTO.class);
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

//	@Order(5)
	@Test
	void testE() {
		MotifDTO motifDTO = restTemplate.getForObject(getRootUrl() + "/motifs/" + motifDTOSaved.getId(), MotifDTO.class);
		assertNotNull(motifDTO);
		HttpEntity<MotifDTO> requestEntity = new HttpEntity<MotifDTO>(motifDTO); // mappage de l'objet à supprimer
		ResponseEntity<MotifDTO> responseEntity = restTemplate.exchange(getRootUrl() + "/motifs/", HttpMethod.DELETE, requestEntity, MotifDTO.class);
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
