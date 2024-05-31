package sn.pad.pe.colonie.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.pad.pe.colonie.dto.ParticipantDTO;
import sn.pad.pe.colonie.services.ParticipantService;
import sn.pad.pe.configurations.exception.Message;

import java.util.Date;
import java.util.List;

@RestController
@Api(value = "API pour la gestion des participants")
@RequestMapping("/colonie") // To distinguish this controller's routes
public class ParticipantColonieController {

    @Autowired
    private ParticipantService participantService;

    Message message;

    @ApiOperation(value = "Liste des participants", response = List.class)
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")})
    @GetMapping("/participants")
    public List<ParticipantDTO> getAllParticipants() {
        return participantService.getAllParticipants();
    }

    @ApiOperation(value = "Récupération d'un participant par son ID", response = ParticipantDTO.class)
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Objet récupéré avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")})
    @GetMapping("/participants/{id}")
    public ResponseEntity<ParticipantDTO> getParticipantById(@PathVariable Long id) {
        return ResponseEntity.ok().body(participantService.getParticipantById(id));
    }

    @ApiOperation(value = "Mise à jour du statut d'un participant", response = ResponseEntity.class)
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Statut mis à jour avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")})
    @PutMapping("/participants/{id}/status/{newStatus}")
    public ResponseEntity<Message> updateParticipantStatus(@PathVariable Long id, @PathVariable String newStatus) {
        participantService.updateParticipantStatus(id, newStatus);
        message = new Message(new Date(), "Statut du participant avec l'ID " + id + " mis à jour.", "uri=/colonie/participants/" + id);
        return ResponseEntity.ok().body(message);
    }

    @ApiOperation(value = "Suppression d'un participant", response = ResponseEntity.class)
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Participant supprimé avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")})
    @DeleteMapping("/participants/{id}")
    public ResponseEntity<Message> deleteParticipant(@PathVariable Long id) {
        participantService.deleteParticipant(id);
        message = new Message(new Date(), "Participant avec l'ID " + id + " supprimé.", "uri=/colonie/participants/" + id);
        return ResponseEntity.ok().body(message);
    }

    @PutMapping("/participants/{id}")
    public ResponseEntity<ParticipantDTO> updateParticipant(@PathVariable Long id, @RequestBody ParticipantDTO updatedParticipant) {
        ParticipantDTO updatedParticipantDTO = participantService.updateParticipant(id, updatedParticipant);
        return ResponseEntity.ok().body(updatedParticipantDTO);
    }
}
