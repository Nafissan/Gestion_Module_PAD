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
import sn.pad.pe.dotation.dto.DotationDTO;
import sn.pad.pe.dotation.services.DotationService;

@RestController
public class DotationController {

	@Autowired
	private DotationService dotationService;
	private Message message;

	@GetMapping("/dotations")
	public ResponseEntity<?> getDotations() {
		List<DotationDTO> dotationDTOs = dotationService.getDotations();
		return new ResponseEntity<List<DotationDTO>>(dotationDTOs, HttpStatus.OK);
	}

	@GetMapping("/dotations/{id}")

	public ResponseEntity<?> getDotationById(@PathVariable(value = "id") long id) {
		DotationDTO dotationDto = dotationService.getDotationById(id);
		return new ResponseEntity<DotationDTO>(dotationDto, HttpStatus.FOUND);
	}

	@PostMapping("/dotations")
	public ResponseEntity<?> create(@RequestBody @Valid DotationDTO dotationDto) {
		return new ResponseEntity<DotationDTO>(dotationService.create(dotationDto), HttpStatus.CREATED);
	}

	@PutMapping("/dotations")
	public ResponseEntity<?> update(@RequestBody @Valid DotationDTO dotationUpdated) {
		if (dotationService.update(dotationUpdated)) {
			message = new Message(new Date(), "DotationDTO with id " + dotationUpdated.getId() + " updated.",
					"uri=/dotations/" + dotationUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "DotationDTO with id " + dotationUpdated.getId() + " not found.",
				"uri=/dotations/" + dotationUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/dotations")
	public ResponseEntity<?> delete(@RequestBody DotationDTO dotationDeleted) {
		if (dotationService.delete(dotationDeleted)) {
			message = new Message(new Date(), "DotationDTO with id " + dotationDeleted.getId() + " deleted.",
					"uri=/dotations/" + dotationDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "DotationDTO with id " + dotationDeleted.getId() + " not found.",
				"uri=/dotations/" + dotationDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
