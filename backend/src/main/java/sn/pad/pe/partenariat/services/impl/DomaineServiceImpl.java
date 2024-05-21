package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Domaine;
import sn.pad.pe.partenariat.dto.DomaineDTO;
import sn.pad.pe.partenariat.repositories.DomaineRepository;
import sn.pad.pe.partenariat.services.DomaineService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class DomaineServiceImpl implements DomaineService {
	@Autowired
	private DomaineRepository domaineRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<DomaineDTO> getDomaine() {
		List<DomaineDTO> domaineDtos = domaineRepository.findAll().stream()
				.map(domaine -> modelMapper.map(domaine, DomaineDTO.class)).collect(Collectors.toList());
		return domaineDtos;
	}

	@Override
	public DomaineDTO getDomaineById(Long id) {
		Optional<Domaine> domaine = domaineRepository.findById(id);
		if (domaine.isPresent()) {
			return modelMapper.map(domaine.get(), DomaineDTO.class);
		} else {
			throw new ResourceNotFoundException("Domaine not found with id : " + id);
		}
	}

	@Override
	public DomaineDTO create(DomaineDTO domaineDtO) {
		domaineDtO.setCode(genererCode());
		Domaine domaineSaved = modelMapper.map(domaineDtO, Domaine.class);
		return modelMapper.map(domaineRepository.save(domaineSaved), DomaineDTO.class);
	}

	@Override
	public boolean update(DomaineDTO domaineDtO) {
		Optional<Domaine> domaineUpdate = domaineRepository.findById(domaineDtO.getId());
		boolean isUpdated = false;
		if (domaineUpdate.isPresent()) {
			domaineDtO.setCreatedAt(domaineUpdate.get().getCreatedAt());
			domaineRepository.save(modelMapper.map(domaineDtO, Domaine.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(DomaineDTO domaineDtO) {
		Optional<Domaine> domaineDelete = domaineRepository.findById(domaineDtO.getId());
		boolean isDeleleted = false;
		if (domaineDelete.isPresent()) {
			domaineRepository.delete(domaineDelete.get());
			isDeleleted = true;
		}
		return isDeleleted;

	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 6;
		String prefixe = "DM-";
		String lastRecordCode = null;

		Optional<Domaine> lastRecord = domaineRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

}
