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
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.partenariat.dto.ConventionDTO;
import sn.pad.pe.partenariat.services.ConventionService;

@RestController
public class ConventionController {

	@Autowired
	private ConventionService conventionService;
	Message message;

	@GetMapping("/conventions")
	public ResponseEntity<?> getConventions() {
		List<ConventionDTO> conventionDTOs = conventionService.getConventions();
		return new ResponseEntity<List<ConventionDTO>>(conventionDTOs, HttpStatus.OK);
	}

	@GetMapping("/conventions/{id}")
	public ResponseEntity<?> getConventionById(@PathVariable(value = "id") long id) {
		ConventionDTO conventionDto = conventionService.getConventionById(id);
		return new ResponseEntity<ConventionDTO>(conventionDto, HttpStatus.FOUND);
	}

	@PostMapping("/conventions")
	public ResponseEntity<?> create(@RequestBody ConventionDTO conventionDto) {
		return new ResponseEntity<ConventionDTO>(conventionService.create(conventionDto), HttpStatus.CREATED);
	}

	@PutMapping("/conventions")
	public ResponseEntity<?> update(@RequestBody ConventionDTO conventionUpdated) {
		if (conventionService.update(conventionUpdated)) {
			message = new Message(new Date(), "ConventionDTO with id " + conventionUpdated.getId() + " updated.",
					"uri=/conventions/" + conventionUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ConventionDTO with id " + conventionUpdated.getId() + " not found.",
				"uri=/conventions/" + conventionUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/conventions")
	public ResponseEntity<?> delete(@RequestBody ConventionDTO conventionDeleted) {
		if (conventionService.delete(conventionDeleted)) {
			message = new Message(new Date(), "ConventionDTO with id " + conventionDeleted.getId() + " deleted.",
					"uri=/conventions/" + conventionDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ConventionDTO with id " + conventionDeleted.getId() + " not found.",
				"uri=/conventions/" + conventionDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
