package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.PlanProspection;
import sn.pad.pe.partenariat.dto.PlanprospectionDTO;
import sn.pad.pe.partenariat.repositories.PlanprospectionRepository;
import sn.pad.pe.partenariat.services.PlanprospectionService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class PlanprospectionServiceImpl implements PlanprospectionService {
	@Autowired
	private PlanprospectionRepository planprospectionRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<PlanprospectionDTO> getPlanprospection() {

		List<PlanprospectionDTO> planprospectionDTOtoSaved = planprospectionRepository.findAll().stream()
				.map(planprospection -> modelMapper.map(planprospection, PlanprospectionDTO.class))
				.collect(Collectors.toList());
		return planprospectionDTOtoSaved;
	}

	@Override
	public PlanprospectionDTO getPlanprospectionById(Long code) {
		Optional<PlanProspection> planprospection = planprospectionRepository.findById(code);
		if (planprospection.isPresent()) {
			return modelMapper.map(planprospection.get(), PlanprospectionDTO.class);
		} else {
			throw new ResourceNotFoundException("PlanprospectionDTO not found with id : " + code);
		}

	}

	@Override
	public PlanprospectionDTO create(PlanprospectionDTO planprospectionDTO) {
		planprospectionDTO.setCode(genererCode());
		PlanProspection planprospectionSaved = modelMapper.map(planprospectionDTO, PlanProspection.class);
		return modelMapper.map(planprospectionRepository.save(planprospectionSaved), PlanprospectionDTO.class);
	}

	@Override

	public boolean update(PlanprospectionDTO planprospectionDTO) {
		Optional<PlanProspection> planprospectionUpdate = planprospectionRepository
				.findById(planprospectionDTO.getId());
		boolean isUpdated = false;
		if (planprospectionUpdate.isPresent()) {
			planprospectionDTO.setCreatedAt(planprospectionUpdate.get().getCreatedAt());
			planprospectionRepository.save(modelMapper.map(planprospectionDTO, PlanProspection.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(PlanprospectionDTO planprospectionDTO) {
		Optional<PlanProspection> planprospectionDelete = planprospectionRepository
				.findById(planprospectionDTO.getId());
		boolean isDeleleted = false;
		if (planprospectionDelete.isPresent()) {
			planprospectionRepository.delete(planprospectionDelete.get());
			isDeleleted = true;
		}
		return isDeleleted;
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 10;
		String prefixe = "PL-";
		String lastRecordCode = null;

		Optional<PlanProspection> lastRecord = planprospectionRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

}
