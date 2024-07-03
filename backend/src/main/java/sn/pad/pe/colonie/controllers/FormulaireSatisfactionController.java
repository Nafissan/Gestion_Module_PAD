package sn.pad.pe.colonie.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
    public ResponseEntity<List<FormulaireSatisfactionDTO>> getAllFormulaires() {
        List<FormulaireSatisfactionDTO> liste =  formulaireSatisfactionService.getAllFormulaires();
                return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Création d'un formulaire de satisfaction", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
    @ApiResponse(code = 409, message = "La ressource existe déjà"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PostMapping("/formulairesSatisfaction")
    public ResponseEntity<FormulaireSatisfactionDTO> saveFormulaire(@RequestBody FormulaireSatisfactionDTO request) {
        FormulaireSatisfactionDTO formulairedDTO = formulaireSatisfactionService.saveFormulaire(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(formulairedDTO);
    }
    @ApiOperation(value = "Modification d'un formulaire de satisfaction", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
    @ApiResponse(code = 409, message = "La ressource existe déjà"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PutMapping("/formulairesSatisfaction")
    public ResponseEntity<FormulaireSatisfactionDTO> updateFormulaire(@RequestBody FormulaireSatisfactionDTO request) {
        FormulaireSatisfactionDTO formulairedDTO = formulaireSatisfactionService.updateFormulaire(request);
        return ResponseEntity.ok().body(formulairedDTO);
    }

    @ApiOperation(value = "Suppression d'un formulaire de satisfaction", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @DeleteMapping("/formulairesSatisfaction")
    public ResponseEntity<Message> deleteFormulaire(@RequestBody FormulaireSatisfactionDTO formulaire) {
        if(formulaireSatisfactionService.deleteFormulaire(formulaire)){
        message = new Message(new Date(), "FormulaireSatisfaction with id " + formulaire.getId() + " deleted.", "uri=/formulairesSatisfaction/" + formulaire.getId());
        return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "FormulaireSatisfaction with id " + formulaire.getId() + " nt found.", "uri=/formulairesSatisfaction/" + formulaire.getId());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
