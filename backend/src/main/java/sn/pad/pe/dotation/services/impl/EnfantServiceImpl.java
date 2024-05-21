package sn.pad.pe.dotation.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.Enfant;
import sn.pad.pe.dotation.dto.EnfantDTO;
import sn.pad.pe.dotation.repositories.EnfantRepository;
import sn.pad.pe.dotation.services.EnfantService;

@Service
public class EnfantServiceImpl implements EnfantService {

	@Autowired
	private EnfantRepository enfantRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<EnfantDTO> getEnfants() {
		List<EnfantDTO> enfantDtos = enfantRepository.findAll().stream()
				.map(enfant -> modelMapper.map(enfant, EnfantDTO.class)).collect(Collectors.toList());
		return enfantDtos;
	}

	@Override
	public EnfantDTO getEnfantById(Long id) {
		Optional<Enfant> enfant = enfantRepository.findById(id);
		if (enfant.isPresent()) {
			return modelMapper.map(enfant.get(), EnfantDTO.class);
		} else {
			throw new ResourceNotFoundException("Enfant not found with id : " + id);
		}
	}

	@Override
	public boolean update(EnfantDTO enfantDto) {
		Optional<Enfant> enfantUpdate = enfantRepository.findById(enfantDto.getId());
		boolean isDeleleted = false;
		if (enfantUpdate.isPresent()) {
			enfantRepository.save(modelMapper.map(enfantDto, Enfant.class));
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public boolean delete(EnfantDTO enfantDto) {
		Optional<Enfant> enfantUpdate = enfantRepository.findById(enfantDto.getId());
		boolean isDeleted = false;
		if (enfantUpdate.isPresent()) {
			enfantRepository.delete(enfantUpdate.get());
			isDeleted = true;
		}
		return isDeleted;
	}

}
