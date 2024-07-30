package sn.pad.pe.pelerinage.services.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.bo.Pelerin;
import sn.pad.pe.pelerinage.bo.Substitut;
import sn.pad.pe.pelerinage.dto.DossierPelerinageDTO;
import sn.pad.pe.pelerinage.dto.PelerinDTO;
import sn.pad.pe.pelerinage.dto.SubstitutDTO;
import sn.pad.pe.pelerinage.dto.TirageAgentDTO;
import sn.pad.pe.pelerinage.repositories.SubstitutRepository;
import sn.pad.pe.pelerinage.services.DossierPelerinageService;
import sn.pad.pe.pelerinage.services.PelerinService;
import sn.pad.pe.pelerinage.services.SubstitutService;
import sn.pad.pe.pelerinage.services.TirageAgentService;
import sn.pad.pe.pss.dto.AgentDTO;

@Service
public class SubstitutServiceImpl implements SubstitutService {

    @Autowired
    private SubstitutRepository substitutRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private DossierPelerinageService dossierPelerinageService;
    @Autowired
    private TirageAgentService tirageAgentService;
    @Autowired
    private PelerinService pelerinService;
    private static final Logger logger = LoggerFactory.getLogger(SubstitutServiceImpl.class);

    @Override
    public SubstitutDTO saveSubstitut(SubstitutDTO substitutDTO) {
        Substitut substitut = modelMapper.map(substitutDTO, Substitut.class);
        Substitut savedSubstitut = substitutRepository.save(substitut);
        return modelMapper.map(savedSubstitut, SubstitutDTO.class);
    }

    @Override
    public List<SubstitutDTO> getAllSubstituts() {
        List<Substitut> substituts = substitutRepository.findAll();
        if (substituts == null || substituts.isEmpty()) {
            logger.info("No substituts found in the database.");
            return new ArrayList<>();
        }
        return substituts.stream()
                .map(substitut -> modelMapper.map(substitut, SubstitutDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<SubstitutDTO> getSubstitutsByDossier(DossierPelerinage dossierPelerinageId) {
        List<Substitut> substituts = substitutRepository.findByDossierPelerinage(dossierPelerinageId);
        return substituts.stream()
                .map(substitut -> modelMapper.map(substitut, SubstitutDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<SubstitutDTO> getSubstitutsByDossierEtat() {
        DossierPelerinageDTO dossierPelerinage = dossierPelerinageService.getDossierPelerinageByEtat();
        if (dossierPelerinage != null) {
            return getSubstitutsByDossier(modelMapper.map(dossierPelerinage, DossierPelerinage.class));
        }
        return new ArrayList<>();
    }

    @Override
    public boolean deleteSubstitut(SubstitutDTO substitutDTO) {
        Optional<Substitut> substitut = substitutRepository.findById(substitutDTO.getId());
        if (substitut.isPresent()) {
            substitutRepository.delete(substitut.get());
            return true;
        }
        return false;
    }

    @Override
    public void deleteAllSubstituts() {
        try {
            substitutRepository.deleteAll();
            logger.info("All substituts have been successfully deleted.");
        } catch (Exception e) {
            logger.error("Error while deleting substituts: {}", e.getMessage());
        }
    }
    @Override
    public SubstitutDTO generateSubstitutDTO(String sexe) {
        List<TirageAgentDTO> agents = tirageAgentService.getTirageAgentsByDossierEtat(); 
    
        List<TirageAgentDTO> filteredAgents = agents.stream()
            .filter(agent -> sexe.equalsIgnoreCase(agent.getAgent().getSexe()))
            .collect(Collectors.toList());
    
        if (filteredAgents.isEmpty()) {
            throw new RuntimeException("Aucun agent disponible pour le sexe spécifié.");
        }
    
        Collections.shuffle(filteredAgents);
        
        TirageAgentDTO chosenAgent = null;
        for (TirageAgentDTO agent : filteredAgents) {
            if (!pelerinService.existsByAgentId(agent.getAgent().getId())) {
                chosenAgent = agent;
                break;
            }
        }
    
        if (chosenAgent == null) {
            throw new RuntimeException("Aucun agent disponible pour le sexe spécifié qui n'est pas déjà un pelerin.");
        }
    
        SubstitutDTO substitutDTO = new SubstitutDTO();
        substitutDTO.setAgent(chosenAgent.getAgent());
    
        return substitutDTO;
    }
@Override
public boolean assignedSubstitutToPelerin(AgentDTO agent) {
    Logger logger = LoggerFactory.getLogger(this.getClass());
    
    logger.info("Starting assignment of substitutes to pelerins");

    List<PelerinDTO> pelerins = pelerinService.getPelerinsByDossierEtat();

    if (pelerins.isEmpty()) {
        logger.warn("No pelerins found for the current dossier state");
        return false;
    }

    for (PelerinDTO pelerin : pelerins) {
        String sexePelerin = pelerin.getAgent().getSexe();
        logger.info("Generating substitute for pelerin with ID: {} and sexe: {}", pelerin.getId(), sexePelerin);
        
        SubstitutDTO substitutDTO;
        try {
            substitutDTO = generateSubstitutDTO(sexePelerin);
        } catch (RuntimeException e) {
            logger.error("Error generating substitute for pelerin with ID: {}", pelerin.getId(), e);
            continue;
        }
        Pelerin pelerin2 = modelMapper.map(pelerin, Pelerin.class);
        substitutDTO.setRemplacantDe(pelerin2);
        substitutDTO.setDossierPelerinage(pelerin.getDossierPelerinage());
        substitutDTO.setMatriculeAgent(agent.getMatricule());
        substitutDTO.setPrenomAgent(agent.getPrenom());
        substitutDTO.setNomAgent(agent.getNom());

        logger.info("Saving substitute for pelerin with ID: {}", pelerin.getId());
        logger.info("Generating substitute for substitut with : {} ", substitutDTO.getRemplacantDe().getId());
        SubstitutDTO savedSubstitut= saveSubstitut(substitutDTO);
        
        logger.info("Assigning substitute to pelerin with ID: {}", pelerin.getId());
        pelerinService.assignedSubstitutToPelerins(savedSubstitut, pelerin);
    }

    logger.info("Completed assignment of substitutes to pelerins");
    return true;
}

}