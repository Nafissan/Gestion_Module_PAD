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
import sn.pad.pe.pss.dto.DossierInterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.DossierInterimService;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

/**
 * 
 * @author cheikhibra.samb
 *
 */
@RestController
@Api(value = "APi pour l'entité DossierInterim")
public class DossierInterimController {
	@Autowired
	private DossierInterimService dossierInterimService;

	@Autowired
	private UniteOrganisationnelleService uniteOrganisationnelleService;
	Message message;

	@ApiOperation(value = "Liste des dossiers intérim", response = DossierInterimDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/dossierInterims")
	public ResponseEntity<List<DossierInterimDTO>> getDossierInterims() {
		List<DossierInterimDTO> dossierInterimDTOs = dossierInterimService.getDossierInterims();
		return ResponseEntity.status(HttpStatus.OK).body(dossierInterimDTOs);
	}

	@ApiOperation(value = "Recupération d'un dossier congé selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/dossierInterims/{id}")
	public ResponseEntity<DossierInterimDTO> getById(@PathVariable(value = "id") Long id) {
		DossierInterimDTO dossierInterimDTO = dossierInterimService.getDossierInterimById(id);
		return ResponseEntity.status(HttpStatus.OK).body(dossierInterimDTO);
	}

	@ApiOperation(value = "Création de la ressource dossier intérim fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/dossierInterims")
	public ResponseEntity<DossierInterimDTO> create(@RequestBody DossierInterimDTO dossierInterimDTO) {
		DossierInterimDTO dossierInterimCreated = dossierInterimService.createDossierInterim(dossierInterimDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(dossierInterimCreated);
	}

	@ApiOperation(value = "Mise à jour de la ressource dossier congé fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/dossierInterims")
	public ResponseEntity<Message> update(@RequestBody DossierInterimDTO dossierInterimDTO) {
		boolean isUpdated = dossierInterimService.updateDossierInterim(dossierInterimDTO);
		if (isUpdated) {
			message = new Message(new Date(), "DossierConge with id " + dossierInterimDTO.getId() + " updated.",
					"uri=/dossierInterims/" + dossierInterimDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "DossierConge with id " + dossierInterimDTO.getId() + " not found.",
				"uri=/dossierInterims/" + dossierInterimDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@ApiOperation(value = "Suppression de la ressource dossier interim selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/dossierInterims")
	public ResponseEntity<Message> delete(@RequestBody DossierInterimDTO dossierInterimDTO) {
		boolean isDeleted = dossierInterimService.deteleDossierInterim(dossierInterimDTO);
		if (isDeleted) {
			message = new Message(new Date(), "DossierInterim with id " + dossierInterimDTO.getId() + " deleted.",
					"uri=/dossierInterims/" + dossierInterimDTO.getId());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		message = new Message(new Date(), "DossierConge with id " + dossierInterimDTO.getId() + " not found.",
				"uri=/dossierInterims/" + dossierInterimDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Recupération d'un planningDirection selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/dossierInterims/uniteOrganisationnelle/{idUniteOrganisationnelle}/annee/{annee}")
	public ResponseEntity<DossierInterimDTO> getByCodeDirectionAndDossierInterim(
			@PathVariable(value = "idUniteOrganisationnelle") Long idUniteOrganisationnelle,
			@PathVariable(value = "annee") int annee) {

		UniteOrganisationnelleDTO uniteOrganisationnelleDTO = uniteOrganisationnelleService
				.getUniteOrganisationnelleById(idUniteOrganisationnelle);
		DossierInterimDTO dossierInterims = dossierInterimService
				.dossierInterimByUniteOrganisationnelleAndAnnee(uniteOrganisationnelleDTO, annee);
		return ResponseEntity.status(HttpStatus.OK).body(dossierInterims);
	}

	@ApiOperation(value = "Recupération d'un planningDirection selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/dossierInterims/annee/{annee}")
	public ResponseEntity<List<DossierInterimDTO>> getDossierInterimByAnnee(@PathVariable(value = "annee") int annee) {
		List<DossierInterimDTO> dossierInterims = dossierInterimService.findDossierInterimByAnnee(annee);
		return ResponseEntity.status(HttpStatus.OK).body(dossierInterims);
	}
}
