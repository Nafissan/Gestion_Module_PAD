package sn.pad.pe.colonie.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.*;
import sn.pad.pe.colonie.dto.QuestionDTO;
import sn.pad.pe.colonie.services.QuestionService;

@RestController
@Api(value = "API pour l'entité question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;


    @ApiOperation(value = "Liste des questions", response = List.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
    @GetMapping("/questions")
    public List<QuestionDTO> getAllQuestions() {
        return questionService.getAllQuestions();
    }

}
