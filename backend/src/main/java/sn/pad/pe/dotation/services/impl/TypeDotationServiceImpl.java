package sn.pad.pe.dotation.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.TypeDotation;
import sn.pad.pe.dotation.dto.TypeDotationDTO;
import sn.pad.pe.dotation.repositories.TypeDotationRepository;
import sn.pad.pe.dotation.services.TypeDotationService;

@Service
public class TypeDotationServiceImpl implements TypeDotationService {

	@Autowired
	private TypeDotationRepository typeDotationRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<TypeDotationDTO> getTypeDotations() {
		List<TypeDotationDTO> typeDotationDtos = typeDotationRepository.findAll().stream()
				.map(typeDotation -> modelMapper.map(typeDotation, TypeDotationDTO.class)).collect(Collectors.toList());
		return typeDotationDtos;
	}

	@Override
	public TypeDotationDTO getTypeDotationById(Long id) {
		Optional<TypeDotation> typeDotation = typeDotationRepository.findById(id);
		if (typeDotation.isPresent()) {
			return modelMapper.map(typeDotation.get(), TypeDotationDTO.class);
		} else {
			throw new ResourceNotFoundException("TypeDotation not found with id : " + id);
		}
	}

	@Override
	public TypeDotationDTO create(TypeDotationDTO typeDotationDto) {
		TypeDotation typeDotationSaved = modelMapper.map(typeDotationDto, TypeDotation.class);
		return modelMapper.map(typeDotationRepository.save(typeDotationSaved), TypeDotationDTO.class);
	}

	@Override
	public boolean update(TypeDotationDTO typeDotationDto) {
		Optional<TypeDotation> typeDotationUpdate = typeDotationRepository.findById(typeDotationDto.getId());
		boolean isDeleleted = false;
		if (typeDotationUpdate.isPresent()) {
			typeDotationRepository.save(modelMapper.map(typeDotationDto, TypeDotation.class));
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public boolean delete(TypeDotationDTO typeDotationDto) {
		Optional<TypeDotation> typeDotationUpdate = typeDotationRepository.findById(typeDotationDto.getId());
		boolean isDeleted = false;
		if (typeDotationUpdate.isPresent()) {
			typeDotationRepository.delete(typeDotationUpdate.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<TypeDotationDTO> createMultiple(List<TypeDotationDTO> typeDotationDtos) {
		List<TypeDotation> typeDotations = typeDotationDtos.stream()
				.map(typeDotationDto -> modelMapper.map(typeDotationDto, TypeDotation.class))
				.collect(Collectors.toList());

		typeDotationDtos = typeDotationRepository.saveAll(typeDotations).stream()
				.map(typeDotation -> modelMapper.map(typeDotation, TypeDotationDTO.class)).collect(Collectors.toList());
		return typeDotationDtos;
	}

}
