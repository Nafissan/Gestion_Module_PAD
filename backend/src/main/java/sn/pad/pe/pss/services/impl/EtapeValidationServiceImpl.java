package sn.pad.pe.pss.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.EtapeValidation;
import sn.pad.pe.pss.bo.ProcessusValidation;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.EtapeValidationDTO;
import sn.pad.pe.pss.dto.ProcessusValidationDTO;
import sn.pad.pe.pss.repositories.AgentRepository;
import sn.pad.pe.pss.repositories.EtapeValidationRepository;
import sn.pad.pe.pss.repositories.ProcessusValidationRepository;
import sn.pad.pe.pss.services.EtapeValidationService;

@Service
public class EtapeValidationServiceImpl implements EtapeValidationService {

	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private EtapeValidationRepository etapeValidationRepository;
	@Autowired
	private AgentRepository agentRepository;
	@Autowired
	private ProcessusValidationRepository processusValidationRepository;

	@Override
	public List<EtapeValidationDTO> getEtapeValidations() {
		List<EtapeValidationDTO> etapeValidationDTOs = etapeValidationRepository.findAll().stream()
				.map(etapeValidation -> modelMapper.map(etapeValidation, EtapeValidationDTO.class))
				.collect(Collectors.toList());
		return etapeValidationDTOs;
	}

	@Override
	public EtapeValidationDTO getEtapeValidation(Long id) {
		Optional<EtapeValidation> etapeValidationOptional = etapeValidationRepository.findById(id);
		if (etapeValidationOptional.isPresent()) {
			return modelMapper.map(etapeValidationOptional.get(), EtapeValidationDTO.class);
		} else {
			throw new ResourceNotFoundException("EtapeValidation not found with id : " + id);
		}
	}

	@Override
	public EtapeValidationDTO getEtapeValidationByNumeroOrdre(int numeroOrdre) {
		Optional<EtapeValidation> etapeValidationOptional = etapeValidationRepository
				.findEtapeValidationByNumeroOrdre(numeroOrdre);
		if (etapeValidationOptional.isPresent()) {
			return modelMapper.map(etapeValidationOptional.get(), EtapeValidationDTO.class);
		} else {
			throw new ResourceNotFoundException("EtapeValidation not found with numeroOrdre : " + numeroOrdre);
		}
	}

	@Override
	public EtapeValidationDTO getEtapeValidationByAction(String action) {
		Optional<EtapeValidation> etapeValidationOptional = etapeValidationRepository
				.findEtapeValidationByAction(action);
		if (etapeValidationOptional.isPresent()) {
			return modelMapper.map(etapeValidationOptional.get(), EtapeValidationDTO.class);
		} else {
			throw new ResourceNotFoundException("EtapeValidation not found with action : " + action);
		}
	}

	@Override
	public EtapeValidationDTO create(EtapeValidationDTO etapeValidationDTO) {

		ProcessusValidationDTO processusValidationToLink = etapeValidationDTO.getProcessusValidation();
		Optional<ProcessusValidation> processusValidationOptional = processusValidationRepository
				.findById(processusValidationToLink.getId());

		if (!processusValidationOptional.isPresent()) {
			throw new ResourceNotFoundException("EtapeValidation not created with processusValidation empty : ");
		}

		Set<AgentDTO> agents = etapeValidationDTO.getAgents();
		Set<AgentDTO> agentsTolink = new HashSet<AgentDTO>();

		if (agents.isEmpty()) {

			throw new ResourceNotFoundException("EtapeValidation not created with list agent empty : ");

		} else {
			for (AgentDTO agent : agents) {

				Optional<Agent> agentOptional = agentRepository.findById(agent.getId());

				if (agentOptional.isPresent()) {

					AgentDTO agentTraitant = modelMapper.map(agentOptional.get(), AgentDTO.class);
					agentsTolink.add(agentTraitant);

				} else {

					throw new ResourceNotFoundException("Agent not found with id: " + agent.getId());

				}
			}
		}
		etapeValidationDTO.setAgents(agentsTolink);

		ProcessusValidationDTO processusValidationLinked = modelMapper.map(processusValidationOptional.get(),
				ProcessusValidationDTO.class);
		etapeValidationDTO.setProcessusValidation(processusValidationLinked);
		System.out.print("--------------------------------------------");
		System.out.print(etapeValidationDTO.toString());
		EtapeValidation etapeValidationSaved = modelMapper.map(etapeValidationDTO, EtapeValidation.class);
		return modelMapper.map(etapeValidationRepository.save(etapeValidationSaved), EtapeValidationDTO.class);

	}

	@Override
	public boolean update(EtapeValidationDTO etapeValidationDTO) {
		Optional<EtapeValidation> etapeValidationnToUpdate = etapeValidationRepository
				.findById(etapeValidationDTO.getId());
		boolean isUpdated = false;
		if (etapeValidationnToUpdate.isPresent()) {
			etapeValidationRepository.save(modelMapper.map(etapeValidationDTO, EtapeValidation.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(EtapeValidationDTO etapeValidationDTO) {
		Optional<EtapeValidation> etapeValidationToDelete = etapeValidationRepository
				.findById(etapeValidationDTO.getId());
		boolean isDeleleted = false;
		if (etapeValidationToDelete.isPresent()) {
			EtapeValidation etapeValidationDeleted = etapeValidationToDelete.get();
			etapeValidationRepository.delete(etapeValidationDeleted);
			isDeleleted = true;
		}
		return isDeleleted;
	}

}
