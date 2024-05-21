package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.EtapeAttestation;
import sn.pad.pe.pss.dto.EtapeAttestationDTO;
import sn.pad.pe.pss.repositories.EtapeAttestationRepository;
import sn.pad.pe.pss.services.EtapeAttestationService;

@Service
public class EtapeAttestationServiceImpl implements EtapeAttestationService {

	@Autowired
	private EtapeAttestationRepository etapeAttestationRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<EtapeAttestationDTO> getEtapeAttestations() {
		List<EtapeAttestationDTO> etapeAttestationToSaved = etapeAttestationRepository.findAll().stream()
				.map(etapeAttestation -> modelMapper.map(etapeAttestation, EtapeAttestationDTO.class))
				.collect(Collectors.toList());
		return etapeAttestationToSaved;
	}

	@Override
	public EtapeAttestationDTO getEtapeAttestationById(Long id) {
		Optional<EtapeAttestation> etapeAttestation = etapeAttestationRepository.findById(id);
		if (etapeAttestation.isPresent()) {
			return modelMapper.map(etapeAttestation.get(), EtapeAttestationDTO.class);

		} else {
			throw new ResourceNotFoundException("etapeAttestation not found with id : " + id);
		}
	}

	@Override
	public EtapeAttestationDTO create(EtapeAttestationDTO etapeAttestationDTO) {
		EtapeAttestation etapeAttestation = modelMapper.map(etapeAttestationDTO, EtapeAttestation.class);
		EtapeAttestation etapeAttestationToSave = etapeAttestationRepository.save(etapeAttestation);
		return modelMapper.map(etapeAttestationToSave, EtapeAttestationDTO.class);
	}

	@Override
	public EtapeAttestationDTO createMany(List<EtapeAttestationDTO> etapeAttestationDTOs) {
		List<EtapeAttestation> etapeAttestations = etapeAttestationDTOs.stream()
				.map(e -> modelMapper.map(e, EtapeAttestation.class)).collect(Collectors.toList());
		return modelMapper.map(etapeAttestationRepository.saveAll(etapeAttestations), EtapeAttestationDTO.class);
	}

	@Override
	public boolean update(EtapeAttestationDTO etapeAttestationDTO) {
		Optional<EtapeAttestation> attestationUpdate = etapeAttestationRepository.findById(etapeAttestationDTO.getId());
		boolean isUpdated = false;
		if (attestationUpdate.isPresent()) {
			EtapeAttestation etapeAttestationUpdated = modelMapper.map(etapeAttestationDTO, EtapeAttestation.class);
			etapeAttestationRepository.save(etapeAttestationUpdated);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean updateMany(List<EtapeAttestationDTO> etapeAttestationDTOs) {
		boolean isUpdated = false;
		if (!etapeAttestationDTOs.isEmpty()) {
			List<EtapeAttestation> etapeAttestationToSaved = etapeAttestationDTOs.stream()
					.map(etape -> modelMapper.map(etape, EtapeAttestation.class)).collect(Collectors.toList());
			etapeAttestationRepository.saveAll(etapeAttestationToSaved);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(EtapeAttestationDTO etapeAttestationDTO) {
		Optional<EtapeAttestation> etapeattestationToDelete = etapeAttestationRepository
				.findById(etapeAttestationDTO.getId());
		boolean isDeleted = false;
		if (etapeattestationToDelete.isPresent()) {
			etapeAttestationRepository.delete(etapeattestationToDelete.get());
			isDeleted = true;
		}
		return isDeleted;

	}

}
