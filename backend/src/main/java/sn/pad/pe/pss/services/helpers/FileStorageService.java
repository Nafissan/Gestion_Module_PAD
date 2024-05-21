package sn.pad.pe.pss.services.helpers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.pss.dto.UploadFileResponse;

public interface FileStorageService {

	public String storeFile(MultipartFile file);

	public Resource loadFileAsResource(String fileName);

	public UploadFileResponse uploadFile(MultipartFile file);

	public ResponseEntity<Resource> downloadFile(String fileName, HttpServletRequest request);
}
