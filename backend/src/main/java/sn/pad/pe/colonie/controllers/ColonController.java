package sn.pad.pe.colonie.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.colonie.dto.ColonDTO;
import sn.pad.pe.colonie.services.ColonService;

@RestController
@Api(value = "API pour l'entité colon")
public class ColonController {

    @Autowired
    private ColonService colonService;


    @ApiOperation(value = "Liste des colons", response = List.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
    @GetMapping("/colons")
    public List<ColonDTO> getColons() {
        return colonService.getColons();
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
