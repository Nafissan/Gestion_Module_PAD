package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.DossierConge;
import sn.pad.pe.pss.bo.PlanningDirection;
import sn.pad.pe.pss.dto.PlanningDirectionDTO;
import sn.pad.pe.pss.repositories.DossierCongeRepository;
import sn.pad.pe.pss.repositories.PlanningDirectionRepository;
import sn.pad.pe.pss.services.PlanningDirectionService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@Service
public class PlanningDirectionServiceImpl implements PlanningDirectionService {

	@Autowired
	private PlanningDirectionRepository planningDirectionRepository;
	@Autowired
	private DossierCongeRepository dossierCongeRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<PlanningDirectionDTO> getPlanningDirections() {
		List<PlanningDirectionDTO> planningDirectionDTOs = planningDirectionRepository.findAll().stream()
				.map(PlanningDirection -> modelMapper.map(PlanningDirection, PlanningDirectionDTO.class))
				.collect(Collectors.toList());
		return planningDirectionDTOs;
	}

	@Override
	public PlanningDirectionDTO getPlanningDirectionById(Long id) {
		Optional<PlanningDirection> planningDirection = planningDirectionRepository.findById(id);
		if (planningDirection.isPresent()) {
			return modelMapper.map(planningDirection.get(), PlanningDirectionDTO.class);
		} else {
			throw new ResourceNotFoundException("PlanningDirection not found with id : " + id);
		}
	}

	@Override
	public PlanningDirectionDTO createPlanningDirection(PlanningDirectionDTO planningDirectionDTO) {
		PlanningDirection planningDirection = modelMapper.map(planningDirectionDTO, PlanningDirection.class);
		return modelMapper.map(planningDirectionRepository.save(planningDirection), PlanningDirectionDTO.class);
	}

	@Override
	public boolean updatePlanningDirection(PlanningDirectionDTO planningDirectionDTO) {
		boolean isUpdated = false;
		PlanningDirection planningDirection = modelMapper.map(planningDirectionDTO, PlanningDirection.class);
		Optional<PlanningDirection> planningDirectionToUpdated = planningDirectionRepository
				.findById(planningDirection.getId());
		if (planningDirectionToUpdated.isPresent()) {
			planningDirectionRepository.save(planningDirection);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean detelePlanningDirection(PlanningDirectionDTO planningDirectionDTO) {
		boolean isDeleted = false;
		PlanningDirection planningDirection = modelMapper.map(planningDirectionDTO, PlanningDirection.class);
		Optional<PlanningDirection> planningDirectionToDeleted = planningDirectionRepository
				.findById(planningDirection.getId());
		if (planningDirectionToDeleted.isPresent()) {
			planningDirectionRepository.delete(planningDirection);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<PlanningDirectionDTO> getPlanningDirectionsByDossierConge(Long idDossierConge) {
		Optional<DossierConge> dossierConge = dossierCongeRepository.findById(idDossierConge);
		if (dossierConge.isPresent()) {
			return planningDirectionRepository.findPlanningDirectionsByDossierConge(dossierConge.get()).stream()
					.map(PlanningDirection -> modelMapper.map(PlanningDirection, PlanningDirectionDTO.class))
					.collect(Collectors.toList());
		} else {
			throw new ResourceNotFoundException("PlanningDirection not found with id : " + idDossierConge);
		}
	}

	@Override
	public PlanningDirectionDTO getPlanningDirectionsByCodeDirectionAndDossierConge(String codeDirection,
			Long idDossierConge) {
		Optional<DossierConge> dossierConge = dossierCongeRepository.findById(idDossierConge);
		if (dossierConge.isPresent()) {
			Optional<PlanningDirection> planningDirection = planningDirectionRepository
					.findPlanningDirectionByCodeDirectionAndDossierConge(codeDirection, dossierConge.get());
			if (planningDirection.isPresent()) {
				return modelMapper.map(planningDirection.get(), PlanningDirectionDTO.class);
			} else {
				throw new ResourceNotFoundException("PlanningDirection not found with id : " + idDossierConge);
			}
		} else {
			throw new ResourceNotFoundException("PlanningDirection not found with id : " + idDossierConge);
		}
	}
}
