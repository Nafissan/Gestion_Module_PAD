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
import sn.pad.pe.partenariat.dto.ContinentDTO;
import sn.pad.pe.partenariat.services.ContinentService;

@RestController
public class ContinentController {

	@Autowired
	private ContinentService continentService;
	Message message;

	@GetMapping("/continents")
	public ResponseEntity<?> getContinents() {
		List<ContinentDTO> continentDTOs = continentService.getContinents();
		return new ResponseEntity<List<ContinentDTO>>(continentDTOs, HttpStatus.OK);
	}

	@GetMapping("/continents/{name}")

	public ResponseEntity<?> getContinentById(@PathVariable(value = "name") long id) {
		ContinentDTO continentDto = continentService.getContinentById(id);
		return new ResponseEntity<ContinentDTO>(continentDto, HttpStatus.FOUND);
	}

	@PostMapping("/continent")
	public ResponseEntity<?> create(@RequestBody ContinentDTO continentDto) {
		return new ResponseEntity<ContinentDTO>(continentService.create(continentDto), HttpStatus.CREATED);
	}

	@PostMapping("/continents")
	public ResponseEntity<?> create(@RequestBody List<ContinentDTO> continentDtos) {
		return new ResponseEntity<>(continentService.createMultiple(continentDtos), HttpStatus.CREATED);
	}

	@PutMapping("/continents")
	public ResponseEntity<?> update(@RequestBody ContinentDTO continentUpdated) {
		if (continentService.update(continentUpdated)) {
			message = new Message(new Date(), "ContinentDTO with id " + continentUpdated.getId() + " updated.",
					"uri=/continents/" + continentUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ContinentDTO with id " + continentUpdated.getId() + " not found.",
				"uri=/continents/" + continentUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/continents")
	public ResponseEntity<?> delete(@RequestBody ContinentDTO continentDeleted) {
		if (continentService.delete(continentDeleted)) {
			message = new Message(new Date(), "ContinentDTO with id " + continentDeleted.getId() + " deleted.",
					"uri=/continents/" + continentDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ContinentDTO with id " + continentDeleted.getId() + " not found.",
				"uri=/continents/" + continentDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
