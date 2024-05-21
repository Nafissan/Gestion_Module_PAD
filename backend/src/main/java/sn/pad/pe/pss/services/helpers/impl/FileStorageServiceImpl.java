package sn.pad.pe.pss.services.helpers.impl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import sn.pad.pe.configurations.FileStorageProperties;
import sn.pad.pe.configurations.exception.FileStorageException;
import sn.pad.pe.configurations.exception.MyFileNotFoundException;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.dto.UploadFileResponse;
import sn.pad.pe.pss.services.FileMetaDataService;
import sn.pad.pe.pss.services.helpers.FileStorageService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class FileStorageServiceImpl implements FileStorageService {

	private final Path fileStorageLocation;
	@Autowired
	private FileMetaDataService fileMetaDataService;
	@Autowired
	private GenerationCode generationCode;
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public FileStorageServiceImpl(FileStorageProperties fileStorageProperties) {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
					ex);
		}
	}

	public String storeFile(MultipartFile file) {
		// Normalize file name
		String fileName = generationCode.get() + "."
				+ com.google.common.io.Files.getFileExtension(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;
		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	public Resource loadFileAsResource(String fileName) {
		try {
			Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new MyFileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new MyFileNotFoundException("File not found " + fileName, ex);
		}
	}

	@Override
	public UploadFileResponse uploadFile(MultipartFile file) {
		String fileName = storeFile(file);

		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		FileMetaData fileMetaData = new FileMetaData(fileName, fileDownloadUri, file.getContentType(), file.getSize());
		FileMetaData fileMetaDataSaved = modelMapper.map(fileMetaDataService.createFileData(fileMetaData),
				FileMetaData.class);
		if (fileMetaDataSaved != null) {
			return new UploadFileResponse(fileMetaDataSaved.getId(), fileName, fileDownloadUri, file.getContentType(),
					file.getSize());
		}

		else {
			return null;
		}
	}

	@Override
	public ResponseEntity<Resource> downloadFile(String fileName, HttpServletRequest request) {
		// Load file as Resource
		Resource resource = loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {

		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
}
