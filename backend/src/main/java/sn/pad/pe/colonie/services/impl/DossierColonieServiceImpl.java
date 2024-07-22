package sn.pad.pe.colonie.services.impl;


import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.bo.ParticipantColonie;
import sn.pad.pe.colonie.bo.RapportProspection;
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;
import sn.pad.pe.colonie.dto.ParticipantColonieDTO;
import sn.pad.pe.colonie.dto.RapportProspectionDTO;
import sn.pad.pe.colonie.repositories.DossierColonieRepository;
import sn.pad.pe.colonie.services.DossierColonieService;
import sn.pad.pe.colonie.services.FormulaireSatisfactionService;
import sn.pad.pe.colonie.services.ParticipantColonieService;
import sn.pad.pe.colonie.services.RapportProspectionService;
import sn.pad.pe.configurations.exception.ResourceNotFoundException;

@Service
public class DossierColonieServiceImpl implements DossierColonieService {

    @Autowired
    private DossierColonieRepository dossierColonieRepository;
    @Autowired
    private RapportProspectionService rapportProspectionService;
    @Autowired
    private FormulaireSatisfactionService formulaireSatisfactionService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ParticipantColonieService participantColonieService;
  
    @Override
    public List<DossierColonieDTO> getDossierColonies() {
        List<DossierColonie> dossiers = dossierColonieRepository.findAll();
        return mapAndConvertDossiers(dossiers);
    }
    @Override
    public List<DossierColonieDTO> getDossiersColoniesFerme() {
        List<DossierColonie> dossiers = dossierColonieRepository.findByEtat("FERME");
        return mapAndConvertDossiers(dossiers);
    }
    @Override
    public DossierColonieDTO getDossierColonieByEtat() {
        Optional<DossierColonie> dossier = dossierColonieRepository.findFirstByEtatIn(Arrays.asList("ouvert", "saisi"));
        if(dossier.isPresent()){
            return mapAndConvertDossier(dossier.get());
        }
        return null;
    }
    private List<DossierColonieDTO> mapAndConvertDossiers(List<DossierColonie> dossiers) {
        try {
            return dossiers.stream()
                    .map(dossierColonie -> {
                        DossierColonieDTO dto = mapToDto(dossierColonie);
                        convertBytesFieldsToBase64(dto);
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.print("Error retrieving Dossier Colonies: " + e);
            throw new RuntimeException("Failed to retrieve Dossier Colonies", e);
        }
    }
    private DossierColonieDTO mapAndConvertDossier(DossierColonie dossierColonie) {
        DossierColonieDTO dto = mapToDto(dossierColonie);
        convertBytesFieldsToBase64(dto);
        return dto;
    }

    private DossierColonieDTO mapToDto(DossierColonie dossierColonie) {
        DossierColonieDTO dto = modelMapper.map(dossierColonie, DossierColonieDTO.class);
        if (dossierColonie.getNoteMinistere() != null) {
            dto.setNoteMinistereBytes(dossierColonie.getNoteMinistere());
        }
        if (dossierColonie.getDemandeProspection() != null) {
            dto.setDemandeProspectionBytes(dossierColonie.getDemandeProspection());
        }
        if (dossierColonie.getNoteInformation() != null) {
            dto.setNoteInformationBytes(dossierColonie.getNoteInformation());
        }
        if (dossierColonie.getNoteInstruction() != null) {
            dto.setNoteInstructionBytes(dossierColonie.getNoteInstruction());
        }
        if (dossierColonie.getRapportMission() != null) {
            dto.setRapportMissionBytes(dossierColonie.getRapportMission());
        }
        return dto;
    }


    @Override
    public DossierColonieDTO getDossierColonieByAnnee(String annee) {
        DossierColonie dossierColonie = dossierColonieRepository.findByAnnee(annee)
                .orElseThrow(() -> new ResourceNotFoundException("DossierColonie not found with annee: " + annee));
        DossierColonieDTO dto = mapToDto(dossierColonie);
        convertBytesFieldsToBase64(dto);
        return dto;
    }

    @Override
    public DossierColonieDTO createDossierColonie(DossierColonieDTO dossierColonieDTO) {
        convertBase64FieldsToBytes(dossierColonieDTO);
        DossierColonie dossierColonie = modelMapper.map(dossierColonieDTO, DossierColonie.class);
        DossierColonie savedDossierColonie = dossierColonieRepository.save(dossierColonie);
        return modelMapper.map(savedDossierColonie, DossierColonieDTO.class);
    }

    @Override
    public boolean updateDossierColonie(DossierColonieDTO dossierColonieDTO) {
        Optional<DossierColonie> dossierColonieOptional = dossierColonieRepository.findById(dossierColonieDTO.getId());
        if (dossierColonieOptional.isPresent()) {
            convertBase64FieldsToBytes(dossierColonieDTO);
            DossierColonie dossierColonie = modelMapper.map(dossierColonieDTO, DossierColonie.class);

            RapportProspectionDTO allRapports = rapportProspectionService.getRapportProspectionByEtat();
            if ( allRapports != null) {
                dossierColonie.setRapportProspection(modelMapper.map(allRapports, RapportProspection.class));
            }

            FormulaireSatisfactionDTO allFormulaires = formulaireSatisfactionService.getFormulaireByDossierEtat();
            if ( allFormulaires!= null) {
                dossierColonie.setFormulaireSatisfaction(modelMapper.map(allFormulaires, FormulaireSatisfaction.class));
            }
            List<ParticipantColonieDTO> listeColonieDTOs = participantColonieService.getParticipantsValider();
            if (listeColonieDTOs != null) {
                dossierColonie.setParticipants(listeColonieDTOs.stream()
                .map(participantColonie -> modelMapper.map(participantColonie, ParticipantColonie.class))
                .collect(Collectors.toList()));
            }
            if ("FERMER".equalsIgnoreCase(dossierColonie.getEtat())) {
                participantColonieService.deleteAllParticipants();
            }
            dossierColonieRepository.save(dossierColonie);

            return true;
        } else {
            return false;
        }
    }
    @Override
    public boolean deleteDossierColonie(DossierColonieDTO dossierColonieDTO) {
        Optional<DossierColonie> dossier = dossierColonieRepository.findById(dossierColonieDTO.getId());
        if (dossier.isPresent()) {
            DossierColonie dossierDel = dossier.get();
            dossierColonieRepository.delete(dossierDel);
            return true;
        }
        return false;
    }

    private boolean isValidBase64(String base64) {
        try {
            Base64.getDecoder().decode(base64);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    private void convertBase64FieldsToBytes(DossierColonieDTO dossierColonieDTO) {
        if (dossierColonieDTO.getNoteMinistere() != null) {
            if (isValidBase64(dossierColonieDTO.getNoteMinistere())) {
                dossierColonieDTO.setNoteMinistereBytes(Base64.getDecoder().decode(dossierColonieDTO.getNoteMinistere()));
            } else {
                System.err.println("Invalid Base64 string for NoteMinistere: ");
            }
        }
        if (dossierColonieDTO.getDemandeProspection() != null) {
            if (isValidBase64(dossierColonieDTO.getDemandeProspection())) {
                dossierColonieDTO.setDemandeProspectionBytes(Base64.getDecoder().decode(dossierColonieDTO.getDemandeProspection()));
            } else {
                System.err.println("Invalid Base64 string for DemandeProspection: " );
            }
        }
        if (dossierColonieDTO.getNoteInformation() != null) {
            if (isValidBase64(dossierColonieDTO.getNoteInformation())) {
                dossierColonieDTO.setNoteInformationBytes(Base64.getDecoder().decode(dossierColonieDTO.getNoteInformation()));
            } else {
                System.err.println("Invalid Base64 string for NoteInformation: " );
            }
        }
        if (dossierColonieDTO.getNoteInstruction() != null) {
            if (isValidBase64(dossierColonieDTO.getNoteInstruction())) {
                dossierColonieDTO.setNoteInstructionBytes(Base64.getDecoder().decode(dossierColonieDTO.getNoteInstruction()));
            } else {
                System.err.println("Invalid Base64 string for NoteInstruction: " );
            }
        }
        if (dossierColonieDTO.getRapportMission() != null) {
            if (isValidBase64(dossierColonieDTO.getRapportMission())) {
                dossierColonieDTO.setRapportMissionBytes(Base64.getDecoder().decode(dossierColonieDTO.getRapportMission()));
            } else {
                System.err.println("Invalid Base64 string for RapportMission: " );
            }
        }
    }

    private void convertBytesFieldsToBase64(DossierColonieDTO dossierColonieDTO) {
        if (dossierColonieDTO.getNoteMinistereBytes() != null) {
            dossierColonieDTO.setNoteMinistere(Base64.getEncoder().encodeToString(dossierColonieDTO.getNoteMinistereBytes()));
        }
        if (dossierColonieDTO.getDemandeProspectionBytes() != null) {
            dossierColonieDTO.setDemandeProspection(Base64.getEncoder().encodeToString(dossierColonieDTO.getDemandeProspectionBytes()));
        }
        if (dossierColonieDTO.getNoteInformationBytes() != null) {
            dossierColonieDTO.setNoteInformation(Base64.getEncoder().encodeToString(dossierColonieDTO.getNoteInformationBytes()));
        }
        if (dossierColonieDTO.getNoteInstructionBytes() != null) {
            dossierColonieDTO.setNoteInstruction(Base64.getEncoder().encodeToString(dossierColonieDTO.getNoteInstructionBytes()));
        }
        if (dossierColonieDTO.getRapportMissionBytes() != null) {
            dossierColonieDTO.setRapportMission(Base64.getEncoder().encodeToString(dossierColonieDTO.getRapportMissionBytes()));
        }
    }
}
