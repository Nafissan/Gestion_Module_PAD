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
import sn.pad.pe.pss.dto.PlanningCongeDTO;
import sn.pad.pe.pss.services.PlanningCongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@RestController
@Api(value = "APi pour l'entité PlanningConge")
public class PlanningCongeController {
	@Autowired
	private PlanningCongeService planningCongeService;
	Message message;

	@ApiOperation(value = "Liste des plannings congé", response = PlanningCongeDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningconges")
	public ResponseEntity<List<PlanningCongeDTO>> getPlanningConges() {
		List<PlanningCongeDTO> planningCongeDTOs = planningCongeService.getPlanningConges();
		return ResponseEntity.status(HttpStatus.OK).body(planningCongeDTOs);
	}

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningconges/planningDirection/{idPlanningDirection}/uniteOrganisationnelle/{idUniteOrganisationnelle}")
	public ResponseEntity<List<PlanningCongeDTO>> getPlanningCongesByidPlanningDirectionAndUniteOrganisationnelle(
			@PathVariable(value = "idPlanningDirection") Long idPlanningDirection,
			@PathVariable(value = "idUniteOrganisationnelle") Long idUniteOrganisationnelle) {
		List<PlanningCongeDTO> planningCongeDTOs = planningCongeService
				.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(idPlanningDirection,
						idUniteOrganisationnelle);
		return ResponseEntity.status(HttpStatus.OK).body(planningCongeDTOs);
	}

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningconges/planningDirection/{idPlanningDirection}/uniteOrganisationnelles/{idUniteOrganisationnelles}")
	public ResponseEntity<List<PlanningCongeDTO>> getPlanningCongesByidPlanningDirectionAndUniteOrganisationnelles(
			@PathVariable(value = "idPlanningDirection") Long idPlanningDirection,
			@PathVariable(value = "idUniteOrganisationnelles") List<Long> idUniteOrganisationnelles) {
		List<PlanningCongeDTO> planningCongeDTOs = planningCongeService
				.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelles(idPlanningDirection,
						idUniteOrganisationnelles);
		return ResponseEntity.status(HttpStatus.OK).body(planningCongeDTOs);
	}

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningconges/planningDirection/{idPlanningDirection}/uniteOrganisationnelle/{idUniteOrganisationnelle}/etat/{etat}")
	public ResponseEntity<List<PlanningCongeDTO>> getPlanningCongesByidPlanningDirectionAndUniteOrganisationnelleAndEtat(
			@PathVariable(value = "idPlanningDirection") Long idPlanningDirection,
			@PathVariable(value = "idUniteOrganisationnelle") Long idUniteOrganisationnelle,
			@PathVariable(value = "etat") String etat) {
		List<PlanningCongeDTO> planningCongeDTOs = planningCongeService
				.getPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(idPlanningDirection,
						idUniteOrganisationnelle, etat);
		return ResponseEntity.status(HttpStatus.OK).body(planningCongeDTOs);
	}

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningconges/planningDirection/{idPlanningDirection}")
	public ResponseEntity<List<PlanningCongeDTO>> getPlanningCongesByidPlanningDirection(
			@PathVariable(value = "idPlanningDirection") Long idPlanningDirection) {
		List<PlanningCongeDTO> planningCongeDTOs = planningCongeService
				.getPlanningCongesByPlanningDirection(idPlanningDirection);
		return ResponseEntity.status(HttpStatus.OK).body(planningCongeDTOs);
	}

	@ApiOperation(value = "Recupération d'un planning congé selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/planningconges/{id}")
	public ResponseEntity<PlanningCongeDTO> getById(@PathVariable(value = "id") Long id) {
		PlanningCongeDTO planningConge = planningCongeService.getPlanningCongeById(id);
		return ResponseEntity.status(HttpStatus.OK).body(planningConge);
	}

	@ApiOperation(value = "Création de la ressource planning congé fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PostMapping("/planningconges")
	public ResponseEntity<PlanningCongeDTO> create(@RequestBody PlanningCongeDTO planningCongeDTO) {
		PlanningCongeDTO planningCongeCreated = planningCongeService.createPlanningConge(planningCongeDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(planningCongeCreated);
	}

	@ApiOperation(value = "Mise à jour de la ressource planning congé fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/planningconges")
	public ResponseEntity<Message> update(@RequestBody PlanningCongeDTO planningCongeDTO) {
		boolean isUpdated = planningCongeService.updatePlanningConge(planningCongeDTO);
		if (isUpdated) {
			message = new Message(new Date(), "PlanningConge with id " + planningCongeDTO.getId() + " updated.",
					"uri=/planningconges/" + planningCongeDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "PlanningConge with id " + planningCongeDTO.getId() + " not found.",
				"uri=/planningconges/" + planningCongeDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@ApiOperation(value = "Suppression de la ressource dossier planning selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/planningconges")
	public ResponseEntity<Message> delete(@RequestBody PlanningCongeDTO planningCongeDTO) {
		boolean isDeleted = planningCongeService.detelePlanningConge(planningCongeDTO);
		if (isDeleted) {
			message = new Message(new Date(), "PlanningDirection with id " + planningCongeDTO.getId() + " deleted.",
					"uri=/planningconges/" + planningCongeDTO.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "PlanningDirection with id " + planningCongeDTO.getId() + " not found.",
				"uri=/planningconges/" + planningCongeDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}
}
