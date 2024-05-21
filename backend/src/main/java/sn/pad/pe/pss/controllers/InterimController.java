package sn.pad.pe.pss.controllers;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.AttestationDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;
import sn.pad.pe.pss.services.AgentService;
import sn.pad.pe.pss.services.InterimService;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

@RestController
@Api(value = "API pour l'entité InterimDTO")
public class InterimController {

	@Autowired
	private InterimService interimService;
	@Autowired
	private UniteOrganisationnelleService uniteOrganisationnelleService;

	@Autowired
	private AgentService agentService;
	Message message;

	@ApiOperation(value = "Liste des interims", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/interims")
	public ResponseEntity<List<InterimDTO>> getInterims() {
//		return ResponseEntity.status(HttpStatus.OK).body(interimService.getInterims());
		List<InterimDTO> InterimDTO = interimService.getInterims();
		return new ResponseEntity<List<InterimDTO>>(InterimDTO, HttpStatus.OK);
	}

	@ApiOperation(value = "Recupération d'un interim selon l'identifiant fournit en paramètre", response = InterimDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/interims/{id}")
	public ResponseEntity<InterimDTO> getInterimById(@PathVariable(value = "id") Long id) {
		InterimDTO InterimDTO = interimService.getInterimById(id);
//		return ResponseEntity.ok().body(InterimDTO);
		return new ResponseEntity<InterimDTO>(InterimDTO, HttpStatus.OK);

	}

	@ApiOperation(value = "Création la ressource InterimDTO fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/interims")
	public ResponseEntity<InterimDTO> create(@RequestBody InterimDTO interimDTO) {
//		return ResponseEntity.ok().body(interimService.create(interimDTO));
//		interimDTO.setEtat("Saisi");
//		interimDTO.setDateSaisie(new Date());
		return new ResponseEntity<InterimDTO>(interimService.create(interimDTO), HttpStatus.CREATED);
	}

	@ApiOperation(value = "Mise à jour de de la ressource InterimDTO fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/interims")
	public ResponseEntity<Message> update(@RequestBody InterimDTO interimDTO) {

		if (interimService.update(interimDTO)) {
			message = new Message(new Date(), "InterimDTO with id " + interimDTO.getId() + " updated.",
					"uri=/interims/" + interimDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "InterimDTO with id " + interimDTO.getId() + " not found.",
				"uri=/interims/" + interimDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'un InterimDTO selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/interims")
	public ResponseEntity<Message> delete(@RequestBody InterimDTO interimDTO) {

		if (interimService.delete(interimDTO)) {
			message = new Message(new Date(), "InterimDTO with id " + interimDTO.getId() + " deleted.",
					"uri=/interims/" + interimDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "InterimDTO with id " + interimDTO.getId() + " not found.",
				"uri=/interims/" + interimDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Liste des interims", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/interims/uniteOrganisationnelle/{id}")
	public ResponseEntity<List<InterimDTO>> getInterimsByUniteORG(@PathVariable(value = "id") Long id) {
		UniteOrganisationnelleDTO organisationnelleDTO = uniteOrganisationnelleService
				.getUniteOrganisationnelleById(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(interimService.getInterimsByUniteOrganisationnelles(organisationnelleDTO));
	}

	@ApiOperation(value = "Liste des interims", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/interims/agent/{id}")
	public ResponseEntity<List<InterimDTO>> getInterimsByAgent(@PathVariable(value = "id") Long id) {
		AgentDTO agentDTO = agentService.getAgentById(id);
		return ResponseEntity.status(HttpStatus.OK).body(interimService.findInterimsByAgent(agentDTO));
	}

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/interims/dossierInterim/{idDossierInterim}")
	public ResponseEntity<List<InterimDTO>> getInterimByDossier(
			@PathVariable(value = "idDossierInterim") Long idDossierInterim) {
		List<InterimDTO> InterimDTOs = interimService.getInterimByDossierInterim(idDossierInterim);
		return ResponseEntity.status(HttpStatus.OK).body(InterimDTOs);
	}

	@PostMapping("/interims/{id}/upload")
	public UploadFileResponse uploadInterim(@PathVariable(value = "id") Long id,
			@RequestParam("file") MultipartFile file) {
		return interimService.uploadInterim(id, file);
	}

	@GetMapping("/interims/{id}/download")
	public ResponseEntity<Resource> downloadInterim(@PathVariable(value = "id") Long id, HttpServletRequest request) {
		return interimService.downloadInterim(id, request);
	}

	@GetMapping("/interims/uniteOrganisationnelle/{id}/annee/{annee}")
	public ResponseEntity<List<InterimDTO>> getInterimsByUniteORGandYear(@PathVariable(value = "id") Long id,
			@PathVariable(value = "annee") int annee) {
		UniteOrganisationnelleDTO organisationnelleDTO = uniteOrganisationnelleService
				.getUniteOrganisationnelleById(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(interimService.getInterimsByUniteOrganisationnelleAndAnnee(organisationnelleDTO, annee));
	}

	@GetMapping("/interims/uniteOrganisationnelles/{idUniteOrganisationnelles}")
	public ResponseEntity<List<InterimDTO>> getInterimsByUniteOrganisationnellesInf(
			@PathVariable(value = "idUniteOrganisationnelles") List<Long> idUniteOrganisationnelles) {
		List<InterimDTO> interimDTOs = interimService.getInterimsByUniteOrganisationnelless(idUniteOrganisationnelles);
		return ResponseEntity.status(HttpStatus.OK).body(interimDTOs);
	}

}
