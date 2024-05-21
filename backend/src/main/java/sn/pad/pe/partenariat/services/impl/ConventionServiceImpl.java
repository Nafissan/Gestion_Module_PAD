package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Convention;
import sn.pad.pe.partenariat.dto.ConventionDTO;
import sn.pad.pe.partenariat.repositories.ConventionRepository;
import sn.pad.pe.partenariat.services.ConventionService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class ConventionServiceImpl implements ConventionService {
	@Autowired
	private ConventionRepository conventionRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ConventionDTO> getConventions() {
		List<ConventionDTO> conventionDtos = conventionRepository.findAll().stream()
				.map(convention -> modelMapper.map(convention, ConventionDTO.class)).collect(Collectors.toList());
		return conventionDtos;
	}

	@Override
	public ConventionDTO getConventionById(Long id) {
		Optional<Convention> convention = conventionRepository.findById(id);
		if (convention.isPresent()) {
			return modelMapper.map(convention.get(), ConventionDTO.class);
		} else {
			throw new ResourceNotFoundException("Convention not found with id : " + id);
		}
	}

	@Transactional
	@Override
	public ConventionDTO create(ConventionDTO conventionDto) {
		conventionDto.setCode(genererCode());
		Convention conventionSaved = modelMapper.map(conventionDto, Convention.class);
		return modelMapper.map(conventionRepository.save(conventionSaved), ConventionDTO.class);
	}

	@Override
	public boolean update(ConventionDTO conventionDto) {
		Optional<Convention> conventionUpdate = conventionRepository.findById(conventionDto.getId());
		boolean isUpdated = false;
		if (conventionUpdate.isPresent()) {
			conventionDto.setCreatedAt(conventionUpdate.get().getCreatedAt());
			conventionRepository.save(modelMapper.map(conventionDto, Convention.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(ConventionDTO conventionDto) {
		Optional<Convention> conventionToDelete = conventionRepository.findById(conventionDto.getId());
		boolean isDeleted = false;
		if (conventionToDelete.isPresent()) {
			conventionRepository.delete(conventionToDelete.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<ConventionDTO> createMultiple(List<ConventionDTO> conventionDtos) {
		List<Convention> conventions = conventionDtos.stream()
				.map(conventionDto -> modelMapper.map(conventionDto, Convention.class)).collect(Collectors.toList());

		conventionDtos = conventionRepository.saveAll(conventions).stream()
				.map(convention -> modelMapper.map(convention, ConventionDTO.class)).collect(Collectors.toList());
		return conventionDtos;
	}

	@Override
	public List<ConventionDTO> getConventionByCode(int code) {
		List<ConventionDTO> conventionDtos = conventionRepository.findConventionByStatut(code).stream()
				.map(convention -> modelMapper.map(convention, ConventionDTO.class)).collect(Collectors.toList());
		return conventionDtos;
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 10;
		String prefixe = "CONV-";
		String lastRecordCode = null;

		Optional<Convention> lastRecord = conventionRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}
}
