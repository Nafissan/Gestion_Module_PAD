package sn.pad.pe.colonie.controllers;

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
import sn.pad.pe.colonie.dto.ColonStatisticsDTO;
import sn.pad.pe.colonie.dto.ParticipantColonieDTO;
import sn.pad.pe.colonie.services.ParticipantColonieService;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.configurations.exception.ParticipantColonieException;

@RestController
@Api(value = "API pour la gestion des participants")
public class ParticipantColonieController {

    @Autowired
    private ParticipantColonieService participantServiceColonie;

    Message message;

    @ApiOperation(value = "Liste des participants", response = List.class)
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")})
    @GetMapping("/participantsColonie")
    public ResponseEntity<List<ParticipantColonieDTO>> getParticipants() {
        List<ParticipantColonieDTO> liste=participantServiceColonie.getAllParticipants();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Suppression d'un participant", response = ResponseEntity.class)
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Participant supprimé avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")})
    @DeleteMapping("/participantsColonie")
    public ResponseEntity<Message> deleteParticipant(@RequestBody ParticipantColonieDTO updatedParticipant) {
        if(participantServiceColonie.deleteParticipant(updatedParticipant)){
            message = new Message(new Date(), "Participant with id " + updatedParticipant.getId() + " deleted.", "uri=/participants/" + updatedParticipant.getId());
             return ResponseEntity.ok().body(message);
         }
         message = new Message(new Date(), "Participant with id " +updatedParticipant.getId()+ " not found.", "uri=/participants/" + updatedParticipant.getId());
         return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAllParticipants() {
        participantServiceColonie.deleteAllParticipants();
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/participantsColonie")
    public ResponseEntity<Message> updateParticipant(@RequestBody ParticipantColonieDTO updatedParticipant) {
        try {
            boolean updated = participantServiceColonie.updateParticipant(updatedParticipant);
            if (updated) {
                message = new Message(new Date(), "Participant with id " + updatedParticipant.getId() + " updated.", "uri=/participants/" + updatedParticipant.getId());
                return ResponseEntity.ok().body(message);
            }
            message = new Message(new Date(), "Participant with id " + updatedParticipant.getId() + " not found.", "uri=/participants/" + updatedParticipant.getId());
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        } catch (ParticipantColonieException ex) {
            message = new Message(new Date(), ex.getMessage(), "uri=/participants/" + updatedParticipant.getId());
            return new ResponseEntity<>(message, HttpStatus.CONFLICT);
        }
    }
    
     @ApiOperation(value = "Création d'un participant", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
    @ApiResponse(code = 409, message = "La ressource existe déjà"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PostMapping("/participantsColonie")
    public ResponseEntity<ParticipantColonieDTO> createParticipant(@RequestBody ParticipantColonieDTO participantDTO) {
       ParticipantColonieDTO paDTO = participantServiceColonie.saveParticipant(participantDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(paDTO);
    }

    @ApiOperation(value = "Obtenir les participants par ID du dossier", response = List.class)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @GetMapping("/participantsColonie/etat")
    public ResponseEntity<List<ParticipantColonieDTO>> getParticipantsByDossierEtat() {
        List<ParticipantColonieDTO> participants = participantServiceColonie.getParticipantsByDossierEtat();
        return ResponseEntity.status(HttpStatus.OK).body(participants);
    }
 @ApiOperation(value = "Obtenir les participants par année", response = List.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @GetMapping("/participantsColonie/annee/{annee}")
    public ResponseEntity<List<ParticipantColonieDTO>> getParticipantsByAnnee(@PathVariable String annee) {
        List<ParticipantColonieDTO> participants = participantServiceColonie.getParticipantsByAnnee(annee);
        return ResponseEntity.status(HttpStatus.OK).body(participants);
    }

    @ApiOperation(value = "Obtenir les participants validés", response = List.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @GetMapping("/participantsColonie/valider")
    public ResponseEntity<List<ParticipantColonieDTO>> getParticipantsValider() {
        List<ParticipantColonieDTO> participants = participantServiceColonie.getParticipantsValider();
        return ResponseEntity.status(HttpStatus.OK).body(participants);
    }

    @ApiOperation(value = "Obtenir les statistiques des participants par année", response = ColonStatisticsDTO.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Statistiques récupérées avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @GetMapping("/participantsColonie/statistics/{annee}")
    public ResponseEntity<ColonStatisticsDTO> getParticipantStatisticsByAnnee(@PathVariable String annee) {
        ColonStatisticsDTO statistics = participantServiceColonie.getParticipantStatisticsByAnnee(annee);
        return ResponseEntity.status(HttpStatus.OK).body(statistics);
    }
    @GetMapping("participantsColonie/sendMessages")
    public ResponseEntity<String> sendMessages() {
        boolean success = participantServiceColonie.sendMessages();
        if (success) {
            return ResponseEntity.ok("Messages sent successfully.");
        } else {
            return ResponseEntity.status(500).body("Failed to send messages.");
        }
    }
}
