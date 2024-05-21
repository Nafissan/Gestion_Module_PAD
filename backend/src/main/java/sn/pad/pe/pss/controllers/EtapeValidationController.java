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

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.pss.dto.EtapeValidationDTO;
import sn.pad.pe.pss.services.EtapeValidationService;

@RestController
public class EtapeValidationController {

	@Autowired
	private EtapeValidationService etapeValidationService;
	Message message;

	@ApiOperation(value = "Liste de etapeValidation", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise avoir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })

	@GetMapping("/etapevalidations")
	public List<EtapeValidationDTO> getProcessusValidations() {
		return etapeValidationService.getEtapeValidations();
	}

	@ApiOperation(value = "Recuperation d'un etapeValidation selon l'identifiant fournit en parametre", response = EtapeValidationDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet recupere avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise avoir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/etapevalidations/{id}")
	public ResponseEntity<EtapeValidationDTO> getProcessusValidationById(@PathVariable(value = "id") Long id) {
		EtapeValidationDTO processusValidationDTO = etapeValidationService.getEtapeValidation(id);
		return ResponseEntity.ok().body(processusValidationDTO);
	}

	@ApiOperation(value = "Recuperation d'un etapeValidation selon l'identifiant fournit en parametre", response = EtapeValidationDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet recupere avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise avoir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/etapevalidations/ordre/{ordre}")
	public ResponseEntity<EtapeValidationDTO> getProcessusValidationByOrdre(@PathVariable(value = "ordre") int ordre) {
		EtapeValidationDTO processusValidationDTO = etapeValidationService.getEtapeValidationByNumeroOrdre(ordre);
		return ResponseEntity.ok().body(processusValidationDTO);
	}

	@ApiOperation(value = "Recuperation d'un etapeValidation selon l'identifiant fournit en parametre", response = EtapeValidationDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet recupere avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise avoir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/etapevalidations/action/{action}")
	public ResponseEntity<EtapeValidationDTO> getProcessusValidationByAction(
			@PathVariable(value = "action") String action) {
		EtapeValidationDTO processusValidationDTO = etapeValidationService.getEtapeValidationByAction(action);
		return ResponseEntity.ok().body(processusValidationDTO);
	}

	@ApiOperation(value = "Creation de la ressource etapeValidation fournit en parametre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Cree avec succes"),
			@ApiResponse(code = 409, message = "La ressource existe deja"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise a voir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/etapevalidations")
	public ResponseEntity<EtapeValidationDTO> createEtapeValidation(
			@RequestBody EtapeValidationDTO etapeValidationDTO) {
		return ResponseEntity.ok().body(etapeValidationService.create(etapeValidationDTO));
	}

	@ApiOperation(value = "Mise ajour de la ressource etapeValidation fournit en parametre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifie avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise avoir la ressource"),
			@ApiResponse(code = 403, message = "L'acces ela ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PutMapping("/etapevalidations")
	public ResponseEntity<Message> updateEtapeValidation(@RequestBody EtapeValidationDTO processusValidationDTO) {
		if (etapeValidationService.update(processusValidationDTO)) {
			message = new Message(new Date(), "EtapeValidation with id " + processusValidationDTO.getId() + " updated.",
					"uri=/etapevalidations/" + processusValidationDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EtapeValidation with id " + processusValidationDTO.getId() + " not found.",
				"uri=/etapevalidations/" + processusValidationDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'un etapevalidation selon l'identifiant fournit en parametre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprime avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorisee voir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@DeleteMapping("/etapevalidations")
	public ResponseEntity<Message> deleteEtapeValidation(@RequestBody EtapeValidationDTO processusValidationDTO) {

		if (etapeValidationService.delete(processusValidationDTO)) {
			message = new Message(new Date(), "EtapeValidation with id " + processusValidationDTO.getId() + " deleted.",
					"uri=/etapevalidations/" + processusValidationDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EtapeValidation with id " + processusValidationDTO.getId() + " not found.",
				"uri=/etapevalidations/" + processusValidationDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

}
