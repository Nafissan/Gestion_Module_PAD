package sn.pad.pe.pss.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.pss.services.helpers.FileStorageService;

@RestController
public class TemplatesController {

	@Autowired
	private FileStorageService fileStorageService;

	@GetMapping("/templates/{liste_agents}")
	public ResponseEntity<Resource> downloadFile(@PathVariable("liste_agents") String templateName,
			HttpServletRequest request) {
		if (templateName.equals("liste_agents"))
			return fileStorageService.downloadFile("agents.xlsx", request);
		return null;
	}

}
