package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Ressource;
import sn.pad.pe.pss.dto.RessourceDTO;
import sn.pad.pe.pss.repositories.RessourceRepository;
import sn.pad.pe.pss.services.RessourceService;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@Service
public class RessourceServiceImpl implements RessourceService {

	@Autowired
	private RessourceRepository ressourceRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<RessourceDTO> getRessources() {
		List<RessourceDTO> ressourceDTOtoSaved = ressourceRepository.findAll().stream()
				.map(ressource -> modelMapper.map(ressource, RessourceDTO.class)).collect(Collectors.toList());
		return ressourceDTOtoSaved;
	}

	@Override
	public RessourceDTO getRessourceById(String name) {
		Optional<Ressource> ressource = ressourceRepository.findById(name);
		if (ressource.isPresent()) {
			return modelMapper.map(ressource.get(), RessourceDTO.class);
		} else {
			throw new ResourceNotFoundException("Ressource not found with id : " + name);
		}
	}

	@Override
	public RessourceDTO create(RessourceDTO ressourceDTO) {
		Ressource ressourceSaved = modelMapper.map(ressourceDTO, Ressource.class);
		return modelMapper.map(ressourceRepository.save(ressourceSaved), RessourceDTO.class);
	}

	@Override
	public boolean update(RessourceDTO ressourceDTO) {
		Optional<Ressource> ressourceUpdate = ressourceRepository.findById(ressourceDTO.getName());
		boolean isUpdated = false;
		if (ressourceUpdate.isPresent()) {
			ressourceRepository.save(modelMapper.map(ressourceDTO, Ressource.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(RessourceDTO ressourceDTO) {
		Optional<Ressource> ressourceUpdate = ressourceRepository.findById(ressourceDTO.getName());
		boolean isDeleleted = false;
		if (ressourceUpdate.isPresent()) {
			ressourceRepository.delete(ressourceUpdate.get());
			isDeleleted = true;
		}
		return isDeleleted;
	}

}
