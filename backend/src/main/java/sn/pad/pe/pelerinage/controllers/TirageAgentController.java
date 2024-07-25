package sn.pad.pe.pelerinage.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.pelerinage.dto.TirageAgentDTO;
import sn.pad.pe.pelerinage.services.TirageAgentService;

@RestController
@Api(value = "API pour l'entité tirage agent")
@RequestMapping("/tirage-agents")
public class TirageAgentController {

    @Autowired
    private TirageAgentService tirageAgentService;

    private Message message;

    @ApiOperation(value = "Récupération de tous les tirages agents", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste des tirages agents récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") 
    })
    @GetMapping
    public ResponseEntity<List<TirageAgentDTO>> getAllTirageAgents() {
        List<TirageAgentDTO> tirageAgents = tirageAgentService.getAllTirageAgents();
        return ResponseEntity.status(HttpStatus.OK).body(tirageAgents);
    }

    @ApiOperation(value = "Récupération des tirages agents par état du dossier", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste des tirages agents récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/etat")
    public ResponseEntity<List<TirageAgentDTO>> getTirageAgentsByDossierEtat() {
        List<TirageAgentDTO> tirageAgents = tirageAgentService.getTirageAgentsByDossierEtat();
        return ResponseEntity.status(HttpStatus.OK).body(tirageAgents);
    }

    @ApiOperation(value = "Création d'un tirage agent", response = TirageAgentDTO.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 201, message = "Tirage agent créé avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @PostMapping
    public ResponseEntity<TirageAgentDTO> createTirageAgent(@RequestBody TirageAgentDTO tirageAgentDTO) {
        TirageAgentDTO tirageAgent = tirageAgentService.saveTirageAgent(tirageAgentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(tirageAgent);
    }

    @ApiOperation(value = "Suppression d'un tirage agent", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Tirage agent supprimé avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @DeleteMapping
    public ResponseEntity<Message> deleteTirageAgent(@RequestBody TirageAgentDTO tirageAgentDTO) {
        boolean isDeleted = tirageAgentService.deleteTirageAgent(tirageAgentDTO);
        if (isDeleted) {
            message = new Message(new Date(), "Tirage agent avec ID " + tirageAgentDTO.getId() + " supprimé.", "uri=/tirage-agents/" + tirageAgentDTO.getId());
            return ResponseEntity.ok().body(message);
        } else {
            message = new Message(new Date(), "Tirage agent avec ID " + tirageAgentDTO.getId() + " non trouvé.", "uri=/tirage-agents/" + tirageAgentDTO.getId());
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "Suppression de tous les tirages agents")
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Tous les tirages agents ont été supprimés avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @DeleteMapping("/all")
    public ResponseEntity<Message> deleteAllTirageAgents() {
        tirageAgentService.deleteAllTirageAgents();
        message = new Message(new Date(), "Tous les tirages agents ont été supprimés.", "uri=/tirage-agents/all");
        return ResponseEntity.ok().body(message);
    }
}