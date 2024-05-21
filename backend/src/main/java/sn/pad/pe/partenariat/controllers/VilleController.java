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
import sn.pad.pe.partenariat.dto.VilleDTO;
import sn.pad.pe.partenariat.services.VilleService;

@RestController
public class VilleController {

	@Autowired
	private VilleService villeService;
	Message message;

	@GetMapping("/villes")
	public ResponseEntity<?> getVilles() {
		List<VilleDTO> villeDTOs = villeService.getVille();
		return new ResponseEntity<List<VilleDTO>>(villeDTOs, HttpStatus.OK);
	}

	@GetMapping("/villes/{id}")

	public ResponseEntity<?> getVilleById(@PathVariable(value = "id") long id) {
		VilleDTO villeDto = villeService.getVilleById(id);
		return new ResponseEntity<VilleDTO>(villeDto, HttpStatus.FOUND);
	}

	@PostMapping("/villes/one")
	public ResponseEntity<?> create(@RequestBody VilleDTO villeDto) {
		return new ResponseEntity<VilleDTO>(villeService.create(villeDto), HttpStatus.CREATED);
	}

	@PostMapping("/villes/all")
	public ResponseEntity<?> create(@RequestBody List<VilleDTO> villeDtos) {
		return new ResponseEntity<>(villeService.createMultiple(villeDtos), HttpStatus.CREATED);
	}

	@PutMapping("/villes")
	public ResponseEntity<?> update(@RequestBody VilleDTO villeUpdated) {
		if (villeService.update(villeUpdated)) {
			message = new Message(new Date(), "VilleDTO with id " + villeUpdated.getId() + " updated.",
					"uri=/villes/" + villeUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "VilleDTO with id " + villeUpdated.getId() + " not found.",
				"uri=/villes/" + villeUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/villes")
	public ResponseEntity<?> delete(@RequestBody VilleDTO villeDeleted) {
		if (villeService.delete(villeDeleted)) {
			message = new Message(new Date(), "VilleDTO with id " + villeDeleted.getId() + " deleted.",
					"uri=/villes/" + villeDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "VilleDTO with id " + villeDeleted.getId() + " not found.",
				"uri=/villes/" + villeDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
