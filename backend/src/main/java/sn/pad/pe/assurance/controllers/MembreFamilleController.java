package sn.pad.pe.assurance.controllers;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.assurance.dto.MembreFamilleDTO;
import sn.pad.pe.assurance.services.MembreFamilleService;
import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.pss.dto.UploadFileResponse;

@RestController
@RequestMapping("/membrefamille")
public class MembreFamilleController {

	@Autowired
	private MembreFamilleService membrefamilleService;
	Message message;

	@GetMapping
	public ResponseEntity<List<MembreFamilleDTO>> getMembreFamille() {
		List<MembreFamilleDTO> membrefamilleDTOs = membrefamilleService.getMembreFamile();
		return new ResponseEntity<List<MembreFamilleDTO>>(membrefamilleDTOs, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<MembreFamilleDTO> create(@RequestBody MembreFamilleDTO membrefamilleDto) {
		return new ResponseEntity<MembreFamilleDTO>(membrefamilleService.create(membrefamilleDto), HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<Message> update(@RequestBody MembreFamilleDTO membrefamilleDto) {
		if (membrefamilleService.update(membrefamilleDto)) {
			message = new Message(new Date(), "MembreFamilleDTO with id " + membrefamilleDto.getCode() + " updated.",
					"uri=/membrefamille/" + membrefamilleDto.getCode());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "membrefamilleDto with id " + membrefamilleDto.getCode() + " not found.",
				"uri=/membrefamille/" + membrefamilleDto.getCode());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping
	public ResponseEntity<Message> delete(@RequestBody MembreFamilleDTO membrefamilleDto) {
		if (membrefamilleService.delete(membrefamilleDto)) {
			message = new Message(new Date(), "ComiteDTO with id " + membrefamilleDto.getId() + " deleted.",
					"uri=/membrefamille/" + membrefamilleDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "MembreFamilleDTO with id " + membrefamilleDto.getId() + " not found.",
				"uri=/membrefamille/" + membrefamilleDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@PostMapping("/{id}/upload")
	public UploadFileResponse uploadMembre(@PathVariable(value = "id") Long id,
			@RequestParam("file") MultipartFile file) {
		return membrefamilleService.uploadMembre(id, file);
	}

	@GetMapping("/{id}/download")
	public ResponseEntity<Resource> downloadMembre(@PathVariable(value = "id") Long id, HttpServletRequest request) {
		return membrefamilleService.downloadFile(id, request);
	}

	@PostMapping("/all")
	public ResponseEntity<?> create(@RequestBody List<MembreFamilleDTO> membreDtos) {
		return new ResponseEntity<>(membrefamilleService.createMultiple(membreDtos), HttpStatus.CREATED);
	}

}
