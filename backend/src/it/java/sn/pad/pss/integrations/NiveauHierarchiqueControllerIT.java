package sn.pad.pss.integrations;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
import sn.pad.pe.pss.dto.NiveauHierarchiqueDTO;

/**
 * 
 * @author adama.thiaw
 *
 */

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class NiveauHierarchiqueControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	private static NiveauHierarchiqueDTO niveauHierarchiqueDTO;
	private static NiveauHierarchiqueDTO niveauHierarchiqueDTOSaved;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		niveauHierarchiqueDTO = new NiveauHierarchiqueDTO();
		niveauHierarchiqueDTOSaved = new NiveauHierarchiqueDTO();
	}

	@DisplayName("Test de la méthode Create")
//	@Order(1)
	@Test
	void testA() {
		niveauHierarchiqueDTO.setId(0L);
		niveauHierarchiqueDTO.setLibelle("Niveau ");
		niveauHierarchiqueDTO.setPosition(15);
		ResponseEntity<NiveauHierarchiqueDTO> postResponse = restTemplate.postForEntity(
				getRootUrl() + "/niveauxHierarchiques", niveauHierarchiqueDTO, NiveauHierarchiqueDTO.class);
		niveauHierarchiqueDTOSaved = postResponse.getBody();
		assertEquals(HttpStatus.CREATED, postResponse.getStatusCode());
	}

	@DisplayName("Test de la méthode GET by Id")
//	@Order(2)
	@Test
	void testB() {
		ResponseEntity<NiveauHierarchiqueDTO> response = restTemplate.getForEntity(
				getRootUrl() + "/niveauxHierarchiques/" + niveauHierarchiqueDTOSaved.getId(),
				NiveauHierarchiqueDTO.class);
		Assertions.assertNotNull(response);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Test de la méthode GET ALL")
//	@Order(3)
	@Test
	void testC() {
		ResponseEntity<NiveauHierarchiqueDTO[]> response = restTemplate.getForEntity(getRootUrl() + "/niveauxHierarchiques",
				NiveauHierarchiqueDTO[].class);
		Assertions.assertNotNull(response.getBody());

		Assertions.assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
		Assertions.assertTrue(response.getBody().length >= 1);
	}

	@DisplayName("Test de la méthode Update")
//	@Order(4)
	@Disabled
	@Test
	void testD() {
		ResponseEntity<NiveauHierarchiqueDTO> response = restTemplate.getForEntity(
				getRootUrl() + "/niveauxHierarchiques/" + niveauHierarchiqueDTOSaved.getId(),
				NiveauHierarchiqueDTO.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
		NiveauHierarchiqueDTO dtoToUpdate = response.getBody();
		
		dtoToUpdate.setLibelle("Niveaux1Plus");

		restTemplate.put(getRootUrl() + "/niveauxHierarchiques/", dtoToUpdate);

		NiveauHierarchiqueDTO niveauHierDTOupdated = restTemplate.getForObject(getRootUrl() + "/niveauxHierarchiques/" + dtoToUpdate.getId(),
				NiveauHierarchiqueDTO.class);

		Assertions.assertEquals(dtoToUpdate.getLibelle(), niveauHierDTOupdated.getLibelle());
	}

	@Test
	@DisplayName("Test de la méthode Delete")
//	@Order(5)
	void testE() {
		NiveauHierarchiqueDTO niveauHierarchiqueDTO = restTemplate
				.getForObject(getRootUrl() + "/niveauxHierarchiques/"+ niveauHierarchiqueDTOSaved.getId() , NiveauHierarchiqueDTO.class);

		HttpEntity<NiveauHierarchiqueDTO> requestEntity = new HttpEntity<NiveauHierarchiqueDTO>(niveauHierarchiqueDTO);
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/niveauxHierarchiques",
				HttpMethod.DELETE, requestEntity, Void.class);
		Assertions.assertNotNull(responseEntity);
		Assertions.assertEquals(HttpStatus.OK.value(), responseEntity.getStatusCodeValue());
	}

}
