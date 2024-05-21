
package sn.pad.pe.partenariat.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.partenariat.dto.SuiviProspectDTO;
import sn.pad.pe.partenariat.services.SuiviProspectService;

@RestController
@RequestMapping("/suiviprospects")
public class SuiviProspectController {

	@Autowired
	private SuiviProspectService suiviprospectService;
	Message message;

	@GetMapping
	public ResponseEntity<?> getSuiviProspects() {
		List<SuiviProspectDTO> suiviprospectDTOs = suiviprospectService.getSuiviProspects();
		return new ResponseEntity<List<SuiviProspectDTO>>(suiviprospectDTOs, HttpStatus.OK);
	}
	
	@GetMapping("/prospect/{id}")
	public ResponseEntity<?> getSuiviByProspectId(@PathVariable(value = "id") long id) {
		List<SuiviProspectDTO> suivisDtos = suiviprospectService.getSuiviByProspectId(id);
		return new ResponseEntity<>(suivisDtos, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody SuiviProspectDTO suiviprospectDto) {
		return new ResponseEntity<SuiviProspectDTO>(suiviprospectService.create(suiviprospectDto), HttpStatus.CREATED);
	}

	@PostMapping("/all")
	public ResponseEntity<?> create(@RequestBody List<SuiviProspectDTO> prospectDtos) {
		return new ResponseEntity<>(suiviprospectService.createMultiple(prospectDtos), HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody SuiviProspectDTO suiviprospectUpdated) {
		if (suiviprospectService.update(suiviprospectUpdated)) {
			message = new Message(new Date(), "SuiviProspectDTO with id " + suiviprospectUpdated.getId() + " updated.",
					"uri=/suiviprospects/" + suiviprospectUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "SuiviProspectDTO with id " + suiviprospectUpdated.getId() + " not found.",
				"uri=/suiviprospects/" + suiviprospectUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping
	public ResponseEntity<?> delete(@RequestBody SuiviProspectDTO suiviprospectDeleted) {
		if (suiviprospectService.delete(suiviprospectDeleted)) {
			message = new Message(new Date(), "SuiviProspectDTO with id " + suiviprospectDeleted.getId() + " deleted.",
					"uri=/suiviprospects/" + suiviprospectDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "SuiviProspectDTO with id " + suiviprospectDeleted.getId() + " not found.",
				"uri=/suiviprospects/" + suiviprospectDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
