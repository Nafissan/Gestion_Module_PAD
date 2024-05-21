package sn.pad.pe.pss.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Absence;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.DossierAbsence;
import sn.pad.pe.pss.bo.PlanningAbsence;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AbsenceDTO;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.PlanningAbsenceDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.AbsenceRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.AbsenceService;
import sn.pad.pe.pss.services.DossierAbsenceService;
import sn.pad.pe.pss.services.PlanningAbsenceService;

/**
 * 
 * @author abdou.diop
 *
 */
@Service
public class AbsenceServiceImpl implements AbsenceService {

	@Autowired
	private AbsenceRepository absenceRepository;
	@Autowired
	private DossierAbsenceService dossierAbsenceService;
	@Autowired
	private PlanningAbsenceService planningAbsenceService;
	@Autowired
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<AbsenceDTO> getAbsence() {
		List<AbsenceDTO> absenceDTOs = absenceRepository.findAll().stream()
				.map(absence -> modelMapper.map(absence, AbsenceDTO.class)).collect(Collectors.toList());
		return absenceDTOs;
	}

	@Override
	public AbsenceDTO getAbsenceById(Long id) {
		Optional<Absence> absence = absenceRepository.findById(id);
		if (absence.isPresent()) {
			return modelMapper.map(absence.get(), AbsenceDTO.class);
		} else {
			throw new ResourceNotFoundException("Absence not found with id : " + id);
		}
	}

	@Override
	public AbsenceDTO createAbsence(AbsenceDTO absenceDTO) {
		Absence absenceSave = null;

//		if(planningAbsenceDto == null) {
//			planningAbsenceDto = new PlanningAbsenceDTO();
//			planningAbsenceDto.setAnnee(new Date().getYear());
//			planningAbsenceDto.setCode("PA_"+absenceDTO.getUniteOrganisationnelle().getCode()+ new Date().getYear() );
//			planningAbsenceDto = planningAbsenceService.createPlanningAbsence(planningAbsenceDto);
//		}	
		absenceSave = modelMapper.map(absenceDTO, Absence.class);
		// PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDto,
		// PlanningAbsence.class);
		// absenceSave.setPlanningAbsence(planningAbsence);
		absenceSave = modelMapper.map(absenceDTO, Absence.class);
		return modelMapper.map(absenceRepository.save(absenceSave), AbsenceDTO.class);
	}

