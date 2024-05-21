package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Evenement;
import sn.pad.pe.partenariat.dto.EvenementDTO;
import sn.pad.pe.partenariat.repositories.EvenementRepository;
import sn.pad.pe.partenariat.services.EvenementService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class EvenementServiceImpl implements EvenementService {

	@Autowired
	private EvenementRepository evenementRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<EvenementDTO> getEvenements() {
		List<EvenementDTO> evenementDtos = evenementRepository.findAll().stream()
				.map(evenement -> modelMapper.map(evenement, EvenementDTO.class)).collect(Collectors.toList());
		return evenementDtos;
	}

	@Override
	public EvenementDTO getEvenementById(Long id) {
		Optional<Evenement> evenement = evenementRepository.findById(id);
		if (evenement.isPresent()) {
			return modelMapper.map(evenement.get(), EvenementDTO.class);
		} else {
			throw new ResourceNotFoundException("Evenement not found with id : " + id);
		}
	}

	@Override
	public EvenementDTO getEvenementByCode(String code) {
		Optional<Evenement> evenement = evenementRepository.findEvenementByCode(code);
		if (evenement.isPresent()) {
			return modelMapper.map(evenement.get(), EvenementDTO.class);
		} else {
			throw new ResourceNotFoundException("Evenement not found with code : " + code);
		}
	}

	@Override
	public EvenementDTO create(EvenementDTO evenementDto) {
		evenementDto.setCode(genererCode());
		Evenement evenementSaved = modelMapper.map(evenementDto, Evenement.class);
		return modelMapper.map(evenementRepository.save(evenementSaved), EvenementDTO.class);
	}

	@Override
	public boolean update(EvenementDTO evenementDto) {
		Optional<Evenement> evenementUpdate = evenementRepository.findById(evenementDto.getId());
		boolean isUpdated = false;
		if (evenementUpdate.isPresent()) {
			evenementDto.setCreatedAt(evenementUpdate.get().getCreatedAt());
			evenementRepository.save(modelMapper.map(evenementDto, Evenement.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(EvenementDTO evenementDto) {
		Optional<Evenement> evenementToDelete = evenementRepository.findById(evenementDto.getId());
		boolean isDeleted = false;
		if (evenementToDelete.isPresent()) {
			evenementRepository.delete(evenementToDelete.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<EvenementDTO> createMultiple(List<EvenementDTO> evenementDtos) {
		List<Evenement> evenements = evenementDtos.stream()
				.map(evenementDto -> modelMapper.map(evenementDto, Evenement.class)).collect(Collectors.toList());

		evenementDtos = evenementRepository.saveAll(evenements).stream()
				.map(evenement -> modelMapper.map(evenement, EvenementDTO.class)).collect(Collectors.toList());
		return evenementDtos;
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 5;
		String prefixe = "EV-";
		String lastRecordCode = null;

		Optional<Evenement> lastRecord = evenementRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

}
