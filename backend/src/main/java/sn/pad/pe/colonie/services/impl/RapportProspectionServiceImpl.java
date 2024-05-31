package sn.pad.pe.colonie.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.RapportProspection;
import sn.pad.pe.colonie.dto.RapportProspectionDTO;
import sn.pad.pe.colonie.repositories.RapportProspectionRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import sn.pad.pe.colonie.services.RapportProspectionService;
import sn.pad.pe.configurations.exception.ResourceNotFoundException;

@Service
public class RapportProspectionServiceImpl implements RapportProspectionService {

    @Autowired
    private RapportProspectionRepository rapportProspectionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public RapportProspectionDTO saveRapportProspection(RapportProspectionDTO rapportProspectionDTO) {
        RapportProspection rapportProspection = modelMapper.map(rapportProspectionDTO, RapportProspection.class);
        RapportProspection savedRapportProspection = rapportProspectionRepository.save(rapportProspection);
        return modelMapper.map(savedRapportProspection, RapportProspectionDTO.class);
    }

    @Override
    public RapportProspectionDTO getRapportProspectionById(Long id) {
        RapportProspection rapportProspection = rapportProspectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rapport de prospection not found with id: " + id));
        return modelMapper.map(rapportProspection, RapportProspectionDTO.class);
    }

    @Override
    public List<RapportProspectionDTO> getAllRapportsProspection() {
        List<RapportProspection> rapportsProspection = rapportProspectionRepository.findAll();
        return rapportsProspection.stream()
                .map(rapportProspection -> modelMapper.map(rapportProspection, RapportProspectionDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public boolean updateRapportProspection(RapportProspectionDTO rapportProspectionDTO) {
        RapportProspection rapportProspection = modelMapper.map(rapportProspectionDTO, RapportProspection.class);
        if (rapportProspectionRepository.existsById(rapportProspection.getId())) {
            rapportProspectionRepository.save(rapportProspection);
            return true;
        }
        return false;
    }
    @Override
    public RapportProspectionDTO getRapportByCodeDossier(String code) {
        Optional<RapportProspection> rapportProspection = rapportProspectionRepository.findByCodeDossier(code);
        if(rapportProspection.isPresent()) return modelMapper.map(rapportProspection, RapportProspectionDTO.class);
        else throw  new ResourceNotFoundException("Rapport de prospection introuvable avec le code de dossier : " + code);
        
    }
    
    @Override
    public boolean deleteRapportProspection(Long id) {
        if (rapportProspectionRepository.existsById(id)) {
            rapportProspectionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
