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
import sn.pad.pe.partenariat.dto.DomaineDTO;
import sn.pad.pe.partenariat.services.DomaineService;

@RestController
public class DomaineController {

	@Autowired
	private DomaineService domaineService;
	Message message;

	@GetMapping("/domaines")
	public ResponseEntity<?> getDomaine() {
		List<DomaineDTO> domaineDTOs = domaineService.getDomaine();
		return new ResponseEntity<List<DomaineDTO>>(domaineDTOs, HttpStatus.OK);
	}

	@GetMapping("/domaines/{id}")
	public ResponseEntity<?> getDomaineById(@PathVariable(value = "id") long id) {
		DomaineDTO domaineDto = domaineService.getDomaineById(id);
		return new ResponseEntity<DomaineDTO>(domaineDto, HttpStatus.FOUND);
	}

	@PostMapping("/domaines")
	public ResponseEntity<?> create(@RequestBody DomaineDTO domaineDtO) {
		return new ResponseEntity<DomaineDTO>(domaineService.create(domaineDtO), HttpStatus.CREATED);
	}

	@PutMapping("/domaines")
	public ResponseEntity<?> update(@RequestBody DomaineDTO domaineUpdated) {
		if (domaineService.update(domaineUpdated)) {
			message = new Message(new Date(), "DomaineDTO with id " + domaineUpdated.getId() + " updated.",
					"uri=/domaines/" + domaineUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "DomaineDTO with id " + domaineUpdated.getId() + " not found.",
				"uri=/domaines/" + domaineUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/domaines")
	public ResponseEntity<?> delete(@RequestBody DomaineDTO domaineDeleted) {
		if (domaineService.delete(domaineDeleted)) {
			message = new Message(new Date(), "DomaineDTO with id " + domaineDeleted.getId() + " deleted.",
					"uri=/domaines/" + domaineDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "DomaineDTO with id " + domaineDeleted.getId() + " not found.",
				"uri=/domaines/" + domaineDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
