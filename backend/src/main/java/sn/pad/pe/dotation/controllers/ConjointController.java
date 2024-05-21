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
import sn.pad.pe.dotation.dto.ConjointDTO;
import sn.pad.pe.dotation.services.ConjointService;

@RestController
public class ConjointController {

	@Autowired
	private ConjointService conjointService;
	private Message message;

	@GetMapping("/conjoints")
	public ResponseEntity<?> getConjoints() {
		List<ConjointDTO> conjointDTOs = conjointService.getConjoints();
		return new ResponseEntity<List<ConjointDTO>>(conjointDTOs, HttpStatus.OK);
	}

	@GetMapping("/conjoints/{id}")

	public ResponseEntity<?> getConjointById(@PathVariable(value = "id") long id) {
		ConjointDTO conjointDto = conjointService.getConjointById(id);
		return new ResponseEntity<ConjointDTO>(conjointDto, HttpStatus.FOUND);
	}

	@PutMapping("/conjoints")
	public ResponseEntity<?> update(@RequestBody @Valid ConjointDTO conjointUpdated) {
		if (conjointService.update(conjointUpdated)) {
			message = new Message(new Date(), "ConjointDTO with id " + conjointUpdated.getId() + " updated.",
					"uri=/conjoints/" + conjointUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ConjointDTO with id " + conjointUpdated.getId() + " not found.",
				"uri=/conjoints/" + conjointUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/conjoints")
	public ResponseEntity<?> delete(@RequestBody ConjointDTO conjointDeleted) {
		if (conjointService.delete(conjointDeleted)) {
			message = new Message(new Date(), "ConjointDTO with id " + conjointDeleted.getId() + " deleted.",
					"uri=/conjoints/" + conjointDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ConjointDTO with id " + conjointDeleted.getId() + " not found.",
				"uri=/conjoints/" + conjointDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
