package sn.pad.pe.colonie.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import sn.pad.pe.colonie.dto.ColonDTO;
import sn.pad.pe.colonie.dto.ColonStatisticsDTO;
import sn.pad.pe.colonie.services.ColonService;

@RestController
@Api(value = "API pour l'entité colon")
public class ColonController {

    @Autowired
    private ColonService colonService;

    @GetMapping("/colons/byAnnee")
    public ResponseEntity<List<ColonDTO>> getColonsByAnnee(@RequestParam(required = false) String annee) {
        List<ColonDTO> colons=colonService.getColonsByAnnee(annee);
        return new ResponseEntity<>(colons, HttpStatus.OK);
    }

    @GetMapping("/colons/statisticsByAnnee")
    public ResponseEntity<ColonStatisticsDTO> getColonStatisticsByAnnee(@RequestParam(required = false) String annee) {
        ColonStatisticsDTO statisticsDTO = colonService.getColonStatisticsByAnnee(annee);
        return new ResponseEntity<>(statisticsDTO, HttpStatus.OK);
    }

    @ApiOperation(value = "Liste des colons", response = List.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentez d'atteindre est introuvable.") })
    @GetMapping("/colons")
    public ResponseEntity<List<ColonDTO>> getColons() {
        List<ColonDTO> liste = colonService.getColons();
        return ResponseEntity.status(HttpStatus.OK).body(liste);
    }

    @ApiOperation(value = "Récupérer les colons par état du dossier (OUVERT ou SAISI)")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Liste récupérée avec succès"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.")
    })
    @GetMapping("/colons/dossierEtat")
    public ResponseEntity<List<ColonDTO>> getColonsByDossierEtat() {
        List<ColonDTO> colons = colonService.getColonsByDossierEtat();
        return ResponseEntity.status(HttpStatus.OK).body(colons);
    }
    @ApiOperation(value = "Création d'un colon", response = ResponseEntity.class)
    @ApiResponses(value = { @ApiResponse(code = 200, message = "Objet créé avec succès"),
            @ApiResponse(code = 409, message = "La ressource existe déjà"),
            @ApiResponse(code = 401, message = "Vous n'êtes pas autorisé à voir la ressource"),
            @ApiResponse(code = 403, message = "L'accès à la ressource que vous tentiez d'atteindre est interdit"),
            @ApiResponse(code = 404, message = "La ressource que vous tentiez d'atteindre est introuvable.") })
    @PostMapping("/colons")
    public ResponseEntity<ColonDTO> createColon(@RequestBody ColonDTO colonDTO) {
        ColonDTO dto = colonService.saveColon(colonDTO);
        return ResponseEntity.status(HttpStatus.CREATED).contentType(MediaType.APPLICATION_JSON).body(dto);
    }

}
