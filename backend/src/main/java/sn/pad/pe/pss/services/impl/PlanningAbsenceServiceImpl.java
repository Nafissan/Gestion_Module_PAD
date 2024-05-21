package sn.pad.pe.pss.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.DossierAbsence;
import sn.pad.pe.pss.bo.PlanningAbsence;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.repositories.DossierAbsenceRepository;
import sn.pad.pe.pss.repositories.PlanningAbsenceRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.PlanningAbsenceService;

/**
 * 
 * @author abdou.diop
 *
 */
@Service
public class PlanningAbsenceServiceImpl implements PlanningAbsenceService {

	@Autowired
	private PlanningAbsenceRepository planningAbsenceRepository;

	@Autowired
	private DossierAbsenceRepository dossierAbsenceRepository;

	@Autowired
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<PlanningAbsenceDTO> getPlanningAbsences() {
		List<PlanningAbsenceDTO> planningAbsenceDTOs = planningAbsenceRepository.findAll().stream()
				.map(planningAbsence -> modelMapper.map(planningAbsence, PlanningAbsenceDTO.class))
				.collect(Collectors.toList());
		return planningAbsenceDTOs;
	}

	@Override
	public PlanningAbsenceDTO getPlanningAbsenceById(Long id) {
		Optional<PlanningAbsence> planningAbsence = planningAbsenceRepository.findById(id);
		if (planningAbsence.isPresent()) {
			return modelMapper.map(planningAbsence.get(), PlanningAbsenceDTO.class);
		} else {
			throw new ResourceNotFoundException("PlanningConge not found with id : " + id);
		}
	}

	@Override
	public List<PlanningAbsenceDTO> getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(Long idDossierAbsence,
			Long idUniteOrganisationnelle) {

		Optional<DossierAbsence> dossierAbsenceDTO = dossierAbsenceRepository.findDossierAbsenceById(idDossierAbsence);
		Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
				.findById(idUniteOrganisationnelle);

		List<PlanningAbsenceDTO> planningAbsenceDTOs = planningAbsenceRepository
				.findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(dossierAbsenceDTO.get(),
						uniteOrganisationnelle.get())
				.stream().map(planningAbsence -> modelMapper.map(planningAbsence, PlanningAbsenceDTO.class))
				.collect(Collectors.toList());
		return planningAbsenceDTOs;

	}

	@Override
	public List<PlanningAbsenceDTO> getPlanningAbsencesByDossierAbsence(Long idDossierAbsence) {
		Optional<DossierAbsence> dossierAbsence = dossierAbsenceRepository.findById(idDossierAbsence);
		List<PlanningAbsenceDTO> planningAbsenceDTOs = planningAbsenceRepository
				.findPlanningAbsenceesByDossierAbsence(dossierAbsence.get()).stream()
				.map(planningAbsence -> modelMapper.map(planningAbsence, PlanningAbsenceDTO.class))
				.collect(Collectors.toList());
		return planningAbsenceDTOs;
	}

	@Override
	public List<PlanningAbsenceDTO> getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelles(Long idDossierAbsence,
			List<Long> idUniteOrganisationnelles) {

		Optional<DossierAbsence> dossierAbsenceDTO = dossierAbsenceRepository.findDossierAbsenceById(idDossierAbsence);
		List<PlanningAbsence> planningAbsences = new ArrayList<PlanningAbsence>();

		for (Long idUniteOrganisationnelle : idUniteOrganisationnelles) {
			Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
					.findById(idUniteOrganisationnelle);

			List<PlanningAbsence> pls = planningAbsenceRepository
					.findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelle(dossierAbsenceDTO.get(),
							uniteOrganisationnelle.get());
			planningAbsences.addAll(pls);
		}
		List<PlanningAbsenceDTO> planningAbsenceDTOs = planningAbsences.stream()
				.map(planningAbsence -> modelMapper.map(planningAbsence, PlanningAbsenceDTO.class))
				.collect(Collectors.toList());
		return planningAbsenceDTOs;
	}

	@Override
	public List<PlanningAbsenceDTO> getPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(
			Long idDossierAbsence, Long idUniteOrganisationnelle, String etat) {
		Optional<DossierAbsence> dossierAbsence = dossierAbsenceRepository.findDossierAbsenceById(idDossierAbsence);
		Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
				.findById(idUniteOrganisationnelle);

		List<PlanningAbsenceDTO> planningAbsenceDTOs = planningAbsenceRepository
				.findPlanningAbsencesByDossierAbsenceAndUniteOrganisationnelleAndEtat(dossierAbsence.get(),
						uniteOrganisationnelle.get(), etat)
				.stream().map(planningAbsence -> modelMapper.map(planningAbsence, PlanningAbsenceDTO.class))
				.collect(Collectors.toList());
		return planningAbsenceDTOs;
	}

	@Override
	public PlanningAbsenceDTO createPlanningAbsence(PlanningAbsenceDTO planningAbsenceDTO) {
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDTO, PlanningAbsence.class);
		return modelMapper.map(planningAbsenceRepository.save(planningAbsence), PlanningAbsenceDTO.class);
	}

	@Override
	public boolean updatePlanningAbsence(PlanningAbsenceDTO planningAbsenceDTO) {
		Optional<PlanningAbsence> planningAbsenceToUpdated = planningAbsenceRepository
				.findById(planningAbsenceDTO.getId());
		boolean isUpdated = false;
		if (planningAbsenceToUpdated.isPresent()) {
			PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDTO, PlanningAbsence.class);
			planningAbsenceRepository.save(planningAbsence);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean detelePlanningAbsence(PlanningAbsenceDTO planningAbsenceDTO) {
		boolean isDeleted = false;
		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDTO, PlanningAbsence.class);
		Optional<PlanningAbsence> planningAbsenceToDeleted = planningAbsenceRepository
				.findPlanningAbsenceById(planningAbsence.getId());
		if (planningAbsenceToDeleted.isPresent()) {
			planningAbsenceRepository.delete(planningAbsence);
			isDeleted = true;
		}
		return isDeleted;
	}

}
