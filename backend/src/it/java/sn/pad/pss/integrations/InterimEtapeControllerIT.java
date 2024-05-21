package sn.pad.pss.integrations;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.FixMethodOrder;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
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
import sn.pad.pe.pss.bo.EtapeInterim;
import sn.pad.pe.pss.dto.EtapeInterimDTO;
import sn.pad.pe.pss.dto.InterimDTO;


 
@SpringBootTest(classes = PEBackendApplication.class, 
webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@TestMethodOrder(OrderAnnotation.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class InterimEtapeControllerIT {
	@Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port=8088;

	private static EtapeInterimDTO etapeInterimDTOSaved;

    private static EtapeInterimDTO etapeInterimDTO;
    
    private String getRootUrl() {
        return "http://localhost:" + port;
    }
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		etapeInterimDTO = new EtapeInterimDTO();
	}
	
//    @Order(4)
	@DisplayName("Test methode liste etapeInterims")
	@Test
	void testD() throws Exception {
    	
		HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);
        ResponseEntity<Object> response = restTemplate.exchange(getRootUrl() + "/etapeInterims",
        HttpMethod.GET, entity, Object.class); 
        
		assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
        assertNotNull(response.getBody());
	}
    
//    @Order(2)
	@DisplayName("Test methode find etapeInterims By Id")
	@Test
	void testB() {
		ResponseEntity<EtapeInterim> responseEntity = restTemplate.exchange(getRootUrl() +"/etapeInterims/"+etapeInterimDTOSaved.getId(), HttpMethod.GET,
				null, EtapeInterim.class);
		assertEquals(HttpStatus.OK.value(), responseEntity.getStatusCodeValue());
	}
    
//    @Order(1)
	@DisplayName("Test methode creer  etapeInterim")
	@Test
	void testA() {
		ResponseEntity<InterimDTO> response = restTemplate
				.getForEntity(getRootUrl() + "/interims/208", InterimDTO.class);
        
        etapeInterimDTO.setInterim(response.getBody());
        etapeInterimDTO.setCommentaire("Demande d'interim urgente!");
        etapeInterimDTO.setInterim(response.getBody());
        
		ResponseEntity<EtapeInterimDTO> postResponse = restTemplate.postForEntity(getRootUrl() + "/etapeInterims", etapeInterimDTO,
				EtapeInterimDTO.class);
		
		etapeInterimDTOSaved = postResponse.getBody();
		
		assertEquals(HttpStatus.CREATED, postResponse.getStatusCode());
	}
    
//    @Order(3)
	@DisplayName("Test methode update interim")
	@Test
	void testC() throws Exception {
		etapeInterimDTOSaved.setCommentaire("transmettre");
        restTemplate.put(getRootUrl() + "/etapeInterims", etapeInterimDTOSaved);
        EtapeInterimDTO updatedInterim = restTemplate.getForObject(getRootUrl() + "/etapeInterims/"+etapeInterimDTOSaved.getId(), EtapeInterimDTO.class);
        assertEquals(etapeInterimDTOSaved.getCommentaire(), updatedInterim.getCommentaire());
	}
    
//    @Order(5)
	@DisplayName("Test methode delete interim")
	@Test
	void testE() throws Exception {
		etapeInterimDTO = restTemplate.getForObject(getRootUrl() + "/etapeInterims/" + etapeInterimDTOSaved.getId(), EtapeInterimDTO.class);
        assertNotNull(etapeInterimDTO);   
        HttpEntity<EtapeInterimDTO> requestEntity = new HttpEntity<EtapeInterimDTO> (etapeInterimDTO); // mappage de l'objet à supprimer
        ResponseEntity<Void> responseEntity= restTemplate.exchange(getRootUrl() + "/etapeInterims/", HttpMethod.DELETE, requestEntity, Void.class);
		assertEquals(responseEntity.getStatusCodeValue(), HttpStatus.OK.value());
	}
	
}
