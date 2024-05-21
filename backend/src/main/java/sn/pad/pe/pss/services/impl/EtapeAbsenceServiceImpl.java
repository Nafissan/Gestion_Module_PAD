package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.EtapeAbsence;
import sn.pad.pe.pss.dto.EtapeAbsenceDTO;
import sn.pad.pe.pss.repositories.EtapeAbsenceRepository;
import sn.pad.pe.pss.services.EtapeAbsenceService;

/**
 * 
 * @author abdou.diop
 *
 */
@Service
public class EtapeAbsenceServiceImpl implements EtapeAbsenceService {

	@Autowired
	private EtapeAbsenceRepository etapeabsenceRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<EtapeAbsenceDTO> getEtapeAbsence() {
		List<EtapeAbsenceDTO> etapeAbsenceToSaved = etapeabsenceRepository.findAll().stream()
				.map(etapeAbsence -> modelMapper.map(etapeAbsence, EtapeAbsenceDTO.class)).collect(Collectors.toList());
		return etapeAbsenceToSaved;
	}

	@Override
	public EtapeAbsenceDTO getEtapeAbsenceById(Long id) {
		Optional<EtapeAbsence> etapeAbsence = etapeabsenceRepository.findById(id);
		if (etapeAbsence.isPresent()) {
			return modelMapper.map(etapeAbsence.get(), EtapeAbsenceDTO.class);
		} else {
			throw new ResourceNotFoundException("etapeAbsence not found with id : " + id);
		}
	}

	@Override
	public EtapeAbsenceDTO createEtapeAbsence(EtapeAbsenceDTO etapeAbsenceDTO) {
		EtapeAbsence etapeAbsence = modelMapper.map(etapeAbsenceDTO, EtapeAbsence.class);
		return modelMapper.map(etapeabsenceRepository.save(etapeAbsence), EtapeAbsenceDTO.class);
	}

	@Override
	public boolean updateEtapeAbsence(EtapeAbsenceDTO etapeAbsenceDTO) {
		Optional<EtapeAbsence> etapeabsenceUpdate = etapeabsenceRepository.findById(etapeAbsenceDTO.getId());
		boolean isUpdated = false;
		if (etapeabsenceUpdate.isPresent()) {
			EtapeAbsence absence = modelMapper.map(etapeAbsenceDTO, EtapeAbsence.class);
			etapeabsenceRepository.save(absence);
			isUpdated = true;
		}
		return isUpdated;

	}

	@Override
	public boolean deleteEtapeAbsence(@RequestBody EtapeAbsenceDTO etapeAbsenceDTO) {
		Optional<EtapeAbsence> etapeAbsenceToDeleteUpdate = etapeabsenceRepository.findById(etapeAbsenceDTO.getId());
		boolean isDeleted = false;
		if (etapeAbsenceToDeleteUpdate.isPresent()) {
			etapeabsenceRepository.delete(etapeAbsenceToDeleteUpdate.get());
			isDeleted = true;
		}
		return isDeleted;

	}

}
