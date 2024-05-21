package sn.pad.pe.partenariat.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.partenariat.dto.PointFocalDTO;
import sn.pad.pe.partenariat.services.PointFocalService;

@RestController
public class PointFocalController {

	@Autowired
	private PointFocalService pointFocalService;
	Message message;

	@GetMapping("/pointFocal")
	public ResponseEntity<?> getPointFocal() {
		List<PointFocalDTO> pointfocalDTOs = pointFocalService.getPointFocal();
		return new ResponseEntity<List<PointFocalDTO>>(pointfocalDTOs, HttpStatus.OK);
	}

	@PostMapping("/pointFocal")
	public ResponseEntity<?> create(@RequestBody PointFocalDTO pointFocalDto) {
		return new ResponseEntity<PointFocalDTO>(pointFocalService.create(pointFocalDto), HttpStatus.CREATED);
	}

	@PutMapping("/pointFocal")
	public ResponseEntity<?> update(@RequestBody PointFocalDTO pointFocalUpdated) {
		if (pointFocalService.update(pointFocalUpdated)) {
			message = new Message(new Date(), "pointFocalUpdatedDTO with id " + pointFocalUpdated.getId() + " updated.",
					"uri=/pointFocal/" + pointFocalUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "pointFocalUpdatedDTO with id " + pointFocalUpdated.getId() + " not found.",
				"uri=/pointFocal/" + pointFocalUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/pointFocal")
	public ResponseEntity<?> delete(@RequestBody PointFocalDTO PointFocalDeleted) {
		if (pointFocalService.delete(PointFocalDeleted)) {
			message = new Message(new Date(), "PointFocalDTO with id " + PointFocalDeleted.getId() + " deleted.",
					"uri=/pointFocal/" + PointFocalDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "PointFocaLDTO with id " + PointFocalDeleted.getId() + " not found.",
				"uri=/pointFocal/" + PointFocalDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
