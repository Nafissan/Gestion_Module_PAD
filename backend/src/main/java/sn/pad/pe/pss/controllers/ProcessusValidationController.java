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
import sn.pad.pe.pss.dto.ProcessusValidationDTO;
import sn.pad.pe.pss.services.ProcessusValidationService;

@RestController
public class ProcessusValidationController {

	@Autowired
	private ProcessusValidationService processusValidationService;

	Message message;

	@ApiOperation(value = "Liste de processusValidation", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise avoir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })

	@GetMapping("/processusvalidations")
	public List<ProcessusValidationDTO> getProcessusValidations() {
		return processusValidationService.getProcessusValidations();
	}

	@ApiOperation(value = "Recuperation d'un processusValidation selon l'identifiant fournit en parametre", response = EtapeValidationDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet recupere avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise avoir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/processusvalidations/{id}")
	public ResponseEntity<ProcessusValidationDTO> getProcessusValidationById(@PathVariable(value = "id") Long id) {
		ProcessusValidationDTO processusValidationDTO = processusValidationService.getProcessusValidation(id);
		return ResponseEntity.ok().body(processusValidationDTO);
	}

	@ApiOperation(value = "Recuperation d'un processusValidation selon l'identifiant fournit en parametre", response = EtapeValidationDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet recupere avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise avoir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/processusvalidations/libelle/{libelle}")
	public ResponseEntity<ProcessusValidationDTO> getProcessusValidationByLibelle(
			@PathVariable(value = "libelle") String libelle) {
		ProcessusValidationDTO processusValidationDTO = processusValidationService
				.getProcessusValidationByLibelle(libelle);
		return ResponseEntity.ok().body(processusValidationDTO);
	}

	@ApiOperation(value = "Creation de la ressource processusValidation fournit en parametre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Cree avec succes"),
			@ApiResponse(code = 409, message = "La ressource existe deja"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise a voir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/processusvalidations")
	public ResponseEntity<ProcessusValidationDTO> createProcessusValidation(
			@RequestBody ProcessusValidationDTO processusValidationDTO) {
		return ResponseEntity.ok().body(processusValidationService.create(processusValidationDTO));
	}

	@ApiOperation(value = "Mise ajour de la ressource processusValidation fournit en parametre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifie avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorise avoir la ressource"),
			@ApiResponse(code = 403, message = "L'acces ela ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PutMapping("/processusvalidations")
	public ResponseEntity<Message> updateProcessusValidation(
			@RequestBody ProcessusValidationDTO processusValidationDTO) {
		if (processusValidationService.update(processusValidationDTO)) {
			message = new Message(new Date(),
					"ProcessusValidation with id " + processusValidationDTO.getId() + " updated.",
					"uri=/processusvalidations/" + processusValidationDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"ProcessusValidation with id " + processusValidationDTO.getId() + " not found.",
				"uri=/processusvalidations/" + processusValidationDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'un processusvalidation selon l'identifiant fournit en parametre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprime avec succes"),
			@ApiResponse(code = 401, message = "Vous n'etes pas autorisee voir la ressource"),
			@ApiResponse(code = 403, message = "L'acces a la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@DeleteMapping("/processusvalidations")
	public ResponseEntity<Message> deleteProcessusValidation(
			@RequestBody ProcessusValidationDTO processusValidationDTO) {

		if (processusValidationService.delete(processusValidationDTO)) {
			message = new Message(new Date(),
					"ProcessusValidation with id " + processusValidationDTO.getId() + " deleted.",
					"uri=/processusvalidations/" + processusValidationDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"ProcessusValidation with id " + processusValidationDTO.getId() + " not found.",
				"uri=/processusvalidations/" + processusValidationDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

}
