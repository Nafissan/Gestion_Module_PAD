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
import sn.pad.pe.pss.dto.PrivilegeDTO;
import sn.pad.pe.pss.dto.RessourceDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PrivilegeControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	private static PrivilegeDTO privilegeDto;
	private static PrivilegeDTO privilegeDtoSaved;
	@LocalServerPort
	private int port = 8088;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		privilegeDto = new PrivilegeDTO();
		privilegeDtoSaved = new PrivilegeDTO();
	}

	@Test
//	@Order(1)
	void testA() {
		ResponseEntity<RessourceDTO> responseRessource = restTemplate.exchange(getRootUrl() + "/ressources/MENU",
				HttpMethod.GET, null, RessourceDTO.class);
		assertEquals(HttpStatus.FOUND.value(), responseRessource.getStatusCodeValue());

		privilegeDto.setNom("PRIVILEGE");
		privilegeDto.setRessource(responseRessource.getBody());
		ResponseEntity<PrivilegeDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/privileges",
				privilegeDto, PrivilegeDTO.class);
		privilegeDtoSaved = postResponse.getBody();
		assertEquals(postResponse.getStatusCodeValue(), HttpStatus.CREATED.value());
	}

	@Test
//	@Order(2)
	void testB() {
		ResponseEntity<Object> responseEntity = restTemplate.exchange(getRootUrl() + "/privileges/"+privilegeDtoSaved.getNom(),
				HttpMethod.GET, null, Object.class);
		assertEquals(HttpStatus.FOUND.value(), responseEntity.getStatusCodeValue());
	}

	@Test
//	@Order(3)
	void testC() {
		PrivilegeDTO privillegeDTO = restTemplate
				.getForObject(getRootUrl() + "/privileges/" + privilegeDtoSaved.getNom(), PrivilegeDTO.class);
		privillegeDTO.setDescription("modif");
		restTemplate.put(getRootUrl() + "/privileges", privillegeDTO);
		PrivilegeDTO updatedPrivillegeDTO = restTemplate
				.getForObject(getRootUrl() + "/privileges/" + privilegeDtoSaved.getNom(), PrivilegeDTO.class);
		assertEquals(privillegeDTO.getNom(), updatedPrivillegeDTO.getNom());
	}

	@Test
//	@Order(4)
	void testD() {
		ResponseEntity<PrivilegeDTO[]> response = restTemplate.exchange(getRootUrl() + "/privileges", HttpMethod.GET,
				null, PrivilegeDTO[].class);
		assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
		assertTrue(response.getBody().length >= 1);
	}

	@Test
//	@Order(5)
	void testE() {
		ResponseEntity<PrivilegeDTO> privilege = restTemplate.exchange(
				getRootUrl() + "/privileges/" + privilegeDtoSaved.getNom(), HttpMethod.GET, null, PrivilegeDTO.class);
		assertEquals(HttpStatus.FOUND.value(), privilege.getStatusCodeValue());
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/privileges/", HttpMethod.DELETE,
				privilege, Void.class);
		assertEquals(responseEntity.getStatusCodeValue(), HttpStatus.OK.value());
	}

}
