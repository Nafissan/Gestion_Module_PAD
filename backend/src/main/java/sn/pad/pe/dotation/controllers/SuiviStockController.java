package sn.pad.pe.dotation.controllers;

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

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.dotation.dto.SuiviStockDTO;
import sn.pad.pe.dotation.services.SuiviStockService;

@RestController
public class SuiviStockController {

	@Autowired
	private SuiviStockService suiviStockService;
	private Message message;

	@GetMapping("/suivi-stocks")
	public ResponseEntity<?> getSuiviStocks() {
		List<SuiviStockDTO> suiviStockDTOs = suiviStockService.getSuiviStockDTOs();
		return new ResponseEntity<List<SuiviStockDTO>>(suiviStockDTOs, HttpStatus.OK);
	}

	@GetMapping("/suivi-stocks/stock/{id}")
	public ResponseEntity<?> getSuiviStocks(@PathVariable(value = "id") Long id) {
		List<SuiviStockDTO> suiviStockDTOs = suiviStockService.getSuiviStocksByStock(id);
		return new ResponseEntity<List<SuiviStockDTO>>(suiviStockDTOs, HttpStatus.OK);
	}

	@PostMapping("/suivi-stocks")
	public ResponseEntity<?> create(@RequestBody SuiviStockDTO suiviStockDTO) {
		return new ResponseEntity<SuiviStockDTO>(suiviStockService.create(suiviStockDTO), HttpStatus.CREATED);
	}

	@PutMapping("/suivi-stocks")
	public ResponseEntity<?> update(@RequestBody SuiviStockDTO suiviStockDTO) {
		if (suiviStockService.update(suiviStockDTO)) {
			message = new Message(new Date(), "SuiviStock with id " + suiviStockDTO.getId() + " updated.",
					"uri=/suivi-stocks/" + suiviStockDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "SuiviStock with id " + suiviStockDTO.getId() + " not found.",
				"uri=/suivi-stocks/" + suiviStockDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/suivi-stocks")
	public ResponseEntity<?> delete(@RequestBody SuiviStockDTO suiviStockDTO) {
		if (suiviStockService.delete(suiviStockDTO)) {
			message = new Message(new Date(), "SuiviStock with id " + suiviStockDTO.getId() + " deleted.",
					"uri=/suivi-stocks/" + suiviStockDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "SuiviStock with id " + suiviStockDTO.getId() + " not found.",
				"uri=/suivi-stocks/" + suiviStockDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@PostMapping("/suivi-stocks/stock-correction")
	public ResponseEntity<?> addCorrectionStock(@RequestBody SuiviStockDTO suiviStockDTO) {
		return new ResponseEntity<SuiviStockDTO>(suiviStockService.addCorrectionStock(suiviStockDTO),
				HttpStatus.CREATED);
	}

	@GetMapping("/suivi-stocks/categorie/stock/{id}")
	public ResponseEntity<?> getSuiviStocksByCategorieAndStock(@PathVariable(value = "id") Long id) {
		List<SuiviStockDTO> suiviStockDTOs = suiviStockService.getSuiviStocksByStockAndCategorie(id);
		return new ResponseEntity<List<SuiviStockDTO>>(suiviStockDTOs, HttpStatus.OK);
	}
}
