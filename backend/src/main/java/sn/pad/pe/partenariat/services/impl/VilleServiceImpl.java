package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Ville;
import sn.pad.pe.partenariat.dto.VilleDTO;
import sn.pad.pe.partenariat.repositories.VilleRepository;
import sn.pad.pe.partenariat.services.VilleService;

@Service
public class VilleServiceImpl implements VilleService {

	@Autowired
	private VilleRepository villeRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<VilleDTO> getVille() {
		List<VilleDTO> villeDtos = villeRepository.findAll().stream()
				.map(ville -> modelMapper.map(ville, VilleDTO.class)).collect(Collectors.toList());
		return villeDtos;
	}

	@Override
	public VilleDTO getVilleById(Long id) {
		Optional<Ville> ville = villeRepository.findById(id);
		if (ville.isPresent()) {
			return modelMapper.map(ville.get(), VilleDTO.class);
		} else {
			throw new ResourceNotFoundException("Ville not found with id : " + id);
		}
	}

	@Override
	public VilleDTO getVilleByCode(String code) {
		Optional<Ville> ville = villeRepository.findVilleByCode(code);
		if (ville.isPresent()) {
			return modelMapper.map(ville.get(), VilleDTO.class);
		} else {
			throw new ResourceNotFoundException("Ville not found with code : " + code);
		}
	}

	@Override
	public VilleDTO create(VilleDTO villeDto) {
		Ville villeSaved = modelMapper.map(villeDto, Ville.class);
		return modelMapper.map(villeRepository.save(villeSaved), VilleDTO.class);
	}

	@Override
	public boolean update(VilleDTO villeDto) {
		Optional<Ville> villeUpdate = villeRepository.findById(villeDto.getId());
		boolean isUpdated = false;
		if (villeUpdate.isPresent()) {
			villeRepository.save(modelMapper.map(villeDto, Ville.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(VilleDTO villeDto) {
		Optional<Ville> villeUpdate = villeRepository.findById(villeDto.getId());
		boolean isUpdated = false;
		if (villeUpdate.isPresent()) {
			villeRepository.delete(villeUpdate.get());
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public List<VilleDTO> createMultiple(List<VilleDTO> villeDtos) {
		List<Ville> ville = villeDtos.stream().map(villeDto -> modelMapper.map(villeDto, Ville.class))
				.collect(Collectors.toList());

		villeDtos = villeRepository.saveAll(ville).stream().map(villeEn -> modelMapper.map(villeEn, VilleDTO.class))
				.collect(Collectors.toList());
		return villeDtos;
	}

}
