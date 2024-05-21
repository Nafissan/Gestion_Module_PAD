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
import sn.pad.pe.partenariat.dto.ZoneDTO;
import sn.pad.pe.partenariat.services.ZoneService;

@RestController
public class ZoneController {

	@Autowired
	private ZoneService zoneService;
	Message message;

	@GetMapping("/zones")
	public ResponseEntity<?> getZones() {
		List<ZoneDTO> zoneDTOs = zoneService.getZones();
		return new ResponseEntity<List<ZoneDTO>>(zoneDTOs, HttpStatus.OK);
	}

	@GetMapping("/zones/{name}")

	public ResponseEntity<?> getZoneById(@PathVariable(value = "name") long id) {
		ZoneDTO zoneDto = zoneService.getZoneById(id);
		return new ResponseEntity<ZoneDTO>(zoneDto, HttpStatus.FOUND);
	}

	@PostMapping("/zones/one")
	public ResponseEntity<?> create(@RequestBody ZoneDTO zoneDto) {
		return new ResponseEntity<ZoneDTO>(zoneService.create(zoneDto), HttpStatus.CREATED);
	}

	@PostMapping("/zones/all")
	public ResponseEntity<?> create(@RequestBody List<ZoneDTO> zoneDtos) {
		return new ResponseEntity<>(zoneService.createMultiple(zoneDtos), HttpStatus.CREATED);
	}

	@PutMapping("/zones")
	public ResponseEntity<?> update(@RequestBody ZoneDTO zoneUpdated) {
		if (zoneService.update(zoneUpdated)) {
			message = new Message(new Date(), "ZoneDTO with id " + zoneUpdated.getId() + " updated.",
					"uri=/zones/" + zoneUpdated.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ZoneDTO with id " + zoneUpdated.getId() + " not found.",
				"uri=/zones/" + zoneUpdated.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/zones")
	public ResponseEntity<?> delete(@RequestBody ZoneDTO zoneDeleted) {
		if (zoneService.delete(zoneDeleted)) {
			message = new Message(new Date(), "ZoneDTO with id " + zoneDeleted.getId() + " deleted.",
					"uri=/zones/" + zoneDeleted.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ZoneDTO with id " + zoneDeleted.getId() + " not found.",
				"uri=/zones/" + zoneDeleted.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
