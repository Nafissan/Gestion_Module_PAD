package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Entreprise;
import sn.pad.pe.partenariat.dto.EntrepriseDTO;
import sn.pad.pe.partenariat.repositories.EntrepriseRepository;
import sn.pad.pe.partenariat.services.EntrepriseService;

@Service
public class EntrepriseServiceImpl implements EntrepriseService {

	@Autowired
	private EntrepriseRepository entrepriseRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<EntrepriseDTO> getEntreprises() {
		List<EntrepriseDTO> entrepriseDtos = entrepriseRepository.findAll().stream()
				.map(entreprise -> modelMapper.map(entreprise, EntrepriseDTO.class)).collect(Collectors.toList());
		return entrepriseDtos;
	}

	@Override
	public EntrepriseDTO getEntrepriseById(Long id) {
		Optional<Entreprise> entreprise = entrepriseRepository.findById(id);
		if (entreprise.isPresent()) {
			return modelMapper.map(entreprise.get(), EntrepriseDTO.class);
		} else {
			throw new ResourceNotFoundException("Entreprise not found with id : " + id);
		}
	}

	@Override
	public List<EntrepriseDTO> getEntrepriseByCode(String code) {
		List<EntrepriseDTO> entrepriseDtos = entrepriseRepository.findEntrepriseByCode(code).stream()
				.map(entreprise -> modelMapper.map(entreprise, EntrepriseDTO.class)).collect(Collectors.toList());
		return entrepriseDtos;
	}

	@Override
	public EntrepriseDTO create(EntrepriseDTO entrepriseDto) {
		Entreprise entrepriseSaved = modelMapper.map(entrepriseDto, Entreprise.class);
		return modelMapper.map(entrepriseRepository.save(entrepriseSaved), EntrepriseDTO.class);
	}

	@Override
	public boolean update(EntrepriseDTO entrepriseDto) {
		Optional<Entreprise> entrepriseUpdate = entrepriseRepository.findById(entrepriseDto.getId());
		boolean isUpdated = false;
		if (entrepriseUpdate.isPresent()) {
			entrepriseRepository.save(modelMapper.map(entrepriseDto, Entreprise.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(EntrepriseDTO entrepriseDto) {
		Optional<Entreprise> entrepriseToDelete = entrepriseRepository.findById(entrepriseDto.getId());
		boolean isDeleted = false;
		if (entrepriseToDelete.isPresent()) {
			entrepriseRepository.delete(entrepriseToDelete.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<EntrepriseDTO> createMultiple(List<EntrepriseDTO> entrepriseDtos) {
		List<Entreprise> entreprises = entrepriseDtos.stream()
				.map(entrepriseDto -> modelMapper.map(entrepriseDto, Entreprise.class)).collect(Collectors.toList());

		entrepriseDtos = entrepriseRepository.saveAll(entreprises).stream()
				.map(entreprise -> modelMapper.map(entreprise, EntrepriseDTO.class)).collect(Collectors.toList());
		return entrepriseDtos;
	}

}
