package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.DetailEvenement;
import sn.pad.pe.partenariat.dto.DetailEvenementDTO;
import sn.pad.pe.partenariat.repositories.DetailEvenementRepository;
import sn.pad.pe.partenariat.services.DetailEvenementService;

@Service
public class DetailEvenementServiceImpl implements DetailEvenementService {
	@Autowired
	private DetailEvenementRepository detailevenementRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<DetailEvenementDTO> getDetailEvenements() {
		List<DetailEvenementDTO> detailevenementDtos = detailevenementRepository.findAll().stream()
				.map(detailevenement -> modelMapper.map(detailevenement, DetailEvenementDTO.class))
				.collect(Collectors.toList());
		return detailevenementDtos;
	}

	@Override
	public DetailEvenementDTO getDetailEvenementById(Long id) {
		Optional<DetailEvenement> detailevenement = detailevenementRepository.findById(id);
		if (detailevenement.isPresent()) {
			return modelMapper.map(detailevenement.get(), DetailEvenementDTO.class);
		} else {
			throw new ResourceNotFoundException("detailevenement not found with id : " + id);
		}
	}

	@Override
	public List<DetailEvenementDTO> getDetailEvenementByCode(Long code) {
		List<DetailEvenementDTO> detailevenementDtos = detailevenementRepository.findDetailEvenementByCode(code)
				.stream().map(detailevenement -> modelMapper.map(detailevenement, DetailEvenementDTO.class))
				.collect(Collectors.toList());
		return detailevenementDtos;
	}

	@Override
	public DetailEvenementDTO create(DetailEvenementDTO detailevenementDto) {
		DetailEvenement detailevenementSaved = modelMapper.map(detailevenementDto, DetailEvenement.class);
		return modelMapper.map(detailevenementRepository.save(detailevenementSaved), DetailEvenementDTO.class);
	}

	@Override
	public boolean update(DetailEvenementDTO detailevenementDto) {
		Optional<DetailEvenement> detailevenementUpdate = detailevenementRepository
				.findById(detailevenementDto.getId());
		boolean isUpdated = false;
		if (detailevenementUpdate.isPresent()) {
			detailevenementRepository.save(modelMapper.map(detailevenementDto, DetailEvenement.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(DetailEvenementDTO detailevenementDto) {
		Optional<DetailEvenement> detailevenementToDelete = detailevenementRepository
				.findById(detailevenementDto.getId());
		boolean isDeleted = false;
		if (detailevenementToDelete.isPresent()) {
			detailevenementRepository.delete(detailevenementToDelete.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<DetailEvenementDTO> createMultiple(List<DetailEvenementDTO> detailevenementDtos) {
		List<DetailEvenement> detailevenements = detailevenementDtos.stream()
				.map(detailevenementDto -> modelMapper.map(detailevenementDto, DetailEvenement.class))
				.collect(Collectors.toList());

		detailevenementDtos = detailevenementRepository.saveAll(detailevenements).stream()
				.map(detailevenement -> modelMapper.map(detailevenement, DetailEvenementDTO.class))
				.collect(Collectors.toList());
		return detailevenementDtos;
	}

}
