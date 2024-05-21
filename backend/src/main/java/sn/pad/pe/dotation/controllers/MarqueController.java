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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.dotation.dto.MarqueDTO;
import sn.pad.pe.dotation.services.MarqueService;

@RestController
public class MarqueController {

	@Autowired
	private MarqueService marqueService;
	private Message message;

	@GetMapping("/marques")
	public ResponseEntity<?> getFournisseurs() {
		List<MarqueDTO> marqueDTOs = marqueService.getMarques();
		return new ResponseEntity<List<MarqueDTO>>(marqueDTOs, HttpStatus.OK);
	}

	@GetMapping("/marques/{id}")
	public ResponseEntity<?> getFournisseurById(@PathVariable(value = "id") long id) {
		MarqueDTO marqueDto = marqueService.getMarqueById(id);
		return new ResponseEntity<MarqueDTO>(marqueDto, HttpStatus.FOUND);
	}

	@PostMapping("/marques")
	public ResponseEntity<?> create(@RequestBody @Valid MarqueDTO marqueDto) {

		return new ResponseEntity<MarqueDTO>(marqueService.create(marqueDto), HttpStatus.CREATED);
	}

	@PutMapping("/marques")
	public ResponseEntity<?> update(@RequestBody @Valid MarqueDTO marqueUpdated) {
		if (marqueService.update(marqueUpdated)) {
			message = new Message(new Date(), "MarqueDTO with id " + marqueUpdated.getId() + " updated.",
					"uri=/marques/" + marqueUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "MarqueDTO with id " + marqueUpdated.getId() + " not found.",
				"uri=/marques/" + marqueUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/marques")
	public ResponseEntity<?> delete(@RequestBody MarqueDTO marqueDeleted) {
		if (marqueService.delete(marqueDeleted)) {
			message = new Message(new Date(), "MarqueDTO with id " + marqueDeleted.getId() + " deleted.",
					"uri=/marques/" + marqueDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "MarqueDTO with id " + marqueDeleted.getId() + " not found.",
				"uri=/marques/" + marqueDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
