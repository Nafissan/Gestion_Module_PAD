package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.EtapePlanningDirection;
import sn.pad.pe.pss.bo.PlanningDirection;
import sn.pad.pe.pss.dto.EtapePlanningDirectionDTO;
import sn.pad.pe.pss.repositories.EtapePlanningRepository;
import sn.pad.pe.pss.repositories.PlanningDirectionRepository;
import sn.pad.pe.pss.services.EtatpePlanningDirectionService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@Service
public class EtatpePlanningDirectionServiceImpl implements EtatpePlanningDirectionService {

	@Autowired
	private EtapePlanningRepository etapePlanningRepository;
	@Autowired
	private PlanningDirectionRepository planningDirectionRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<EtapePlanningDirectionDTO> getEtatpePlanningDirections() {
		List<EtapePlanningDirectionDTO> etapePlanningDirectionDTOs = etapePlanningRepository.findAll().stream()
				.map(etapePlanning -> modelMapper.map(etapePlanning, EtapePlanningDirectionDTO.class))
				.collect(Collectors.toList());
		return etapePlanningDirectionDTOs;
	}

	@Override
	public List<EtapePlanningDirectionDTO> getEtatpePlanningDirectionsByPlanningDirection(Long idPlanningDirection) {
		Optional<PlanningDirection> planningDirection = planningDirectionRepository.findById(idPlanningDirection);
		if (planningDirection.isPresent()) {
			return etapePlanningRepository.findEtapePlanningDirectionsByPlanningDirection(planningDirection.get())
					.stream().map(etapePlanning -> modelMapper.map(etapePlanning, EtapePlanningDirectionDTO.class))
					.collect(Collectors.toList());
		} else {
			throw new ResourceNotFoundException(
					"EtapePlanningDirection not found with idPlanningConge : " + idPlanningDirection);
		}
	}

	@Override
	public EtapePlanningDirectionDTO getEtatpePlanningDirectionById(Long id) {
		Optional<EtapePlanningDirection> etapePlanningDirection = etapePlanningRepository.findById(id);
		if (etapePlanningDirection.isPresent()) {
			return modelMapper.map(etapePlanningDirection.get(), EtapePlanningDirectionDTO.class);
		} else {
			throw new ResourceNotFoundException("EtapePlanningDirection not found with id : " + id);
		}
	}

	@Override
	public EtapePlanningDirectionDTO createEtatpePlanningDirection(
			EtapePlanningDirectionDTO etapePlanningDirectionDTO) {
		EtapePlanningDirection etapePlanningDirection = modelMapper.map(etapePlanningDirectionDTO,
				EtapePlanningDirection.class);
		return modelMapper.map(etapePlanningRepository.save(etapePlanningDirection), EtapePlanningDirectionDTO.class);
	}

	@Override
	public boolean updateEtatpePlanningDirection(EtapePlanningDirectionDTO etapePlanningDirectionDTO) {
		boolean isUpdated = false;
		EtapePlanningDirection etapePlanningDirection = modelMapper.map(etapePlanningDirectionDTO,
				EtapePlanningDirection.class);
		Optional<EtapePlanningDirection> etapePlanningToUpdated = etapePlanningRepository
				.findById(etapePlanningDirection.getId());
		if (etapePlanningToUpdated.isPresent()) {
			etapePlanningRepository.save(etapePlanningDirection);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean deteleEtatpePlanningDirection(EtapePlanningDirectionDTO etapePlanningDirectionDTO) {
		boolean isDeleted = false;
		EtapePlanningDirection etapePlanningDirection = modelMapper.map(etapePlanningDirectionDTO,
				EtapePlanningDirection.class);
		Optional<EtapePlanningDirection> etapePlanningToDeleted = etapePlanningRepository
				.findById(etapePlanningDirection.getId());
		if (etapePlanningToDeleted.isPresent()) {
			etapePlanningRepository.delete(etapePlanningDirection);
			isDeleted = true;
		}
		return isDeleted;
	}

}
