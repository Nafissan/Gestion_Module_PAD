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
import sn.pad.pe.dotation.dto.TypeDotationDTO;
import sn.pad.pe.dotation.services.TypeDotationService;

@RestController
public class TypeDotationController {

	@Autowired
	private TypeDotationService typeDotationService;
	private Message message;

	@GetMapping("/typesDotation")
	public ResponseEntity<?> getTypeDotations() {
		List<TypeDotationDTO> typeDotationDTOs = typeDotationService.getTypeDotations();
		return new ResponseEntity<List<TypeDotationDTO>>(typeDotationDTOs, HttpStatus.OK);
	}

	@GetMapping("/typesDotation/{id}")

	public ResponseEntity<?> getTypeDotationById(@PathVariable(value = "id") long id) {
		TypeDotationDTO typeDotationDto = typeDotationService.getTypeDotationById(id);
		return new ResponseEntity<TypeDotationDTO>(typeDotationDto, HttpStatus.FOUND);
	}

	@PostMapping("/typesDotation")
	public ResponseEntity<?> create(@RequestBody TypeDotationDTO typeDotationDto) {
		return new ResponseEntity<TypeDotationDTO>(typeDotationService.create(typeDotationDto), HttpStatus.CREATED);
	}

	@PutMapping("/typesDotation")
	public ResponseEntity<?> update(@RequestBody TypeDotationDTO typeDotationUpdated) {
		if (typeDotationService.update(typeDotationUpdated)) {
			message = new Message(new Date(), "TypeDotationDTO with id " + typeDotationUpdated.getId() + " updated.",
					"uri=/typesDotation/" + typeDotationUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "TypeDotationDTO with id " + typeDotationUpdated.getId() + " not found.",
				"uri=/typesDotation/" + typeDotationUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/typesDotation")
	public ResponseEntity<?> delete(@RequestBody TypeDotationDTO typeDotationDeleted) {
		if (typeDotationService.delete(typeDotationDeleted)) {
			message = new Message(new Date(), "TypeDotationDTO with id " + typeDotationDeleted.getId() + " deleted.",
					"uri=/typesDotation/" + typeDotationDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "TypeDotationDTO with id " + typeDotationDeleted.getId() + " not found.",
				"uri=/typesDotation/" + typeDotationDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
