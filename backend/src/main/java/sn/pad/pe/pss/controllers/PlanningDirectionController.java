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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.pss.dto.PlanningDirectionDTO;
import sn.pad.pe.pss.services.PlanningDirectionService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@RestController
@Api(value = "APi pour l'entité DossierConge")
public class PlanningDirectionController {
	@Autowired
	private PlanningDirectionService planningDirectionCongeService;
	Message message;

	@ApiOperation(value = "Liste des planningDirections", response = PlanningDirectionDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningdirections")
	public ResponseEntity<List<PlanningDirectionDTO>> getDossierConges() {
		List<PlanningDirectionDTO> planningDirectionDTOs = planningDirectionCongeService.getPlanningDirections();
		return ResponseEntity.status(HttpStatus.OK).body(planningDirectionDTOs);
	}

	@ApiOperation(value = "Recupération d'un planningDirection selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/planningdirections/{id}")
	public ResponseEntity<PlanningDirectionDTO> getById(@PathVariable(value = "id") Long id) {
		PlanningDirectionDTO planningDirectionDTO = planningDirectionCongeService.getPlanningDirectionById(id);
		return ResponseEntity.status(HttpStatus.OK).body(planningDirectionDTO);
	}

	@ApiOperation(value = "Recupération d'un planningDirection selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/planningdirections/dossierConge/{id}")
	public ResponseEntity<List<PlanningDirectionDTO>> getByDossierConge(@PathVariable(value = "id") Long id) {
		List<PlanningDirectionDTO> planningDirectionDTOs = planningDirectionCongeService
				.getPlanningDirectionsByDossierConge(id);
		return ResponseEntity.status(HttpStatus.OK).body(planningDirectionDTOs);
	}

	@ApiOperation(value = "Recupération d'un planningDirection selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/planningdirections/uniteOrganisationnelle/{codeDirection}/dossierConge/{idDossierConge}")
	public ResponseEntity<PlanningDirectionDTO> getByCodeDirectionAndDossierConge(
			@PathVariable(value = "codeDirection") String codeDirection,
			@PathVariable(value = "idDossierConge") Long idDossierConge) {
		PlanningDirectionDTO planningDirectionDTO = planningDirectionCongeService
				.getPlanningDirectionsByCodeDirectionAndDossierConge(codeDirection, idDossierConge);
		return ResponseEntity.status(HttpStatus.OK).body(planningDirectionDTO);
	}

	@ApiOperation(value = "Création de la ressource planningDirection fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/planningdirections")
	public ResponseEntity<PlanningDirectionDTO> create(@RequestBody PlanningDirectionDTO planningDirectionDTO) {
		PlanningDirectionDTO planningDirectionCreated = planningDirectionCongeService
				.createPlanningDirection(planningDirectionDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(planningDirectionCreated);
	}

	@ApiOperation(value = "Mise à jour de la ressource planningDirection fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/planningdirections")
	public ResponseEntity<Message> update(@RequestBody PlanningDirectionDTO planningDirectionDTO) {
		boolean isUpdated = planningDirectionCongeService.updatePlanningDirection(planningDirectionDTO);
		if (isUpdated) {
			message = new Message(new Date(), "PlanningDirection with id " + planningDirectionDTO.getId() + " updated.",
					"uri=/planningdirections/" + planningDirectionDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "PlanningDirection with id " + planningDirectionDTO.getId() + " not found.",
				"uri=/planningdirections/" + planningDirectionDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@ApiOperation(value = "Suppression de la ressource planningDirection selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/planningdirections")
	public ResponseEntity<Message> delete(@RequestBody PlanningDirectionDTO planningDirectionDTO) {
		boolean isDeleted = planningDirectionCongeService.detelePlanningDirection(planningDirectionDTO);
		if (isDeleted) {
			message = new Message(new Date(), "PlanningDirection with id " + planningDirectionDTO.getId() + " deleted.",
					"uri=/planningdirections/" + planningDirectionDTO.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "PlanningDirection with id " + planningDirectionDTO.getId() + " not found.",
				"uri=/planningdirections/" + planningDirectionDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

}
