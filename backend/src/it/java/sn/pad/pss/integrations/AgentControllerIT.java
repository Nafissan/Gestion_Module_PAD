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
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.FonctionDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

@SpringBootTest(classes = PEBackendApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class AgentControllerIT {
	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port = 8088;

	private static AgentDTO agentDto;
	private static AgentDTO agentDtoSaved;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		agentDto = new AgentDTO();
		agentDtoSaved = new AgentDTO();
	}
	
//	@Order(1)
	@Test
	void testA() {
		UniteOrganisationnelleDTO uniDto = restTemplate.getForObject(
				getRootUrl() + "/uniteOrganisationnelles/1",
				UniteOrganisationnelleDTO.class);
		assertNotNull(uniDto);
		
		FonctionDTO fonDto = restTemplate.getForObject(
				getRootUrl() + "/fonctions/1",
				FonctionDTO.class);
		assertNotNull(fonDto);
		
		agentDto.setId(0L);
		agentDto.setMatricule("321");
		agentDto.setEmail("seydou@gmail.com");
		agentDto.setFonction(fonDto);
		agentDto.setUniteOrganisationnelle(uniDto);
		ResponseEntity<AgentDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/agents", agentDto,
				AgentDTO.class);
		assertNotNull(postResponse);
		agentDtoSaved = postResponse.getBody();
		assertEquals(HttpStatus.OK, postResponse.getStatusCode());
	}
	
//	@Order(2)
	@Test
	void testB() {
		ResponseEntity<Object> responseEntity = restTemplate.exchange(getRootUrl() + "/agents/" + agentDtoSaved.getId(),
				HttpMethod.GET, null, Object.class);
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		
	}
	
//	@Order(3)
	@Test
	void testC() {
		String mail = "diokhane@gmail.com";
		AgentDTO agent = restTemplate.getForObject(getRootUrl() + "/agents/" + agentDtoSaved.getId(), AgentDTO.class);
		agent.setEmail("diokhane@gmail.com");
		restTemplate.put(getRootUrl() + "/agents", agent);
		AgentDTO updatedAgent = restTemplate.getForObject(getRootUrl() + "/agents/" + agentDtoSaved.getId(),
				AgentDTO.class);
		assertEquals(mail, updatedAgent.getEmail());
		assertNotNull(updatedAgent);
	}
	
//	@Order(4)
	@Test
	void testD() {
		ResponseEntity<AgentDTO[]> response = restTemplate.getForEntity(getRootUrl() + "/agents", AgentDTO[].class);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

//	@Order(5)
	@Test
	void testE() {
		AgentDTO agent = restTemplate.getForObject(getRootUrl() + "/agents/" + agentDtoSaved.getId(), AgentDTO.class);
		assertNotNull(agent);
		HttpEntity<AgentDTO> requestEntity = new HttpEntity<AgentDTO>(agent); // mappage de l'objet à supprimer
		ResponseEntity<Void> responseEntity = restTemplate.exchange(getRootUrl() + "/agents/", HttpMethod.DELETE,
				requestEntity, Void.class);
		assertEquals(responseEntity.getStatusCodeValue(), HttpStatus.OK.value());
	}

}
