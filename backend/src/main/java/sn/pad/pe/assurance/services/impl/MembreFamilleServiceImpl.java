package sn.pad.pe.assurance.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.assurance.bo.MembreFamille;
import sn.pad.pe.assurance.dto.MembreFamilleDTO;
import sn.pad.pe.assurance.repositories.MembreFamilleRepository;
import sn.pad.pe.assurance.services.MembreFamilleService;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.dto.UploadFileResponse;
import sn.pad.pe.pss.services.FileMetaDataService;
import sn.pad.pe.pss.services.helpers.FileStorageService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class MembreFamilleServiceImpl implements MembreFamilleService {
	@Autowired
	private MembreFamilleRepository membrefamilleRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	FileMetaDataService fileMetaDataService;
	@Autowired
	FileStorageService fileStorageService;

	@Override
	public List<MembreFamilleDTO> getMembreFamile() {
		List<MembreFamilleDTO> membrefamilleDTOtoSaved = membrefamilleRepository.findAll().stream()
				.map(membrefamille -> modelMapper.map(membrefamille, MembreFamilleDTO.class))
				.collect(Collectors.toList());
		return membrefamilleDTOtoSaved;
	}

	@Override
	public MembreFamilleDTO create(MembreFamilleDTO MembreFamilleDTO) {
		MembreFamilleDTO.setCode(genererCode());
		MembreFamille membrefamilleSaved = modelMapper.map(MembreFamilleDTO, MembreFamille.class);
		return modelMapper.map(membrefamilleRepository.save(membrefamilleSaved), MembreFamilleDTO.class);
	}

	@Override
	public boolean update(MembreFamilleDTO MembreFamilleDTO) {
		Optional<MembreFamille> MembreFamilleUpdate = membrefamilleRepository.findById(MembreFamilleDTO.getId());
		boolean isUpdated = false;
		if (MembreFamilleUpdate.isPresent()) {
			membrefamilleRepository.save(modelMapper.map(MembreFamilleDTO, MembreFamille.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(MembreFamilleDTO MembreFamilleDTO) {
		Optional<MembreFamille> MembreFamilleDelete = membrefamilleRepository.findById(MembreFamilleDTO.getId());
		boolean isDeleleted = false;
		if (MembreFamilleDelete.isPresent()) {
			membrefamilleRepository.delete(MembreFamilleDelete.get());
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public UploadFileResponse uploadMembre(Long id, MultipartFile file) {
		MembreFamille MembreFamille = membrefamilleRepository.findMembreFamilleById(id);
		if (MembreFamille != null && file != null) {
			UploadFileResponse fileToSave = fileStorageService.uploadFile(file);
			FileMetaData metadata = modelMapper.map(fileMetaDataService.findById(fileToSave.getId()),
					FileMetaData.class);
			MembreFamille.setFileMetaData(metadata);
			membrefamilleRepository.save(MembreFamille);
			return fileToSave;
		} else {
			return null;
		}
	}

	@Override
	public ResponseEntity<Resource> downloadFile(Long id, HttpServletRequest request) {
		MembreFamille membrefamille = membrefamilleRepository.findMembreFamilleById(id);
		FileMetaData fileMetaData = membrefamille.getFileMetaData();
		String fileName = fileMetaData.getFileName();
		if (fileName != null) {
			return fileStorageService.downloadFile(fileName, request);
		} else {
			return null;
		}
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 10;
		String prefixe = "MF-";
		String lastRecordCode = null;

		Optional<MembreFamille> lastRecord = membrefamilleRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

	@Transactional
	@Override
	public List<MembreFamilleDTO> createMultiple(List<MembreFamilleDTO> membresFamilleDtos) {
		List<MembreFamilleDTO> membresFamilleDtosSaved = new ArrayList<>();
		for (MembreFamilleDTO membreFamille : membresFamilleDtos) {
			membresFamilleDtosSaved.add(create(membreFamille));
		}

		return membresFamilleDtosSaved;
	}

	public List<MembreFamilleDTO> getMembreByAgent(Long id) {
		List<MembreFamilleDTO> membresFamilleDtosSaved = membrefamilleRepository.findByAgentId(id).stream()
				.map(suivi -> modelMapper.map(suivi, MembreFamilleDTO.class)).collect(Collectors.toList());
		return membresFamilleDtosSaved;

	}

}
