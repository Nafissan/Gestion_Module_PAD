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
import sn.pad.pe.pss.dto.RessourceDTO;
import sn.pad.pe.pss.services.RessourceService;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@RestController
public class RessourceController {

	@Autowired
	private RessourceService ressourceService;
	Message message;

	@GetMapping("/ressources")
	public ResponseEntity<List<RessourceDTO>> getRessources() {
		List<RessourceDTO> ressourceDTOs = ressourceService.getRessources();
		return new ResponseEntity<List<RessourceDTO>>(ressourceDTOs, HttpStatus.OK);
	}

	@GetMapping("/ressources/{name}")

	public ResponseEntity<RessourceDTO> getRessourceById(@PathVariable(value = "name") String name) {
		RessourceDTO ressourceDto = ressourceService.getRessourceById(name);
		return new ResponseEntity<RessourceDTO>(ressourceDto, HttpStatus.FOUND);
	}

	@PostMapping("/ressources")
	public ResponseEntity<RessourceDTO> create(@RequestBody RessourceDTO ressourceDto) {
		return new ResponseEntity<RessourceDTO>(ressourceService.create(ressourceDto), HttpStatus.CREATED);
	}

	@PutMapping("/ressources")
	public ResponseEntity<Message> update(@RequestBody RessourceDTO ressourceUpdated) {
		if (ressourceService.update(ressourceUpdated)) {
			message = new Message(new Date(),
					"RessourceDTO with id " + ressourceUpdated.getNomRessource() + " updated.",
					"uri=/ressources/" + ressourceUpdated.getNomRessource());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "RessourceDTO with id " + ressourceUpdated.getNomRessource() + " not found.",
				"uri=/ressources/" + ressourceUpdated.getNomRessource());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/ressources")
	public ResponseEntity<Message> delete(@RequestBody RessourceDTO ressourceDeleted) {
		if (ressourceService.delete(ressourceDeleted)) {
			message = new Message(new Date(),
					"RessourceDTO with id " + ressourceDeleted.getNomRessource() + " deleted.",
					"uri=/ressources/" + ressourceDeleted.getNomRessource());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "RessourceDTO with id " + ressourceDeleted.getNomRessource() + " not found.",
				"uri=/ressources/" + ressourceDeleted.getNomRessource());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

}
