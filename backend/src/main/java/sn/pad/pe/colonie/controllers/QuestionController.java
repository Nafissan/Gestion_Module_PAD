package sn.pad.pe.colonie.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.*;
import sn.pad.pe.colonie.dto.QuestionDTO;
import sn.pad.pe.colonie.services.QuestionService;
import sn.pad.pe.configurations.exception.Message;

@RestController
@Api(value = "API pour l'entité question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    Message message;

    @ApiOperation(value = "Liste des questions", response = List.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
    @GetMapping("/questions")
    public List<QuestionDTO> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @ApiOperation(value = "Récupération d'une question par ID", response = QuestionDTO.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @GetMapping("/questions/{id}")
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok().body(questionService.getQuestionById(id));
    }

    @ApiOperation(value = "Création d'une question", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
    @ApiResponse(code = 409, message = "La ressource existe déjà"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PostMapping("/questions")
    public ResponseEntity<QuestionDTO> saveQuestion(@RequestBody QuestionDTO question) {
        return ResponseEntity.ok().body(questionService.saveQuestion(question));
    }

    @ApiOperation(value = "Mise à jour d'une question", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PutMapping("/questions")
    public ResponseEntity<Message> updateQuestion(@RequestBody QuestionDTO questionDto) {
        if (questionService.updateQuestion(questionDto)) {
            message = new Message(new Date(), "Question with id " + questionDto.getId() + " updated.", "uri=/questions/" + questionDto.getId());
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "Question with id " + questionDto.getId() + " not found.", "uri=/questions/" + questionDto.getId());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ApiOperation(value = "Suppression d'une question", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
    @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
    @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
    @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Message> deleteQuestion(@PathVariable Long id) {
        if (questionService.deleteQuestion(id)) {
            message = new Message(new Date(), "Question with id " + id + " deleted.", "uri=/questions/" + id);
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "Question with id " + id + " not found.", "uri=/questions/" + id);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
