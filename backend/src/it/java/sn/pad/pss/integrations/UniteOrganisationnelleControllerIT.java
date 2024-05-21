package sn.pad.pss.integrations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

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
import sn.pad.pe.pss.dto.NiveauHierarchiqueDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;


@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UniteOrganisationnelleControllerIT {

	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port = 8088;

	private static UniteOrganisationnelleDTO uniteOrganisationnelleDTO;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDTOSaved;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		uniteOrganisationnelleDTO = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDTOSaved = new UniteOrganisationnelleDTO();
	}

//	@Order(1)
	@Test
	void testA() {
//		System.out.println("-----------DEBUT TEST CREATE-----------");
//		
		ResponseEntity<NiveauHierarchiqueDTO> response = restTemplate.getForEntity(
				getRootUrl() + "/niveauxHierarchiques/1",
				NiveauHierarchiqueDTO.class);
		assertEquals(HttpStatus.OK, response.getStatusCode());

//		uniteOrganisationnelleDTO.setId(0L);
		uniteOrganisationnelleDTO.setCode("UNITE");
		uniteOrganisationnelleDTO.setNiveauHierarchique(response.getBody());

		ResponseEntity<UniteOrganisationnelleDTO> postResponse = restTemplate.postForEntity(
				getRootUrl() + "/uniteOrganisationnelles", uniteOrganisationnelleDTO, UniteOrganisationnelleDTO.class);
		assertNotNull(postResponse);
		uniteOrganisationnelleDTOSaved = postResponse.getBody();
		assertEquals(HttpStatus.OK, postResponse.getStatusCode());
		System.out.println("Critique testCreate : "+response.getBody().toString());
//		
//		System.out.println("-----------FIN TEST CREATE-----------");
	}

//	@Order(2)
	@Test
	void testB() {
		ResponseEntity<UniteOrganisationnelleDTO[]> response = restTemplate
				.getForEntity(getRootUrl() + "/uniteOrganisationnelles", UniteOrganisationnelleDTO[].class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

//	@Order(3)
	@Test
	void testC() {
		System.out.println("-----------DEBUT TEST GET ID-----------");
		
		ResponseEntity<UniteOrganisationnelleDTO> response = restTemplate.getForEntity(
				getRootUrl() + "/uniteOrganisationnelles/"+uniteOrganisationnelleDTOSaved.getId(),
				UniteOrganisationnelleDTO.class);
		System.out.println("Critique testGetUniteOrganisationnelleById : "+response.toString());
		
		System.out.println("-----------FIN TEST GET ID-----------");
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

//	@Order(4)
	@Test
	void testD() {
		System.out.println("-----------DEBUT TEST UPDATE-----------");
		ResponseEntity<UniteOrganisationnelleDTO> responseUniteToUpdate = restTemplate.getForEntity(
				getRootUrl() + "/uniteOrganisationnelles/"+uniteOrganisationnelleDTOSaved.getId(),
				UniteOrganisationnelleDTO.class);
		System.out.println("-----------FIN TEST UPDATE-----------=>" + responseUniteToUpdate.toString());
		assertEquals(HttpStatus.OK, responseUniteToUpdate.getStatusCode());
		
		UniteOrganisationnelleDTO uniteToUpdate = responseUniteToUpdate.getBody();
		String code = "Unite Updated";
		uniteToUpdate.setCode(code);
		HttpEntity<UniteOrganisationnelleDTO> requestEntity = new HttpEntity<UniteOrganisationnelleDTO>(
				uniteToUpdate);

		restTemplate.exchange(getRootUrl() + "/uniteOrganisationnelles/", HttpMethod.PUT, requestEntity, Void.class);
		ResponseEntity<UniteOrganisationnelleDTO> response = restTemplate.getForEntity(
				getRootUrl() + "/uniteOrganisationnelles/" + uniteOrganisationnelleDTOSaved.getId(),
				UniteOrganisationnelleDTO.class);

		System.out.println("-----------FIN TEST UPDATE-----------=>" + response.toString());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(code, response.getBody().getCode());
	}

	
	@Test
//	@Order(5)
	void testE() {
		System.out.println("-----------DEBUT TEST DELETE-----------");
		UniteOrganisationnelleDTO dto = restTemplate.getForObject(
				getRootUrl() + "/uniteOrganisationnelles/" + uniteOrganisationnelleDTOSaved.getId(),
				UniteOrganisationnelleDTO.class);

		HttpEntity<UniteOrganisationnelleDTO> requestEntity = new HttpEntity<UniteOrganisationnelleDTO>(dto);
		
		ResponseEntity<UniteOrganisationnelleDTO> response = restTemplate.exchange(
				getRootUrl() + "/uniteOrganisationnelles/", HttpMethod.DELETE, requestEntity,
				UniteOrganisationnelleDTO.class);

		System.out.println("-----------FIN TEST DELETE-----------");
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

}
