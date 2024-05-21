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
import sn.pad.pe.pss.dto.AbsenceDTO;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.AbsenceService;
import sn.pad.pe.pss.services.AgentService;
import sn.pad.pe.pss.services.PlanningAbsenceService;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

/**
 * 
 * @author abdou.diop
 *
 */
@RestController
@Api(value = "API pour demande d'absence")
public class AbsenceController {

	@Autowired
	private AbsenceService absenceService;
	@Autowired
	private AgentService agentService;

	@Autowired
	private PlanningAbsenceService planningAbsenceService;
	@Autowired
	private UniteOrganisationnelleService uniteOrganisationnelleService;
	Message message;

	@ApiOperation(value = "Liste d'absence", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� �voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })

	@GetMapping("/absences")
	public List<AbsenceDTO> getAbsence() {
		return absenceService.getAbsence();
	}

	@ApiOperation(value = "Recup�ration d'une absence selon l'identifiant fournit en param�tre", response = AbsenceDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet r�cup�r� avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� �voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@GetMapping("/absences/{id}")
	public ResponseEntity<AbsenceDTO> getAbsenceById(@PathVariable(value = "id") Long id) {
		AbsenceDTO absence = absenceService.getAbsenceById(id);
		return ResponseEntity.ok().body(absence);
	}

	@ApiOperation(value = "Cr�ation de la ressource absence fournit en param�tre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Cr�e avec succ�s"),
			@ApiResponse(code = 409, message = "La ressource existe d�j�"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� � voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/absences")
	public ResponseEntity<AbsenceDTO> createAbsence(@RequestBody AbsenceDTO absenceDto) {
		return ResponseEntity.ok().body(absenceService.createAbsence(absenceDto));
	}

	@ApiOperation(value = "Mise � jour de la ressource absence fournit en param�tre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifi� avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris� � voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s �la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PutMapping("/absences")
	public ResponseEntity<Message> updateAbsence(@RequestBody AbsenceDTO absenceDto) {

		if (absenceService.updateAbsence(absenceDto)) {
			message = new Message(new Date(), "Absence with id " + absenceDto.getId() + " updated.",
					"uri=/absences/" + absenceDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Absence with id " + absenceDto.getId() + " not found.",
				"uri=/absences/" + absenceDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'une absence selon l'identifiant fournit en param�tre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprim� avec succ�s"),
			@ApiResponse(code = 401, message = "Vous n'�tes pas autoris�� voir la ressource"),
			@ApiResponse(code = 403, message = "L'acc�s � la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@DeleteMapping("/absences")
	public ResponseEntity<Message> deleteAbsence(@RequestBody AbsenceDTO absenceDto) {

		if (absenceService.deleteAbsence(absenceDto)) {
			message = new Message(new Date(), "Absence with id " + absenceDto.getId() + " deleted.",
					"uri=/absences/" + absenceDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Absence with id " + absenceDto.getId() + " not found.",
				"uri=/absences/" + absenceDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@GetMapping("/absences/uniteOrganisationnelle/{id}")
	public ResponseEntity<List<AbsenceDTO>> getAbsencesByUniteORG(@PathVariable(value = "id") Long id) {
//	    List<UniteOrganisationnelleDTO> organisationnelleDTO = uniteOrganisationnelleService.getUnitesOrganisationnellesInferieures(id);
//		return ResponseEntity.status(HttpStatus.OK).body(absenceService.getAbsencesByUniteOrganisationnelles(organisationnelleDTO.get(0)));
		List<AbsenceDTO> absenceDTOs = absenceService.getAbsencesByUniteOrganisationnellesPLus(id);
		return ResponseEntity.status(HttpStatus.OK).body(absenceDTOs);
	}

	@GetMapping("/absences/uniteOrganisationnelles/{idUniteOrganisationnelles}")
	public ResponseEntity<List<AbsenceDTO>> getPlanningAbsencesUniteOrganisationnelles(
			@PathVariable(value = "idUniteOrganisationnelles") List<Long> idUniteOrganisationnelles) {
		List<AbsenceDTO> absenceDTOs = absenceService.getAbsencesByUniteOrganisationnelless(idUniteOrganisationnelles);
		return ResponseEntity.status(HttpStatus.OK).body(absenceDTOs);
	}

	@GetMapping("/absences/agent/{id}")
	public ResponseEntity<List<AbsenceDTO>> getAbsencesByAgent(@PathVariable(value = "id") Long id) {
		AgentDTO agentDTO = agentService.getAgentById(id);
		return ResponseEntity.status(HttpStatus.OK).body(absenceService.findAbsencesByAgent(agentDTO));
	}

	@GetMapping("/absences/planningAbsence/{idPlanningAbsence}")
	public ResponseEntity<List<AbsenceDTO>> getAbsencesByPlanningAbsence(
			@PathVariable(value = "idPlanningAbsence") Long idPlanningAbsence) {

		PlanningAbsenceDTO PlanningAbsenceDTO = planningAbsenceService.getPlanningAbsenceById(idPlanningAbsence);
		return ResponseEntity.status(HttpStatus.OK)
				.body(absenceService.findAbsencesByPlanningAbsence(PlanningAbsenceDTO));
	}

	@GetMapping("/absences/dossierabsences/{idDossierAbsence}")
	public ResponseEntity<List<AbsenceDTO>> getAbsenceByDossier(
			@PathVariable(value = "idDossierAbsence") Long idDossierAbsence) {
		List<AbsenceDTO> absenceDTOs = absenceService.getAbsenceByDossierAbsence(idDossierAbsence);
		return ResponseEntity.status(HttpStatus.OK).body(absenceDTOs);
	}

//	@GetMapping("/absences/{annee}")
//	public ResponseEntity<List<AbsenceDTO>> getAllAbsencesByAnnee(@PathVariable(value = "annee") int annee) {
//		List<AbsenceDTO> absenceDTOs = absenceService.getAllAbsencesByAnne(annee);
//		return ResponseEntity.status(HttpStatus.OK).body(absenceDTOs);
//	}
	@GetMapping("/absences/uniteOrganisationnelle/{id}/annee/{annee}")
	public ResponseEntity<List<AbsenceDTO>> getAbsenceByUniteOrgAndAnnee(@PathVariable(value = "id") Long id,
			@PathVariable(value = "annee") int annee) {
		UniteOrganisationnelleDTO organisationnelleDTO = uniteOrganisationnelleService
				.getUniteOrganisationnelleById(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(absenceService.getAbsencesByUniteOrganisationnellesAndAnnee(organisationnelleDTO, annee));
	}

	@GetMapping("/absences/annee/{annee}/mois/{mois}")
	public ResponseEntity<?> getAbsencesByAnneeAndMois(@PathVariable(value = "annee") int annee,
			@PathVariable(value = "mois") String mois) {
		List<AbsenceDTO> absenceDTOs = absenceService.getAbsencesByAnneeAndMois(annee, mois);
		return new ResponseEntity<List<AbsenceDTO>>(absenceDTOs, HttpStatus.OK);
	}

	@GetMapping("/absences/uniteOrganisationnelle/{id}/annee/{annee}/mois/{mois}")
	public ResponseEntity<List<AbsenceDTO>> getAbsenceByUniteOrgAndAnneeAndMois(@PathVariable(value = "id") Long id,
			@PathVariable(value = "annee") int annee, @PathVariable(value = "mois") String mois) {
		UniteOrganisationnelleDTO organisationnelleDTO = uniteOrganisationnelleService
				.getUniteOrganisationnelleById(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(absenceService.getAbsencesByUniteOrganisationnellesAndAnnee(organisationnelleDTO, annee));
	}

	@GetMapping("/absences/uniteOrganisationnelles/{idUniteOrganisationnelles}/annee/{annee}/mois/{mois}")
	public ResponseEntity<List<AbsenceDTO>> getAbsenceByUniteOrgInferieuresAndAnneeAndMois(
			@PathVariable(value = "idUniteOrganisationnelles") List<Long> idUniteOrganisationnelles,
			@PathVariable(value = "annee") int annee, @PathVariable(value = "mois") String mois) {
		List<AbsenceDTO> absenceDTOs = absenceService
				.getAbsencesByUniteOrganisationnellesAndAnneeAndMois(idUniteOrganisationnelles, annee, mois);
		return ResponseEntity.status(HttpStatus.OK).body(absenceDTOs);
	}

}
