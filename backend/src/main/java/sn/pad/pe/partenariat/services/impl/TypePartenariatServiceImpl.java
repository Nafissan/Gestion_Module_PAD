package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.TypePartenariat;
import sn.pad.pe.partenariat.dto.TypePartenariatDTO;
import sn.pad.pe.partenariat.repositories.TypePartenariatRepository;
import sn.pad.pe.partenariat.services.TypePartenariatService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class TypePartenariatServiceImpl implements TypePartenariatService {

	@Autowired
	private TypePartenariatRepository typePartenariatRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<TypePartenariatDTO> getTypePartenariats() {
		List<TypePartenariatDTO> typePartenariatDtos = typePartenariatRepository.findAll().stream()
				.map(typePartenariat -> modelMapper.map(typePartenariat, TypePartenariatDTO.class))
				.collect(Collectors.toList());
		return typePartenariatDtos;
	}

	@Override
	public TypePartenariatDTO getTypePartenariatById(Long id) {
		Optional<TypePartenariat> typePartenariat = typePartenariatRepository.findById(id);
		if (typePartenariat.isPresent()) {
			return modelMapper.map(typePartenariat.get(), TypePartenariatDTO.class);
		} else {
			throw new ResourceNotFoundException("TypePartenariat not found with id : " + id);
		}
	}

	@Override
	public TypePartenariatDTO getTypePartenariatByCode(String code) {
		Optional<TypePartenariat> typePartenariat = typePartenariatRepository.findTypePartenariatByCode(code);
		if (typePartenariat.isPresent()) {
			return modelMapper.map(typePartenariat.get(), TypePartenariatDTO.class);
		} else {
			throw new ResourceNotFoundException("TypePartenariat not found with code : " + code);
		}
	}

	@Transactional
	@Override
	public TypePartenariatDTO create(TypePartenariatDTO typePartenariatDto) {
		typePartenariatDto.setCode(genererCode());
		TypePartenariat typePartenariatSaved = modelMapper.map(typePartenariatDto, TypePartenariat.class);
		return modelMapper.map(typePartenariatRepository.save(typePartenariatSaved), TypePartenariatDTO.class);
	}

	@Override
	public boolean update(TypePartenariatDTO typePartenariatDto) {
		Optional<TypePartenariat> typePartenariatUpdate = typePartenariatRepository
				.findById(typePartenariatDto.getId());
		boolean isUpdated = false;
		if (typePartenariatUpdate.isPresent()) {
			typePartenariatDto.setCreatedAt(typePartenariatUpdate.get().getCreatedAt());
			typePartenariatRepository.save(modelMapper.map(typePartenariatDto, TypePartenariat.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(TypePartenariatDTO typePartenariatDto) {
		Optional<TypePartenariat> typePartenariatUpdate = typePartenariatRepository
				.findById(typePartenariatDto.getId());
		boolean isDeleted = false;
		if (typePartenariatUpdate.isPresent()) {
			typePartenariatRepository.delete(typePartenariatUpdate.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<TypePartenariatDTO> createMultiple(List<TypePartenariatDTO> typePartenariatDtos) {
		List<TypePartenariat> typePartenariats = typePartenariatDtos.stream()
				.map(typePartenariatDto -> modelMapper.map(typePartenariatDto, TypePartenariat.class))
				.collect(Collectors.toList());

		typePartenariatDtos = typePartenariatRepository.saveAll(typePartenariats).stream()
				.map(typePartenariat -> modelMapper.map(typePartenariat, TypePartenariatDTO.class))
				.collect(Collectors.toList());
		return typePartenariatDtos;
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 7;
		String prefixe = "TP-";
		String lastRecordCode = null;

		Optional<TypePartenariat> lastRecord = typePartenariatRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

}
