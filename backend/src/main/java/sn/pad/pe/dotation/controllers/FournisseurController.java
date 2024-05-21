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
import sn.pad.pe.dotation.dto.FournisseurDTO;
import sn.pad.pe.dotation.services.FournisseurService;

@RestController
public class FournisseurController {

	@Autowired
	private FournisseurService founisseurService;
	private Message message;

	@GetMapping("/fournisseurs")
	public ResponseEntity<?> getFournisseurs() {
		List<FournisseurDTO> fournisseurDTOs = founisseurService.getFournisseurs();
		return new ResponseEntity<List<FournisseurDTO>>(fournisseurDTOs, HttpStatus.OK);
	}

	@GetMapping("/fournisseurs/{id}")
	public ResponseEntity<?> getFournisseurById(@PathVariable(value = "id") long id) {
		FournisseurDTO fournisseurDto = founisseurService.getFounisseurById(id);
		return new ResponseEntity<FournisseurDTO>(fournisseurDto, HttpStatus.FOUND);
	}

	@PostMapping("/fournisseurs")
	public ResponseEntity<?> create(@RequestBody @Valid FournisseurDTO fournisseurDto) {

		return new ResponseEntity<FournisseurDTO>(founisseurService.saveFounisseur(fournisseurDto), HttpStatus.CREATED);
	}

	@PutMapping("/fournisseurs")
	public ResponseEntity<?> update(@RequestBody @Valid FournisseurDTO fournisseurUpdated) {
		if (founisseurService.update(fournisseurUpdated)) {
			message = new Message(new Date(), "FournisseurDTO with id " + fournisseurUpdated.getId() + " updated.",
					"uri=/fournisseurs/" + fournisseurUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "FournisseurDTO with id " + fournisseurUpdated.getId() + " not found.",
				"uri=/fournisseurs/" + fournisseurUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/fournisseurs")
	public ResponseEntity<?> delete(@RequestBody FournisseurDTO enfantDeleted) {
		if (founisseurService.delete(enfantDeleted)) {
			message = new Message(new Date(), "FournisseurDTO with id " + enfantDeleted.getId() + " deleted.",
					"uri=/fournisseurs/" + enfantDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "FournisseurDTO with id " + enfantDeleted.getId() + " not found.",
				"uri=/fournisseurs/" + enfantDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
