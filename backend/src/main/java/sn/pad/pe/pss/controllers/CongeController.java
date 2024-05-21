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
import sn.pad.pe.pss.dto.CongeDTO;
import sn.pad.pe.pss.services.CongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@RestController
@Api(value = "APi pour l'entité Conge")
public class CongeController {
	@Autowired
	private CongeService congeService;
	Message message;

	@ApiOperation(value = "Liste des congés", response = CongeDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/conges")
	public ResponseEntity<List<CongeDTO>> getConges() {
		List<CongeDTO> congeDTOs = congeService.getConges();
		return ResponseEntity.status(HttpStatus.OK).body(congeDTOs);
	}

	@ApiOperation(value = "Liste des congés", response = CongeDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/conges/planningConge/{id}")
	public ResponseEntity<List<CongeDTO>> getCongesByPlanningConge(@PathVariable(value = "id") Long id) {
		List<CongeDTO> congeDTOs = congeService.getCongesByPlanningConge(id);
		return ResponseEntity.status(HttpStatus.OK).body(congeDTOs);
	}

	@ApiOperation(value = "Liste des congés", response = CongeDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/conges/agent/{id}")
	public ResponseEntity<List<CongeDTO>> getCongesByAgent(@PathVariable(value = "id") Long id) {
		List<CongeDTO> congeDTOs = congeService.getCongeByAgent(id);
		return ResponseEntity.status(HttpStatus.OK).body(congeDTOs);
	}

	@ApiOperation(value = "Liste des congés", response = CongeDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/conges/etat/{etat}/planningConge/{id}")
	public ResponseEntity<List<CongeDTO>> getCongesByEtat(@PathVariable(value = "etat") String etat,
			@PathVariable(value = "id") Long id) {
		List<CongeDTO> congeDTOs = congeService.getCongesByPlanningCongeAndEtat(id, etat);
		return ResponseEntity.status(HttpStatus.OK).body(congeDTOs);
	}

	@ApiOperation(value = "Recupération d'un congé selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/conges/{id}")
	public ResponseEntity<CongeDTO> getById(@PathVariable(value = "id") Long id) {
		CongeDTO conge = congeService.getCongeById(id);
		return ResponseEntity.status(HttpStatus.OK).body(conge);
	}

	@ApiOperation(value = "Création de la ressource congé fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PostMapping("/conges")
	public ResponseEntity<CongeDTO> create(@RequestBody CongeDTO congeDTO) {
		CongeDTO congeCreated = congeService.createConge(congeDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(congeCreated);
	}

	@ApiOperation(value = "Création des congés fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PostMapping("/conges/all")
	public ResponseEntity<List<CongeDTO>> create(@RequestBody List<CongeDTO> congesDTO) {
		List<CongeDTO> congesCreated = congeService.createAllConge(congesDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(congesCreated);
	}

	@ApiOperation(value = "Mise à jour de la ressource congé fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/conges")
	public ResponseEntity<Message> update(@RequestBody CongeDTO congeDTO) {
		boolean isUpdated = congeService.updateConge(congeDTO);
		if (isUpdated) {
			message = new Message(new Date(), "Conge with id " + congeDTO.getId() + " updated.",
					"uri=/conges/" + congeDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Conge with id " + congeDTO.getId() + " not found.",
				"uri=/conges/" + congeDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Mise à jour des ressources congé passées en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/conges/many")
	public ResponseEntity<Message> updateMany(@RequestBody List<CongeDTO> congeDTOs) {
		boolean isUpdated = congeService.updateCongeMany(congeDTOs);
		if (isUpdated) {
			message = new Message(new Date(), "List Conge " + congeDTOs.toString() + " updated.",
					"uri=/conges/" + congeDTOs.toString());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "List Conge " + congeDTOs.toString() + " not found.",
				"uri=/conges/" + congeDTOs.toString());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression de la ressource congé selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/conges")
	public ResponseEntity<Message> delete(@RequestBody CongeDTO congeDTO) {
		boolean isDeleted = congeService.deteleConge(congeDTO);
		if (isDeleted) {
			message = new Message(new Date(), "rConge with id " + congeDTO.getId() + " deleted.",
					"uri=/conges/" + congeDTO.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "Conge with id " + congeDTO.getId() + " not found.",
				"uri=/conges/" + congeDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@GetMapping("/conges/dossierconges/{idDossierConge}")
	public ResponseEntity<List<CongeDTO>> getCongeByDossier(
			@PathVariable(value = "idDossierConge") Long idDossierConge) {
		List<CongeDTO> congeDTOs = congeService.getCongeByDossierConge(idDossierConge);
		return ResponseEntity.status(HttpStatus.OK).body(congeDTOs);
	}

//	@GetMapping("/conges/{annee}")
//	public ResponseEntity<List<CongeDTO>> getAllCongeByAnnee(@PathVariable(value = "annee") int annee) {
//		List<CongeDTO> congeDTOs = congeService.getAllCongeByAnne(annee);
//		return ResponseEntity.status(HttpStatus.OK).body(congeDTOs);
//	}
	@GetMapping("/conges/planningConge/{id}/annee/{annee}")
	public ResponseEntity<List<CongeDTO>> getCongesByPlanningCongeAndAnnee(@PathVariable(value = "id") Long id,
			@PathVariable(value = "annee") String annee) {
		List<CongeDTO> congeDTOs = congeService.getCongesByPlanningCongeAndAnnee(id, annee);
		return ResponseEntity.status(HttpStatus.OK).body(congeDTOs);
	}
}
