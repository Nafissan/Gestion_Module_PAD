package sn.pad.pe.pelerinage.services.impl;

import java.util.ArrayList;
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
import sn.pad.pe.pelerinage.services.TirageAgentService;

@Service
public class TirageAgentServiceImpl implements TirageAgentService {

    @Autowired
    private TirageAgentRepository tirageAgentRepository;

    @Autowired
    private ModelMapper modelMapper;
 @Autowired
    private DossierPelerinageService dossierPelerinageService;
    @Override
    public TirageAgentDTO saveTirageAgent(TirageAgentDTO tirageAgentDTO) {
        TirageAgent tirageAgent = modelMapper.map(tirageAgentDTO, TirageAgent.class);
        TirageAgent savedTirageAgent = tirageAgentRepository.save(tirageAgent);
        return modelMapper.map(savedTirageAgent, TirageAgentDTO.class);
    }

    @Override
    public List<TirageAgentDTO> getAllTirageAgents() {
        List<TirageAgent> tirageAgents = tirageAgentRepository.findAll();
        return tirageAgents.stream()
                .map(tirageAgent -> modelMapper.map(tirageAgent, TirageAgentDTO.class))
                .collect(Collectors.toList());
    }
    private static final Logger logger = LoggerFactory.getLogger(TirageAgentServiceImpl.class);

    @Override
    public List<TirageAgentDTO> getTirageAgentsByDossier(DossierPelerinage dossierPelerinage) {
        logger.info("Fetching Tirage Agents for DossierPelerinage: {}", dossierPelerinage);

        List<TirageAgent> tirageAgents = tirageAgentRepository.findByDossierPelerinage(dossierPelerinage);
        logger.info("Found {} Tirage Agents", tirageAgents.size());

        List<TirageAgentDTO> tirageAgentDTOs = tirageAgents.stream()
                .map(tirageAgent -> modelMapper.map(tirageAgent, TirageAgentDTO.class))
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
        TirageAgent tirageAgent = modelMapper.map(tirageAgentDTO, TirageAgent.class);
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
}