package sn.pad.pe.dotation.controllers;

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
import sn.pad.pe.dotation.dto.CategorieLaitDTO;
import sn.pad.pe.dotation.services.CategorieLaitService;

@RestController
public class CategorieLaitController {

	@Autowired
	private CategorieLaitService categorieLaitService;
	private Message message;

	@GetMapping("/categorielaits")
	public ResponseEntity<?> getTypeDotations() {
		List<CategorieLaitDTO> categorieLaitDTOs = categorieLaitService.getCategoriesLait();
		return new ResponseEntity<List<CategorieLaitDTO>>(categorieLaitDTOs, HttpStatus.OK);
	}

	@GetMapping("/categorielaits/{id}")

	public ResponseEntity<?> getTypeDotationById(@PathVariable(value = "id") long id) {
		CategorieLaitDTO categorieLaitDto = categorieLaitService.getCategorieLaitById(id);
		return new ResponseEntity<CategorieLaitDTO>(categorieLaitDto, HttpStatus.FOUND);
	}

	@PostMapping("/categorielaits")
	public ResponseEntity<?> create(@RequestBody CategorieLaitDTO categorieLaitDto) {
		return new ResponseEntity<CategorieLaitDTO>(categorieLaitService.create(categorieLaitDto), HttpStatus.CREATED);
	}

	@PutMapping("/categorielaits")
	public ResponseEntity<?> update(@RequestBody CategorieLaitDTO categorieLaitUpdated) {
		if (categorieLaitService.update(categorieLaitUpdated)) {
			message = new Message(new Date(), "CategorieLaitDTO with id " + categorieLaitUpdated.getId() + " updated.",
					"uri=/categorielaits/" + categorieLaitUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "CategorieLaitDTO with id " + categorieLaitUpdated.getId() + " not found.",
				"uri=/categorielaits/" + categorieLaitUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/categorielaits")
	public ResponseEntity<?> delete(@RequestBody CategorieLaitDTO categorieLaitDeleted) {
		if (categorieLaitService.delete(categorieLaitDeleted)) {
			message = new Message(new Date(), "CategorieLaitDTO with id " + categorieLaitDeleted.getId() + " deleted.",
					"uri=/categorielaits/" + categorieLaitDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "CategorieLaitDTO with id " + categorieLaitDeleted.getId() + " not found.",
				"uri=/typesDotation/" + categorieLaitDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
