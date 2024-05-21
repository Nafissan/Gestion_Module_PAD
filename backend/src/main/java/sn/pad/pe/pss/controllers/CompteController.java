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
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.CompteDTO;
import sn.pad.pe.pss.services.CompteService;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@RestController
@Api(value = "APi pour l'entité Compte")
public class CompteController {

	@Autowired
	private CompteService compteService;

	Message message;

	@ApiOperation(value = "Listes des comptes", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/comptes")
	public ResponseEntity<List<CompteDTO>> getComptes() {
		List<CompteDTO> compteDTOs = compteService.getComptes();
		return new ResponseEntity<List<CompteDTO>>(compteDTOs, HttpStatus.OK);
	}

	@ApiOperation(value = "Recupération d'un compte selon l'identifiant fournit en paramètre", response = AgentDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/comptes/{name}")
	public ResponseEntity<CompteDTO> getCompteById(@PathVariable(value = "name") Long name) {
		CompteDTO compteDto = compteService.getCompteById(name);
		return ResponseEntity.ok().body(compteDto);
	}

	@ApiOperation(value = "Recupération d'un compte selon username", response = AgentDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/comptes/username/{username}")
	public ResponseEntity<CompteDTO> getCompteByUsername(@PathVariable(value = "username") String username) {
		CompteDTO compteDto = compteService.getCompteByUsername(username);
		return ResponseEntity.ok().body(compteDto);
	}

	@ApiOperation(value = "Création la ressource compte fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/comptes")
	public ResponseEntity<CompteDTO> create(@RequestBody CompteDTO compteDto) {
		return new ResponseEntity<CompteDTO>(compteService.create(compteDto), HttpStatus.CREATED);
	}

	@ApiOperation(value = "Mise à jour de de la ressource compte fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/comptes")
	public ResponseEntity<Message> update(@RequestBody CompteDTO compteDto) {
		if (compteService.update(compteDto)) {
			message = new Message(new Date(), "CompteDTO with id " + compteDto.getUsername() + " updated.",
					"uri=/comptes/" + compteDto.getUsername());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "CompteDTO with id " + compteDto.getUsername() + " not found.",
				"uri=/comptes/" + compteDto.getUsername());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Mise à jour de plusieurs comptes fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/comptes/many")
	public ResponseEntity<Message> updateMany(@RequestBody List<CompteDTO> compteDtos) {
		if (compteService.updateMany(compteDtos)) {
			message = new Message(new Date(), "CompteDTOs updated.", "uri=/comptes/");
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "CompteDTOs not updated.", "uri=/comptes/");
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Mise à jour mot de passe du compte ", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/comptes/{oldPassword}/{newPassword}")
	public ResponseEntity<Message> updateCompteWithNewPAssword(@RequestBody CompteDTO compteDto,
			@PathVariable("oldPassword") String oldPassword, @PathVariable("newPassword") String newPassword) {
		if (compteService.update(compteDto, oldPassword, newPassword)) {
			message = new Message(new Date(), "CompteDTO with id " + compteDto.getId() + " updated.",
					"uri=/comptes/" + compteDto.getUsername());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "CompteDTO with id " + compteDto.getId() + " not found.",
				"uri=/comptes/" + compteDto.getUsername());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'un compte selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/comptes")
	public ResponseEntity<Message> delete(@RequestBody CompteDTO compteDto) {
		if (compteService.delete(compteDto)) {
			message = new Message(new Date(), "CompteDTO with id " + compteDto.getUsername() + " deleted.",
					"uri=/comptes/" + compteDto.getUsername());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "CompteDTO with id " + compteDto.getUsername() + " not found.",
				"uri=/comptes/" + compteDto.getUsername());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Mise à jour mot de passe du compte ", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/comptes/token/{token}/password/{newPassword}")
	public ResponseEntity<Message> updateCompteWithNewPAsswordForgot(@RequestBody CompteDTO compteDto,
			@PathVariable("token") String token, @PathVariable("newPassword") String newPassword) {
		System.out.println("compte : " + compteDto);
		if (compteService.updateForgot(compteDto, newPassword)) {
			message = new Message(new Date(), "CompteDTO with id " + compteDto.getId() + " updated.",
					"uri=/comptes/" + compteDto.getUsername());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "CompteDTO with id " + compteDto.getId() + " not found.",
				"uri=/comptes/" + compteDto.getUsername());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}
}
