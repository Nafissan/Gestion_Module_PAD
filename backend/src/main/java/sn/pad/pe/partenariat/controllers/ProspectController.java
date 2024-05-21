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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.partenariat.dto.ProspectDTO;
import sn.pad.pe.partenariat.services.ProspectService;

@RestController
@RequestMapping("/prospects")
public class ProspectController {

	@Autowired
	private ProspectService prospectService;
	Message message;

	@GetMapping
	public ResponseEntity<?> getProspects() {
		List<ProspectDTO> prospectDTOs = prospectService.getProspects();
		return new ResponseEntity<List<ProspectDTO>>(prospectDTOs, HttpStatus.OK);
	}

	@GetMapping("/planprospection/{id}")
	public ResponseEntity<?> getProspectByPlanProspection(@PathVariable(value = "id") long id) {
		List<ProspectDTO> prospectDtos = prospectService.getProspectByPlanProspection(id);
		return new ResponseEntity<>(prospectDtos, HttpStatus.OK);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> qualifierProspectPotentiel(@PathVariable(value = "id") long id, @RequestParam("potentiel") boolean estPotentiel, @RequestParam("partenaire") boolean estPartenaire) {
		if (prospectService.qualifierProspectPotentiel(id, estPotentiel, estPartenaire)) {
			message = new Message(new Date(), "ProspectDTO with id " + id + " updated.",
					"uri=/prospects/" + id);
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ProspectDTO with id " + id + " not found.",
				"uri=/prospects/" + id);
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody ProspectDTO prospectDto) {
		return new ResponseEntity<ProspectDTO>(prospectService.create(prospectDto), HttpStatus.CREATED);
	}

	@PostMapping("/prospects/all")
	public ResponseEntity<?> create(@RequestBody List<ProspectDTO> prospectDtos) {
		return new ResponseEntity<>(prospectService.createMultiple(prospectDtos), HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody ProspectDTO prospectUpdated) {
		if (prospectService.update(prospectUpdated)) {
			message = new Message(new Date(), "ProspectDTO with id " + prospectUpdated.getId() + " updated.",
					"uri=/prospects/" + prospectUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ProspectDTO with id " + prospectUpdated.getId() + " not found.",
				"uri=/prospects/" + prospectUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping
	public ResponseEntity<?> delete(@RequestBody ProspectDTO prospectDeleted) {
		if (prospectService.delete(prospectDeleted)) {
			message = new Message(new Date(), "ProspectDTO with id " + prospectDeleted.getId() + " deleted.",
					"uri=/prospects/" + prospectDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ProspectDTO with id " + prospectDeleted.getId() + " not found.",
				"uri=/prospects/" + prospectDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
