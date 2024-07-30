package sn.pad.pe.pelerinage.services.impl;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.bo.TirageAgent;
import sn.pad.pe.pelerinage.dto.DossierPelerinageDTO;
import sn.pad.pe.pelerinage.dto.TirageAgentDTO;
import sn.pad.pe.pelerinage.repositories.TirageAgentRepository;
import sn.pad.pe.pelerinage.services.DossierPelerinageService;
import sn.pad.pe.pelerinage.services.PelerinService;
import sn.pad.pe.pelerinage.services.TirageAgentService;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.services.AgentService;

@Service
public class TirageAgentServiceImpl implements TirageAgentService {

    @Autowired
    private TirageAgentRepository tirageAgentRepository;
 @Autowired
    private AgentService agentService;
    @Autowired
    private ModelMapper modelMapper;
 @Autowired
    private DossierPelerinageService dossierPelerinageService;
    @Autowired
    private PelerinService pelerinService;
    @Override
    public TirageAgentDTO saveTirageAgent(TirageAgentDTO tirageAgentDTO) {
        TirageAgent tirageAgent = mapToBo(tirageAgentDTO);
        TirageAgent savedTirageAgent = tirageAgentRepository.save(tirageAgent);
        return mapToDto(savedTirageAgent);
    }
    private TirageAgent mapToBo(TirageAgentDTO tirageAgentDTO){
        TirageAgent tirageAgent = modelMapper.map(tirageAgentDTO, TirageAgent.class);
        return tirageAgent;
    }
    private TirageAgentDTO mapToDto(TirageAgent tirageAgent){
        TirageAgentDTO agentDTO = modelMapper.map(tirageAgent, TirageAgentDTO.class);
        return agentDTO;
    }
    @Override
    public List<TirageAgentDTO> getAllTirageAgents() {
        List<TirageAgent> tirageAgents = tirageAgentRepository.findAll();
        return tirageAgents.stream()
                .map(tirageAgent -> mapToDto(tirageAgent))
                .collect(Collectors.toList());
    }
    private static final Logger logger = LoggerFactory.getLogger(TirageAgentServiceImpl.class);

    @Override
    public List<TirageAgentDTO> getTirageAgentsByDossier(DossierPelerinage dossierPelerinage) {
        logger.info("Fetching Tirage Agents for DossierPelerinage: {}", dossierPelerinage);

        List<TirageAgent> tirageAgents = tirageAgentRepository.findByDossierPelerinage(dossierPelerinage);
        logger.info("Found {} Tirage Agents", tirageAgents.size());

        List<TirageAgentDTO> tirageAgentDTOs = tirageAgents.stream()
                .map(tirageAgent -> mapToDto(tirageAgent))
                .collect(Collectors.toList());

        logger.info("Mapped {} Tirage Agents to DTOs", tirageAgentDTOs.size());
        return tirageAgentDTOs;
    }

    @Override
    public List<TirageAgentDTO> getTirageAgentsByDossierEtat() {
        logger.info("Fetching DossierPelerinage by Etat");

        DossierPelerinageDTO dossierPelerinage = dossierPelerinageService.getDossierPelerinageByEtat();
        if (dossierPelerinage == null) {
            logger.warn("No DossierPelerinage found for Etat");
            return new ArrayList<>();
        }

        logger.info("DossierPelerinage found: {}", dossierPelerinage);
        return getTirageAgentsByDossier(modelMapper.map(dossierPelerinage, DossierPelerinage.class));
    }
    @Override
    public boolean deleteTirageAgent(TirageAgentDTO tirageAgentDTO) {
        TirageAgent tirageAgent =mapToBo(tirageAgentDTO);
        if (tirageAgentRepository.existsById(tirageAgent.getId())) {
            tirageAgentRepository.delete(tirageAgent);
            return true;
        }
        return false;
    }

    @Override
    public void deleteAllTirageAgents() {
        tirageAgentRepository.deleteAll();
    }

    @Override
    public boolean assignedAgent(AgentDTO agentDTO) {
        DossierPelerinageDTO dossierPelerinage = dossierPelerinageService.getDossierPelerinageByEtat();
        if (dossierPelerinage == null) {
            logger.warn("No DossierPelerinage found for Etat");
            throw new IllegalArgumentException("No DossierPelerinage found for Etat");
        }
    
        String lieu = dossierPelerinage.getLieuPelerinage();
        Date currentDate = new Date();
    
        List<AgentDTO> eligibleAgents = agentService.getAgents().stream()
            .filter(agent -> "CDI".equalsIgnoreCase(agent.getTypeContrat())) // Vérification du type de contrat
            .filter(agent -> calculateAge(agent.getDateNaissance(), currentDate) >= 40)
            .filter(agent -> calculateSeniority(agent.getDatePriseService(), currentDate) >= 10)
            .filter(agent -> {
                if ("Mecque".equalsIgnoreCase(lieu)) {
                    return "Musulman".equalsIgnoreCase(agent.getReligion());
                } else {
                    return "Chretien".equalsIgnoreCase(agent.getReligion());
                }
            })
            .filter(agent -> !pelerinService.existsByAgentId(agent.getId())) 
            .collect(Collectors.toList());
    
        if (eligibleAgents.isEmpty()) {
            logger.warn("No eligible agents found");
            return false;
        }
    
        eligibleAgents.forEach(eligibleAgent -> {
            TirageAgentDTO tirageAgent = new TirageAgentDTO();
            tirageAgent.setAgent(modelMapper.map(eligibleAgent, Agent.class));
            tirageAgent.setDossierPelerinage(modelMapper.map(dossierPelerinage, DossierPelerinage.class));
            tirageAgent.setMatriculeAgent(agentDTO.getMatricule());
            tirageAgent.setNomAgent(agentDTO.getNom());
            tirageAgent.setPrenomAgent(agentDTO.getPrenom());
    
            saveTirageAgent(tirageAgent);
        });
        return true;
    }
    
    
    private int calculateAge(Date birthDate, Date currentDate) {
        if (birthDate == null || currentDate == null) {
            return 0;
        }
        LocalDate birthLocalDate = birthDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate currentLocalDate = currentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return Period.between(birthLocalDate, currentLocalDate).getYears();
    }
    
    private int calculateSeniority(Date engagementDate, Date currentDate) {
        if (engagementDate == null || currentDate == null) {
            return 0;
        }
        LocalDate engagementLocalDate = engagementDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate currentLocalDate = currentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return Period.between(engagementLocalDate, currentLocalDate).getYears();
    }
    
}