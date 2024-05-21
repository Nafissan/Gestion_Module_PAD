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
import sn.pad.pe.pss.dto.EtapeAttestationDTO;
import sn.pad.pe.pss.services.EtapeAttestationService;

@RestController
@Api(value = "API pour l'entité attestation")
public class EtapeAttestationController {

	@Autowired
	private EtapeAttestationService etapeAttestationService;
	Message message;

	@ApiOperation(value = "Liste des etatpeattestations", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/etapeAttestations")
	public ResponseEntity<List<EtapeAttestationDTO>> getEtapeAttestations() {
		List<EtapeAttestationDTO> etapeAttestationDTO = etapeAttestationService.getEtapeAttestations();
		return new ResponseEntity<List<EtapeAttestationDTO>>(etapeAttestationDTO, HttpStatus.OK);
	}

	@GetMapping("/etapeAttestations/{id}")

	public ResponseEntity<EtapeAttestationDTO> getEtapeAttestationgentById(@PathVariable(value = "id") Long id) {
		EtapeAttestationDTO etapeAttestationDTO = etapeAttestationService.getEtapeAttestationById(id);
		return ResponseEntity.ok().body(etapeAttestationDTO);
	}

	@ApiOperation(value = "Création la ressource EtapeAttestation fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/etapeAttestations")
	public ResponseEntity<EtapeAttestationDTO> create(@RequestBody EtapeAttestationDTO etapeAttestationDTO) {
		return new ResponseEntity<EtapeAttestationDTO>(etapeAttestationService.create(etapeAttestationDTO),
				HttpStatus.CREATED);
	}

	@PutMapping("/etapeAttestations")
	public ResponseEntity<Message> update(@RequestBody EtapeAttestationDTO etapeAttestationDTO) {

		if (etapeAttestationService.update(etapeAttestationDTO)) {
			message = new Message(new Date(), "AttestationDTO with id " + etapeAttestationDTO.getId() + " updated.",
					"uri=/etapeAttestations/" + etapeAttestationDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Agent with id " + etapeAttestationDTO.getId() + " not found.",
				"uri=/etapeAttestations/" + etapeAttestationDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@PutMapping("/etapeAttestations/many")
	public ResponseEntity<Message> update(@RequestBody List<EtapeAttestationDTO> etapeAttestationDTOs) {
		if (etapeAttestationService.updateMany(etapeAttestationDTOs)) {
			message = new Message(new Date(), "EtapeAttestations are updated.", "uri=/etapeAttestations/");
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EtapeAttestations not updated.", "uri=/etapeAttestations/");
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@DeleteMapping("/etapeAttestations")
	public ResponseEntity<Message> delete(@RequestBody EtapeAttestationDTO ettAttestationDTO) {

		if (etapeAttestationService.delete(ettAttestationDTO)) {
			message = new Message(new Date(), "AttestationDTO with id " + ettAttestationDTO.getId() + " deleted.",
					"uri=/etapeAttestation/" + ettAttestationDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "AttestationDTO with id " + ettAttestationDTO.getId() + " not found.",
				"uri=/etapeAttestation/" + ettAttestationDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@PostMapping("/etapeAttestations/many")
	public ResponseEntity<EtapeAttestationDTO> createMany(@RequestBody List<EtapeAttestationDTO> etapeAttestationDTOs) {
		return new ResponseEntity<EtapeAttestationDTO>(etapeAttestationService.createMany(etapeAttestationDTOs),
				HttpStatus.CREATED);
	}
}
