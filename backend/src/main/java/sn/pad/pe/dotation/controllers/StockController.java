package sn.pad.pe.dotation.controllers;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

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
import sn.pad.pe.dotation.dto.StockDTO;
import sn.pad.pe.dotation.services.StockService;

@RestController
public class StockController {

	@Autowired
	private StockService stockService;
	private Message message;

	@GetMapping("/stocks")
	public ResponseEntity<?> getStocks() {
		List<StockDTO> stockDTOs = stockService.getStocks();
		return new ResponseEntity<List<StockDTO>>(stockDTOs, HttpStatus.OK);
	}

	@GetMapping("/stocks/{id}")
	public ResponseEntity<?> getTypeDotationById(@PathVariable(value = "id") long id) {
		StockDTO stockDto = stockService.getStockById(id);
		return new ResponseEntity<StockDTO>(stockDto, HttpStatus.FOUND);
	}

	@GetMapping("/stocks/code/{id}")
	public ResponseEntity<?> getTypeDotationByCode(@PathVariable(value = "code") String code) {
		StockDTO stockDto = stockService.getStockByCode(code);
		return new ResponseEntity<StockDTO>(stockDto, HttpStatus.FOUND);
	}

	@GetMapping("/stocks/annee/{annee}/type/{type}")
	public ResponseEntity<?> getTypeDotationByAnneeAndCode(@PathVariable(value = "annee") String annee,
			@PathVariable(value = "type") String type) {
		StockDTO stockDto = stockService.getStockByAnneeAndType(annee, type);
		return new ResponseEntity<StockDTO>(stockDto, HttpStatus.FOUND);
	}

	@PostMapping("/stocks")
	public ResponseEntity<?> create(@RequestBody StockDTO stockDto) {
		return new ResponseEntity<StockDTO>(stockService.create(stockDto), HttpStatus.CREATED);
	}

	@PutMapping("/stocks")
	public ResponseEntity<?> update(@RequestBody StockDTO stockDTO) {
		if (stockService.update(stockDTO)) {
			message = new Message(new Date(), "StockDTO with id " + stockDTO.getId() + " updated.",
					"uri=/stocks/" + stockDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "StockDTO with id " + stockDTO.getId() + " not found.",
				"uri=/stocks/" + stockDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/stocks")
	public ResponseEntity<?> delete(@Valid @RequestBody StockDTO stockDTO) {
		if (stockService.delete(stockDTO)) {
			message = new Message(new Date(), "Stock with id " + stockDTO.getId() + " deleted.",
					"uri=/stocks/" + stockDTO.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Stock with id " + stockDTO.getId() + " not found.",
				"uri=/stocks/" + stockDTO.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@GetMapping("/stocks/anneee/{annee}")
	public ResponseEntity<?> getTypeDotationByAnnee(@PathVariable(value = "annee") String annee) {
		StockDTO stockDto = stockService.getStockByAnnee(annee);
//		return new ResponseEntity<StockDTO>(stockDto, HttpStatus.FOUND);
		return ResponseEntity.status(HttpStatus.OK).body(stockDto);
	}

}
