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
import sn.pad.pe.partenariat.dto.ParticipantDTO;
import sn.pad.pe.partenariat.services.ParticipantService;

@RestController
public class ParticipantController {
	@Autowired
	private ParticipantService participantService;
	Message message;

	@GetMapping("/participants")
	public ResponseEntity<?> getParticipants() {
		List<ParticipantDTO> participantDTOs = participantService.getParticipants();
		return new ResponseEntity<List<ParticipantDTO>>(participantDTOs, HttpStatus.OK);
	}

	@GetMapping("/participants/{id}")

	public ResponseEntity<?> getParticipantById(@PathVariable(value = "id") long id) {
		ParticipantDTO participantDto = participantService.getParticipantById(id);
		return new ResponseEntity<ParticipantDTO>(participantDto, HttpStatus.FOUND);
	}

	@PostMapping("/participants/one")
	public ResponseEntity<?> create(@RequestBody ParticipantDTO participantDto) {
		return new ResponseEntity<ParticipantDTO>(participantService.create(participantDto), HttpStatus.CREATED);
	}

	@PostMapping("/participants/all")
	public ResponseEntity<?> create(@RequestBody List<ParticipantDTO> participantDtos) {
		return new ResponseEntity<>(participantService.createMultiple(participantDtos), HttpStatus.CREATED);
	}

	@PutMapping("/participants")
	public ResponseEntity<?> update(@RequestBody ParticipantDTO participantUpdated) {
		if (participantService.update(participantUpdated)) {
			message = new Message(new Date(), "ParticipantDTO with id " + participantUpdated.getId() + " updated.",
					"uri=/participants/" + participantUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ParticipantDTO with id " + participantUpdated.getId() + " not found.",
				"uri=/participants/" + participantUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/participants")
	public ResponseEntity<?> delete(@RequestBody ParticipantDTO participantDeleted) {
		if (participantService.delete(participantDeleted)) {
			message = new Message(new Date(), "ParticipantDTO with id " + participantDeleted.getId() + " deleted.",
					"uri=/participants/" + participantDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ParticipantDTO with id " + participantDeleted.getId() + " not found.",
				"uri=/participants/" + participantDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
