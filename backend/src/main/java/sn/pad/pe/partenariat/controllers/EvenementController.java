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
import sn.pad.pe.partenariat.dto.EvenementDTO;
import sn.pad.pe.partenariat.services.EvenementService;

@RestController
public class EvenementController {

	@Autowired
	private EvenementService evenementService;
	Message message;

	@GetMapping("/evenements")
	public ResponseEntity<?> getActivites() {
		List<EvenementDTO> evenementDTOs = evenementService.getEvenements();
		return new ResponseEntity<List<EvenementDTO>>(evenementDTOs, HttpStatus.OK);
	}

	@GetMapping("/evenements/{id}")

	public ResponseEntity<?> getActiviteById(@PathVariable(value = "id") long id) {
		EvenementDTO evenementDto = evenementService.getEvenementById(id);
		return new ResponseEntity<EvenementDTO>(evenementDto, HttpStatus.FOUND);
	}

	@PostMapping("/evenements/one")
	public ResponseEntity<?> create(@RequestBody EvenementDTO evenementDto) {
		return new ResponseEntity<EvenementDTO>(evenementService.create(evenementDto), HttpStatus.CREATED);
	}

	@PostMapping("/evenements/all")
	public ResponseEntity<?> create(@RequestBody List<EvenementDTO> evenementDtos) {
		return new ResponseEntity<>(evenementService.createMultiple(evenementDtos), HttpStatus.CREATED);
	}

	@PutMapping("/evenements")
	public ResponseEntity<?> update(@RequestBody EvenementDTO evenementUpdated) {
		if (evenementService.update(evenementUpdated)) {
			message = new Message(new Date(), "EvenementDTO with id " + evenementUpdated.getId() + " updated.",
					"uri=/evenements/" + evenementUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EvenementDTO with id " + evenementUpdated.getId() + " not found.",
				"uri=/evenements/" + evenementUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/evenements")
	public ResponseEntity<?> delete(@RequestBody EvenementDTO evenementDeleted) {
		if (evenementService.delete(evenementDeleted)) {
			message = new Message(new Date(), "EvenementDTO with id " + evenementDeleted.getId() + " deleted.",
					"uri=/evenements/" + evenementDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EvenementDTO with id " + evenementDeleted.getId() + " not found.",
				"uri=/evenements/" + evenementDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
