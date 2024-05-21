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
import sn.pad.pe.partenariat.dto.PaysDTO;
import sn.pad.pe.partenariat.services.PaysService;

@RestController
public class PaysController {

	@Autowired
	private PaysService paysService;
	Message message;

	@GetMapping("/pays")
	public ResponseEntity<?> getPayss() {
		List<PaysDTO> paysDTOs = paysService.getPays();
		return new ResponseEntity<List<PaysDTO>>(paysDTOs, HttpStatus.OK);
	}

	@GetMapping("/pays/{name}")

	public ResponseEntity<?> getPaysById(@PathVariable(value = "name") long id) {
		PaysDTO paysDto = paysService.getPaysById(id);
		return new ResponseEntity<PaysDTO>(paysDto, HttpStatus.FOUND);
	}

	@PostMapping("/pays")
	public ResponseEntity<?> create(@RequestBody PaysDTO paysDto) {
		return new ResponseEntity<PaysDTO>(paysService.create(paysDto), HttpStatus.CREATED);
	}

	@PostMapping("/pays/all")
	public ResponseEntity<?> create(@RequestBody List<PaysDTO> paysDtos) {
		return new ResponseEntity<>(paysService.createMultiple(paysDtos), HttpStatus.CREATED);
	}

	@PutMapping("/pays")
	public ResponseEntity<?> update(@RequestBody PaysDTO paysUpdated) {
		if (paysService.update(paysUpdated)) {
			message = new Message(new Date(), "PaysDTO with id " + paysUpdated.getId() + " updated.",
					"uri=/pays/" + paysUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "PaysDTO with id " + paysUpdated.getId() + " not found.",
				"uri=/pays/" + paysUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/pays")
	public ResponseEntity<?> delete(@RequestBody PaysDTO paysDeleted) {
		if (paysService.delete(paysDeleted)) {
			message = new Message(new Date(), "PaysDTO with id " + paysDeleted.getId() + " deleted.",
					"uri=/pays/" + paysDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "PaysDTO with id " + paysDeleted.getId() + " not found.",
				"uri=/pays/" + paysDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
