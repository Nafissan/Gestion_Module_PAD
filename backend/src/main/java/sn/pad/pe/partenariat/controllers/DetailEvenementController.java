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
import sn.pad.pe.partenariat.dto.DetailEvenementDTO;
import sn.pad.pe.partenariat.services.DetailEvenementService;

@RestController
public class DetailEvenementController {

	@Autowired
	private DetailEvenementService detailevenementService;
	Message message;

	@GetMapping("/details")
	public ResponseEntity<?> getDetailEvenements() {
		List<DetailEvenementDTO> detailevenementDTOs = detailevenementService.getDetailEvenements();
		return new ResponseEntity<List<DetailEvenementDTO>>(detailevenementDTOs, HttpStatus.OK);
	}

	@GetMapping("/details/{id}")

	public ResponseEntity<?> getDetailEvenementById(@PathVariable(value = "id") long id) {
		DetailEvenementDTO detailevenementDto = detailevenementService.getDetailEvenementById(id);
		return new ResponseEntity<DetailEvenementDTO>(detailevenementDto, HttpStatus.FOUND);
	}

	@PostMapping("/details/one")
	public ResponseEntity<?> create(@RequestBody DetailEvenementDTO detailevenementDto) {
		return new ResponseEntity<DetailEvenementDTO>(detailevenementService.create(detailevenementDto),
				HttpStatus.CREATED);
	}

	@PostMapping("/details/all")
	public ResponseEntity<?> create(@RequestBody List<DetailEvenementDTO> detailevenementDtos) {
		return new ResponseEntity<>(detailevenementService.createMultiple(detailevenementDtos), HttpStatus.CREATED);
	}

	@PutMapping("/details")
	public ResponseEntity<?> update(@RequestBody DetailEvenementDTO detailevenementUpdated) {
		if (detailevenementService.update(detailevenementUpdated)) {
			message = new Message(new Date(),
					"DetailEvenementDTO with id " + detailevenementUpdated.getId() + " updated.",
					"uri=/details/" + detailevenementUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"DetailEvenementDTO with id " + detailevenementUpdated.getId() + " not found.",
				"uri=/details/" + detailevenementUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/details")
	public ResponseEntity<?> delete(@RequestBody DetailEvenementDTO detailevenementDeleted) {
		if (detailevenementService.delete(detailevenementDeleted)) {
			message = new Message(new Date(),
					"DetailEvenementDTO with id " + detailevenementDeleted.getId() + " deleted.",
					"uri=/details/" + detailevenementDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"DetailEvenementDTO with id " + detailevenementDeleted.getId() + " not found.",
				"uri=/details/" + detailevenementDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
