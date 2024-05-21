package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.partenariat.bo.SuiviProspect;
import sn.pad.pe.partenariat.dto.SuiviProspectDTO;
import sn.pad.pe.partenariat.repositories.SuiviProspectRepository;
import sn.pad.pe.partenariat.services.SuiviProspectService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class SuiviProspectServiceImpl implements SuiviProspectService {
	@Autowired
	private SuiviProspectRepository suiviprospectRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<SuiviProspectDTO> getSuiviProspects() {
		List<SuiviProspectDTO> suiviprospectDtos = suiviprospectRepository.findAll().stream()
				.map(suiviprospect -> modelMapper.map(suiviprospect, SuiviProspectDTO.class))
				.collect(Collectors.toList());
		return suiviprospectDtos;
	}

	@Override
	public SuiviProspectDTO create(SuiviProspectDTO suiviprospectDto) {
		suiviprospectDto.setCode(genererCode());
		SuiviProspect suiviprospectSaved = modelMapper.map(suiviprospectDto, SuiviProspect.class);
		return modelMapper.map(suiviprospectRepository.save(suiviprospectSaved), SuiviProspectDTO.class);
	}

	@Override
	public boolean update(SuiviProspectDTO suiviprospectDto) {
		Optional<SuiviProspect> suiviprospectUpdate = suiviprospectRepository.findById(suiviprospectDto.getId());
		boolean isUpdated = false;
		if (suiviprospectUpdate.isPresent()) {
			suiviprospectDto.setCreatedAt(suiviprospectUpdate.get().getCreatedAt());
			suiviprospectRepository.save(modelMapper.map(suiviprospectDto, SuiviProspect.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(SuiviProspectDTO suiviprospectDto) {
		Optional<SuiviProspect> suiviprospectDelete = suiviprospectRepository.findById(suiviprospectDto.getId());
		boolean isDeleleted = false;
		if (suiviprospectDelete.isPresent()) {
			suiviprospectRepository.delete(suiviprospectDelete.get());
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public List<SuiviProspectDTO> createMultiple(List<SuiviProspectDTO> suiviprospectDtos) {
		List<SuiviProspect> suiviprospects = suiviprospectDtos.stream()
				.map(suiviprospectDto -> modelMapper.map(suiviprospectDto, SuiviProspect.class))
				.collect(Collectors.toList());

		suiviprospectDtos = suiviprospectRepository.saveAll(suiviprospects).stream()
				.map(suiviprospect -> modelMapper.map(suiviprospect, SuiviProspectDTO.class))
				.collect(Collectors.toList());
		return suiviprospectDtos;
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 15;
		String prefixe = "SP-";
		String lastRecordCode = null;

		Optional<SuiviProspect> lastRecord = suiviprospectRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

	@Override
	public List<SuiviProspectDTO> getSuiviByProspectId(long id) {
		List<SuiviProspectDTO> suiviprospectDtos = suiviprospectRepository.findByProspectIdOrderByDateDesc(id).stream()
				.map(suiviprospect -> modelMapper.map(suiviprospect, SuiviProspectDTO.class))
				.collect(Collectors.toList());
		return suiviprospectDtos;
	}

}
