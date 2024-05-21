package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.partenariat.bo.Comite;
import sn.pad.pe.partenariat.dto.ComiteDTO;
import sn.pad.pe.partenariat.repositories.ComiteRepository;
import sn.pad.pe.partenariat.services.ComiteService;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.dto.UploadFileResponse;
import sn.pad.pe.pss.services.FileMetaDataService;
import sn.pad.pe.pss.services.helpers.FileStorageService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class ComiteServiceImpl implements ComiteService {
	@Autowired
	private ComiteRepository comiteRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	FileMetaDataService fileMetaDataService;
	@Autowired
	FileStorageService fileStorageService;

	@Override
	public List<ComiteDTO> getComite() {
		List<ComiteDTO> comiteDTOtoSaved = comiteRepository.findAll().stream()
				.map(comite -> modelMapper.map(comite, ComiteDTO.class)).collect(Collectors.toList());
		return comiteDTOtoSaved;

	}

	@Override
	public ComiteDTO getComiteById(Long codeComiteDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ComiteDTO create(ComiteDTO comiteDTO) {
		comiteDTO.setCode(genererCode());
		Comite comiteSaved = modelMapper.map(comiteDTO, Comite.class);
		return modelMapper.map(comiteRepository.save(comiteSaved), ComiteDTO.class);
	}

	@Override
	public boolean update(ComiteDTO comiteDTO) {
		Optional<Comite> comiteUpdate = comiteRepository.findById(comiteDTO.getId());
		boolean isUpdated = false;
		if (comiteUpdate.isPresent()) {
			comiteDTO.setCreatedAt(comiteUpdate.get().getCreatedAt());
			comiteRepository.save(modelMapper.map(comiteDTO, Comite.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(ComiteDTO comiteDTO) {
		Optional<Comite> comiteDelete = comiteRepository.findById(comiteDTO.getId());
		boolean isDeleleted = false;
		if (comiteDelete.isPresent()) {
			comiteRepository.delete(comiteDelete.get());
			isDeleleted = true;
		}
		return isDeleleted;
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 8;
		String prefixe = "COM-";
		String lastRecordCode = null;

		Optional<Comite> lastRecord = comiteRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

	@Override
	public UploadFileResponse uploadComite(Long id, MultipartFile file) {
		Comite comite = comiteRepository.findComiteById(id);
		if (comite != null && file != null) {
			UploadFileResponse fileToSave = fileStorageService.uploadFile(file);
			FileMetaData metadata = modelMapper.map(fileMetaDataService.findById(fileToSave.getId()),
					FileMetaData.class);
			comite.setFileMetaData(metadata);
			comiteRepository.save(comite);
			return fileToSave;
		} else {
			return null;
		}
	}

	@Override
	public ResponseEntity<Resource> downloadFile(Long id, HttpServletRequest request) {
		Comite comite = comiteRepository.findComiteById(id);
		FileMetaData fileMetaData = comite.getFileMetaData();
		String fileName = fileMetaData.getFileName();
		if (fileName != null) {
			return fileStorageService.downloadFile(fileName, request);
		} else {
			return null;
		}
	}

}
