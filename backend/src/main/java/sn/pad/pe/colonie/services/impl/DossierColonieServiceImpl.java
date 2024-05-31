package sn.pad.pe.colonie.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.colonie.repositories.DossierColonieRepository;
import sn.pad.pe.colonie.services.DossierColonieService;
import sn.pad.pe.configurations.exception.ResourceNotFoundException;

@Service
public class DossierColonieServiceImpl implements DossierColonieService {

    @Autowired
    private DossierColonieRepository dossierColonieRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<DossierColonieDTO> getDossierColonies() {
        return dossierColonieRepository.findAll().stream()
                .map(dossierColonie -> modelMapper.map(dossierColonie, DossierColonieDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public DossierColonieDTO getDossierColonieById(Long id) {
        DossierColonie dossierColonie = dossierColonieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DossierColonie not found with id: " + id));
        return modelMapper.map(dossierColonie, DossierColonieDTO.class);
    }

    @Override
    public DossierColonieDTO getDossierColonieByAnnee(String annee) {
        DossierColonie dossierColonie = dossierColonieRepository.findByAnnee(annee)
                .orElseThrow(() -> new ResourceNotFoundException("DossierColonie not found with annee: " + annee));
        return modelMapper.map(dossierColonie, DossierColonieDTO.class);
    }

    @Override
    public DossierColonieDTO createDossierColonie(DossierColonieDTO dossierColonieDTO) {
        DossierColonie dossierColonie = modelMapper.map(dossierColonieDTO, DossierColonie.class);
        DossierColonie savedDossierColonie = dossierColonieRepository.save(dossierColonie);
        return modelMapper.map(savedDossierColonie, DossierColonieDTO.class);
    }

    @Override
    public boolean updateDossierColonie(DossierColonieDTO dossierColonieDTO) {
        Optional<DossierColonie> dossierColonieOptional = dossierColonieRepository.findById(dossierColonieDTO.getId());
        if (dossierColonieOptional.isPresent()) {
            DossierColonie dossierColonie = modelMapper.map(dossierColonieDTO, DossierColonie.class);
            dossierColonieRepository.save(dossierColonie);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteDossierColonieById(Long id) {
        Optional<DossierColonie> dossier = dossierColonieRepository.findById(id);
        if (dossier.isPresent()) {
            dossierColonieRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
