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
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;
import sn.pad.pe.pss.services.AgentService;
import sn.pad.pe.pss.services.AttestationService;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

@RestController
@Api(value = "API pour l'entité attestation")
public class AttestationController {
	@Autowired
	private UniteOrganisationnelleService uniteOrganisationnelleService;
	@Autowired
	private AttestationService attestationService;
	Message message;
	@Autowired
	private AgentService agentService;

	@ApiOperation(value = "Liste des attestations", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })

	@GetMapping("/attestations")
	public ResponseEntity<List<AttestationDTO>> getAttestations() {
		List<AttestationDTO> attestationDTO = attestationService.getAttestations();
		return new ResponseEntity<List<AttestationDTO>>(attestationDTO, HttpStatus.OK);

	}

	@GetMapping("/attestations/{id}")
	public ResponseEntity<AttestationDTO> getAttestationgentById(@PathVariable(value = "id") Long id) {
		AttestationDTO attestation = attestationService.getAttestationById(id);
		return ResponseEntity.ok().body(attestation);
	}

	@ApiOperation(value = "Création la ressource Attestation fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/attestations")
	public ResponseEntity<AttestationDTO> create(@RequestBody AttestationDTO attestationDTO) {
		AttestationDTO dto = attestationService.create(attestationDTO);
		return new ResponseEntity<AttestationDTO>(dto, HttpStatus.CREATED);
	}

	@PostMapping("/attestations/{id}/upload")
	public UploadFileResponse uploadAttestation(@PathVariable(value = "id") Long id,
			@RequestParam("file") MultipartFile file) {
		return attestationService.uploadAttestation(id, file);
	}

	@GetMapping("/attestations/{id}/download")
	public ResponseEntity<Resource> downloadAttestation(@PathVariable(value = "id") Long id,
			HttpServletRequest request) {
		return attestationService.downloadFile(id, request);
	}

	@PutMapping("/attestations")
	public ResponseEntity<Message> update(@RequestBody AttestationDTO attestationDTO) {

		if (attestationService.update(attestationDTO)) {
			message = new Message(new Date(), "Attestation with id " + attestationDTO.getId() + " updated.",
					"uri=/attestations/" + attestationDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Attestation with id " + attestationDTO.getId() + " not found.",
				"uri=/attestations/" + attestationDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@PutMapping("/attestations/many")
	public ResponseEntity<Message> update(@RequestBody List<AttestationDTO> attestationDTOs) {
		if (attestationService.updateMany(attestationDTOs)) {
			message = new Message(new Date(), "Attestations are updated.", "uri=/attestations/");
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Attestations not updated.", "uri=/attestations/");
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@GetMapping("/attestations/uniteOrganisationnelle/{id}")
	public ResponseEntity<List<AttestationDTO>> getAttestationsByUniteORG(@PathVariable(value = "id") Long id) {
		UniteOrganisationnelleDTO organisationnelleDTO = uniteOrganisationnelleService
				.getUniteOrganisationnelleById(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(attestationService.getAttestationsByUniteOrganisationnelles(organisationnelleDTO));
	}

	@GetMapping("/attestations/agent/{id}")
	public ResponseEntity<List<AttestationDTO>> getAttestationByAgent(@PathVariable(value = "id") Long id) {
		AgentDTO agentDTO = agentService.getAgentById(id);
		return ResponseEntity.status(HttpStatus.OK).body(attestationService.findAttestationsByAgent(agentDTO));
	}

	@DeleteMapping("/attestations")
	public ResponseEntity<Message> delete(@RequestBody AttestationDTO attestationDTO) {

		if (attestationService.delete(attestationDTO)) {
			message = new Message(new Date(), "Attestation with id " + attestationDTO.getId() + " deleted.",
					"uri=/attestations/" + attestationDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Attestation with id " + attestationDTO.getId() + " not found.",
				"uri=/attestations/" + attestationDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@GetMapping("/attestations/etat/different/{etat}")
	public ResponseEntity<List<AttestationDTO>> findAttestationsByEtat(@PathVariable(value = "etat") String etat) {
		List<AttestationDTO> attestation = attestationService.findAttestationsByEtatDifferent(etat);
		return ResponseEntity.ok().body(attestation);
	}
}
