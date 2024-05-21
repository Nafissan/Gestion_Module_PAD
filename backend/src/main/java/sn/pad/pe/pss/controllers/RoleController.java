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
import sn.pad.pe.pss.dto.RoleDTO;
import sn.pad.pe.pss.services.RoleService;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@RestController
public class RoleController {

	@Autowired
	private RoleService roleService;
	Message message;

	@GetMapping("/roles")
	public ResponseEntity<List<RoleDTO>> getRoles() {
		List<RoleDTO> roleDTO = roleService.getRoles();
		return new ResponseEntity<List<RoleDTO>>(roleDTO, HttpStatus.OK);
	}

	@GetMapping("/roles/{name}")
	public ResponseEntity<RoleDTO> getRoleById(@PathVariable(value = "name") Long id) {
		RoleDTO roleDto = roleService.getRoleById(id);
		return ResponseEntity.ok().body(roleDto);
	}

	@PostMapping("/roles")
	public ResponseEntity<RoleDTO> create(@RequestBody RoleDTO roleDto) {
		RoleDTO roleDTOsaved = roleService.create(roleDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(roleDTOsaved);
	}

	@PostMapping("/roles/{privileges}")
	public ResponseEntity<RoleDTO> createRoleWithPrivileges(@RequestBody RoleDTO roleDto,
			@PathVariable List<String> privileges) {
		RoleDTO roleDTOsaved = roleService.create(roleDto, privileges);
		return ResponseEntity.status(HttpStatus.CREATED).body(roleDTOsaved);
	}

	@PutMapping("/roles")
	public ResponseEntity<Message> update(@RequestBody RoleDTO roleDto) {
		if (roleService.update(roleDto)) {
			message = new Message(new Date(), "RoleDTO with id " + roleDto.getId() + " updated.",
					"uri=/roles/" + roleDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "RoleDTO with id " + roleDto.getId() + " not found.",
				"uri=/roles/" + roleDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@PutMapping("/roles/{privileges}")
	public ResponseEntity<RoleDTO> updateRoleWithPrivileges(@RequestBody RoleDTO roleDto,
			@PathVariable List<String> privileges) {
		RoleDTO roleDTOupdated = roleService.update(roleDto, privileges);
		return ResponseEntity.status(HttpStatus.OK).body(roleDTOupdated);
	}

	@DeleteMapping("/roles")
	public ResponseEntity<Message> delete(@RequestBody RoleDTO roleDto) {
		if (roleService.delete(roleDto)) {
			message = new Message(new Date(), "RoleDTO with id " + roleDto.getId() + " deleted.",
					"uri=/roles/" + roleDto.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "RoleDTO with id " + roleDto.getId() + " not found.",
				"uri=/roles/" + roleDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
