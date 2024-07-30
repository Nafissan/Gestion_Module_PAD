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
import sn.pad.pe.pelerinage.dto.FormulaireSatisfactionPelerinageDTO;
import sn.pad.pe.pelerinage.services.FormulaireSatisfactionPelerinageService;

@RestController
@Api(value = "API pour l'entité formulaire satisfaction pèlerinage")
public class FormulaireSatisfactionPelerinageController {

    @Autowired
    private FormulaireSatisfactionPelerinageService formulaireSatisfactionPelerinageService;

    private Message message;

    @ApiOperation(value = "Liste des formulaires de satisfaction", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") 
    })
    @GetMapping("/formulairesSatisfactionPelerinages")
    public ResponseEntity<List<FormulaireSatisfactionPelerinageDTO>> getAllFormulaires() {
        List<FormulaireSatisfactionPelerinageDTO> liste = formulaireSatisfactionPelerinageService.getAllFormulaires();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Récupération des formulaires par état de dossier", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/formulairesSatisfactionPelerinages/dossierEtat")
    public ResponseEntity<List<FormulaireSatisfactionPelerinageDTO>> getFormulairesByDossierEtat() {
        List<FormulaireSatisfactionPelerinageDTO> liste = formulaireSatisfactionPelerinageService.getFormulairesByDossierEtat();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Récupération des formulaires par année", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping("/formulairesSatisfactionPelerinages/annee/{annee}")
    public ResponseEntity<List<FormulaireSatisfactionPelerinageDTO>> getFormulairesByAnnee(@PathVariable String annee) {
        List<FormulaireSatisfactionPelerinageDTO> liste = formulaireSatisfactionPelerinageService.getFormulairesByAnnee(annee);
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Création d'un formulaire de satisfaction", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 201, message = "Objet créé avec succès"),
        @ApiResponse(code = 409, message = "La ressource existe déjà"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @PostMapping("/formulairesSatisfactionPelerinages")
    public ResponseEntity<FormulaireSatisfactionPelerinageDTO> createFormulaire(@RequestBody FormulaireSatisfactionPelerinageDTO formulaireSatisfactionPelerinageDTO) {
        FormulaireSatisfactionPelerinageDTO formulaire = formulaireSatisfactionPelerinageService.saveFormulaire(formulaireSatisfactionPelerinageDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(formulaire);
    }

    @ApiOperation(value = "Mise à jour d'un formulaire de satisfaction", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Objet modifié avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @PutMapping("/formulairesSatisfactionPelerinages")
    public ResponseEntity<FormulaireSatisfactionPelerinageDTO> updateFormulaire(@RequestBody FormulaireSatisfactionPelerinageDTO formulaireSatisfactionPelerinageDTO) {
        FormulaireSatisfactionPelerinageDTO formulaire = formulaireSatisfactionPelerinageService.updateFormulaire(formulaireSatisfactionPelerinageDTO);
        return ResponseEntity.ok().body(formulaire);

    }

    @ApiOperation(value = "Suppression d'un formulaire de satisfaction", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @DeleteMapping("/formulairesSatisfactionPelerinages")
    public ResponseEntity<Message> deleteFormulaire(@RequestBody FormulaireSatisfactionPelerinageDTO formulaireSatisfactionPelerinageDTO) {
        boolean isDeleted = formulaireSatisfactionPelerinageService.deleteFormulaire(formulaireSatisfactionPelerinageDTO);
        if (isDeleted) {
            message = new Message(new Date(), "FormulaireSatisfactionPelerinage with id " + formulaireSatisfactionPelerinageDTO.getId() + " deleted.", "uri=/formulairesSatisfactionPelerinages/" + formulaireSatisfactionPelerinageDTO.getId());
            return ResponseEntity.ok().body(message);
        } else {
            message = new Message(new Date(), "FormulaireSatisfactionPelerinage with id " + formulaireSatisfactionPelerinageDTO.getId() + " not found.", "uri=/formulairesSatisfactionPelerinages/" + formulaireSatisfactionPelerinageDTO.getId());
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }
}