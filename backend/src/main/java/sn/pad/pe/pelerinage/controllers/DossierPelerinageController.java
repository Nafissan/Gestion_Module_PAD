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
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.pelerinage.dto.DossierPelerinageDTO;
import sn.pad.pe.pelerinage.services.DossierPelerinageService;

@RestController
@Api(value = "API pour l'entité dossier pèlerinage")
public class DossierPelerinageController {

    @Autowired
    private DossierPelerinageService dossierPelerinageService;

    private Message message;

    @ApiOperation(value = "Liste des dossiers pèlerinages", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") 
    })
    @GetMapping("/dossiersPelerinages")
    public ResponseEntity<List<DossierPelerinageDTO>> getDossierPelerinages() {
        List<DossierPelerinageDTO> liste = dossierPelerinageService.getDossierPelerinages();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @GetMapping("/dossiersPelerinages/etatOuvertOuSaisi")
    public ResponseEntity<DossierPelerinageDTO> getDossierPelerinageByEtat() {
        DossierPelerinageDTO dossier = dossierPelerinageService.getDossierPelerinageByEtat();
        return new ResponseEntity<>(dossier, HttpStatus.OK);
    }

    @ApiOperation(value = "Récupération d'un dossier pèlerinage par année", response = DossierPelerinageDTO.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") 
    })
    @GetMapping("/dossiersPelerinages/annee/{annee}")
    public ResponseEntity<DossierPelerinageDTO> getDossierPelerinageByAnnee(@PathVariable String annee) {
        DossierPelerinageDTO dossier = dossierPelerinageService.getDossierPelerinageByAnnee(annee);
        return ResponseEntity.status(HttpStatus.OK).body(dossier);
    }

    @ApiOperation(value = "Création d'un dossier pèlerinage", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 201, message = "Objet créé avec succès"),
        @ApiResponse(code = 409, message = "La ressource existe déjà"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") 
    })
    @PostMapping("/dossiersPelerinages")
    public ResponseEntity<DossierPelerinageDTO> createDossierPelerinage(@RequestBody DossierPelerinageDTO dossierPelerinageDTO) {
        DossierPelerinageDTO dossier = dossierPelerinageService.createDossierPelerinage(dossierPelerinageDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(dossier);
    }

    @ApiOperation(value = "Liste des dossiers pèlerinages fermés", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/dossiersPelerinages/fermes")
    public ResponseEntity<List<DossierPelerinageDTO>> getDossiersPelerinagesFerme() {
        List<DossierPelerinageDTO> liste = dossierPelerinageService.getDossiersPelerinagesFerme();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Mise à jour d'un dossier pèlerinage", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Objet modifié avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") 
    })
    @PutMapping("/dossiersPelerinages")
    public ResponseEntity<Message> updateDossierPelerinage(@RequestBody DossierPelerinageDTO dossierPelerinageDTO) {
        boolean isUpdated = dossierPelerinageService.updateDossierPelerinage(dossierPelerinageDTO);
        if (isUpdated) {
            message = new Message(new Date(), "DossierPelerinage with id " + dossierPelerinageDTO.getId() + " updated.", "uri=/dossiersPelerinages/" + dossierPelerinageDTO.getId());
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "DossierPelerinage with id " + dossierPelerinageDTO.getId() + " not found.", "uri=/dossiersPelerinages/" + dossierPelerinageDTO.getId());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ApiOperation(value = "Suppression d'un dossier pèlerinage", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") 
    })
    @DeleteMapping("/dossiersPelerinages")
    public ResponseEntity<Message> deleteDossierPelerinage(@RequestBody DossierPelerinageDTO dossierPelerinageDTO) {
        boolean isDeleted = dossierPelerinageService.deleteDossierPelerinage(dossierPelerinageDTO);
        if (isDeleted) {
            message = new Message(new Date(), "DossierPelerinage with id " + dossierPelerinageDTO.getId() + " deleted.", "uri=/dossiersPelerinages/" + dossierPelerinageDTO.getId());
            return ResponseEntity.ok().body(message);
        } else {
            message = new Message(new Date(), "DossierPelerinage with id " + dossierPelerinageDTO.getId() + " not found.", "uri=/dossiersPelerinages/" + dossierPelerinageDTO.getId());
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }
}