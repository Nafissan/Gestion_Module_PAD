package sn.pad.pe.partenariat.controllers;

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

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.partenariat.dto.ComiteDTO;
import sn.pad.pe.partenariat.services.ComiteService;
import sn.pad.pe.pss.dto.UploadFileResponse;

@RestController
@RequestMapping("/comite")
public class ComiteController {

	@Autowired
	private ComiteService comiteService;
	Message message;

	@GetMapping
	public ResponseEntity<List<ComiteDTO>> getComite() {
		List<ComiteDTO> comiteDTOs = comiteService.getComite();
		return new ResponseEntity<List<ComiteDTO>>(comiteDTOs, HttpStatus.OK);
	}

	@GetMapping("/{code}")
	public ResponseEntity<ComiteDTO> getComiteById(@PathVariable(value = "code") Long code) {
		ComiteDTO comiteDto = comiteService.getComiteById(code);
		return new ResponseEntity<ComiteDTO>(comiteDto, HttpStatus.FOUND);
	}

	@PostMapping
	public ResponseEntity<ComiteDTO> create(@RequestBody ComiteDTO comiteDto) {
		return new ResponseEntity<ComiteDTO>(comiteService.create(comiteDto), HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<Message> update(@RequestBody ComiteDTO comiteDto) {
		if (comiteService.update(comiteDto)) {
			message = new Message(new Date(), "ComiteDTO with id " + comiteDto.getCode() + " updated.",
					"uri=/comite/" + comiteDto.getCode());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "ComiteDTO with id " + comiteDto.getCode() + " not found.",
				"uri=/comite/" + comiteDto.getCode());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping
	public ResponseEntity<Message> delete(@RequestBody ComiteDTO comiteDto) {
		if (comiteService.delete(comiteDto)) {
			message = new Message(new Date(), "ComiteDTO with id " + comiteDto.getId() + " deleted.",
					"uri=/comite/" + comiteDto.getId());
			return ResponseEntity.ok().body(message);
		}
		message = new Message(new Date(), "Comite with id " + comiteDto.getId() + " not found.",
				"uri=/comite/" + comiteDto.getId());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

	}

	@PostMapping("/{id}/upload")
	public UploadFileResponse uploadComite(@PathVariable(value = "id") Long id,
			@RequestParam("file") MultipartFile file) {
		return comiteService.uploadComite(id, file);
	}

	@GetMapping("/{id}/download")
	public ResponseEntity<Resource> downloadComite(@PathVariable(value = "id") Long id, HttpServletRequest request) {
		return comiteService.downloadFile(id, request);
	}

}
