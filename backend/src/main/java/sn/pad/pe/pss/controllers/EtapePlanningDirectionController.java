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
import sn.pad.pe.pss.dto.EtapePlanningDirectionDTO;
import sn.pad.pe.pss.services.EtatpePlanningDirectionService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@RestController
@Api(value = "APi pour l'entité EtapePlanningDirection")
public class EtapePlanningDirectionController {
	@Autowired
	private EtatpePlanningDirectionService etatpePlanningDirectionService;
	Message message;

	@ApiOperation(value = "Liste des étapes de planning", response = EtapePlanningDirectionDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/etapeplannings")
	public ResponseEntity<List<EtapePlanningDirectionDTO>> getEtapePlannings() {
		List<EtapePlanningDirectionDTO> etapePlanningDirectionDTOs = etatpePlanningDirectionService
				.getEtatpePlanningDirections();
		return ResponseEntity.status(HttpStatus.OK).body(etapePlanningDirectionDTOs);
	}

	@ApiOperation(value = "Liste des étapes de planning", response = EtapePlanningDirectionDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/etapeplannings/planningDirection/{idPlanningDirection}")
	public ResponseEntity<List<EtapePlanningDirectionDTO>> getEtapePlanningsByPlanningDirection(
			@PathVariable(value = "idPlanningDirection") Long idPlanningDirection) {
		List<EtapePlanningDirectionDTO> etapePlanningDirectionDTOs = etatpePlanningDirectionService
				.getEtatpePlanningDirectionsByPlanningDirection(idPlanningDirection);
		return ResponseEntity.status(HttpStatus.OK).body(etapePlanningDirectionDTOs);
	}

	@ApiOperation(value = "Recupération d'un étape planning selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/etapeplannings/{id}")
	public ResponseEntity<EtapePlanningDirectionDTO> getById(@PathVariable(value = "id") Long id) {
		EtapePlanningDirectionDTO etapeplanning = etatpePlanningDirectionService.getEtatpePlanningDirectionById(id);
		return ResponseEntity.status(HttpStatus.OK).body(etapeplanning);
	}

	@ApiOperation(value = "Création de la ressource étape planning fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PostMapping("/etapeplannings")
	public ResponseEntity<EtapePlanningDirectionDTO> create(@RequestBody EtapePlanningDirectionDTO etapeplanningDTO) {
		EtapePlanningDirectionDTO etapeplanningCreated = etatpePlanningDirectionService
				.createEtatpePlanningDirection(etapeplanningDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(etapeplanningCreated);
	}

	@ApiOperation(value = "Mise à jour de la ressource étape planning fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/etapeplannings")
	public ResponseEntity<Message> update(@RequestBody EtapePlanningDirectionDTO etapeplanningDTO) {
		boolean isUpdated = etatpePlanningDirectionService.updateEtatpePlanningDirection(etapeplanningDTO);
		if (isUpdated) {
			message = new Message(new Date(),
					"EtapePlanningDirection with id " + etapeplanningDTO.getId() + " updated.",
					"uri=/etapeplannings/" + etapeplanningDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EtapePlanningDirection with id " + etapeplanningDTO.getId() + " not found.",
				"uri=/etapeplannings/" + etapeplanningDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@ApiOperation(value = "Suppression de la ressource étape planning selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/etapeplannings")
	public ResponseEntity<Message> delete(@RequestBody EtapePlanningDirectionDTO etapeplanningDTO) {
		boolean isDeleted = etatpePlanningDirectionService.deteleEtatpePlanningDirection(etapeplanningDTO);
		if (isDeleted) {
			message = new Message(new Date(), "rEtapePlanning with id " + etapeplanningDTO.getId() + " deleted.",
					"uri=/etapeplannings/" + etapeplanningDTO.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "EtapePlanningDirection with id " + etapeplanningDTO.getId() + " not found.",
				"uri=/etapeplannings/" + etapeplanningDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}
}
