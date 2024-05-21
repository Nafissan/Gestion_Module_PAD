package sn.pad.pe.pss.services.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Conge;
import sn.pad.pe.pss.bo.DossierConge;
import sn.pad.pe.pss.bo.PlanningConge;
import sn.pad.pe.pss.bo.PlanningDirection;
import sn.pad.pe.pss.dto.CongeDTO;
import sn.pad.pe.pss.dto.PlanningCongeDTO;
import sn.pad.pe.pss.repositories.AgentRepository;
import sn.pad.pe.pss.repositories.CongeRepository;
import sn.pad.pe.pss.repositories.DossierCongeRepository;
import sn.pad.pe.pss.repositories.PlanningCongeRepository;
import sn.pad.pe.pss.repositories.PlanningDirectionRepository;
import sn.pad.pe.pss.services.CongeService;
import sn.pad.pe.pss.services.PlanningCongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@Service
public class CongeServiceImpl implements CongeService {

	@Autowired
	private CongeRepository congeRepository;
	@Autowired
	private PlanningCongeRepository planningCongeRepository;
	@Autowired
	private PlanningDirectionRepository planningDirectionRepository;
	@Autowired
	private PlanningCongeService planningCongeService;
	@Autowired
	private AgentRepository agentRepository;
	@Autowired
	private DossierCongeRepository dossierCongeRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<CongeDTO> getConges() {
		List<CongeDTO> congeDTOs = congeRepository.findAll().stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		return congeDTOs;
	}

	@Override
	public List<CongeDTO> getCongesByPlanningCongeAndEtat(Long idPlanningCongeDTO, String etat) {
		Optional<PlanningConge> planningCongeOptional = planningCongeRepository.findById(idPlanningCongeDTO);
		List<CongeDTO> congeDTOs = congeRepository.findCongesByPlanningCongeAndEtat(planningCongeOptional.get(), etat)
				.stream().map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		return congeDTOs;
	}

	@Override
	public List<CongeDTO> getCongeByAgent(Long idAgent) {
		Optional<Agent> agent = agentRepository.findById(idAgent);
		List<CongeDTO> congeDTOs = congeRepository.findCongesByAgent(agent.get()).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		return congeDTOs;
	}

	@Override
	public List<CongeDTO> getCongesByPlanningConge(Long idPlanningCongeDTO) {
		Optional<PlanningConge> planningCongeOptional = planningCongeRepository.findById(idPlanningCongeDTO);
		List<CongeDTO> congeDTOs = congeRepository.findCongesByPlanningConge(planningCongeOptional.get()).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		return congeDTOs;
	}

	@Override
	public List<CongeDTO> getCongesByDateBetween(Date dateDepart, Date dateRetourEffectif) {
		List<CongeDTO> congeDTOs = congeRepository
				.findCongesByDateDepartAfterAndDateRetourEffectifBefore(dateDepart, dateRetourEffectif).stream()
				.map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		return congeDTOs;
	}

	@Override
	public CongeDTO getCongeById(Long id) {
		Optional<Conge> conge = congeRepository.findById(id);
		if (conge.isPresent()) {
			return modelMapper.map(conge.get(), CongeDTO.class);
		} else {
			throw new ResourceNotFoundException("Conge not found with id : " + id);
		}
	}

	@Override
	public CongeDTO getCongeByCodeDecision(String codeDecision) {
		Optional<Conge> conge = congeRepository.findCongeByCodeDecision(codeDecision);
		if (conge.isPresent()) {
			return modelMapper.map(conge.get(), CongeDTO.class);
		} else {
			throw new ResourceNotFoundException("Conge not found with CodeDecision : " + codeDecision);
		}
	}

	@Override
	public CongeDTO createConge(CongeDTO congeDTO) {
		List<Conge> conges = getCongeByAgent(congeDTO.getAgent().getId()).stream()
				.map(conge -> modelMapper.map(conge, Conge.class))
				.filter(conge -> conge.getAnnee().equals(congeDTO.getAnnee())).collect(Collectors.toList());
		if (conges.size() < 2) {
			Conge conge = modelMapper.map(congeDTO, Conge.class);
			Conge congeSaved = congeRepository.save(conge);
			return modelMapper.map(congeSaved, CongeDTO.class);
		} else {
			return modelMapper.map(congeDTO, CongeDTO.class);
		}
	}

