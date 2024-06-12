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
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.colonie.services.DossierColonieService;
import sn.pad.pe.configurations.exception.Message;

@RestController
@Api(value = "API pour l'entité dossier colonie")
public class DossierColonieController {

    @Autowired
    private DossierColonieService dossierColonieService;

    Message message;

    @ApiOperation(value = "Liste des dossiers colonies", response = List.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
    @GetMapping("/dossiersColonies")
    public List<DossierColonieDTO> getDossierColonies() {
        return dossierColonieService.getDossierColonies();
    }
    @ApiOperation(value = "Récupération d'un dossier colonie par année", response = DossierColonieDTO.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @GetMapping("/dossiersColonies/annee/{annee}")
    public ResponseEntity<DossierColonieDTO> getDossierColonieByAnnee(@PathVariable String annee) {
        return ResponseEntity.ok().body(dossierColonieService.getDossierColonieByAnnee(annee));
    }

    @ApiOperation(value = "Création d'un dossier colonie", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
    @ApiResponse(code = 409, message = "La ressource existe déjà"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PostMapping("/dossiersColonies")
    public ResponseEntity<DossierColonieDTO> createDossierColonie(@RequestBody DossierColonieDTO dossierColonieDTO) {
        return ResponseEntity.ok().body(dossierColonieService.createDossierColonie(dossierColonieDTO));
    }



    @ApiOperation(value = "Mise à jour d'un dossier colonie", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PutMapping("/dossiersColonies")
    public ResponseEntity<Message> updateDossierColonie(@RequestBody DossierColonieDTO dossierColonieDTO) {
        if (dossierColonieService.updateDossierColonie(dossierColonieDTO)) {
            message = new Message(new Date(), "DossierColonie with id " + dossierColonieDTO.getId() + " updated.", "uri=/dossiersColonies/" + dossierColonieDTO.getId());
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "DossierColonie with id " + dossierColonieDTO.getId() + " not found.", "uri=/dossiersColonies/" + dossierColonieDTO.getId());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }


    @ApiOperation(value = "Suppression d'un dossier colonie", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") 
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Message> deleteDossierColonie(@PathVariable Long id) {
        if (dossierColonieService.deleteDossierColonieById(id)) {
            message = new Message(new Date(), "DossierColonie with id " + id + " deleted.", "uri=/dossiersColonies/" + id);
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "DossierColonie with id " + id + " not found.", "uri=/dossiersColonies/" + id);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
