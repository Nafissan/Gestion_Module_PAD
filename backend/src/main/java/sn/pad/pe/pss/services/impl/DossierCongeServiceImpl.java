package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.DossierConge;
import sn.pad.pe.pss.dto.DossierCongeDTO;
import sn.pad.pe.pss.repositories.DossierCongeRepository;
import sn.pad.pe.pss.services.DossierCongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@Service
public class DossierCongeServiceImpl implements DossierCongeService {

	@Autowired
	private DossierCongeRepository dossierCongeRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<DossierCongeDTO> getDossierConges() {
		List<DossierCongeDTO> dossierCongeDTOs = dossierCongeRepository.findAll().stream()
				.map(dossierconge -> modelMapper.map(dossierconge, DossierCongeDTO.class)).collect(Collectors.toList());
		return dossierCongeDTOs;
	}

	@Override
	public DossierCongeDTO getDossierCongeById(Long id) {
		Optional<DossierConge> dossierConge = dossierCongeRepository.findById(id);
		if (dossierConge.isPresent()) {
			return modelMapper.map(dossierConge.get(), DossierCongeDTO.class);
		} else {
			throw new ResourceNotFoundException("DossierConge not found with id : " + id);
		}
	}

	@Override
	public DossierCongeDTO createDossierConge(DossierCongeDTO dossierCongeDTO) {
		List<DossierCongeDTO> dossierCongeDTOs = getDossierConges().stream()
				.map(dossierConge -> modelMapper.map(dossierConge, DossierCongeDTO.class))
				.filter(dossierConge -> dossierConge.getAnnee().equals(dossierCongeDTO.getAnnee()))
				.collect(Collectors.toList());
		if (dossierCongeDTOs.size() == 0) {
			DossierConge dossierConge = modelMapper.map(dossierCongeDTO, DossierConge.class);
			DossierConge dossierCongeToSave = dossierCongeRepository.save(dossierConge);
			return modelMapper.map(dossierCongeToSave, DossierCongeDTO.class);
		} else {
			return modelMapper.map(dossierCongeDTO, DossierCongeDTO.class);
		}
	}

	@Override
	public boolean updateDossierConge(DossierCongeDTO dossierCongeDTO) {
		boolean isUpdated = false;
		DossierConge dossierConge = modelMapper.map(dossierCongeDTO, DossierConge.class);
		Optional<DossierConge> dossierCongeToUpdated = dossierCongeRepository.findById(dossierConge.getId());
		if (dossierCongeToUpdated.isPresent()) {
			dossierCongeRepository.save(dossierConge);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean deteleDossierConge(DossierCongeDTO dossierCongeDTO) {
		boolean isDeleted = false;
		DossierConge dossierConge = modelMapper.map(dossierCongeDTO, DossierConge.class);
		Optional<DossierConge> dossierCongeToDeleted = dossierCongeRepository.findById(dossierConge.getId());
		if (dossierCongeToDeleted.isPresent()) {
			dossierCongeRepository.delete(dossierConge);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public DossierCongeDTO getDossierCongeByAnnee(String annee) {
		Optional<DossierConge> dossierConge = dossierCongeRepository.findDossierCongeByAnnee(annee);
		if (dossierConge.isPresent()) {
			return modelMapper.map(dossierConge.get(), DossierCongeDTO.class);
		} else {
			throw new ResourceNotFoundException("DossierConge not found with annee : " + annee);
		}
	}
}
