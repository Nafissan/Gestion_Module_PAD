package sn.pad.pe.pss.controllers;

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
import sn.pad.pe.pss.dto.PrivilegeDTO;
import sn.pad.pe.pss.services.PrivilegeService;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@RestController
public class PrivilegeController {

	@Autowired
	private PrivilegeService privilegeService;
	Message message;

	@GetMapping("/privileges")
	public ResponseEntity<List<PrivilegeDTO>> getPrivileges() {
		List<PrivilegeDTO> privilegeDTOs = privilegeService.getPrivileges();
		return new ResponseEntity<List<PrivilegeDTO>>(privilegeDTOs, HttpStatus.OK);
	}

	@GetMapping("/privileges/{name}")
	public ResponseEntity<PrivilegeDTO> getPrivilegeById(@PathVariable(value = "name") String name) {
		PrivilegeDTO privilegeDto = privilegeService.getPrivilegeById(name);
		return new ResponseEntity<PrivilegeDTO>(privilegeDto, HttpStatus.FOUND);
	}

	@PostMapping("/privileges")
	public ResponseEntity<PrivilegeDTO> create(@RequestBody PrivilegeDTO privilegeDto) {
		return new ResponseEntity<PrivilegeDTO>(privilegeService.create(privilegeDto), HttpStatus.CREATED);
	}

	@PutMapping("/privileges")
	public ResponseEntity<Message> update(@RequestBody PrivilegeDTO privilegeDto) {
		if (privilegeService.update(privilegeDto)) {
			message = new Message(new Date(), "PrivilegeDTO with id " + privilegeDto.getNom() + " updated.",
					"uri=/privileges/" + privilegeDto.getNom());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "PrivilegeDTO with id " + privilegeDto.getNom() + " not found.",
				"uri=/privileges/" + privilegeDto.getNom());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/privileges")
	public ResponseEntity<Message> delete(@RequestBody PrivilegeDTO privilegeDto) {
		if (privilegeService.delete(privilegeDto)) {
			message = new Message(new Date(), "PrivilegeDTO with id " + privilegeDto.getNom() + " deleted.",
					"uri=/privileges/" + privilegeDto.getNom());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "PrivilegeDTO with id " + privilegeDto.getNom() + " not found.",
				"uri=/privileges/" + privilegeDto.getNom());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
