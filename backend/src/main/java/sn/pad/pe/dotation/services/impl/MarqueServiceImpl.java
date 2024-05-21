package sn.pad.pe.dotation.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.Marque;
import sn.pad.pe.dotation.dto.MarqueDTO;
import sn.pad.pe.dotation.repositories.MarqueRepository;
import sn.pad.pe.dotation.services.MarqueService;

@Service
public class MarqueServiceImpl implements MarqueService {

	@Autowired
	private MarqueRepository marqueRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public MarqueDTO create(MarqueDTO marqueDto) {

		Marque marqueSaved = modelMapper.map(marqueDto, Marque.class);
		return modelMapper.map(marqueRepository.save(marqueSaved), MarqueDTO.class);
	}

	@Override
	public List<MarqueDTO> getMarques() {
		List<MarqueDTO> marqueDtos = marqueRepository.findAll().stream()
				.map(marque -> modelMapper.map(marque, MarqueDTO.class)).collect(Collectors.toList());
		return marqueDtos;
	}

	@Override
	public MarqueDTO getMarqueById(Long id) {
		Optional<Marque> marque = marqueRepository.findById(id);
		if (marque.isPresent()) {
			return modelMapper.map(marque.get(), MarqueDTO.class);
		} else {
			throw new ResourceNotFoundException("Marque not found with id : " + id);
		}
	}

	@Override
	public boolean update(MarqueDTO marqueDto) {
		Optional<Marque> marqueUpdate = marqueRepository.findById(marqueDto.getId());
		boolean isDeleleted = false;
		if (marqueUpdate.isPresent()) {
			marqueRepository.save(modelMapper.map(marqueDto, Marque.class));
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public boolean delete(MarqueDTO marqueDto) {
		Optional<Marque> marqueUpdate = marqueRepository.findById(marqueDto.getId());
		boolean isDeleted = false;
		if (marqueUpdate.isPresent()) {
			marqueRepository.delete(marqueUpdate.get());
			isDeleted = true;
		}
		return isDeleted;
	}
}