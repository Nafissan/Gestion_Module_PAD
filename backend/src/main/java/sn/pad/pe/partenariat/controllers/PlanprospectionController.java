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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.partenariat.dto.PlanprospectionDTO;
import sn.pad.pe.partenariat.services.PlanprospectionService;

@RestController
@RequestMapping("/planprospection")
public class PlanprospectionController {

	@Autowired
	private PlanprospectionService planprospectionService;
	Message message;

	@GetMapping
	public ResponseEntity<List<PlanprospectionDTO>> getPlanprospection() {
		List<PlanprospectionDTO> planprospectionDTOs = planprospectionService.getPlanprospection();
		return new ResponseEntity<List<PlanprospectionDTO>>(planprospectionDTOs, HttpStatus.OK);
	}

	@GetMapping("/{code}")
	public ResponseEntity<PlanprospectionDTO> getPlanprospectionById(@PathVariable(value = "code") Long code) {
		PlanprospectionDTO planprospectionDto = planprospectionService.getPlanprospectionById(code);
		return new ResponseEntity<PlanprospectionDTO>(planprospectionDto, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<PlanprospectionDTO> create(@RequestBody PlanprospectionDTO planprospectionDto) {
		return new ResponseEntity<PlanprospectionDTO>(planprospectionService.create(planprospectionDto),
				HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<Message> update(@RequestBody PlanprospectionDTO planprospectionDto) {
		if (planprospectionService.update(planprospectionDto)) {
			message = new Message(new Date(),
					"PlanprospectionDTO with id " + planprospectionDto.getCode() + " updated.",
					"uri=/planprospection/" + planprospectionDto.getCode());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "PlanprospectionDTO with id " + planprospectionDto.getCode() + " not found.",
				"uri=/planprospection/" + planprospectionDto.getCode());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping
	public ResponseEntity<Message> delete(@RequestBody PlanprospectionDTO planprospectionDto) {
		if (planprospectionService.delete(planprospectionDto)) {
			message = new Message(new Date(), "PlanprospectionDTO with id " + planprospectionDto.getId() + " deleted.",
					"uri=/planprospection/" + planprospectionDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Planprospection with id " + planprospectionDto.getId() + " not found.",
				"uri=/planprospection/" + planprospectionDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
