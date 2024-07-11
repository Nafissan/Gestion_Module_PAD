package sn.pad.pe.colonie.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import sn.pad.pe.colonie.dto.ReponseDTO;
import sn.pad.pe.colonie.services.ReponseService;

@RestController
@Api(value = "API pour l'entité reponse")
public class ReponseController {
    @Autowired
    private ReponseService reponseService;

     @ApiOperation(value = "Liste des reponses", response = List.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
    @GetMapping("/reponses")
public ResponseEntity<List<ReponseDTO>> getAllReponse() {
        List<ReponseDTO> liste = reponseService.getReponses();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

 @ApiOperation(value = "Création d'une reonse", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
    @ApiResponse(code = 409, message = "La ressource existe déjà"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PostMapping("/reponses")
    public ResponseEntity<ReponseDTO> saveReponse(@RequestBody ReponseDTO reponse) {
        ReponseDTO reponses = reponseService.saveReponse(reponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(reponses);
    }

    @ApiOperation(value = "Création d'une reonse", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
    @ApiResponse(code = 409, message = "La ressource existe déjà"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PutMapping("/reponses")
    public ResponseEntity<ReponseDTO> updateReponse(@RequestBody ReponseDTO reponse) {
        ReponseDTO reponses = reponseService.updateReponses(reponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(reponses);
    }
      @ApiOperation(value = "Obtenir les réponses par ID du formulaire", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") 
    })
    @GetMapping("/reponses/formulaire/{formulaireId}")
    public ResponseEntity<List<ReponseDTO>> getReponsesByFormulaireId(@PathVariable Long formulaireId) {
        List<ReponseDTO> reponses = reponseService.getReponsesByFormulaireId(formulaireId);
        return ResponseEntity.status(HttpStatus.OK).body(reponses);
    }
}
