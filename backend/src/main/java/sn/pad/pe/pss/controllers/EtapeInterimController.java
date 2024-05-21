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
import sn.pad.pe.pss.dto.EtapeInterimDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.services.EtapeInterimService;
import sn.pad.pe.pss.services.InterimService;

@RestController
@Api(value = "API pour l'entité EtapeInterimDTO")
public class EtapeInterimController {

	@Autowired
	private EtapeInterimService etapeInterimService;

	@Autowired
	private InterimService interimService;

	Message message;

	@ApiOperation(value = "Liste des etapeInterims", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/etapeInterims")
	public ResponseEntity<List<EtapeInterimDTO>> getEtapeInterims() {
		return ResponseEntity.status(HttpStatus.OK).body(etapeInterimService.getEtapeInterims());
	}

	@ApiOperation(value = "Recupération d'un interim selon l'identifiant fournit en paramètre", response = EtapeInterimDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/etapeInterims/{id}")
	public ResponseEntity<EtapeInterimDTO> getEtapeInterimById(@PathVariable(value = "id") Long id) {
		EtapeInterimDTO etapeInterimDTO = etapeInterimService.getEtapeInterimById(id);
		return new ResponseEntity<EtapeInterimDTO>(etapeInterimDTO, HttpStatus.OK);
	}

	@ApiOperation(value = "Création la ressource EtapeInterimDTO fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PostMapping("/etapeInterims")
	public ResponseEntity<EtapeInterimDTO> create(@RequestBody EtapeInterimDTO etapeInterimDTO) {
		// InterimDTO interimDTO =
		// interimService.getInterimById(etapeInterimDTO.getInterim().getId());
		// interimDTO.setEtat(etapeInterimDTO.getAction());
		// interimService.create(interimDTO);
		return new ResponseEntity<EtapeInterimDTO>(etapeInterimService.create(etapeInterimDTO), HttpStatus.CREATED);
	}

	@ApiOperation(value = "Mise à jour de de la ressource EtapeInterimDTO fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/etapeInterims")
	public ResponseEntity<Message> update(@RequestBody EtapeInterimDTO etapeInterimDTO) {

		if (etapeInterimService.update(etapeInterimDTO)) {
			message = new Message(new Date(), "EtapeInterimDTO with id " + etapeInterimDTO.getId() + " updated.",
					"uri=/etapeInterims/" + etapeInterimDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EtapeInterimDTO with id " + etapeInterimDTO.getId() + " not found.",
				"uri=/etapeInterims/" + etapeInterimDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'un EtapeInterimDTO selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/etapeInterims")
	public ResponseEntity<Message> delete(@RequestBody EtapeInterimDTO etapeInterimDTO) {

		if (etapeInterimService.delete(etapeInterimDTO)) {
			message = new Message(new Date(), "EtapeInterimDTO with id " + etapeInterimDTO.getId() + " deleted.",
					"uri=/etapeInterims/" + etapeInterimDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EtapeInterimDTO with id " + etapeInterimDTO.getId() + " not found.",
				"uri=/etapeInterims/" + etapeInterimDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Liste des interims", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/etapeInterims/interim/{id}")
	public ResponseEntity<List<EtapeInterimDTO>> getEtapeInterimsByInterim(@PathVariable(value = "id") Long id) {
		InterimDTO interimDTO = interimService.getInterimById(id);
		return ResponseEntity.status(HttpStatus.OK).body(etapeInterimService.findEtapeInterimsByInterim(interimDTO));
	}

}
