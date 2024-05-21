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

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.pss.dto.MotifDTO;
import sn.pad.pe.pss.services.MotifService;

@RestController
public class MotifController {

	@Autowired
	private MotifService motifService;

	Message message;

	@ApiOperation(value = "Liste de motif", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� �voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })

	@GetMapping("/motifs")
	public List<MotifDTO> getMotif() {
		return motifService.getMotif();
	}

	@ApiOperation(value = "Recup�ration d'un motif selon l'identifiant fournit en param�tre", response = MotifDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet r�cup�r� avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� �voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/motifs/{id}")
	public ResponseEntity<MotifDTO> getMotifById(@PathVariable(value = "id") Long id) {
		MotifDTO motifDTO = motifService.getMotifById(id);
		return ResponseEntity.ok().body(motifDTO);
	}

	@ApiOperation(value = "Cr�ation de la ressource motif fournit en param�tre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Cr�e avec succ�s"),
			@ApiResponse(code = 409, message = "La ressource existe d�j�"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� � voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/motifs")
	public ResponseEntity<MotifDTO> createMotif(@RequestBody MotifDTO motifDTO) {
		return ResponseEntity.ok().body(motifService.createMotif(motifDTO));
	}

	@ApiOperation(value = "Mise � jour de la ressource motif fournit en param�tre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifi� avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� � voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s �la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PutMapping("/motifs")
	public ResponseEntity<Message> updateAbsence(@RequestBody MotifDTO motifDTO) {

		if (motifService.updateMotif(motifDTO)) {
			message = new Message(new Date(), "motif with id " + motifDTO.getId() + " updated.",
					"uri=/motifs/" + motifDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Motif with id " + motifDTO.getId() + " not found.",
				"uri=/motifs/" + motifDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'une motif selon l'identifiant fournit en param�tre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprim� avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris�� voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@DeleteMapping("/motifs")
	public ResponseEntity<Message> deleteAbsence(@RequestBody MotifDTO motifDTO) {

		if (motifService.deleteMotif(motifDTO)) {
			message = new Message(new Date(), "Absence with id " + motifDTO.getId() + " deleted.",
					"uri=/motifs/" + motifDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Absence with id " + motifDTO.getId() + " not found.",
				"uri=/motifs/" + motifDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

}
