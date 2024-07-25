package sn.pad.pe.pelerinage.services.impl;

import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.bo.FormulaireSatisfactionPelerinage;
import sn.pad.pe.pelerinage.bo.Pelerin;
import sn.pad.pe.pelerinage.bo.Substitut;
import sn.pad.pe.pelerinage.bo.TirageAgent;
import sn.pad.pe.pelerinage.dto.DossierPelerinageDTO;
import sn.pad.pe.pelerinage.dto.FormulaireSatisfactionPelerinageDTO;
import sn.pad.pe.pelerinage.dto.PelerinDTO;
import sn.pad.pe.pelerinage.dto.SubstitutDTO;
import sn.pad.pe.pelerinage.dto.TirageAgentDTO;
import sn.pad.pe.pelerinage.repositories.DossierPelerinageRepository;
import sn.pad.pe.pelerinage.services.DossierPelerinageService;
import sn.pad.pe.pelerinage.services.PelerinService;
import sn.pad.pe.pelerinage.services.SubstitutService;
import sn.pad.pe.pelerinage.services.TirageAgentService;
@Service
public class DossierPelerinageServiceImpl implements DossierPelerinageService {

    @Autowired
    private DossierPelerinageRepository dossierPelerinageRepository;
        @Autowired
    private FormulaireSatisfactionPelerinageServiceImpl formulaireSatisfactionService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PelerinService pelerinService;
    @Autowired
    private SubstitutService substitutService;
    @Autowired
    private TirageAgentService agentService ;
    @Override
    public List<DossierPelerinageDTO> getDossierPelerinages() {
        List<DossierPelerinage> dossiers = dossierPelerinageRepository.findAll();
        return mapAndConvertDossiers(dossiers);

    }

    @Override
    public List<DossierPelerinageDTO> getDossiersPelerinagesFerme() {
        List<DossierPelerinage> dossiers = dossierPelerinageRepository.findByEtat("FERME");
        return mapAndConvertDossiers(dossiers);

    }

