package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.EtapeInterim;
import sn.pad.pe.pss.bo.Interim;
import sn.pad.pe.pss.dto.EtapeInterimDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.repositories.EtapeInterimRepository;
import sn.pad.pe.pss.services.EtapeInterimService;

@Service
public class EtapeInterimServiceImpl implements EtapeInterimService {
	@Autowired
	private EtapeInterimRepository etapeInterimRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<EtapeInterimDTO> getEtapeInterims() {
		List<EtapeInterimDTO> etapeInterimDTOSaved = etapeInterimRepository.findAll().stream()
				.map(etapeInterim -> modelMapper.map(etapeInterim, EtapeInterimDTO.class)).collect(Collectors.toList());
		return etapeInterimDTOSaved;
	}

	@Override
	public List<EtapeInterimDTO> findEtapeInterimsByInterim(InterimDTO interimDTO) {
		Interim interim = modelMapper.map(interimDTO, Interim.class);
		List<EtapeInterim> etapeInterimGetted = etapeInterimRepository.findEtapeInterimsByInterim(interim);
		List<EtapeInterimDTO> etapeInterimDTOList = etapeInterimGetted.stream()
				.map(etapeInterim -> modelMapper.map(etapeInterim, EtapeInterimDTO.class)).collect(Collectors.toList());
		return etapeInterimDTOList;
	}

	@Override
	public EtapeInterimDTO getEtapeInterimById(Long id) {
		Optional<EtapeInterim> EtapeInterim = etapeInterimRepository.findById(id);
		if (EtapeInterim.isPresent()) {
			return modelMapper.map(EtapeInterim.get(), EtapeInterimDTO.class);

		} else {
			throw new ResourceNotFoundException("Agent not found with id : " + id);
		}
	}

	@Override
	public EtapeInterimDTO create(EtapeInterimDTO etapeInterimDTO) {
		EtapeInterim interimToSave = modelMapper.map(etapeInterimDTO, EtapeInterim.class);
		EtapeInterim etapeInterimSaved = etapeInterimRepository.save(interimToSave);
		EtapeInterimDTO interimSavedDTO = modelMapper.map(etapeInterimSaved, EtapeInterimDTO.class);
		return interimSavedDTO;
	}

	@Override
	public boolean update(EtapeInterimDTO etapeInterimDTO) {
		Optional<EtapeInterim> imterimUpdate = etapeInterimRepository.findById(etapeInterimDTO.getId());
		boolean isUpdated = false;
		if (imterimUpdate.isPresent()) {
			EtapeInterim interimSaved = modelMapper.map(etapeInterimDTO, EtapeInterim.class);
			etapeInterimRepository.save(interimSaved);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(EtapeInterimDTO etapeInterimDTO) {
		Optional<EtapeInterim> etapeInterimDelete = etapeInterimRepository.findById(etapeInterimDTO.getId());
		boolean isDeleleted = false;
		if (etapeInterimDelete.isPresent()) {
			EtapeInterim etapeInterimToDelete = etapeInterimDelete.get();
			etapeInterimRepository.delete(etapeInterimToDelete);
			isDeleleted = true;
		}
		return isDeleleted;
	}

}
