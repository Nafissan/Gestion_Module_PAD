package sn.pad.pe.pss.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.PlanningConge;
import sn.pad.pe.pss.bo.PlanningDirection;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.PlanningCongeDTO;
import sn.pad.pe.pss.repositories.PlanningCongeRepository;
import sn.pad.pe.pss.repositories.PlanningDirectionRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.PlanningCongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@Service
public class PlanningCongeServiceImpl implements PlanningCongeService {

	@Autowired
	private PlanningCongeRepository planningCongeRepository;
	@Autowired
	private PlanningDirectionRepository planningDirectionRepository;
	@Autowired
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<PlanningCongeDTO> getPlanningConges() {
		List<PlanningCongeDTO> planningCongeDTOs = planningCongeRepository.findAll().stream()
				.map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());
		return planningCongeDTOs;

	}

	@Override
	public List<PlanningCongeDTO> getPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(
			Long idPlanningDirection, Long idUniteOrganisationnelle) {

		Optional<PlanningDirection> planningDirection = planningDirectionRepository.findById(idPlanningDirection);
		Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
				.findById(idUniteOrganisationnelle);

		List<PlanningCongeDTO> planningCongeDTOs = planningCongeRepository
				.findPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(planningDirection.get(),
						uniteOrganisationnelle.get())
				.stream().map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());
		return planningCongeDTOs;

	}

	@Override
	public List<PlanningCongeDTO> getPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(
			Long idPlanningDirection, Long idUniteOrganisationnelle, String etat) {

		Optional<PlanningDirection> planningDirection = planningDirectionRepository.findById(idPlanningDirection);
		Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
				.findById(idUniteOrganisationnelle);

		List<PlanningCongeDTO> planningCongeDTOs = planningCongeRepository
				.findPlanningCongesByPlanningDirectionAndUniteOrganisationnelleAndEtat(planningDirection.get(),
						uniteOrganisationnelle.get(), etat)
				.stream().map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());
		return planningCongeDTOs;

	}

	@Override
	public PlanningCongeDTO getPlanningCongeById(Long id) {
		Optional<PlanningConge> planningConge = planningCongeRepository.findById(id);
		if (planningConge.isPresent()) {
			return modelMapper.map(planningConge.get(), PlanningCongeDTO.class);
		} else {
			throw new ResourceNotFoundException("PlanningConge not found with id : " + id);
		}
	}

	@Override
	public PlanningCongeDTO createPlanningConge(PlanningCongeDTO planningCongeDTO) {
		PlanningConge planningConge = modelMapper.map(planningCongeDTO, PlanningConge.class);
		return modelMapper.map(planningCongeRepository.save(planningConge), PlanningCongeDTO.class);
	}

	@Override
	public boolean updatePlanningConge(PlanningCongeDTO planningCongeDTO) {
		boolean isUpdated = false;
		PlanningConge planningConge = modelMapper.map(planningCongeDTO, PlanningConge.class);
		Optional<PlanningConge> planningCongeToUpdated = planningCongeRepository.findById(planningConge.getId());
		if (planningCongeToUpdated.isPresent()) {
			planningCongeRepository.save(planningConge);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean detelePlanningConge(PlanningCongeDTO planningCongeDTO) {
		boolean isDeleted = false;
		PlanningConge planningConge = modelMapper.map(planningCongeDTO, PlanningConge.class);
		Optional<PlanningConge> planningCongeToDeleted = planningCongeRepository.findById(planningConge.getId());
		if (planningCongeToDeleted.isPresent()) {
			planningCongeRepository.delete(planningConge);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<PlanningCongeDTO> getPlanningCongesByPlanningDirectionAndUniteOrganisationnelles(
			Long idPlanningDirection, List<Long> idUniteOrganisationnelles) {
		Optional<PlanningDirection> planningDirection = planningDirectionRepository.findById(idPlanningDirection);
		List<PlanningConge> planningConges = new ArrayList<PlanningConge>();

		for (Long idUniteOrganisationnelle : idUniteOrganisationnelles) {
			Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
					.findById(idUniteOrganisationnelle);

			List<PlanningConge> pls = planningCongeRepository
					.findPlanningCongesByPlanningDirectionAndUniteOrganisationnelle(planningDirection.get(),
							uniteOrganisationnelle.get());
			planningConges.addAll(pls);
		}
		List<PlanningCongeDTO> planningCongeDTOs = planningConges.stream()
				.map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());
		return planningCongeDTOs;
	}

	@Override
	public List<PlanningCongeDTO> getPlanningCongesByPlanningDirection(Long idPlanningDirection) {
		Optional<PlanningDirection> planningDirection = planningDirectionRepository.findById(idPlanningDirection);

		List<PlanningCongeDTO> planningCongeDTOs = planningCongeRepository
				.findPlanningCongesByPlanningDirection(planningDirection.get()).stream()
				.map(planningConge -> modelMapper.map(planningConge, PlanningCongeDTO.class))
				.collect(Collectors.toList());
		return planningCongeDTOs;
	}
}
