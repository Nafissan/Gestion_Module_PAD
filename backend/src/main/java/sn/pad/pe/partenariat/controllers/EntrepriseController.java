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
import sn.pad.pe.partenariat.dto.EntrepriseDTO;
import sn.pad.pe.partenariat.services.EntrepriseService;

@RestController
public class EntrepriseController {
	@Autowired
	private EntrepriseService entrepriseService;
	Message message;

	@GetMapping("/entreprises")
	public ResponseEntity<?> getEntreprises() {
		List<EntrepriseDTO> entrepriseDTOs = entrepriseService.getEntreprises();
		return new ResponseEntity<List<EntrepriseDTO>>(entrepriseDTOs, HttpStatus.OK);
	}

	@GetMapping("/entreprises/{id}")

	public ResponseEntity<?> getEntrepriseById(@PathVariable(value = "id") long id) {
		EntrepriseDTO entrepriseDto = entrepriseService.getEntrepriseById(id);
		return new ResponseEntity<EntrepriseDTO>(entrepriseDto, HttpStatus.FOUND);
	}

	@PostMapping("/entreprises/one")
	public ResponseEntity<?> create(@RequestBody EntrepriseDTO entrepriseDto) {
		return new ResponseEntity<EntrepriseDTO>(entrepriseService.create(entrepriseDto), HttpStatus.CREATED);
	}

	@PostMapping("/entreprises/all")
	public ResponseEntity<?> create(@RequestBody List<EntrepriseDTO> entrepriseDtos) {
		return new ResponseEntity<>(entrepriseService.createMultiple(entrepriseDtos), HttpStatus.CREATED);
	}

	@PutMapping("/entreprises")
	public ResponseEntity<?> update(@RequestBody EntrepriseDTO entrepriseUpdated) {
		if (entrepriseService.update(entrepriseUpdated)) {
			message = new Message(new Date(), "EntrepriseDTO with id " + entrepriseUpdated.getId() + " updated.",
					"uri=/entreprises/" + entrepriseUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EntrepriseDTO with id " + entrepriseUpdated.getId() + " not found.",
				"uri=/entreprises/" + entrepriseUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/entreprises")
	public ResponseEntity<?> delete(@RequestBody EntrepriseDTO entrepriseDeleted) {
		if (entrepriseService.delete(entrepriseDeleted)) {
			message = new Message(new Date(), "EntrepriseDTO with id " + entrepriseDeleted.getId() + " deleted.",
					"uri=/entreprises/" + entrepriseDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EntrepriseDTO with id " + entrepriseDeleted.getId() + " not found.",
				"uri=/entreprises/" + entrepriseDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
