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
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import sn.pad.pe.PEBackendApplication;
import sn.pad.pe.pss.dto.RoleDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class RoleControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	private static RoleDTO roleDto;
	private static RoleDTO roleDtoSaved;

	@LocalServerPort
	private int port = 8088;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		roleDto = new RoleDTO();
		roleDtoSaved = new RoleDTO();
	}

//	@Order(1)
	@Test
	void testA() {
		roleDto.setId(0L);
		roleDto.setNomRole("ROLE");

		ResponseEntity<RoleDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/roles", roleDto,
				RoleDTO.class);
		roleDtoSaved = postResponse.getBody();
		assertEquals(postResponse.getStatusCodeValue(), HttpStatus.CREATED.value());

	}

//	@Order(2)
	@Test
	void testB() {
		ResponseEntity<RoleDTO[]> response = restTemplate.exchange(getRootUrl() + "/roles", HttpMethod.GET, null,
				RoleDTO[].class);
		assertNotNull(response.getBody());
		assertEquals(response.getStatusCodeValue(), HttpStatus.OK.value());
		assertTrue(response.getBody().length >= 1);
	}

//	@Order(3)
	@Test
	void testC() {
		ResponseEntity<Object> responseEntity = restTemplate.exchange(getRootUrl() + "/roles/" + roleDtoSaved.getId(),
				HttpMethod.GET, null, Object.class);
		assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
	}

//	@Order(4)
	@Test
	void testD() {
		RoleDTO role = restTemplate.getForObject(getRootUrl() + "/roles/" + roleDtoSaved.getId(), RoleDTO.class);
		role.setNomRole("RoleDTO updated");
		restTemplate.put(getRootUrl() + "/roles", role);
		RoleDTO updatedRole = restTemplate.getForObject(getRootUrl() + "/roles/" + roleDtoSaved.getId(), RoleDTO.class);
		assertEquals(role.getNomRole(), updatedRole.getNomRole());
	}

//	@Order(5)
	@Test
	void testE() {
		ResponseEntity<RoleDTO> roleResponse = restTemplate
				.getForEntity(getRootUrl() + "/roles/" + roleDtoSaved.getId(), RoleDTO.class);
		assertEquals(HttpStatus.OK.value(), roleResponse.getStatusCodeValue());
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/roles/", HttpMethod.DELETE,
				roleResponse, Void.class);
		assertEquals(responseEntity.getStatusCodeValue(), HttpStatus.OK.value());
	}

}
