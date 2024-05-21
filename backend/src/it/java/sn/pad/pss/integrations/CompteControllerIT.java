package sn.pad.pss.integrations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.HashSet;
import java.util.Set;

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
import sn.pad.pe.pss.dto.CompteDTO;
import sn.pad.pe.pss.dto.RoleDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class CompteControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	private static CompteDTO compteDto;
	private static CompteDTO compteDtoSaved;

	@LocalServerPort
	private int port = 8088;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		compteDto = new CompteDTO();
		compteDtoSaved = new CompteDTO();
	}

//	@Order(1)
	@Test
	void testA() {
		ResponseEntity<AgentDTO> responseEntityAgent = restTemplate
				.getForEntity(getRootUrl() + "/agents/1" , AgentDTO.class);
		assertEquals(HttpStatus.OK, responseEntityAgent.getStatusCode());
		
		ResponseEntity<RoleDTO> responseEntityRole = restTemplate.exchange(getRootUrl() + "/roles/1",
				HttpMethod.GET, null, RoleDTO.class);
		assertEquals(responseEntityRole.getStatusCode(), HttpStatus.OK);
		
		Set<RoleDTO> roleDTOs = new HashSet<RoleDTO>();
		roleDTOs.add(responseEntityRole.getBody());
		
		compteDto.setId(0L);
		compteDto.setUsername("fall@gmail.com");
		compteDto.setPassword("1234");
		compteDto.setAgent(responseEntityAgent.getBody());
		compteDto.setRoles(roleDTOs);
		
		ResponseEntity<CompteDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/comptes", compteDto,
				CompteDTO.class);
		compteDtoSaved = postResponse.getBody();
		assertEquals(postResponse.getStatusCodeValue(), HttpStatus.CREATED.value());
	}

//	@Order(2)
	@Test
	void testB() {
		ResponseEntity<CompteDTO> postReponse = restTemplate
				.getForEntity(getRootUrl() + "/comptes/" + compteDtoSaved.getId(), CompteDTO.class);
		assertEquals(postReponse.getStatusCodeValue(), HttpStatus.OK.value());
	}

//	@Order(3)
	@Test
	void testC() {
		CompteDTO compteDtoToUpdate = restTemplate.getForObject(getRootUrl() + "/comptes/" + compteDtoSaved.getId(),
				CompteDTO.class);
		compteDtoToUpdate.setUsername("ndoye1@gmail.com");
		restTemplate.put(getRootUrl() + "/comptes", compteDtoToUpdate);
		CompteDTO updatedCompteDTO = restTemplate.getForObject(getRootUrl() + "/comptes/" + compteDtoSaved.getId(),
				CompteDTO.class);
		assertEquals(compteDtoToUpdate.getUsername(), updatedCompteDTO.getUsername());
	}

//	@Order(4)
	@Test
	void testD() {
		ResponseEntity<CompteDTO[]> response = restTemplate.getForEntity(getRootUrl() + "/comptes", CompteDTO[].class);
		assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
		assertNotNull(response.getBody());
		assertEquals(response.getStatusCodeValue(), HttpStatus.OK.value());
		assertTrue(response.getBody().length >= 1);
	}

//	@Order(5)
	@Test
	void testE() {
		CompteDTO compteDto = restTemplate.getForObject(getRootUrl() + "/comptes/" + compteDtoSaved.getId(),
				CompteDTO.class);
		assertNotNull(compteDto);
		HttpEntity<CompteDTO> requestEntity = new HttpEntity<CompteDTO>(compteDto); // mappage de l'objet à supprimer
		ResponseEntity<CompteDTO> responseEntity = restTemplate.exchange(getRootUrl() + "/comptes/", HttpMethod.DELETE,
				requestEntity, CompteDTO.class);
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}