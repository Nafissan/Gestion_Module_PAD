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
import sn.pad.pe.pss.services.AgentService;

@RestController
@Api(value = "API pour l'entité agent")
public class AgentController {

	@Autowired
	private AgentService agentService;

	Message message;

	@ApiOperation(value = "Liste des agents", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents")
	public List<AgentDTO> getAgents() {
		return agentService.getAgents();
	}

	@ApiOperation(value = "Liste des agents qui sont chef de leur unité par niveau", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/position/{niveau}/chef/{estChef}")
	public List<AgentDTO> getAgentByestChefAndNiveauHierarchique(@PathVariable("niveau") int niveau,
			@PathVariable("estChef") boolean estChef) {
		return agentService.getAllAgentByestChefAndNiveauHierarchique(estChef, niveau);
	}

	@ApiOperation(value = "Nombre total des agents des differentes unites organisationnelles", response = AgentDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("agents/total")
	public int getTotalAgents() {
		return agentService.getAgents().size();
	}

	@ApiOperation(value = "Nombre total des agents par unite organisationnelle", response = AgentDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/agents/totalAgentsUniteOrganisationnelle/{id}")
	public int getTotalAgentsParUniteOrganisationnelle(@PathVariable("id") long id) {
		return agentService.getAgentsByUniteOrganisationnelle(id).size();
	}

	@ApiOperation(value = "Recupération d'un agent selon l'identifiant fournit en paramètre", response = AgentDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@GetMapping("/agents/{id}")
	public ResponseEntity<AgentDTO> getAgentById(@PathVariable(value = "id") Long id) {
		return ResponseEntity.ok().body(agentService.getAgentById(id));
	}

	@ApiOperation(value = "Création la ressource agent fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/agents")
	public ResponseEntity<AgentDTO> create(@RequestBody AgentDTO agentDto) {

		return ResponseEntity.ok().body(agentService.create(agentDto));
	}

	@ApiOperation(value = "Création des ressources agents fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet Créé avec succès"),
			@ApiResponse(code = 409, message = "La ressource existe déjà"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })

	@PostMapping("/agents/all")
	public ResponseEntity<List<AgentDTO>> createAll(@RequestBody List<AgentDTO> agentsDto) {
		return ResponseEntity.ok().body(agentService.createAll(agentsDto));
	}

	@ApiOperation(value = "Mise à jour de de la ressource agent fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@PutMapping("/agents")
	public ResponseEntity<Message> update(@RequestBody AgentDTO agentDto) {
		if (agentService.update(agentDto)) {
			message = new Message(new Date(), "Agent with id " + agentDto.getId() + " updated.",
					"uri=/agents/" + agentDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Agent with id " + agentDto.getId() + " not found.",
				"uri=/agents/" + agentDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Suppression d'un agent selon l'identifiant fournit en paramètre", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
	@DeleteMapping("/agents")
	public ResponseEntity<Message> delete(@RequestBody AgentDTO agentDto) {
		if (agentService.delete(agentDto)) {
			message = new Message(new Date(), "Agent with id " + agentDto.getId() + " deleted.",
					"uri=/agents/" + agentDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Agent with id " + agentDto.getId() + " not found.",
				"uri=/agents/" + agentDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Liste des agents sans compte", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/sansCompte")
	public ResponseEntity<List<AgentDTO>> getAgentsWithoutCompte() {
		List<AgentDTO> agentDTOs = agentService.getAgentsWithoutCompte();
		return new ResponseEntity<List<AgentDTO>>(agentDTOs, HttpStatus.OK);
	}

	@ApiOperation(value = "Liste des agents rattachés directement à l'unité organisationnelle", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/uniteOrganisationnelle/{id}")
	public ResponseEntity<List<AgentDTO>> getAgentsByUniteOrganisationnelle(@PathVariable("id") long id) {
		List<AgentDTO> agentDTOs = agentService.getAgentsByUniteOrganisationnelle(id);
		return new ResponseEntity<List<AgentDTO>>(agentDTOs, HttpStatus.OK);
	}

	@ApiOperation(value = "Liste de tous les agents dans l'unité organisationnelle", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/uniteOrganisationnelle/{id}/all")
	public ResponseEntity<List<AgentDTO>> getAllAgentsByUniteOrganisationnelle(@PathVariable("id") long id) {
		List<AgentDTO> agentDTOs = agentService.getAgentsByUniteOrganisationnelle(id);
		return new ResponseEntity<List<AgentDTO>>(agentDTOs, HttpStatus.OK);
	}

	@ApiOperation(value = "Liste des agents sans congés dans l'unité organisationnelle", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/uniteOrganisationnelle/{id}/annee/{annee}/sansConge")
	public ResponseEntity<List<AgentDTO>> getAgentsByUniteOrganisationnelleWithoutConge(@PathVariable("id") long id,
			@PathVariable("annee") String annee) {
		List<AgentDTO> agentDTOs = agentService.getAgentsByUniteOrganisationnelleIdWithoutConges(id, annee);
		return new ResponseEntity<List<AgentDTO>>(agentDTOs, HttpStatus.OK);
	}

	@ApiOperation(value = "Liste des agents avec congés dans l'unité organisationnelle", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/uniteOrganisationnelle/{id}/avecConge")
	public ResponseEntity<List<AgentDTO>> getAgentsByUniteOrganisationnelleWithConge(@PathVariable("id") long id) {
		List<AgentDTO> agentDTOs = agentService.getAgentsByUniteOrganisationnelleIdWithConges(id);
		return new ResponseEntity<List<AgentDTO>>(agentDTOs, HttpStatus.OK);
	}

	@ApiOperation(value = "Agent responsable de l'unité organisationnelle", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Agent récupéré avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/uniteOrganisationnelle/{id}/responsable")
	public ResponseEntity<AgentDTO> getAgentResponsable(@PathVariable("id") long id) {
		AgentDTO agentDTO = agentService.getAgentResponsable(id);
		return new ResponseEntity<AgentDTO>(agentDTO, HttpStatus.OK);
	}

	// Recuperer tous les des unites inferieures
	@ApiOperation(value = "Liste des agents avec congés dans l'unité organisationnelle", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/uniteOrganisationnelles/{idUniteOrganisationnelles}/chef")
	public ResponseEntity<List<AgentDTO>> getAllChefByUniteOrganisationnelleInferieures(
			@PathVariable(value = "idUniteOrganisationnelles") List<Long> idUniteOrganisationnelles) {
		List<AgentDTO> agentDTOs = agentService
				.getAllChefByUniteOrganisationnelleInferieures(idUniteOrganisationnelles);
		return new ResponseEntity<List<AgentDTO>>(agentDTOs, HttpStatus.OK);
	}

	@ApiOperation(value = "L'agent responsable DCH", response = AgentDTO.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "L'agent récupéavec succes"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/uniteOrganisationnelle/dch")
	public ResponseEntity<AgentDTO> getAgentResponsablmeDCH() {
		return ResponseEntity.ok().body(agentService.getAgentResponsableDCH());
	}

	@ApiOperation(value = "Liste des agents assurés", response = List.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
			@ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
			@ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
			@ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
	@GetMapping("/agents/agents_assures")
	public ResponseEntity<List<AgentDTO>> getAgentsAssures() {
		List<AgentDTO> agentDTOs = agentService.getAgentsAssures();
		return new ResponseEntity<List<AgentDTO>>(agentDTOs, HttpStatus.OK);
	}


    @GetMapping("/agents/matricule/{matricule}")
    public ResponseEntity<AgentDTO> getAgentByMatricule(@PathVariable String matricule) {
        AgentDTO agent = agentService.getAgentByMatricule(matricule);
        return ResponseEntity.ok().body(agent);
    }

}
