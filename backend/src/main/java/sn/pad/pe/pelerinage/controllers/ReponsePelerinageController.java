package sn.pad.pe.pelerinage.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
import sn.pad.pe.pelerinage.dto.FormulaireSatisfactionPelerinageDTO;
import sn.pad.pe.pelerinage.dto.ReponsePelerinageDTO;
import sn.pad.pe.pelerinage.services.ReponsePelerinageService;

@RestController
@Api(value = "API pour l'entité réponse de pèlerinage")
@RequestMapping("/reponsesPelerinage")
public class ReponsePelerinageController {

    @Autowired
    private ReponsePelerinageService reponsePelerinageService;

    private Message message;

    @ApiOperation(value = "Récupération des réponses par ID de formulaire", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste des réponses récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") 
    })
    @PostMapping("/formulaire")
    public ResponseEntity<List<ReponsePelerinageDTO>> getReponsesByFormulaireId(@RequestBody FormulaireSatisfactionPelerinageDTO formulaireId) {
        List<ReponsePelerinageDTO> reponses = reponsePelerinageService.getReponsesByFormulaireId(formulaireId);
        return ResponseEntity.status(HttpStatus.OK).body(reponses);
    }

    @ApiOperation(value = "Récupération de toutes les réponses", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste des réponses récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping
    public ResponseEntity<List<ReponsePelerinageDTO>> getAllReponses() {
        List<ReponsePelerinageDTO> reponses = reponsePelerinageService.getReponses();
        return ResponseEntity.status(HttpStatus.OK).body(reponses);
    }

    @ApiOperation(value = "Création d'une réponse de pèlerinage", response = ReponsePelerinageDTO.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 201, message = "Réponse créée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @PostMapping
    public ResponseEntity<ReponsePelerinageDTO> createReponse(@RequestBody ReponsePelerinageDTO reponseDTO) {
        ReponsePelerinageDTO reponse = reponsePelerinageService.saveReponse(reponseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(reponse);
    }

    @ApiOperation(value = "Mise à jour d'une réponse de pèlerinage", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Réponse mise à jour avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @PutMapping
    public ResponseEntity<Message> updateReponse(@RequestBody ReponsePelerinageDTO reponseDTO) {
        ReponsePelerinageDTO updatedReponse = reponsePelerinageService.updateReponses(reponseDTO);
        if (updatedReponse != null) {
            message = new Message(new Date(), "Réponse avec ID " + reponseDTO.getId() + " mise à jour.", "uri=/reponsesPelerinage/" + reponseDTO.getId());
            return ResponseEntity.ok().body(message);
        } else {
            message = new Message(new Date(), "Réponse avec ID " + reponseDTO.getId() + " non trouvée.", "uri=/reponsesPelerinage/" + reponseDTO.getId());
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }
}