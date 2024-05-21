package sn.pad.pe.pss.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.pss.dto.FileMetaDataDTO;
import sn.pad.pe.pss.services.FileMetaDataService;

@RestController
public class FileMetaDataController {

	@Autowired
	private FileMetaDataService fileMetaDataService;

	@GetMapping("/fileMetaDatas")
	public List<FileMetaDataDTO> getAll() {
		return fileMetaDataService.getAll();
	}

	@GetMapping("fileMetaDatas/{id}")
	public FileMetaDataDTO getById(@PathVariable Long id) {
		return fileMetaDataService.findById(id);
	}

	@GetMapping("fileMetaDatas/size")
	public Long getAllOccurrenceSize() {
		return fileMetaDataService.getAllOccurrenceSize();
	}

}
