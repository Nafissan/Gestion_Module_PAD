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
import sn.pad.pe.pss.dto.DossierAbsenceDTO;
import sn.pad.pe.pss.services.DossierAbsenceService;

/**
 * 
 * @author abdou.diop
 *
 */
@RestController
@Api(value = "APi pour l'entité DossierAbsence")
public class DossierAbsenceController {
	@Autowired
	private DossierAbsenceService dossierAbsenceService;
	Message message;

	@ApiOperation(value = "Liste des dossiers absence", response = DossierAbsenceDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/dossierabsences")
	public ResponseEntity<List<DossierAbsenceDTO>> getDossierAbsences() {
		List<DossierAbsenceDTO> dossierAbsenceDTOs = dossierAbsenceService.getDossierAbsences();
		return ResponseEntity.status(HttpStatus.OK).body(dossierAbsenceDTOs);
	}

	@ApiOperation(value = "Recupération d'un dossier absence selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/dossierabsences/{id}")
	public ResponseEntity<DossierAbsenceDTO> getById(@PathVariable(value = "id") Long id) {
		DossierAbsenceDTO dossierAbsenceDTO = dossierAbsenceService.getDossierAbsenceById(id);
		return ResponseEntity.status(HttpStatus.OK).body(dossierAbsenceDTO);
	}

	@ApiOperation(value = "Création de la ressource dossier absence fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/dossierabsences")
	public ResponseEntity<DossierAbsenceDTO> create(@RequestBody DossierAbsenceDTO dossierAbsenceDTO) {
		DossierAbsenceDTO dossierAbsenceCreated = dossierAbsenceService.createDossierAbsence(dossierAbsenceDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(dossierAbsenceCreated);
	}

	@ApiOperation(value = "Mise à jour de la ressource dossier absence fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/dossierabsences")
	public ResponseEntity<Message> update(@RequestBody DossierAbsenceDTO dossierAbsenceDTO) {
		boolean isUpdated = dossierAbsenceService.updateDossierAbsence(dossierAbsenceDTO);
		if (isUpdated) {
			message = new Message(new Date(), "DossierAbsence with id " + dossierAbsenceDTO.getId() + " updated.",
					"uri=/dossierabsences/" + dossierAbsenceDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "DossierAbsence with id " + dossierAbsenceDTO.getId() + " not found.",
				"uri=/dossierabsences/" + dossierAbsenceDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@ApiOperation(value = "Suppression de la ressource dossier absence selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/dossierabsences")
	public ResponseEntity<Message> delete(@RequestBody DossierAbsenceDTO dossierAbsenceDTO) {
		boolean isDeleted = dossierAbsenceService.deteleDossierAbsence(dossierAbsenceDTO);
		if (isDeleted) {
			message = new Message(new Date(), "DossierAbsence with id " + dossierAbsenceDTO.getId() + " deleted.",
					"uri=/dossierabsences/" + dossierAbsenceDTO.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "DossierAbsence with id " + dossierAbsenceDTO.getId() + " not found.",
				"uri=/dossierabsences/" + dossierAbsenceDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Recupération de dossier selon l'année", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/dossierabsences/annee/{annee}")
	public ResponseEntity<List<DossierAbsenceDTO>> getDossierAbsenceByAnnee(@PathVariable(value = "annee") int annee) {
		List<DossierAbsenceDTO> dossierAbsence = dossierAbsenceService.findDossierAbsenceByAnnee(annee);
		return ResponseEntity.status(HttpStatus.OK).body(dossierAbsence);
	}
}
