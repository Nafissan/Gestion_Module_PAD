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
import sn.pad.pe.partenariat.dto.ActiviteDTO;
import sn.pad.pe.partenariat.services.ActiviteService;

@RestController
public class ActiviteController {

	@Autowired
	private ActiviteService activiteService;
	Message message;

	@GetMapping("/activites")
	public ResponseEntity<?> getActivites() {
		List<ActiviteDTO> activiteDTOs = activiteService.getActivite();
		return new ResponseEntity<List<ActiviteDTO>>(activiteDTOs, HttpStatus.OK);
	}

	@GetMapping("/activites/{id}")

	public ResponseEntity<?> getActiviteById(@PathVariable(value = "id") long id) {
		ActiviteDTO activiteDto = activiteService.getActiviteById(id);
		return new ResponseEntity<ActiviteDTO>(activiteDto, HttpStatus.FOUND);
	}

	@PostMapping("/activites/one")
	public ResponseEntity<?> create(@RequestBody ActiviteDTO activiteDto) {
		return new ResponseEntity<ActiviteDTO>(activiteService.create(activiteDto), HttpStatus.CREATED);
	}

	@PostMapping("/activites/all")
	public ResponseEntity<?> create(@RequestBody List<ActiviteDTO> activiteDtos) {
		return new ResponseEntity<>(activiteService.createMultiple(activiteDtos), HttpStatus.CREATED);
	}

	@PutMapping("/activites")
	public ResponseEntity<?> update(@RequestBody ActiviteDTO activiteUpdated) {
		if (activiteService.update(activiteUpdated)) {
			message = new Message(new Date(), "ActiviteDTO with id " + activiteUpdated.getId() + " updated.",
					"uri=/activites/" + activiteUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ActiviteDTO with id " + activiteUpdated.getId() + " not found.",
				"uri=/activites/" + activiteUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/activites")
	public ResponseEntity<?> delete(@RequestBody ActiviteDTO activiteDeleted) {
		if (activiteService.delete(activiteDeleted)) {
			message = new Message(new Date(), "ActiviteDTO with id " + activiteDeleted.getId() + " deleted.",
					"uri=/activites/" + activiteDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ActiviteDTO with id " + activiteDeleted.getId() + " not found.",
				"uri=/activites/" + activiteDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