	@Override
	public boolean updateConge(CongeDTO congeDTO) {
		Conge conge = modelMapper.map(congeDTO, Conge.class);
		boolean isUpdated = false;
		Optional<Conge> congeToUpdated = congeRepository.findById(conge.getId());
		if (congeToUpdated.isPresent()) {
			congeRepository.save(conge);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean deteleConge(CongeDTO congeDTO) {
		Conge conge = modelMapper.map(congeDTO, Conge.class);
		boolean isDeleted = false;
		Optional<Conge> congeToDeleted = congeRepository.findById(conge.getId());
		if (congeToDeleted.isPresent()) {
			congeRepository.delete(conge);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public boolean updateCongeMany(List<CongeDTO> congeDTOs) {
		boolean isUpdated = false;
		if (!congeDTOs.isEmpty()) {
			List<Conge> congesToSaved = congeDTOs.stream().map(conge -> modelMapper.map(conge, Conge.class))
					.collect(Collectors.toList());
			congeRepository.saveAll(congesToSaved);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public List<CongeDTO> createAllConge(List<CongeDTO> congeDTOs) {
		List<Conge> conges = congeDTOs.stream().map(c -> modelMapper.map(c, Conge.class)).collect(Collectors.toList());

		List<Conge> congesSaved = congeRepository.saveAll(conges);

		List<CongeDTO> congesSavedMapped = congesSaved.stream().map(conge -> modelMapper.map(conge, CongeDTO.class))
				.collect(Collectors.toList());

		return congesSavedMapped;
	}

	@Override
	public List<CongeDTO> getCongeByDossierConge(Long idDossierConge) {
		DossierConge dossierConge = modelMapper.map(dossierCongeRepository.getOne(idDossierConge), DossierConge.class);
		List<PlanningDirection> ListPlanningDirection = planningDirectionRepository
				.findPlanningDirectionsByDossierConge(dossierConge);
		List<PlanningCongeDTO> listPlanningCongesTotalDTO = new ArrayList<PlanningCongeDTO>();
		for (PlanningDirection pl : ListPlanningDirection) {
			List<PlanningCongeDTO> listPlanningConge = planningCongeService
					.getPlanningCongesByPlanningDirection(pl.getId());
			listPlanningCongesTotalDTO.addAll(listPlanningConge);
		}
		List<Conge> listCongesTotal = new ArrayList<Conge>();
		for (PlanningCongeDTO planningDTO : listPlanningCongesTotalDTO) {
			List<Conge> listConges = congeRepository
					.findCongesByPlanningConge(modelMapper.map(planningDTO, PlanningConge.class)).stream()
					.collect(Collectors.toList());
			listCongesTotal.addAll(listConges);
		}
		return listCongesTotal.stream().map(cg -> modelMapper.map(cg, CongeDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<CongeDTO> getAllCongeByAnne(int annee) {
		List<CongeDTO> congeDto = congeRepository.findCongesByAnnee(annee).stream()
				.map(cg -> modelMapper.map(cg, CongeDTO.class)).collect(Collectors.toList());
		if (congeDto.size() != 0) {
			return congeDto;
		} else {
			throw new ResourceNotFoundException("Conge not found with année : " + annee);
		}
	}

	@Override
	public List<CongeDTO> getCongesByPlanningCongeAndAnnee(Long idPlanningCongeDTO, String annee) {
		Optional<PlanningConge> planningCongeOptional = planningCongeRepository.findById(idPlanningCongeDTO);
		List<CongeDTO> congeDTOs = congeRepository.findCongesByPlanningCongeAndAnnee(planningCongeOptional.get(), annee)
				.stream().map(conge -> modelMapper.map(conge, CongeDTO.class)).collect(Collectors.toList());
		return congeDTOs;
	}

}
