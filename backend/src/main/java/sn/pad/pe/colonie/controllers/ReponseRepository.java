package sn.pad.pe.colonie.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.dto.ReponseDTO;
import sn.pad.pe.colonie.services.ReponseService;

@RestController
@Api(value = "API pour l'entité reponse")
public class ReponseRepository {
    @Autowired
    private ReponseService reponseService;

     @ApiOperation(value = "Liste des reponses", response = List.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
    @GetMapping("/reponses")
    public ResponseEntity<List<ReponseDTO>> getAllReponse(@RequestBody FormulaireSatisfaction formulaireSatisfaction) {
        List<ReponseDTO> liste = reponseService.getReponsesByFormulaireId(formulaireSatisfaction);
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

}
