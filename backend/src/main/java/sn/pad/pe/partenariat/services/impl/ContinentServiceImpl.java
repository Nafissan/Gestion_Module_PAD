package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Continent;
import sn.pad.pe.partenariat.dto.ContinentDTO;
import sn.pad.pe.partenariat.repositories.ContinentRepository;
import sn.pad.pe.partenariat.services.ContinentService;

@Service
public class ContinentServiceImpl implements ContinentService {

	@Autowired
	private ContinentRepository continentRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ContinentDTO> getContinents() {
		List<ContinentDTO> continentDtos = continentRepository.findAll().stream()
				.map(continent -> modelMapper.map(continent, ContinentDTO.class)).collect(Collectors.toList());
		return continentDtos;
	}

	@Override
	public ContinentDTO getContinentById(Long id) {
		Optional<Continent> continent = continentRepository.findById(id);
		if (continent.isPresent()) {
			return modelMapper.map(continent.get(), ContinentDTO.class);
		} else {
			throw new ResourceNotFoundException("Continent not found with id : " + id);
		}
	}

	@Override
	public ContinentDTO getContinentByCode(String code) {
		Optional<Continent> continent = continentRepository.findContinentByCode(code);
		if (continent.isPresent()) {
			return modelMapper.map(continent.get(), ContinentDTO.class);
		} else {
			throw new ResourceNotFoundException("Continent not found with code : " + code);
		}
	}

	@Override
	public ContinentDTO create(ContinentDTO continentDto) {
		Continent continentSaved = modelMapper.map(continentDto, Continent.class);
		return modelMapper.map(continentRepository.save(continentSaved), ContinentDTO.class);
	}

	@Override
	public boolean update(ContinentDTO continentDto) {
		Optional<Continent> continentUpdate = continentRepository.findById(continentDto.getId());
		boolean isUpdated = false;
		if (continentUpdate.isPresent()) {
			continentRepository.save(modelMapper.map(continentDto, Continent.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(ContinentDTO continentDto) {
		Optional<Continent> continentToDelete = continentRepository.findById(continentDto.getId());
		boolean isDeleted = false;
		if (continentToDelete.isPresent()) {
			continentRepository.delete(continentToDelete.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<ContinentDTO> createMultiple(List<ContinentDTO> continentDtos) {
		List<Continent> continents = continentDtos.stream()
				.map(continentDto -> modelMapper.map(continentDto, Continent.class)).collect(Collectors.toList());

		continentDtos = continentRepository.saveAll(continents).stream()
				.map(continent -> modelMapper.map(continent, ContinentDTO.class)).collect(Collectors.toList());
		return continentDtos;
	}

}
