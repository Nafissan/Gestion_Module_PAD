package sn.pad.pe.colonie.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.colonie.dto.ParticipantDTO;
import sn.pad.pe.colonie.services.ParticipantService;
import sn.pad.pe.configurations.exception.Message;

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

    @ApiOperation(value = "Mise à jour du statut d'un participant", response = ResponseEntity.class)
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Statut mis à jour avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")})
    @PutMapping("/participants/{id}/status/{newStatus}")
    public ResponseEntity<Message> updateParticipantStatus(@PathVariable Long id, @PathVariable String newStatus) {
        if(participantService.updateParticipantStatus(id, newStatus)){
            message = new Message(new Date(), "Participant with id " + id + " updated.", "uri=/participants/" + id);
             return ResponseEntity.ok().body(message);
         }
         message = new Message(new Date(), "Participant with id " + id + " not found.", "uri=/participants/" + id);
         return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ApiOperation(value = "Suppression d'un participant", response = ResponseEntity.class)
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Participant supprimé avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")})
    @DeleteMapping("/{id}")
    public ResponseEntity<Message> deleteParticipant(@PathVariable Long id) {
        if(participantService.deleteParticipant(id)){
            message = new Message(new Date(), "Participant with id " + id + " deleted.", "uri=/participants/" + id);
             return ResponseEntity.ok().body(message);
         }
         message = new Message(new Date(), "Participant with id " +id+ " not found.", "uri=/participants/" + id);
         return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAllParticipants() {
        participantService.deleteAllParticipants();
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/participants")
    public ResponseEntity<Message> updateParticipant( @RequestBody ParticipantDTO updatedParticipant) {
        if(participantService.updateParticipant(updatedParticipant)){
           message = new Message(new Date(), "Participant with id " + updatedParticipant.getId() + " updated.", "uri=/participants/" + updatedParticipant.getId());
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "Participant with id " + updatedParticipant.getId() + " not found.", "uri=/participants/" + updatedParticipant.getId());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
