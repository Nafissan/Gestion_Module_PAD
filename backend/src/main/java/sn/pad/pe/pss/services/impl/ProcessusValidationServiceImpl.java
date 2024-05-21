package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.ProcessusValidation;
import sn.pad.pe.pss.dto.ProcessusValidationDTO;
import sn.pad.pe.pss.repositories.ProcessusValidationRepository;
import sn.pad.pe.pss.services.ProcessusValidationService;

@Service
public class ProcessusValidationServiceImpl implements ProcessusValidationService {

	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private ProcessusValidationRepository processusValidationRepository;

	@Override
	public List<ProcessusValidationDTO> getProcessusValidations() {
		List<ProcessusValidationDTO> processusValidationDTOs = processusValidationRepository.findAll().stream()
				.map(processusValidation -> modelMapper.map(processusValidation, ProcessusValidationDTO.class))
				.collect(Collectors.toList());
		return processusValidationDTOs;
	}

	@Override
	public ProcessusValidationDTO getProcessusValidation(Long id) {
		Optional<ProcessusValidation> processusValidationOptional = processusValidationRepository.findById(id);
		if (processusValidationOptional.isPresent()) {
			return modelMapper.map(processusValidationOptional.get(), ProcessusValidationDTO.class);
		} else {
			throw new ResourceNotFoundException("ProcessusValidation not found with id : " + id);
		}
	}

	@Override
	public ProcessusValidationDTO getProcessusValidationByLibelle(String libelle) {
		Optional<ProcessusValidation> processusValidationOptional = processusValidationRepository
				.findProcessusValidationByLibelle(libelle);
		if (processusValidationOptional.isPresent()) {
			return modelMapper.map(processusValidationOptional.get(), ProcessusValidationDTO.class);
		} else {
			throw new ResourceNotFoundException("ProcessusValidation not found with libelle : " + libelle);
		}
	}

	@Override
	public ProcessusValidationDTO create(ProcessusValidationDTO processusValidationDTO) {
		ProcessusValidation processusValidationSaved = modelMapper.map(processusValidationDTO,
				ProcessusValidation.class);
		return modelMapper.map(processusValidationRepository.save(processusValidationSaved),
				ProcessusValidationDTO.class);
	}

	@Override
	public boolean update(ProcessusValidationDTO processusValidationDTO) {
		Optional<ProcessusValidation> processusValidationToUpdate = processusValidationRepository
				.findById(processusValidationDTO.getId());
		boolean isUpdated = false;
		if (processusValidationToUpdate.isPresent()) {
			processusValidationRepository.save(modelMapper.map(processusValidationDTO, ProcessusValidation.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(ProcessusValidationDTO processusValidationDTO) {
		Optional<ProcessusValidation> processusValidationToDelete = processusValidationRepository
				.findById(processusValidationDTO.getId());
		boolean isDeleleted = false;
		if (processusValidationToDelete.isPresent()) {
			ProcessusValidation processusValidationDeleted = processusValidationToDelete.get();
			processusValidationRepository.delete(processusValidationDeleted);
			isDeleleted = true;
		}
		return isDeleleted;
	}
}
