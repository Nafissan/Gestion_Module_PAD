package sn.pad.pe.colonie.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.*;
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;
import sn.pad.pe.colonie.services.FormulaireSatisfactionService;
import sn.pad.pe.configurations.exception.Message;

@RestController
@Api(value = "API pour l'entité formulaire de satisfaction")
public class FormulaireSatisfactionController {

    @Autowired
    private FormulaireSatisfactionService formulaireSatisfactionService;

    Message message;

    @ApiOperation(value = "Liste des formulaires de satisfaction", response = List.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
    @GetMapping("/formulairesSatisfaction")
    public List<FormulaireSatisfactionDTO> getAllFormulaires() {
        return formulaireSatisfactionService.getAllFormulaires();
    }

    @ApiOperation(value = "Récupération d'un formulaire par ID", response = FormulaireSatisfactionDTO.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @GetMapping("/formulairesSatisfaction/{id}")
    public ResponseEntity<FormulaireSatisfactionDTO> getFormulaireById(@PathVariable Long id) {
        return ResponseEntity.ok().body(formulaireSatisfactionService.getFormulaireById(id));
    }

    @ApiOperation(value = "Récupération d'un formulaire par code dossier", response = FormulaireSatisfactionDTO.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @GetMapping("/formulairesSatisfaction/codeDossier/{code}")
    public ResponseEntity<FormulaireSatisfactionDTO> getFormulaireByCodeDossier(@RequestBody DossierColonieDTO dossierColonieDTO) {
        return ResponseEntity.ok().body(formulaireSatisfactionService.getFormulaireByCodeDossier(dossierColonieDTO));
    }

    @ApiOperation(value = "Création d'un formulaire de satisfaction", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
    @ApiResponse(code = 409, message = "La ressource existe déjà"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PostMapping("/formulairesSatisfaction")
    public ResponseEntity<FormulaireSatisfactionDTO> saveFormulaire(@RequestBody FormulaireSatisfactionDTO formulaire) {
        return ResponseEntity.ok().body(formulaireSatisfactionService.saveFormulaire(formulaire));
    }

    @ApiOperation(value = "Suppression d'un formulaire de satisfaction", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @DeleteMapping("/formulairesSatisfaction/{id}")
    public ResponseEntity<Message> deleteFormulaire(@PathVariable Long id) {
        formulaireSatisfactionService.deleteFormulaire(id);
        message = new Message(new Date(), "FormulaireSatisfaction with id " + id + " deleted.", "uri=/formulairesSatisfaction/" + id);
        return ResponseEntity.ok().body(message);
    }
}
