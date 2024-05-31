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
import sn.pad.pe.colonie.dto.ColonDTO;
import sn.pad.pe.colonie.services.ColonService;
import sn.pad.pe.configurations.exception.Message;

@RestController
@Api(value = "API pour l'entité colon")
public class ColonController {

    @Autowired
    private ColonService colonService;

    Message message;

    @ApiOperation(value = "Liste des colons", response = List.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
    @GetMapping("/colons")
    public List<ColonDTO> getColons() {
        return colonService.getColons();
    }

    @ApiOperation(value = "Récupération d'un colon par son matricule parent", response = ColonDTO.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @GetMapping("/colons/matriculeParent/{matricule}")
    public ResponseEntity<ColonDTO> getColonByMatriculeParent(@PathVariable("matricule") String matricule) {
        return ResponseEntity.ok().body(colonService.getColonByMatriculeParent(matricule));
    }

    @ApiOperation(value = "Récupération d'un colon par son code de dossier", response = ColonDTO.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @GetMapping("/colons/codeDossier/{code}")
    public ResponseEntity<ColonDTO> getColonByCodeDossier(@PathVariable("code") String code) {
        return ResponseEntity.ok().body(colonService.getColonByCodeDossier(code));
    }

    @ApiOperation(value = "Mise à jour d'un colon", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet modifié avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PutMapping("/colons")
    public ResponseEntity<Message> updateColon(@RequestBody ColonDTO colonDto) {
        if (colonService.update(colonDto)) {
            message = new Message(new Date(), "Colon with id " + colonDto.getId() + " updated.",
                    "uri=/colons/" + colonDto.getId());
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "Colon with id " + colonDto.getId() + " not found.",
                "uri=/colons/" + colonDto.getId());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ApiOperation(value = "Suppression d'un colon", response = ResponseEntity.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Objet supprimé avec succès"),
        @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
        @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
        @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") 
    })
    @DeleteMapping("/colons/{id}")
    public ResponseEntity<Message> deleteColon(@PathVariable Long id) {
        if (colonService.deleteColonById(id)) {
            message = new Message(new Date(), "Colon with id " + id + " deleted.", "uri=/colons/" + id);
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "Colon with id " + id + " not found.", "uri=/colons/" + id);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
    
    @ApiOperation(value = "Recupération d'un colon par son identifiant", response = ColonDTO.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet récupéré avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @GetMapping("/colons/{id}")
    public ResponseEntity<ColonDTO> getColonById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok().body(colonService.getColonById(id));
    }

    @ApiOperation(value = "Création d'un colon", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
            @ApiResponse(code = 409, message = "La ressource existe déjà"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PostMapping("/colons")
    public ResponseEntity<ColonDTO> saveColon(@RequestBody ColonDTO colonDTO) {
        return ResponseEntity.ok().body(colonService.saveColon(colonDTO));
    }

}
