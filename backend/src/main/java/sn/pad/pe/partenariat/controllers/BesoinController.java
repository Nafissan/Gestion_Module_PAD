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
import sn.pad.pe.partenariat.dto.BesoinDTO;
import sn.pad.pe.partenariat.services.BesoinService;

@RestController
public class BesoinController {

	@Autowired
	private BesoinService besoinService;
	Message message;

	@GetMapping("/besoins")
	public ResponseEntity<?> getBesoins() {
		List<BesoinDTO> besoinDTOs = besoinService.getBesoin();
		return new ResponseEntity<List<BesoinDTO>>(besoinDTOs, HttpStatus.OK);
	}

	@GetMapping("/besoins/{name}")

	public ResponseEntity<?> getBesoinById(@PathVariable(value = "name") long id) {
		BesoinDTO besoinDto = besoinService.getBesoinById(id);
		return new ResponseEntity<BesoinDTO>(besoinDto, HttpStatus.FOUND);
	}

	@GetMapping("/besoins/plan/{idPlan}")
	public ResponseEntity<?> getBesoinByPlanprospection(@PathVariable(value = "idPlan") long id) {
		List<BesoinDTO> besoinsDto = besoinService.getBesoinByPlanprospection(id);
		return new ResponseEntity<>(besoinsDto, HttpStatus.OK);
	}

	@PostMapping("/besoins")
	public ResponseEntity<?> create(@RequestBody BesoinDTO besoinDto) {
		return new ResponseEntity<BesoinDTO>(besoinService.create(besoinDto), HttpStatus.CREATED);
	}

	@PutMapping("/besoins")
	public ResponseEntity<?> update(@RequestBody BesoinDTO besoinUpdated) {
		if (besoinService.update(besoinUpdated)) {
			message = new Message(new Date(), "BeosinDTO with id " + besoinUpdated.getId() + " updated.",
					"uri=/besoins/" + besoinUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "BesoinDTO with id " + besoinUpdated.getId() + " not found.",
				"uri=/besoins/" + besoinUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/besoins")
	public ResponseEntity<?> delete(@RequestBody BesoinDTO besoinDeleted) {
		if (besoinService.delete(besoinDeleted)) {
			message = new Message(new Date(), "BesoinDTO with id " + besoinDeleted.getId() + " deleted.",
					"uri=/besoins/" + besoinDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "BesoinDTO with id " + besoinDeleted.getId() + " not found.",
				"uri=/besoins/" + besoinDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
