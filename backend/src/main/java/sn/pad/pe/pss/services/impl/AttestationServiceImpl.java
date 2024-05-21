package sn.pad.pe.pss.services.impl;

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

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Attestation;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.AttestationDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;
import sn.pad.pe.pss.repositories.AttestationRepository;
import sn.pad.pe.pss.services.AttestationService;
import sn.pad.pe.pss.services.FileMetaDataService;
import sn.pad.pe.pss.services.helpers.FileStorageService;

@Service
public class AttestationServiceImpl implements AttestationService {

	@Autowired
	AttestationRepository attestationRepository;
	@Autowired
	FileMetaDataService fileMetaDataService;
	@Autowired
	FileStorageService fileStorageService;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<AttestationDTO> getAttestations() {
		List<AttestationDTO> attestationDTOs = attestationRepository.findAll().stream()
				.map(attestation -> modelMapper.map(attestation, AttestationDTO.class)).collect(Collectors.toList());
		return attestationDTOs;
	}

	@Override
	public AttestationDTO getAttestationById(Long id) {
		Optional<Attestation> attestation = attestationRepository.findById(id);
		if (attestation.isPresent()) {
			return modelMapper.map(attestation.get(), AttestationDTO.class);
		} else {
			throw new ResourceNotFoundException("Attestation not found with id : " + id);
		}
	}

	@Override
	public boolean update(AttestationDTO attestationDTO) {

		Optional<Attestation> attestationUpdate = attestationRepository.findById(attestationDTO.getId());
		boolean isUpdated = false;
		if (attestationUpdate.isPresent()) {
			Attestation attestation = modelMapper.map(attestationDTO, Attestation.class);
			attestationRepository.save(attestation);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean updateMany(List<AttestationDTO> attestationDTOs) {
		boolean isUpdated = false;
		if (!attestationDTOs.isEmpty()) {
			List<Attestation> attestationToSaved = attestationDTOs.stream()
					.map(attestationDTO -> modelMapper.map(attestationDTO, Attestation.class))
					.collect(Collectors.toList());
			attestationRepository.saveAll(attestationToSaved);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(AttestationDTO attestationDTO) {

		Optional<Attestation> attestationDelete = attestationRepository.findById(attestationDTO.getId());
		boolean isDeleted = false;
		if (attestationDelete.isPresent()) {
			Attestation attestation = modelMapper.map(attestationDTO, Attestation.class);
			attestationRepository.delete(attestation);
			isDeleted = true;
		}
		return isDeleted;

	}

	@Override
	public AttestationDTO create(AttestationDTO attestationDTO) {

		Attestation attestationSave = modelMapper.map(attestationDTO, Attestation.class);

		return modelMapper.map(attestationRepository.save(attestationSave), AttestationDTO.class);
	}

	@Override
	public List<AttestationDTO> getAttestationsByUniteOrganisationnelles(
			UniteOrganisationnelleDTO organisationnelleDTO) {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		List<AttestationDTO> attestationDTOList = attestationRepository
				.findAttestationsByUniteOrganisationnelle(uniteOrganisationnelle).stream()
				.map(attestation -> modelMapper.map(attestation, AttestationDTO.class)).collect(Collectors.toList());
		return attestationDTOList;
	}

	@Override
	public List<AttestationDTO> findAttestationsByAgent(AgentDTO agentDTO) {
		Agent agent = modelMapper.map(agentDTO, Agent.class);
		List<AttestationDTO> attestationDTOList = attestationRepository.findAttestationsByAgent(agent).stream()
				.map(attestation -> modelMapper.map(attestation, AttestationDTO.class)).collect(Collectors.toList());
		return attestationDTOList;
	}

	@Override
	public List<AttestationDTO> findAttestationsByEtatDifferent(String etat) {
		List<AttestationDTO> attestationDTOList = attestationRepository.findAttestationsByEtatNotLike(etat).stream()
				.map(attestation -> modelMapper.map(attestation, AttestationDTO.class)).collect(Collectors.toList());
		return attestationDTOList;
	}

	@Override
	public UploadFileResponse uploadAttestation(Long id, MultipartFile file) {
		Attestation attestation = attestationRepository.findAttestationById(id);
		if (attestation != null && file != null) {
			UploadFileResponse fileToSave = fileStorageService.uploadFile(file);
			FileMetaData metadata = modelMapper.map(fileMetaDataService.findById(fileToSave.getId()),
					FileMetaData.class);
			attestation.setFileMetaData(metadata);
			attestationRepository.save(attestation);
			return fileToSave;
		} else {
			return null;
		}

	}

	@Override
	public ResponseEntity<Resource> downloadFile(Long id, HttpServletRequest request) {
		Attestation attestation = attestationRepository.findAttestationById(id);
		FileMetaData fileMetaData = attestation.getFileMetaData();
		String fileName = fileMetaData.getFileName();
		if (fileName != null) {
			return fileStorageService.downloadFile(fileName, request);
		} else {
			return null;
		}

	}

}
