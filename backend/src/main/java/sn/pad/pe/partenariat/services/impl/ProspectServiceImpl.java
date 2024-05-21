package sn.pad.pe.partenariat.services.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Besoin;
import sn.pad.pe.partenariat.bo.Prospect;
import sn.pad.pe.partenariat.dto.ProspectDTO;
import sn.pad.pe.partenariat.dto.VilleDTO;
import sn.pad.pe.partenariat.dto.ZoneDTO;
import sn.pad.pe.partenariat.repositories.BesoinRepository;
import sn.pad.pe.partenariat.repositories.ProspectRepository;
import sn.pad.pe.partenariat.services.ProspectService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class ProspectServiceImpl implements ProspectService {
	@Autowired
	private ProspectRepository prospectRepository;
	@Autowired
	private BesoinRepository besoinRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ProspectDTO> getProspects() {
		List<ProspectDTO> prospectDtos = prospectRepository.findAll().stream()
				.map(prospect -> modelMapper.map(prospect, ProspectDTO.class)).collect(Collectors.toList());
		return prospectDtos;
	}

	@Override
	public ProspectDTO getProspectById(Long id) {
		Optional<Prospect> prospect = prospectRepository.findById(id);
		if (prospect.isPresent()) {
			return modelMapper.map(prospect.get(), ProspectDTO.class);
		} else {
			throw new ResourceNotFoundException("Prospect not found with id : " + id);
		}
	}

	@Override
	public List<ProspectDTO> getProspectByCode(int code) {
		List<ProspectDTO> prospectDtos = prospectRepository.findProspectByStatut(code).stream()
				.map(prospect -> modelMapper.map(prospect, ProspectDTO.class)).collect(Collectors.toList());
		return prospectDtos;
	}

	@Transactional
	@Override
	public ProspectDTO create(ProspectDTO prospectDto) {
		prospectDto.setCode(genererCode());
		prospectDto.setDateApprobation(prospectDto.isPartenaire() ? new Date() : null);
		Prospect prospectSaved = modelMapper.map(prospectDto, Prospect.class);
		return modelMapper.map(prospectRepository.save(prospectSaved), ProspectDTO.class);
	}

	@Override
	public boolean update(ProspectDTO prospectDto) {
		Optional<Prospect> prospectUpdate = prospectRepository.findById(prospectDto.getId());
		boolean isUpdated = false;
		if (prospectUpdate.isPresent()) {
			Prospect prospect = prospectUpdate.get();
			prospectDto.setCreatedAt(prospect.getCreatedAt());
			prospectDto.setUpdatedAt(new Date());
			prospectDto.setVille(prospectDto.getVille() == null ? modelMapper.map(prospect.getVille(), VilleDTO.class)
					: prospectDto.getVille());
			prospectDto.setZone(prospectDto.getZone() == null ? modelMapper.map(prospect.getZone(), ZoneDTO.class)
					: prospectDto.getZone());

			prospectDto.setDateApprobation(prospectDto.getDateApprobation() != null ? prospectDto.getDateApprobation()
					: prospectDto.isPartenaire() ? new Date() : null);

			prospectRepository.save(modelMapper.map(prospectDto, Prospect.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(ProspectDTO prospectDto) {
		Optional<Prospect> prospectToDelete = prospectRepository.findById(prospectDto.getId());
		boolean isDeleted = false;
		if (prospectToDelete.isPresent()) {
			prospectRepository.delete(prospectToDelete.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<ProspectDTO> createMultiple(List<ProspectDTO> prospectDtos) {
		List<Prospect> prospects = prospectDtos.stream()
				.map(prospectDto -> modelMapper.map(prospectDto, Prospect.class)).collect(Collectors.toList());

		prospectDtos = prospectRepository.saveAll(prospects).stream()
				.map(prospect -> modelMapper.map(prospect, ProspectDTO.class)).collect(Collectors.toList());
		return prospectDtos;
	}

	private String genererCode() {

		String newRecordCode = null;

		int sizeCode = 10;
		String prefixe = "PR-";
		String lastRecordCode = null;

		Optional<Prospect> lastRecord = prospectRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

	@Override
	public List<ProspectDTO> getProspectByPlanProspection(long id) {
		List<Prospect> prospectsTmp = new ArrayList<>();
		for (Besoin besoin : besoinRepository.findBesoinByPlanprospectionId(id)) {
			prospectsTmp.addAll(besoin.getPartenaires());
		}
		HashSet<Prospect> hashSet = new HashSet(prospectsTmp);
		prospectsTmp = new ArrayList(hashSet);

		List<Prospect> prospects = new ArrayList<>();
		for (Prospect prospect : prospectsTmp) {
			if (!prospect.isPartenaire())
				prospects.add(prospect);
		}

		List<ProspectDTO> prospectDtos = prospects.stream()
				.map(prospect -> modelMapper.map(prospect, ProspectDTO.class)).collect(Collectors.toList());
		return prospectDtos;
	}

	@Override
	public boolean qualifierProspectPotentiel(long id, boolean estPotentiel, boolean estPartenaire) {
		Optional<Prospect> prospectUpdate = prospectRepository.findById(id);
		boolean isUpdated = false;
		if (prospectUpdate.isPresent()) {
			Prospect prospect = prospectUpdate.get();
			prospect.setStatut(estPotentiel ? 1 : 0);
			prospect.setPartenaire(estPartenaire);

			prospectRepository.save(prospect);
			isUpdated = true;
		}
		return isUpdated;
	}
}
