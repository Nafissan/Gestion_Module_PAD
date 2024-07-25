package sn.pad.pe.pelerinage.controllers;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.pelerinage.dto.PelerinDTO;
import sn.pad.pe.pelerinage.dto.PelerinStatsDTO;
import sn.pad.pe.pelerinage.services.PelerinService;
import sn.pad.pe.pss.dto.AgentDTO;

@RestController
@Api(value = "API pour l'entité pèlerin")
@RequestMapping("/pelerins")
public class PelerinController {

    @Autowired
    private PelerinService pelerinService;

    private Message message;

    @ApiOperation(value = "Liste de tous les pèlerins", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") 
    })
    @GetMapping
    public ResponseEntity<List<PelerinDTO>> getAllPelerins() {
        List<PelerinDTO> liste = pelerinService.getAllPelerins();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Récupération des pèlerins aptes", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/apte")
    public ResponseEntity<List<PelerinDTO>> getPelerinsApte() {
        List<PelerinDTO> liste = pelerinService.getPelerinsApte();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Récupération des pèlerins par année", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/annee/{annee}")
    public ResponseEntity<List<PelerinDTO>> getPelerinsByAnnee(@PathVariable String annee) {
        List<PelerinDTO> liste = pelerinService.getPelerinsByAnnee(annee);
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Récupération des statistiques des pèlerins par année", response = PelerinStatsDTO.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Statistiques récupérées avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/statistiques/annee/{annee}")
    public ResponseEntity<PelerinStatsDTO> getPelerinStatisticsByAnnee(@PathVariable String annee) {
        PelerinStatsDTO stats = pelerinService.getPelerinStatisticsByAnnee(annee);
        return ResponseEntity.status(HttpStatus.OK).body(stats);
    }

    @ApiOperation(value = "Récupération des pèlerins par état de dossier", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/dossierEtat")
    public ResponseEntity<List<PelerinDTO>> getPelerinsByDossierEtat() {
        List<PelerinDTO> liste = pelerinService.getPelerinsByDossierEtat();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Création d'un pèlerin", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 201, message = "Objet créé avec succès"),
        @ApiResponse(code = 409, message = "La ressource existe déjà"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @PostMapping
    public ResponseEntity<PelerinDTO> createPelerin(@RequestBody PelerinDTO pelerinDTO) {
        PelerinDTO pelerin = pelerinService.savePelerin(pelerinDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(pelerin);
    }

    @ApiOperation(value = "Mise à jour d'un pèlerin", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Objet modifié avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @PutMapping
    public ResponseEntity<Message> updatePelerin(@RequestBody PelerinDTO updatedPelerin) {
        boolean isUpdated = pelerinService.updatePelerin(updatedPelerin);
        if (isUpdated) {
            message = new Message(new Date(), "Pelerin with id " + updatedPelerin.getId() + " updated.", "uri=/pelerins/" + updatedPelerin.getId());
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "Pelerin with id " + updatedPelerin.getId() + " not found.", "uri=/pelerins/" + updatedPelerin.getId());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ApiOperation(value = "Suppression d'un pèlerin", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @DeleteMapping
    public ResponseEntity<Message> deletePelerin(@RequestBody PelerinDTO pelerinDTO) {
        boolean isDeleted = pelerinService.deletePelerin(pelerinDTO);
        if (isDeleted) {
            message = new Message(new Date(), "Pelerin with id " + pelerinDTO.getId() + " deleted.", "uri=/pelerins/" + pelerinDTO.getId());
            return ResponseEntity.ok().body(message);
        } else {
            message = new Message(new Date(), "Pelerin with id " + pelerinDTO.getId() + " not found.", "uri=/pelerins/" + pelerinDTO.getId());
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "Assignation d'agents au pèlerinage", response = ResponseEntity.class)
    @PostMapping("/assignAgents")
    public ResponseEntity<Message> assignAgentsToPelerinage(@RequestBody AgentDTO agent) {
        pelerinService.assignAgentsToPelerinage(agent);
        message = new Message(new Date(), "Agents assignés au pèlerinage.", "uri=/pelerins/assignAgents");
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }
    @ApiOperation(value = "Envoi des messages aux pèlerins")
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Messages envoyés avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 500, message = "Erreur lors de l'envoi des messages") 
    })
    @PostMapping("/send-messages")
    public ResponseEntity<Message> sendMessages() {
        boolean success = pelerinService.sendMessages();
        if (success) {
            message = new Message(new Date(), "Messages envoyés avec succès.", "uri=/pelerins/send-messages");
            return ResponseEntity.ok().body(message);
        } else {
            message = new Message(new Date(), "Erreur lors de l'envoi des messages.", "uri=/pelerins/send-messages");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}