package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.DossierAbsence;
import sn.pad.pe.pss.dto.DossierAbsenceDTO;
import sn.pad.pe.pss.repositories.DossierAbsenceRepository;
import sn.pad.pe.pss.services.DossierAbsenceService;

/**
 * 
 * @author abdou.diop
 *
 */
@Service
public class DossierAbsenceServiceImpl implements DossierAbsenceService {

	@Autowired
	private DossierAbsenceRepository dossierAbsenceRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<DossierAbsenceDTO> getDossierAbsences() {
		List<DossierAbsenceDTO> dossierAbsenceDTOs = dossierAbsenceRepository.findAll().stream()
				.map(DossierAbsence -> modelMapper.map(DossierAbsence, DossierAbsenceDTO.class))
				.collect(Collectors.toList());
		return dossierAbsenceDTOs;
	}

	@Override
	public DossierAbsenceDTO getDossierAbsenceById(Long id) {
		Optional<DossierAbsence> dossierAbsence = dossierAbsenceRepository.findById(id);
		if (dossierAbsence.isPresent()) {
			return modelMapper.map(dossierAbsence.get(), DossierAbsenceDTO.class);
		} else {
			throw new ResourceNotFoundException("DossierAbsence not found with id : " + id);
		}
	}

	@Override
	public DossierAbsenceDTO createDossierAbsence(DossierAbsenceDTO dossierAbsenceDTO) {
		DossierAbsence dossierAbsence = modelMapper.map(dossierAbsenceDTO, DossierAbsence.class);
		DossierAbsence dossierAbsenceToSave = dossierAbsenceRepository.save(dossierAbsence);
		return modelMapper.map(dossierAbsenceToSave, DossierAbsenceDTO.class);
	}

	@Override
	public boolean updateDossierAbsence(DossierAbsenceDTO dossierAbsenceDTO) {
		boolean isUpdated = false;
		DossierAbsence dossierAbsence = modelMapper.map(dossierAbsenceDTO, DossierAbsence.class);
		Optional<DossierAbsence> dossierAbsenceDTOToUpdated = dossierAbsenceRepository.findById(dossierAbsence.getId());
		if (dossierAbsenceDTOToUpdated.isPresent()) {
			dossierAbsenceRepository.save(dossierAbsence);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean deteleDossierAbsence(DossierAbsenceDTO dossierAbsenceDTO) {

		boolean isDeleted = false;
		DossierAbsence dossierAbsence = modelMapper.map(dossierAbsenceDTO, DossierAbsence.class);
		Optional<DossierAbsence> dossierAbsenceToDeleted = dossierAbsenceRepository.findById(dossierAbsence.getId());
		if (dossierAbsenceToDeleted.isPresent()) {
			dossierAbsenceRepository.delete(dossierAbsence);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<DossierAbsenceDTO> findDossierAbsenceByAnnee(int annee) {
		List<DossierAbsenceDTO> dossierAbsenceDTOs = dossierAbsenceRepository.findDossierAbsenceByAnnee(annee).stream()
				.map(dossierAbsence -> modelMapper.map(dossierAbsence, DossierAbsenceDTO.class))
				.collect(Collectors.toList());
		return dossierAbsenceDTOs;
	}
}
