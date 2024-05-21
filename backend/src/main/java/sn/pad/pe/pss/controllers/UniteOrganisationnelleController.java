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
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

@RestController
@Api(value = "API pour l'entité uniteOrganisationnelle")
public class UniteOrganisationnelleController {

	@Autowired
	private UniteOrganisationnelleService uniteOrganisationnelleService;
	Message message;

	@ApiOperation(value = "Liste des unités organisationnelles", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/uniteOrganisationnelles")
	public List<UniteOrganisationnelleDTO> getUniteOrganisationnelles() {
		return uniteOrganisationnelleService.getUniteOrganisationnelles();
	}

	@ApiOperation(value = "Recupération d'une unité organisationnelle selon l'identifiant fournit en paramètre", response = UniteOrganisationnelleDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/uniteOrganisationnelles/{id}")
	public ResponseEntity<UniteOrganisationnelleDTO> getUniteOrganisationnelleById(
			@PathVariable(value = "id") Long id) {
		UniteOrganisationnelleDTO uniteOrganisationnelle = uniteOrganisationnelleService
				.getUniteOrganisationnelleById(id);
		return ResponseEntity.ok().body(uniteOrganisationnelle);
	}

	@ApiOperation(value = "Recupération d'une unité organisationnelle selon l'identifiant fournit en paramètre", response = UniteOrganisationnelleDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/uniteOrganisationnelles/code/{code}")
	public ResponseEntity<UniteOrganisationnelleDTO> getUniteOrganisationnelleByCode(
			@PathVariable(value = "code") String code) {
		UniteOrganisationnelleDTO uniteOrganisationnelle = uniteOrganisationnelleService
				.getUniteOrganisationnelleByCode(code);
		return ResponseEntity.ok().body(uniteOrganisationnelle);
	}

	@ApiOperation(value = "Création la ressource uniteOrganisationnelle fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/uniteOrganisationnelles")
	public ResponseEntity<UniteOrganisationnelleDTO> create(
			@RequestBody UniteOrganisationnelleDTO uniteOrganisationnelleDto) {
		return ResponseEntity.ok().body(uniteOrganisationnelleService.create(uniteOrganisationnelleDto));
	}

	@ApiOperation(value = "Mise à jour de de la ressource uniteOrganisationnelle fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/uniteOrganisationnelles")
	public ResponseEntity<Message> update(@RequestBody UniteOrganisationnelleDTO uniteOrganisationnelleDto) {
		if (uniteOrganisationnelleService.update(uniteOrganisationnelleDto)) {
			message = new Message(new Date(),
					"UniteOrganisationnelle with id " + uniteOrganisationnelleDto.getId() + " updated.",
					"uri=/uniteOrganisationnelles/" + uniteOrganisationnelleDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"UniteOrganisationnelle with id " + uniteOrganisationnelleDto.getId() + " not found.",
				"uri=/uniteOrganisationnelles/" + uniteOrganisationnelleDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'une unite organisationnelle selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/uniteOrganisationnelles")
	public ResponseEntity<Message> delete(@RequestBody UniteOrganisationnelleDTO uniteOrganisationnelleDto) {
		if (uniteOrganisationnelleService.delete(uniteOrganisationnelleDto)) {
			message = new Message(new Date(),
					"UniteOrganisationnelle with id " + uniteOrganisationnelleDto.getId() + " deleted.",
					"uri=/uniteOrganisationnelles/" + uniteOrganisationnelleDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"UniteOrganisationnelle with id " + uniteOrganisationnelleDto.getId() + " not found.",
				"uri=/uniteOrganisationnelles/" + uniteOrganisationnelleDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Recupération des unités organisationnelles supérieures selon l'identifiant fournit en paramètre", response = UniteOrganisationnelleDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/uniteOrganisationnelles/superieures/{id}")
	public ResponseEntity<List<UniteOrganisationnelleDTO>> getUniteOrganisationnellesSuperieures(
			@PathVariable(value = "id") Long id) {
		return ResponseEntity.ok().body(uniteOrganisationnelleService.getUnitesOrganisationnellesSuperieures(id));
	}

	@ApiOperation(value = "Recupération des unités organisationnelles inférieures selon l'identifiant fournit en paramètre", response = UniteOrganisationnelleDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/uniteOrganisationnelles/inferieures/{id}")
	public ResponseEntity<List<UniteOrganisationnelleDTO>> getUniteOrganisationnellesInferieures(
			@PathVariable(value = "id") Long id) {
		return ResponseEntity.ok().body(uniteOrganisationnelleService.getUnitesOrganisationnellesInferieures(id));
	}

	@ApiOperation(value = "Recupération des unités organisationnelles superieur par niveau", response = UniteOrganisationnelleDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/uniteOrganisationnelles/niveau/{id}")
	public ResponseEntity<List<UniteOrganisationnelleDTO>> getUniteOrganisationnellesSupByNiveau(
			@PathVariable(value = "id") int niveau) {
		return ResponseEntity.ok()
				.body(uniteOrganisationnelleService.getUnitesOrganisationnellesSuperieursByNiveau(niveau));
	}

	@ApiOperation(value = "Recupération des unités organisationnelles inférieurs selon le niveau hierarchique de l'agent connecté", response = UniteOrganisationnelleDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/uniteOrganisationnelles/inferieures/agent/{id}")
	public ResponseEntity<List<UniteOrganisationnelleDTO>> getUnitesOrgInferieurByUniteOrgAgentConnecte(
			@PathVariable(value = "id") AgentDTO a) {
		return ResponseEntity.ok().body(uniteOrganisationnelleService.getUnitesOrgInferieurByUniteOrgAgentConnecte(a));
	}
}
