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
import sn.pad.pe.pss.dto.DossierCongeDTO;
import sn.pad.pe.pss.services.DossierCongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@RestController
@Api(value = "APi pour l'entité DossierConge")
public class DossierCongeController {
	@Autowired
	private DossierCongeService dossierCongeService;
	Message message;

	@ApiOperation(value = "Liste des dossiers congé", response = DossierCongeDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/dossierconges")
	public ResponseEntity<List<DossierCongeDTO>> getDossierConges() {
		List<DossierCongeDTO> dossierCongeDTOs = dossierCongeService.getDossierConges();
		return ResponseEntity.status(HttpStatus.OK).body(dossierCongeDTOs);
	}

	@ApiOperation(value = "Recupération d'un dossier congé selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/dossierconges/{id}")
	public ResponseEntity<DossierCongeDTO> getById(@PathVariable(value = "id") Long id) {
		DossierCongeDTO dossierCongeDTO = dossierCongeService.getDossierCongeById(id);
		return ResponseEntity.status(HttpStatus.OK).body(dossierCongeDTO);
	}

	@ApiOperation(value = "Recupération d'un dossier congé selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/dossierconges/annee/{annee}")
	public ResponseEntity<DossierCongeDTO> getById(@PathVariable(value = "annee") String annee) {
		DossierCongeDTO dossierCongeDTO = dossierCongeService.getDossierCongeByAnnee(annee);
		return ResponseEntity.status(HttpStatus.OK).body(dossierCongeDTO);
	}

	@ApiOperation(value = "Création de la ressource dossier congé fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/dossierconges")
	public ResponseEntity<DossierCongeDTO> create(@RequestBody DossierCongeDTO dossierCongeDTO) {
		DossierCongeDTO dossierCongeCreated = dossierCongeService.createDossierConge(dossierCongeDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(dossierCongeCreated);
	}

	@ApiOperation(value = "Mise à jour de la ressource dossier congé fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/dossierconges")
	public ResponseEntity<Message> update(@RequestBody DossierCongeDTO dossierCongeDTO) {
		boolean isUpdated = dossierCongeService.updateDossierConge(dossierCongeDTO);
		if (isUpdated) {
			message = new Message(new Date(), "DossierConge with id " + dossierCongeDTO.getId() + " updated.",
					"uri=/dossierconges/" + dossierCongeDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "DossierConge with id " + dossierCongeDTO.getId() + " not found.",
				"uri=/dossierconges/" + dossierCongeDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@ApiOperation(value = "Suppression de la ressource dossier congé selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/dossierconges")
	public ResponseEntity<Message> delete(@RequestBody DossierCongeDTO dossierCongeDTO) {
		boolean isDeleted = dossierCongeService.deteleDossierConge(dossierCongeDTO);
		if (isDeleted) {
			message = new Message(new Date(), "DossierConge with id " + dossierCongeDTO.getId() + " deleted.",
					"uri=/dossierconges/" + dossierCongeDTO.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "DossierConge with id " + dossierCongeDTO.getId() + " not found.",
				"uri=/dossierconges/" + dossierCongeDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

}