	@Override
	public boolean updateAbsence(AbsenceDTO absenceDTO) {
		Optional<Absence> absenceUpdate = absenceRepository.findById(absenceDTO.getId());
		boolean isUpdated = false;
		if (absenceUpdate.isPresent()) {
			Absence absence = modelMapper.map(absenceDTO, Absence.class);
			absenceRepository.save(absence);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean deleteAbsence(AbsenceDTO absenceDTO) {
		Optional<Absence> absenceDelete = absenceRepository.findById(absenceDTO.getId());
		boolean isDeleted = false;
		if (absenceDelete.isPresent()) {
			Absence absence = modelMapper.map(absenceDTO, Absence.class);
			absenceRepository.delete(absence);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<AbsenceDTO> findAbsencesByAgent(AgentDTO agentDTO) {
		Agent agent = modelMapper.map(agentDTO, Agent.class);
		List<AbsenceDTO> absenceDTOList = absenceRepository.findAbsencesByAgent(agent).stream()
				.map(absence -> modelMapper.map(absence, AbsenceDTO.class)).collect(Collectors.toList());
		return absenceDTOList;
	}

	@Override
	public List<AbsenceDTO> getAbsencesByUniteOrganisationnelles(UniteOrganisationnelleDTO organisationnelleDTO) {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		List<AbsenceDTO> absenceDTOList = absenceRepository.findAbsencesByUniteOrganisationnelle(uniteOrganisationnelle)
				.stream().map(absence -> modelMapper.map(absence, AbsenceDTO.class)).collect(Collectors.toList());
		return absenceDTOList;

	}

	@Override
	public List<AbsenceDTO> getAbsencesByUniteOrganisationnellesPLus(Long idOrganisationnelleDTO) {

		Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
				.findById(idOrganisationnelleDTO);

		List<AbsenceDTO> absencesDTO = absenceRepository
				.findAbsencesByUniteOrganisationnelle(uniteOrganisationnelle.get()).stream()
				.map(absence -> modelMapper.map(absence, AbsenceDTO.class)).collect(Collectors.toList());
		return absencesDTO;
	}

	@Override
	public List<AbsenceDTO> getAbsencesByUniteOrganisationnelless(List<Long> idUniteOrganisationnelles) {

		List<Absence> absences = new ArrayList<Absence>();

		for (Long idUniteOrganisationnelle : idUniteOrganisationnelles) {
			Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
					.findById(idUniteOrganisationnelle);

			List<Absence> abs = absenceRepository.findAbsencesByUniteOrganisationnelle(uniteOrganisationnelle.get());

			absences.addAll(abs);
		}
		List<AbsenceDTO> absenceDTOs = absences.stream().map(absence -> modelMapper.map(absence, AbsenceDTO.class))
				.collect(Collectors.toList());

		return absenceDTOs;
	}

	@Override
	public List<AbsenceDTO> findAbsencesByPlanningAbsence(PlanningAbsenceDTO planningAbsenceDTO) {

		PlanningAbsence planningAbsence = modelMapper.map(planningAbsenceDTO, PlanningAbsence.class);
		List<AbsenceDTO> absenceDTOList = absenceRepository.findAbsencesByPlanningAbsence(planningAbsence).stream()
				.map(absence -> modelMapper.map(absence, AbsenceDTO.class)).collect(Collectors.toList());
		return absenceDTOList;

	}

	@Override
	public List<AbsenceDTO> getAbsenceByDossierAbsence(Long idDossierAbsence) {
		DossierAbsence dossierAbsence = modelMapper.map(dossierAbsenceService.getDossierAbsenceById(idDossierAbsence),
				DossierAbsence.class);
		List<PlanningAbsenceDTO> planningAbsenceDTO = planningAbsenceService
				.getPlanningAbsencesByDossierAbsence(dossierAbsence.getId());
		List<Absence> listAbsence = new ArrayList<>();
		for (PlanningAbsenceDTO planningDTO : planningAbsenceDTO) {
			PlanningAbsence planningAbsence = modelMapper.map(planningDTO, PlanningAbsence.class);
			List<Absence> listAb = absenceRepository.findAbsencesByPlanningAbsence(planningAbsence).stream()
					.collect(Collectors.toList());
			listAbsence.addAll(listAb);
		}
		return listAbsence.stream().map(abs -> modelMapper.map(abs, AbsenceDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<AbsenceDTO> getAllAbsencesByAnne(int annee) {
		List<AbsenceDTO> absenceDto = absenceRepository.findAbsencesByAnnee(annee).stream()
				.map(ab -> modelMapper.map(ab, AbsenceDTO.class)).collect(Collectors.toList());
		if (absenceDto.size() != 0) {
			return absenceDto;
		} else {
			throw new ResourceNotFoundException("Absence not found with année : " + annee);
		}
	}

	@Override
	public List<AbsenceDTO> getAbsencesByUniteOrganisationnellesAndAnnee(UniteOrganisationnelleDTO organisationnelleDTO,
			int annee) {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		List<AbsenceDTO> absenceDTOList = absenceRepository
				.findAbsencesByUniteOrganisationnelleAndAnnee(uniteOrganisationnelle, annee).stream()
				.map(ab -> modelMapper.map(ab, AbsenceDTO.class)).collect(Collectors.toList());
		return absenceDTOList;
	}

	@Override
	public List<AbsenceDTO> getAbsencesByAnneeAndMois(int annee, String mois) {

		List<Absence> absenceDTOs = absenceRepository.findAbsencesByAnneeAndMois(annee, mois);

		return absenceDTOs.stream().map(absence -> modelMapper.map(absence, AbsenceDTO.class))
				.collect(Collectors.toList());
	}

//	@Override
//	public List<AbsenceDTO> getAbsencesByUniteOrganisationnellesAndAnneeAndMois(
//			UniteOrganisationnelleDTO organisationnelleDTO, int annee, String mois) {
//		
//		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
//				UniteOrganisationnelle.class);
//		List<AbsenceDTO> absenceDTOList = absenceRepository
//				.findAbsencesByUniteOrganisationnelleAndAnneeAndMois(uniteOrganisationnelle, annee, mois).stream()
//				.map(ab -> modelMapper.map(ab, AbsenceDTO.class)).collect(Collectors.toList());
//		return absenceDTOList;
//	}

	@Override
	public List<AbsenceDTO> getAbsencesByUniteOrganisationnellesAndAnneeAndMois(List<Long> idUniteOrganisationnelles,
			int annee, String mois) {

		List<Absence> absences = new ArrayList<Absence>();

		for (Long idUniteOrganisationnelle : idUniteOrganisationnelles) {
			Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
					.findById(idUniteOrganisationnelle);

			List<Absence> abs = absenceRepository
					.findAbsencesByUniteOrganisationnelleAndAnneeAndMois(uniteOrganisationnelle.get(), annee, mois);

			absences.addAll(abs);
		}
		List<AbsenceDTO> absenceDTOs = absences.stream().map(absence -> modelMapper.map(absence, AbsenceDTO.class))
				.collect(Collectors.toList());

		return absenceDTOs;

	}

}