    @Override
    public DossierPelerinageDTO getDossierPelerinageByEtat() {
        Optional<DossierPelerinage> dossier = dossierPelerinageRepository.findFirstByEtatIn(Arrays.asList("ouvert", "saisi"));
        if(dossier.isPresent()){
            return mapAndConvertDossier(dossier.get());
        }
        return null;    
    }
 private List<DossierPelerinageDTO> mapAndConvertDossiers(List<DossierPelerinage> dossiers) {
        try {
            return dossiers.stream()
                    .map(dossierPelerinage -> {
                        DossierPelerinageDTO dto = mapToDto(dossierPelerinage);
                        convertBytesFieldsToBase64(dto);
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.print("Error retrieving Dossier pelerinage: " + e);
            throw new RuntimeException("Failed to retrieve Dossier pelerinage", e);
        }
    }
    private DossierPelerinageDTO mapAndConvertDossier(DossierPelerinage dossierPelerinage) {
        DossierPelerinageDTO dto = mapToDto(dossierPelerinage);
        convertBytesFieldsToBase64(dto);
        return dto;
    }
    private DossierPelerinageDTO mapToDto(DossierPelerinage dossierPelerinage) {
        DossierPelerinageDTO dto = modelMapper.map(dossierPelerinage, DossierPelerinageDTO.class);
        return dto;
    }
    @Override
    public DossierPelerinageDTO getDossierPelerinageByAnnee(String annee) {
        DossierPelerinage dossier = dossierPelerinageRepository.findByAnnee(annee)
                .orElseThrow(() -> new ResourceNotFoundException("DossierPelerinage not found with annee: " + annee));
                DossierPelerinageDTO dto = mapToDto(dossier);
                convertBytesFieldsToBase64(dto);
                return dto;    
            }

    @Override
    public DossierPelerinageDTO createDossierPelerinage(DossierPelerinageDTO dossierPelerinageDTO) {
        convertBase64FieldsToBytes(dossierPelerinageDTO);
        DossierPelerinage dossier = modelMapper.map(dossierPelerinageDTO, DossierPelerinage.class);
        DossierPelerinage savedDossier = dossierPelerinageRepository.save(dossier);
        return modelMapper.map(savedDossier, DossierPelerinageDTO.class);
    }

   @Override
public boolean updateDossierPelerinage(DossierPelerinageDTO dossierPelerinageDTO) {
    Optional<DossierPelerinage> optionalDossier = dossierPelerinageRepository.findById(dossierPelerinageDTO.getId());
    if (optionalDossier.isPresent()) {
        convertBase64FieldsToBytes(dossierPelerinageDTO);
        DossierPelerinage dossierPelerinage = modelMapper.map(dossierPelerinageDTO, DossierPelerinage.class);

        List<FormulaireSatisfactionPelerinageDTO> formulaire = formulaireSatisfactionService.getFormulairesByDossierEtat();
        if (formulaire != null) {
            dossierPelerinage.setFormulaireSatisfaction(formulaire.stream()
                .map(f -> modelMapper.map(f, FormulaireSatisfactionPelerinage.class))
                .collect(Collectors.toList()));
        }

        List<PelerinDTO> pelerins = pelerinService.getPelerinsApte();
        if (pelerins != null) {
            dossierPelerinage.setPelerins(pelerins.stream()
                .map(pelerin -> modelMapper.map(pelerin, Pelerin.class))
                .collect(Collectors.toList()));
        }

        List<SubstitutDTO> substituts = substitutService.getSubstitutsByDossierEtat();
        if (substituts != null) {
            dossierPelerinage.setSubstituList(substituts.stream()
                .map(substitut -> modelMapper.map(substitut, Substitut.class))
                .collect(Collectors.toList()));
        }

        List<TirageAgentDTO> agents = agentService.getTirageAgentsByDossierEtat();
        if (agents != null) {
            dossierPelerinage.setAgenList(agents.stream()
                .map(agent -> modelMapper.map(agent, TirageAgent.class))
                .collect(Collectors.toList()));
        }

        if ("FERMER".equalsIgnoreCase(dossierPelerinage.getEtat())) {
            substitutService.deleteAllSubstituts();
        }
        dossierPelerinageRepository.save(dossierPelerinage);
        return true;
    } else {
        return false;
    }
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
    private void convertBase64FieldsToBytes(DossierPelerinageDTO dossierPelerinageDTO) {
        if (dossierPelerinageDTO.getNoteInformation() != null) {
            if (isValidBase64(dossierPelerinageDTO.getNoteInformation())) {
                dossierPelerinageDTO.setNoteInformationBytes(Base64.getDecoder().decode(dossierPelerinageDTO.getNoteInformation()));
            } else {
                System.err.println("Invalid Base64 string for NoteInformation: ");
            }
        }
        if (dossierPelerinageDTO.getRapportPelerinage() != null) {
            if (isValidBase64(dossierPelerinageDTO.getRapportPelerinage())) {
                dossierPelerinageDTO.setRapportPelerinageBytes(Base64.getDecoder().decode(dossierPelerinageDTO.getRapportPelerinage()));
            } else {
                System.err.println("Invalid Base64 string for rapport pelerinage: " );
            }
        }
    }

    private boolean isValidBase64(String base64) {
        try {
            Base64.getDecoder().decode(base64);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
    private void convertBytesFieldsToBase64(DossierPelerinageDTO dossierPelerinageDTO) {
        if (dossierPelerinageDTO.getNoteInformationBytes() != null) {
            dossierPelerinageDTO.setNoteInformation(Base64.getEncoder().encodeToString(dossierPelerinageDTO.getNoteInformationBytes()));
        }
        if (dossierPelerinageDTO.getRapportPelerinageBytes() != null) {
            dossierPelerinageDTO.setRapportPelerinage(Base64.getEncoder().encodeToString(dossierPelerinageDTO.getRapportPelerinageBytes()));
        }
      
    }
}