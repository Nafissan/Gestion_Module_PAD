package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Activite;
import sn.pad.pe.partenariat.dto.ActiviteDTO;
import sn.pad.pe.partenariat.repositories.ActiviteRepository;
import sn.pad.pe.partenariat.services.ActiviteService;

@Service
public class ActiviteServiceImpl implements ActiviteService {

	@Autowired
	private ActiviteRepository activiteRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ActiviteDTO> getActivite() {
		List<ActiviteDTO> activiteDtos = activiteRepository.findAll().stream()
				.map(activite -> modelMapper.map(activite, ActiviteDTO.class)).collect(Collectors.toList());
		return activiteDtos;
	}

	@Override
	public ActiviteDTO getActiviteById(Long id) {
		Optional<Activite> activite = activiteRepository.findById(id);
		if (activite.isPresent()) {
			return modelMapper.map(activite.get(), ActiviteDTO.class);
		} else {
			throw new ResourceNotFoundException("Activite not found with id : " + id);
		}
	}

	@Override
	public ActiviteDTO getActiviteByCode(String code) {
		Optional<Activite> activite = activiteRepository.findActiviteByCode(code);
		if (activite.isPresent()) {
			return modelMapper.map(activite.get(), ActiviteDTO.class);
		} else {
			throw new ResourceNotFoundException("Activite not found with code : " + code);
		}
	}

	@Override
	public ActiviteDTO create(ActiviteDTO activiteDto) {
		Activite activiteSaved = modelMapper.map(activiteDto, Activite.class);
		return modelMapper.map(activiteRepository.save(activiteSaved), ActiviteDTO.class);
	}

	@Override
	public boolean update(ActiviteDTO activiteDto) {
		Optional<Activite> activiteUpdate = activiteRepository.findById(activiteDto.getId());
		boolean isUpdated = false;
		if (activiteUpdate.isPresent()) {
			activiteDto.setCreatedAt(activiteUpdate.get().getCreatedAt());
			activiteRepository.save(modelMapper.map(activiteDto, Activite.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(ActiviteDTO activiteDto) {
		Optional<Activite> activiteUpdate = activiteRepository.findById(activiteDto.getId());
		boolean isUpdated = false;
		if (activiteUpdate.isPresent()) {
			activiteRepository.delete(activiteUpdate.get());
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public List<ActiviteDTO> createMultiple(List<ActiviteDTO> activiteDtos) {
		List<Activite> activite = activiteDtos.stream().map(activiteDto -> modelMapper.map(activiteDto, Activite.class))
				.collect(Collectors.toList());

		activiteDtos = activiteRepository.saveAll(activite).stream()
				.map(activiteEn -> modelMapper.map(activiteEn, ActiviteDTO.class)).collect(Collectors.toList());
		return activiteDtos;
	}

}
