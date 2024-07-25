package sn.pad.pe.pelerinage.services.impl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.dto.DossierPelerinageDTO;
import sn.pad.pe.pelerinage.repositories.DossierPelerinageRepository;
import sn.pad.pe.pelerinage.services.DossierPelerinageService;
@Service
public class DossierPelerinageServiceImpl implements DossierPelerinageService {

    @Autowired
    private DossierPelerinageRepository dossierPelerinageRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<DossierPelerinageDTO> getDossierPelerinages() {
        List<DossierPelerinage> dossiers = dossierPelerinageRepository.findAll();
        return dossiers.stream()
                .map(dossier -> modelMapper.map(dossier, DossierPelerinageDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<DossierPelerinageDTO> getDossiersPelerinageFerme() {
        List<DossierPelerinage> dossiers = dossierPelerinageRepository.findByEtat("FERME");
        return dossiers.stream()
                .map(dossier -> modelMapper.map(dossier, DossierPelerinageDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public DossierPelerinageDTO getDossierPelerinageByEtat() {
        Optional<DossierPelerinage> dossier = dossierPelerinageRepository.findFirstByEtatIn(List.of("ouvert", "saisi"));
        return dossier.map(value -> modelMapper.map(value, DossierPelerinageDTO.class)).orElse(null);
    }

    @Override
    public DossierPelerinageDTO getDossierPelerinageByAnnee(String annee) {
        DossierPelerinage dossier = dossierPelerinageRepository.findByAnnee(annee)
                .orElseThrow(() -> new ResourceNotFoundException("DossierPelerinage not found with annee: " + annee));
        return modelMapper.map(dossier, DossierPelerinageDTO.class);
    }

    @Override
    public DossierPelerinageDTO createDossierPelerinage(DossierPelerinageDTO dossierPelerinageDTO) {
        DossierPelerinage dossier = modelMapper.map(dossierPelerinageDTO, DossierPelerinage.class);
        DossierPelerinage savedDossier = dossierPelerinageRepository.save(dossier);
        return modelMapper.map(savedDossier, DossierPelerinageDTO.class);
    }

    @Override
    public boolean updateDossierPelerinage(DossierPelerinageDTO dossierPelerinageDTO) {
        Optional<DossierPelerinage> optionalDossier = dossierPelerinageRepository.findById(dossierPelerinageDTO.getId());
        if (optionalDossier.isPresent()) {
            DossierPelerinage dossier = modelMapper.map(dossierPelerinageDTO, DossierPelerinage.class);
            dossierPelerinageRepository.save(dossier);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteDossierPelerinage(DossierPelerinageDTO dossierPelerinageDTO) {
        Optional<DossierPelerinage> optionalDossier = dossierPelerinageRepository.findById(dossierPelerinageDTO.getId());
        if (optionalDossier.isPresent()) {
            dossierPelerinageRepository.delete(optionalDossier.get());
            return true;
        }
        return false;
    }
}