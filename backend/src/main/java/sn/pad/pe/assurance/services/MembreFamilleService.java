package sn.pad.pe.assurance.services;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.assurance.dto.MembreFamilleDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;

public interface MembreFamilleService {

	public List<MembreFamilleDTO> getMembreFamile();

	public MembreFamilleDTO create(MembreFamilleDTO MembreFamilleDTO);

	public boolean update(MembreFamilleDTO MembreFamilleDTO);

	public boolean delete(MembreFamilleDTO MembreFamilleDTO);

	public UploadFileResponse uploadMembre(Long id, MultipartFile file);

	public ResponseEntity<Resource> downloadFile(Long id, HttpServletRequest request);

	public List<MembreFamilleDTO> createMultiple(List<MembreFamilleDTO> membres);

}
