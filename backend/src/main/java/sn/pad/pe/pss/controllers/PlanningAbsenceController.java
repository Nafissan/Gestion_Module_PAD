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
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.services.PlanningAbsenceService;

/**
 * 
 * @author abdou.diop
 *
 */
@RestController
@Api(value = "APi pour l'entité PlanningAbsence")
public class PlanningAbsenceController {
	@Autowired
	private PlanningAbsenceService planningAbsenceService;
	Message message;

	@ApiOperation(value = "Liste des plannings absence", response = PlanningAbsenceDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningabsences")
	public ResponseEntity<List<PlanningAbsenceDTO>> getPlanningAbsences() {
		List<PlanningAbsenceDTO> planningAbsencesDTOs = planningAbsenceService.getPlanningAbsences();
		return ResponseEntity.status(HttpStatus.OK).body(planningAbsencesDTOs);
	}

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningabsences/dossierAbsence/{idDossierAbsence}/uniteOrganisationnelle/{idUniteOrganisationnelle}")
	public ResponseEntity<List<PlanningAbsenceDTO>> getPlanningCongesByidPlanningDirectionAndUniteOrganisationnelle(
			@PathVariable(value = "idDossierAbsence") Long idDossierAbsence,
			@PathVariable(value = "idUniteOrganisationnelle") Long idUniteOrganisationnelle) {
		List<PlanningAbsenceDTO> planningAbsenceDTOs = planningAbsenceService
				.getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(idDossierAbsence,
						idUniteOrganisationnelle);
		return ResponseEntity.status(HttpStatus.OK).body(planningAbsenceDTOs);
	}

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningabsences/dossierAbsence/{idDossierAbsence}/uniteOrganisationnelles/{idUniteOrganisationnelles}")
	public ResponseEntity<List<PlanningAbsenceDTO>> getPlanningBydUniteOrganisationnellesInferieures(
			@PathVariable(value = "idDossierAbsence") Long idDossierAbsence,
			@PathVariable(value = "idUniteOrganisationnelles") List<Long> idUniteOrganisationnelles) {
		List<PlanningAbsenceDTO> planningAbsenceDTOs = planningAbsenceService
				.getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelles(idDossierAbsence,
						idUniteOrganisationnelles);
		return ResponseEntity.status(HttpStatus.OK).body(planningAbsenceDTOs);
	}

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningabsences/dossierAbsence/{idDossierAbsence}/uniteOrganisationnelle/{idUniteOrganisationnelle}/etat/{etat}")
	public ResponseEntity<List<PlanningAbsenceDTO>> getPlanningCongesByidPlanningDirectionAndUniteOrganisationnelleAndEtat(
			@PathVariable(value = "idDossierAbsence") Long idDossierAbsence,
			@PathVariable(value = "idUniteOrganisationnelle") Long idUniteOrganisationnelle,
			@PathVariable(value = "etat") String etat) {
		List<PlanningAbsenceDTO> planningAbsenceDTOs = planningAbsenceService
				.getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(idDossierAbsence,
						idUniteOrganisationnelle, etat);

		return ResponseEntity.status(HttpStatus.OK).body(planningAbsenceDTOs);
	}

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/planningabsences/dossierAbsence/{idDossierAbsence}")
	public ResponseEntity<List<PlanningAbsenceDTO>> getPlanningCongesByidPlanningDirection(
			@PathVariable(value = "idDossierAbsence") Long idDossierAbsence) {
		List<PlanningAbsenceDTO> planningAbsenceDTOs = planningAbsenceService
				.getPlanningAbsencesByDossierAbsence(idDossierAbsence);
		return ResponseEntity.status(HttpStatus.OK).body(planningAbsenceDTOs);
	}

	@ApiOperation(value = "Recupération d'un planning absence selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/planningabsences/{id}")
	public ResponseEntity<PlanningAbsenceDTO> getById(@PathVariable(value = "id") Long id) {
		PlanningAbsenceDTO planningAbsence = planningAbsenceService.getPlanningAbsenceById(id);
		return ResponseEntity.status(HttpStatus.OK).body(planningAbsence);
	}

	@ApiOperation(value = "Création de la ressource planning absence fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PostMapping("/planningabsences")
	public ResponseEntity<PlanningAbsenceDTO> create(@RequestBody PlanningAbsenceDTO planningAbsenceDTO) {
		PlanningAbsenceDTO planningAbsenceCreated = planningAbsenceService.createPlanningAbsence(planningAbsenceDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(planningAbsenceCreated);
	}

	@ApiOperation(value = "Mise à jour de la ressource planning absence fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/planningabsences")
	public ResponseEntity<Message> update(@RequestBody PlanningAbsenceDTO planningAbsenceDTO) {
		boolean isUpdated = planningAbsenceService.updatePlanningAbsence(planningAbsenceDTO);
		if (isUpdated) {
			message = new Message(new Date(), "PlanningAbsence with id " + planningAbsenceDTO.getId() + " updated.",
					"uri=/planningabsences/" + planningAbsenceDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "PlanningAbsence with id " + planningAbsenceDTO.getId() + " not found.",
				"uri=/planningabsences/" + planningAbsenceDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@ApiOperation(value = "Suppression de la ressource dossier planning selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/planningabsences")
	public ResponseEntity<Message> delete(@RequestBody PlanningAbsenceDTO planningAbsenceDTO) {
		boolean isDeleted = planningAbsenceService.detelePlanningAbsence(planningAbsenceDTO);
		if (isDeleted) {
			message = new Message(new Date(), "PlanningAbsence with id " + planningAbsenceDTO.getId() + " deleted.",
					"uri=/planningabsences/" + planningAbsenceDTO.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "PlanningAbsence with id " + planningAbsenceDTO.getId() + " not found.",
				"uri=/planningabsences/" + planningAbsenceDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}
}
