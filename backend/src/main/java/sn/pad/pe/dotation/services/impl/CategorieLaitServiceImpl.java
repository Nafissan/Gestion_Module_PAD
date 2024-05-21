package sn.pad.pe.dotation.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.CategorieLait;
import sn.pad.pe.dotation.dto.CategorieLaitDTO;
import sn.pad.pe.dotation.repositories.CategorieLaitRepository;
import sn.pad.pe.dotation.services.CategorieLaitService;

@Service
public class CategorieLaitServiceImpl implements CategorieLaitService {

	@Autowired
	private CategorieLaitRepository categorieRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<CategorieLaitDTO> getCategoriesLait() {
		List<CategorieLaitDTO> categorieLaitDtos = categorieRepository.findAll().stream()
				.map(categorieLait -> modelMapper.map(categorieLait, CategorieLaitDTO.class))
				.collect(Collectors.toList());
		return categorieLaitDtos;
	}

	@Override
	public CategorieLaitDTO getCategorieLaitById(Long id) {
		Optional<CategorieLait> categorieLait = categorieRepository.findById(id);
		if (categorieLait.isPresent()) {
			return modelMapper.map(categorieLait.get(), CategorieLaitDTO.class);
		} else {
			throw new ResourceNotFoundException("CategorieLait not found with id : " + id);
		}
	}

	@Override
	public CategorieLaitDTO create(CategorieLaitDTO categorieLaitDto) {
		CategorieLait categorieLaitSaved = modelMapper.map(categorieLaitDto, CategorieLait.class);
		return modelMapper.map(categorieRepository.save(categorieLaitSaved), CategorieLaitDTO.class);
	}

	@Override
	public boolean update(CategorieLaitDTO categorieLaitDto) {
		Optional<CategorieLait> categorieLaitUpdate = categorieRepository.findById(categorieLaitDto.getId());
		boolean isDeleleted = false;
		if (categorieLaitUpdate.isPresent()) {
			categorieRepository.save(modelMapper.map(categorieLaitDto, CategorieLait.class));
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public boolean delete(CategorieLaitDTO categorieLaitDto) {
		Optional<CategorieLait> categorieLaitUpdate = categorieRepository.findById(categorieLaitDto.getId());
		boolean isDeleted = false;
		if (categorieLaitUpdate.isPresent()) {
			categorieRepository.delete(categorieLaitUpdate.get());
			isDeleted = true;
		}
		return isDeleted;
	}

}
