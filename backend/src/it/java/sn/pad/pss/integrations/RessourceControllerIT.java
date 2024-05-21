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
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import sn.pad.pe.PEBackendApplication;
import sn.pad.pe.pss.dto.RessourceDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class RessourceControllerIT {

	@Autowired
	private TestRestTemplate restTemplate;

	private static RessourceDTO ressourceDTO;
	private static RessourceDTO ressourceDTOSaved;
	@LocalServerPort
	private int port = 8088;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		ressourceDTO = new RessourceDTO();
		ressourceDTOSaved = new RessourceDTO();
	}
	
//	@Order(1)
	@Test
	void testA() {		
		ressourceDTO.setName("RESSOURCE");
		ressourceDTO.setNomRessource("RESSOURCE");
		
		ResponseEntity<RessourceDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/ressources", ressourceDTO,
				RessourceDTO.class);
		ressourceDTOSaved = postResponse.getBody();
		assertEquals(postResponse.getStatusCodeValue(), HttpStatus.CREATED.value());
	}

//	@Order(2)
	@Test
	void testB() {
		ResponseEntity<Object> responseEntity = restTemplate.exchange(getRootUrl() + "/ressources/"+ ressourceDTOSaved.getName(),
				HttpMethod.GET, null, Object.class);
		assertEquals(HttpStatus.FOUND.value(), responseEntity.getStatusCodeValue());
	}

//	@Order(3)
	@Test
	void testC() {
		RessourceDTO ressourceDTO = restTemplate.getForObject(getRootUrl() + "/ressources/" + ressourceDTOSaved.getName(), RessourceDTO.class);
		ressourceDTO.setNomRessource("COMPTEUPDATE");
		restTemplate.put(getRootUrl() + "/ressources", ressourceDTO);
		RessourceDTO updatedRessourceDTO = restTemplate.getForObject(getRootUrl() + "/ressources/" + ressourceDTOSaved.getName(),
				RessourceDTO.class);
		assertEquals(ressourceDTO.getName(), updatedRessourceDTO.getName());
	}

//	@Order(4)
	@Test
	void testD() {
		ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/ressources", HttpMethod.GET, null,
				String.class);
		assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
		assertTrue(response.getBody().length() >= 1);
	}

//	@Order(5)
	@Test
	void testE() {
		ResponseEntity<RessourceDTO> ressourceDTO = restTemplate.exchange(getRootUrl() + "/ressources/" + ressourceDTOSaved.getName(),
				HttpMethod.GET, null, RessourceDTO.class);
		assertEquals(HttpStatus.FOUND.value(), ressourceDTO.getStatusCodeValue());
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/ressources/", HttpMethod.DELETE,
				ressourceDTO, Void.class);
		assertEquals(responseEntity.getStatusCodeValue(), HttpStatus.OK.value());
	}

}
