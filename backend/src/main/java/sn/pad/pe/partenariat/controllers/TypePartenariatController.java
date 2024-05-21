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
import sn.pad.pe.partenariat.dto.TypePartenariatDTO;
import sn.pad.pe.partenariat.services.TypePartenariatService;

@RestController
public class TypePartenariatController {

	@Autowired
	private TypePartenariatService typePartenariatService;
	Message message;

	@GetMapping("/typesPartenariat")
	public ResponseEntity<?> getTypePartenariats() {
		List<TypePartenariatDTO> typePartenariatDTOs = typePartenariatService.getTypePartenariats();
		return new ResponseEntity<List<TypePartenariatDTO>>(typePartenariatDTOs, HttpStatus.OK);
	}

	@GetMapping("/typesPartenariat/{id}")

	public ResponseEntity<?> getTypePartenariatById(@PathVariable(value = "id") long id) {
		TypePartenariatDTO typePartenariatDto = typePartenariatService.getTypePartenariatById(id);
		return new ResponseEntity<TypePartenariatDTO>(typePartenariatDto, HttpStatus.FOUND);
	}

	@PostMapping("/typesPartenariat")
	public ResponseEntity<?> create(@RequestBody TypePartenariatDTO typePartenariatDto) {
		return new ResponseEntity<TypePartenariatDTO>(typePartenariatService.create(typePartenariatDto),
				HttpStatus.CREATED);
	}

	@PutMapping("/typesPartenariat")
	public ResponseEntity<?> update(@RequestBody TypePartenariatDTO typePartenariatUpdated) {
		if (typePartenariatService.update(typePartenariatUpdated)) {
			message = new Message(new Date(),
					"TypePartenariatDTO with id " + typePartenariatUpdated.getId() + " updated.",
					"uri=/typesPartenariat/" + typePartenariatUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"TypePartenariatDTO with id " + typePartenariatUpdated.getId() + " not found.",
				"uri=/typesPartenariat/" + typePartenariatUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/typesPartenariat")
	public ResponseEntity<?> delete(@RequestBody TypePartenariatDTO typePartenariatDeleted) {
		if (typePartenariatService.delete(typePartenariatDeleted)) {
			message = new Message(new Date(),
					"TypePartenariatDTO with id " + typePartenariatDeleted.getId() + " deleted.",
					"uri=/typesPartenariat/" + typePartenariatDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"TypePartenariatDTO with id " + typePartenariatDeleted.getId() + " not found.",
				"uri=/typesPartenariat/" + typePartenariatDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
