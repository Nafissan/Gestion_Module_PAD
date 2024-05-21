package sn.pad.pe.dotation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.dotation.dto.SuiviDotationDTO;
import sn.pad.pe.dotation.services.SuiviDotationService;

@RestController
public class SuiviDotationController {

	@Autowired
	private SuiviDotationService suiviDotationService;
	private Message message;

	@GetMapping("/suivi-dotations")
	public ResponseEntity<?> getSuiviStocks(
			@RequestParam(value = "idDotation", required = false) Long idDotation) {
		List<SuiviDotationDTO> suiviDotationDTOs = suiviDotationService.getSuiviDotationDTOs(idDotation);
		return new ResponseEntity<List<SuiviDotationDTO>>(suiviDotationDTOs, HttpStatus.OK);
	}

	@GetMapping("/suivi-dotations/dotation/{code}")
	public ResponseEntity<?> getSuiviDotations(@PathVariable(value = "code") String code) {
		List<SuiviDotationDTO> suiviDotationDTOs = suiviDotationService.getSuiviDotationsByDotation(code);
		return new ResponseEntity<List<SuiviDotationDTO>>(suiviDotationDTOs, HttpStatus.OK);
	}

	@PostMapping("/suivi-dotations")
	public ResponseEntity<?> create(@RequestBody SuiviDotationDTO suiviDotationDTO) {
		return new ResponseEntity<SuiviDotationDTO>(suiviDotationService.create(suiviDotationDTO), HttpStatus.CREATED);
	}

	@GetMapping("/suivi-dotations/annee/{annee}/mois/{mois}")
	public ResponseEntity<?> getSuiviDotationsByAnneeAndMois(@PathVariable(value = "annee") int annee,
			@PathVariable(value = "mois") String mois) {
		List<SuiviDotationDTO> suiviDotationDTOs = suiviDotationService.getSuiviDotationsByAnneeAndMois(annee, mois);
		return new ResponseEntity<List<SuiviDotationDTO>>(suiviDotationDTOs, HttpStatus.OK);
	}

	@GetMapping("/suivi-dotations/dotation/{id}/annee/{annee}/mois/{mois}")
	public ResponseEntity<?> getSuiviDotationsByDotationAndAnneeAndMois(@PathVariable(value = "id") Long id,
			@PathVariable(value = "annee") int annee, @PathVariable(value = "mois") String mois) {
		List<SuiviDotationDTO> suiviDotationDTOs = suiviDotationService.getSuiviDotationsByDotationAndAnneeAndMois(id,
				annee, mois);
		return new ResponseEntity<List<SuiviDotationDTO>>(suiviDotationDTOs, HttpStatus.OK);
	}
}
