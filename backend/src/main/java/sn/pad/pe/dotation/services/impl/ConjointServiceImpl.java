package sn.pad.pe.dotation.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.Conjoint;
import sn.pad.pe.dotation.dto.ConjointDTO;
import sn.pad.pe.dotation.repositories.ConjointRepository;
import sn.pad.pe.dotation.services.ConjointService;

@Service
public class ConjointServiceImpl implements ConjointService {

	@Autowired
	private ConjointRepository conjointRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ConjointDTO> getConjoints() {
		List<ConjointDTO> conjointDtos = conjointRepository.findAll().stream()
				.map(conjoint -> modelMapper.map(conjoint, ConjointDTO.class)).collect(Collectors.toList());
		return conjointDtos;
	}

	@Override
	public ConjointDTO getConjointById(Long id) {
		Optional<Conjoint> conjoint = conjointRepository.findById(id);
		if (conjoint.isPresent()) {
			return modelMapper.map(conjoint.get(), ConjointDTO.class);
		} else {
			throw new ResourceNotFoundException("Conjoint not found with id : " + id);
		}
	}

	@Override
	public boolean update(ConjointDTO conjointDto) {
		Optional<Conjoint> conjointUpdate = conjointRepository.findById(conjointDto.getId());
		boolean isDeleleted = false;
		if (conjointUpdate.isPresent()) {
			conjointRepository.save(modelMapper.map(conjointDto, Conjoint.class));
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public boolean delete(ConjointDTO conjointDto) {
		Optional<Conjoint> conjointUpdate = conjointRepository.findById(conjointDto.getId());
		boolean isDeleted = false;
		if (conjointUpdate.isPresent()) {
			conjointRepository.delete(conjointUpdate.get());
			isDeleted = true;
		}
		return isDeleted;
	}

}
