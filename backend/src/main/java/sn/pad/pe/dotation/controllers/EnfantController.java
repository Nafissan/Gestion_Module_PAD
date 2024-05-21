package sn.pad.pe.dotation.controllers;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.dotation.dto.EnfantDTO;
import sn.pad.pe.dotation.services.EnfantService;

@RestController
public class EnfantController {

	@Autowired
	private EnfantService enfantService;
	private Message message;

	@GetMapping("/enfants")
	public ResponseEntity<?> getEnfants() {
		List<EnfantDTO> enfantDTOs = enfantService.getEnfants();
		return new ResponseEntity<List<EnfantDTO>>(enfantDTOs, HttpStatus.OK);
	}

	@GetMapping("/enfants/{id}")

	public ResponseEntity<?> getEnfantById(@PathVariable(value = "id") long id) {
		EnfantDTO enfantDto = enfantService.getEnfantById(id);
		return new ResponseEntity<EnfantDTO>(enfantDto, HttpStatus.FOUND);
	}

	@PutMapping("/enfants")
	public ResponseEntity<?> update(@RequestBody @Valid EnfantDTO enfantUpdated) {
		if (enfantService.update(enfantUpdated)) {
			message = new Message(new Date(), "EnfantDTO with id " + enfantUpdated.getId() + " updated.",
					"uri=/enfants/" + enfantUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EnfantDTO with id " + enfantUpdated.getId() + " not found.",
				"uri=/enfants/" + enfantUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/enfants")
	public ResponseEntity<?> delete(@RequestBody EnfantDTO enfantDeleted) {
		if (enfantService.delete(enfantDeleted)) {
			message = new Message(new Date(), "EnfantDTO with id " + enfantDeleted.getId() + " deleted.",
					"uri=/enfants/" + enfantDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EnfantDTO with id " + enfantDeleted.getId() + " not found.",
				"uri=/enfants/" + enfantDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
