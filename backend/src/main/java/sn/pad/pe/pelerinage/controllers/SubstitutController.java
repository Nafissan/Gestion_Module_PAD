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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.pelerinage.dto.SubstitutDTO;
import sn.pad.pe.pelerinage.services.SubstitutService;
import sn.pad.pe.pss.dto.AgentDTO;

@RestController
@Api(value = "API pour l'entité substitut")
@RequestMapping("/substituts")
public class SubstitutController {

    @Autowired
    private SubstitutService substitutService;

    private Message message;

    @ApiOperation(value = "Récupération de tous les substituts", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste des substituts récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") 
    })
    @GetMapping
    public ResponseEntity<List<SubstitutDTO>> getAllSubstituts() {
        List<SubstitutDTO> substituts = substitutService.getAllSubstituts();
        return ResponseEntity.status(HttpStatus.OK).body(substituts);
    }
    @ApiOperation(value = "Récupération des substituts par état du dossier", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste des substituts récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/etat")
    public ResponseEntity<List<SubstitutDTO>> getSubstitutsByDossierEtat() {
        List<SubstitutDTO> substituts = substitutService.getSubstitutsByDossierEtat();
        return ResponseEntity.status(HttpStatus.OK).body(substituts);
    }

    @ApiOperation(value = "Création d'un substitut", response = SubstitutDTO.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 201, message = "Substitut créé avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @PostMapping
    public ResponseEntity<SubstitutDTO> createSubstitut(@RequestBody SubstitutDTO substitutDTO) {
        SubstitutDTO substitut = substitutService.saveSubstitut(substitutDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(substitut);
    }

    @ApiOperation(value = "Génération d'un substitut par sexe", response = SubstitutDTO.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Substitut généré avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/generate/{sexe}")
    public ResponseEntity<SubstitutDTO> generateSubstitut(@PathVariable String sexe) {
        SubstitutDTO substitut = substitutService.generateSubstitutDTO(sexe);
        return ResponseEntity.status(HttpStatus.OK).body(substitut);
    }

    @ApiOperation(value = "Assignation des substituts aux pèlerins")
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Substituts assignés aux pèlerins avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @PostMapping("/assign")
    public ResponseEntity<Message> assignSubstitutsToPelerin(@RequestBody AgentDTO agent) {
        boolean response=substitutService.assignedSubstitutToPelerin(agent);
        if(response){
            message = new Message(new Date(), "Substituts assignés aux pèlerins.", "uri=/substituts/assign");
            return ResponseEntity.ok().body(message);
        }else{
            message = new Message(new Date(), "Assignement Substituts echoue.", "uri=/substituts/assign");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        
    }

    @ApiOperation(value = "Suppression d'un substitut", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Substitut supprimé avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @DeleteMapping
    public ResponseEntity<Message> deleteSubstitut(@RequestBody SubstitutDTO substitutDTO) {
        boolean isDeleted = substitutService.deleteSubstitut(substitutDTO);
        if (isDeleted) {
            message = new Message(new Date(), "Substitut avec ID " + substitutDTO.getId() + " supprimé.", "uri=/substituts/" + substitutDTO.getId());
            return ResponseEntity.ok().body(message);
        } else {
            message = new Message(new Date(), "Substitut avec ID " + substitutDTO.getId() + " non trouvé.", "uri=/substituts/" + substitutDTO.getId());
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "Suppression de tous les substituts")
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Tous les substituts ont été supprimés avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @DeleteMapping("/all")
    public ResponseEntity<Message> deleteAllSubstituts() {
        substitutService.deleteAllSubstituts();
        message = new Message(new Date(), "Tous les substituts ont été supprimés.", "uri=/substituts/all");
        return ResponseEntity.ok().body(message);
    }
}