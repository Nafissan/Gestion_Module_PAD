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
import sn.pad.pe.pss.dto.NiveauHierarchiqueDTO;
import sn.pad.pe.pss.services.NiveauHierarchiqueService;

/**
 * 
 * @author charle.sarr
 *
 */

@RestController
@Api(value = "API pour l'entité Niveau")
public class NiveauHierarchiqueController {

	@Autowired
	private NiveauHierarchiqueService niveauHierarchiqueService;

	Message message;

	/***************************************************************************************************************************************************************************************************************
	 * GET-NIVEAUX-HIERARCHIQUES GET-NIVEAUX-HIERARCHIQUES GET-NIVEAUX-HIERARCHIQUES
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Liste des niveaux", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste niveau récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/niveauxHierarchiques")
	public ResponseEntity<List<NiveauHierarchiqueDTO>> getNiveauxHierarchiques() {
		return new ResponseEntity<List<NiveauHierarchiqueDTO>>(niveauHierarchiqueService.getNiveauxHierarchique(),
				HttpStatus.OK);
	}

	/****************************************************************************************************************************************************************************************************************
	 * GET-BY-ID GET-BY-ID GET-BY-ID GET-BY-ID GET-BY-ID
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Recupération d'un niveau hierarchique selon l'identifiant fournit en paramètre", response = NiveauHierarchiqueDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "niveau récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/niveauxHierarchiques/{id}")
	public ResponseEntity<NiveauHierarchiqueDTO> getNiveauHierarchiqueById(@PathVariable(value = "id") Long id) {

		NiveauHierarchiqueDTO niveauHierarchiqueDTO = niveauHierarchiqueService.getNiveauHierarchiqueById(id);

		if (niveauHierarchiqueDTO != null) {
			return ResponseEntity.ok().body(niveauHierarchiqueDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	/*******************************************************************************************************************************************************************************************************************************
	 * GET-BY-POSITION GET-BY-POSITION GET-BY-POSITION GET-BY-POSITION
	 * GET-BY-POSITION
	 ******************************************************************************************************************************************************************************************************************************/
	@ApiOperation(value = "Recupération d'un niveau hierarchique selon la position", response = NiveauHierarchiqueDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "niveau récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/niveauxHierarchiques/position/{position}")
	public ResponseEntity<NiveauHierarchiqueDTO> getNiveauHierarchiqueByPosition(
			@PathVariable(value = "position") int position) {
		NiveauHierarchiqueDTO niveauHierarchiqueDTO = niveauHierarchiqueService
				.getNiveauHierarchiqueByPosition(position);
		if (niveauHierarchiqueDTO != null) {
			return ResponseEntity.ok().body(niveauHierarchiqueDTO);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	/***************************************************************************************************************************************************************************************************************
	 * CREATE CREATE CREATE CREATE CREATE
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Création  de la ressource niveau fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "niveau Créée avec succès"),
			@ApiResponse(code = 409, message = "Cette niveau existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")

	})
	@PostMapping("/niveauxHierarchiques")
	public ResponseEntity<NiveauHierarchiqueDTO> create(@RequestBody NiveauHierarchiqueDTO niveauHierarchiqueDTO) {
		NiveauHierarchiqueDTO dtoSaved = niveauHierarchiqueService.create(niveauHierarchiqueDTO);
		if (dtoSaved != null) {
			return new ResponseEntity<NiveauHierarchiqueDTO>(dtoSaved, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<NiveauHierarchiqueDTO>(dtoSaved, HttpStatus.FOUND);
		}

	}

	/***************************************************************************************************************************************************************************************************************
	 * UPDATE UPDATE UPDATE UPDATE UPDATE
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Mise à jour de de la ressource niveau fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "niveau modifiée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/niveauxHierarchiques")
	public ResponseEntity<Message> update(@RequestBody NiveauHierarchiqueDTO niveauHierarchiqueDTO) {
		if (niveauHierarchiqueService.update(niveauHierarchiqueDTO)) {
			message = new Message(new Date(),
					"NiveauHierarchiqueDTO with id " + niveauHierarchiqueDTO.getId() + " updated.",
					"uri=/niveauxHierarchiques/" + niveauHierarchiqueDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"NiveauHierarchiqueDTO with id " + niveauHierarchiqueDTO.getId() + " not found.",
				"uri=/comptes/" + niveauHierarchiqueDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	/***************************************************************************************************************************************************************************************************************
	 * DELETE DELETE DELETE DELETE DELETE
	 **************************************************************************************************************************************************************************************************************/

	@ApiOperation(value = "Suppression d'un niveau selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Niveau supprimée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@DeleteMapping("/niveauxHierarchiques")
	public ResponseEntity<Message> delete(@RequestBody NiveauHierarchiqueDTO niveauHierarchiqueDTO) {
		if (niveauHierarchiqueService.delete(niveauHierarchiqueDTO)) {
			message = new Message(new Date(),
					"NiveauHierarchiqueDTO with id " + niveauHierarchiqueDTO.getId() + " deleted.",
					"uri=/niveauxHierarchiques/" + niveauHierarchiqueDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(),
				"NiveauHierarchiqueDTO with id " + niveauHierarchiqueDTO.getId() + " not found.",
				"uri=/niveauxHierarchiques/" + niveauHierarchiqueDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

}
