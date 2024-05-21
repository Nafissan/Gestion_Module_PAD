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
import sn.pad.pe.pss.dto.EtapeAbsenceDTO;
import sn.pad.pe.pss.services.EtapeAbsenceService;

/**
 * 
 * @author abdou.diop
 *
 */

@RestController
@Api(value = "API pour traitement absence")
public class EtapeAbsenceController {

	@Autowired
	private EtapeAbsenceService etapeabsenceService;
	Message message;

	@ApiOperation(value = "Liste etape absence", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succés"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� �voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/etapeabsences")
	// @Dto(EtapeAbsenceDTO.class)
	public List<EtapeAbsenceDTO> getEtapeAbsence() {
		return etapeabsenceService.getEtapeAbsence();
	}

	@ApiOperation(value = "Recup�ration d'un etape absence selon l'identifiant fournit en param�tre", response = EtapeAbsenceDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet r�cup�r� avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� �voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/etapeabsences/{id}")
	// @Dto(EtapeAbsenceDTO.class)
	public ResponseEntity<EtapeAbsenceDTO> getEtapeAbsenceById(@PathVariable(value = "id") Long id) {
		EtapeAbsenceDTO etapeabsence = etapeabsenceService.getEtapeAbsenceById(id);
		return ResponseEntity.ok().body(etapeabsence);
	}

	@ApiOperation(value = "Cr�ation de la ressource etape absence fournit en param�tre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Cr�e avec succ�s"),
			@ApiResponse(code = 409, message = "La ressource existe d�j�"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� � voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	// @Dto(EtapeAbsenceDTO.class)
	@PostMapping("/etapeabsences")
	public ResponseEntity<EtapeAbsenceDTO> createEtapeAbsence(@RequestBody EtapeAbsenceDTO etapeabsenceDto) {
//			EtapeAbsence etapeabsenceSaved = modelMapper.map(etapeabsenceDto, EtapeAbsence.class);
		return ResponseEntity.ok().body(etapeabsenceService.createEtapeAbsence(etapeabsenceDto));
	}

	@ApiOperation(value = "Mise � jour de la ressource etape absence fournit en param�tre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifi� avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� � voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s �la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PutMapping("/etapeabsences")
	public ResponseEntity<Message> updateEtapeAbsence(@RequestBody EtapeAbsenceDTO etapeabsenceDto) {
		// EtapeAbsence etapeabsenceUpdated = modelMapper.map(etapeabsenceDto,
		// EtapeAbsence.class);
		if (etapeabsenceService.updateEtapeAbsence(etapeabsenceDto)) {
			message = new Message(new Date(), "Etape Absence with id " + etapeabsenceDto.getId() + " updated.",
					"uri=/etapeabsences/" + etapeabsenceDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EtapeAbsence with id " + etapeabsenceDto.getId() + " not found.",
				"uri=/etapeabsences/" + etapeabsenceDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'un etape absence selon l'identifiant fournit en param�tre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprim� avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris�� voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@DeleteMapping("/etapeabsences")
	public ResponseEntity<Message> deleteEtapeAbsence(@RequestBody EtapeAbsenceDTO etapeabsenceDto) {
		// EtapeAbsence etapeabsenceDeleted = modelMapper.map(etapeabsenceDto,
		// EtapeAbsence.class);
		if (etapeabsenceService.deleteEtapeAbsence(etapeabsenceDto)) {
			message = new Message(new Date(), "EtapeAbsence with id " + etapeabsenceDto.getId() + " deleted.",
					"uri=/etapeabsences/" + etapeabsenceDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "EtapeAbsence with id " + etapeabsenceDto.getId() + " not found.",
				"uri=/etapeabsences/" + etapeabsenceDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}
}
