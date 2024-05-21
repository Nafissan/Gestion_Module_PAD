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
import sn.pad.pe.pss.dto.FonctionDTO;
import sn.pad.pe.pss.services.FonctionService;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

/**
 * 
 * @author charle.sarr
 *
 */

@RestController
@Api(value = "API pour l'entité fonction")
public class FonctionController {

	@Autowired
	private FonctionService fonctionService;

	Message message;
	@Autowired
	UniteOrganisationnelleService uniteOrganisationnelleService;

	/***************************************************************************************************************************************************************************************************************
	 * LISTE LISTE LISTE LISTE LISTE
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Liste des fonctions", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste fonction récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/fonctions")
	public List<FonctionDTO> getFonctions() {

		return fonctionService.getFonctions();
	}

	/****************************************************************************************************************************************************************************************************************
	 * GET-BY-ID GET-BY-ID GET-BY-ID GET-BY-ID GET-BY-ID
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Recupération d'une fonction selon l'identifiant fournit en paramètre", response = FonctionDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "fonction récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/fonctions/{id}")
	public ResponseEntity<FonctionDTO> getFonctionById(@PathVariable(value = "id") Long id) {

		FonctionDTO fonctionDTO = fonctionService.getFonctionById(id);

		if (fonctionDTO != null) {
			return ResponseEntity.ok().body(fonctionDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	/***************************************************************************************************************************************************************************************************************
	 * CREATE CREATE CREATE CREATE CREATE
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Création  de la ressource fonction fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "fonction Créée avec succès"),
			@ApiResponse(code = 409, message = "Cette fonction existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")

	})
	@PostMapping("/fonctions")
	public ResponseEntity<FonctionDTO> create(@RequestBody FonctionDTO fonctionDto) {

		return ResponseEntity.ok().body(fonctionService.create(fonctionDto));
	}

	/***************************************************************************************************************************************************************************************************************
	 * UPDATE UPDATE UPDATE UPDATE UPDATE
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Mise à jour de de la ressource fonction fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "fonction modifiée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/fonctions")
	public ResponseEntity<Message> update(@RequestBody FonctionDTO fonctionDto) {

		if (fonctionService.update(fonctionDto)) {
			message = new Message(new Date(), "FonctionDto with id " + fonctionDto.getId() + " updated.",
					"uri=/fonctions/" + fonctionDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "FonctionDto with id " + fonctionDto.getId() + " not found.",
				"uri=/comptes/" + fonctionDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	/***************************************************************************************************************************************************************************************************************
	 * DELETE DELETE DELETE DELETE DELETE
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Suppression d'une fonction selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Fonction supprimée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/fonctions")
	public ResponseEntity<Message> delete(@RequestBody FonctionDTO fonctionDto) {
		if (fonctionService.delete(fonctionDto)) {
			message = new Message(new Date(), "FonctionDTO with id " + fonctionDto.getId() + " deleted.",
					"uri=/fonctions/" + fonctionDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "FonctionDTO with id " + fonctionDto.getId() + " not found.",
				"uri=/fonctions/" + fonctionDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	/***************************************************************************************************************************************************************************************************************
	 * FONCTION BY NOM FONCTION BY NOM FONCTION BY NOM FONCTION BY NOM
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Liste des fonction par nom", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste fonction récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/fonctions/nom/{nom}")
	public List<FonctionDTO> getFonctionByNom(@PathVariable(value = "nom") String nom) {

		return fonctionService.getFonctionByNom(nom);
	}

	/***************************************************************************************************************************************************************************************************************
	 * FONCTION BY UniteOrganisationnelle FONCTION BY UniteOrganisationnelle
	 * FONCTION BY UniteOrganisationnelle
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Liste des fonction par UniteOrganisationnelle", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste fonction récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/fonctions/uniteOrganisationnelle/{id}")
	public List<FonctionDTO> getFonctionByUniteOrganisationnelle(@PathVariable(value = "id") Long id) {

		return fonctionService.getFonctionByUniteOrganisationnelle(id);
	}

}
