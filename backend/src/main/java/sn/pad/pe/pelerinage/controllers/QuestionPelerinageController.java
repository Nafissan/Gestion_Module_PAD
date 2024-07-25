package sn.pad.pe.pelerinage.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.pelerinage.dto.QuestionPelerinageDTO;
import sn.pad.pe.pelerinage.services.QuestionPelerinageService;

@RestController
@Api(value = "API pour l'entité question de pèlerinage")
@RequestMapping("/questionsPelerinage")
public class QuestionPelerinageController {

    @Autowired
    private QuestionPelerinageService questionPelerinageService;


    @ApiOperation(value = "Liste de toutes les questions de pèlerinage", response = List.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.")
    })
    @GetMapping
    public ResponseEntity<List<QuestionPelerinageDTO>> getAllQuestionPelerinages() {
        List<QuestionPelerinageDTO> liste = questionPelerinageService.getAllQuestionPelerinages();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }
}