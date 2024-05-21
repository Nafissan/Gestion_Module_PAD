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
import sn.pad.pe.pss.dto.HistoriqueCongeDTO;
import sn.pad.pe.pss.services.HistoriqueCongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@RestController
@Api(value = "APi pour l'entité HistoriqueConge")
public class HistoriqueCongeController {
	@Autowired
	private HistoriqueCongeService historiqueCongeService;
	Message message;

	@ApiOperation(value = "Liste des historiques congés", response = HistoriqueCongeDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/historiqueconges")
	public ResponseEntity<List<HistoriqueCongeDTO>> getHistoriqueConges() {
		List<HistoriqueCongeDTO> historiqueCongeDTOs = historiqueCongeService.getHistoriqueConges();
		return ResponseEntity.status(HttpStatus.OK).body(historiqueCongeDTOs);
	}

	@ApiOperation(value = "Liste des historiques congés", response = HistoriqueCongeDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/historiqueconges/conge/{idConge}")
	public ResponseEntity<List<HistoriqueCongeDTO>> getHistoriqueCongesByConge(
			@PathVariable(value = "idConge") Long idConge) {
		List<HistoriqueCongeDTO> historiqueCongeDTOs = historiqueCongeService.getHistoriqueCongesByConge(idConge);
		return ResponseEntity.status(HttpStatus.OK).body(historiqueCongeDTOs);
	}

	@ApiOperation(value = "Recupération d'un historique congé selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/historiqueconges/{id}")
	public ResponseEntity<HistoriqueCongeDTO> getAgentById(@PathVariable(value = "id") Long id) {
		HistoriqueCongeDTO historiqueConge = historiqueCongeService.getHistoriqueCongeById(id);
		return ResponseEntity.status(HttpStatus.OK).body(historiqueConge);
	}

	@ApiOperation(value = "Création de la ressource historique congé fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PostMapping("/historiqueconges")
	public ResponseEntity<HistoriqueCongeDTO> create(@RequestBody HistoriqueCongeDTO historiqueCongeDTO) {
		HistoriqueCongeDTO historiqueCongeCreated = historiqueCongeService.createHistoriqueConge(historiqueCongeDTO);
		return new ResponseEntity<HistoriqueCongeDTO>(historiqueCongeCreated, HttpStatus.CREATED);
	}

	@ApiOperation(value = "Mise à jour de la ressource historique congé fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/historiqueconges")
	public ResponseEntity<Message> update(@RequestBody HistoriqueCongeDTO historiqueCongeDTO) {
		boolean isUpdated = historiqueCongeService.updateHistoriqueConge(historiqueCongeDTO);
		if (isUpdated) {
			message = new Message(new Date(), "HistoriqueConge with id " + historiqueCongeDTO.getId() + " updated.",
					"uri=/historiqueconges/" + historiqueCongeDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "HistoriqueConge with id " + historiqueCongeDTO.getId() + " not found.",
				"uri=/historiqueconges/" + historiqueCongeDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@ApiOperation(value = "Suppression de la ressource historique congé selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/historiqueconges")
	public ResponseEntity<Message> delete(@RequestBody HistoriqueCongeDTO historiqueCongeDTO) {
		boolean isDeleted = historiqueCongeService.deteleHistoriqueConge(historiqueCongeDTO);
		if (isDeleted) {
			message = new Message(new Date(), "rHistoriqueConge with id " + historiqueCongeDTO.getId() + " deleted.",
					"uri=/historiqueconges/" + historiqueCongeDTO.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "HistoriqueConge with id " + historiqueCongeDTO.getId() + " not found.",
				"uri=/historiqueconges/" + historiqueCongeDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}
}
