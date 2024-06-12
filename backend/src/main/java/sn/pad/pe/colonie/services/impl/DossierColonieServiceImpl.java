package sn.pad.pe.colonie.services.impl;

import java.util.Base64;
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
                .map(dossierColonie -> {
                    DossierColonieDTO dto = modelMapper.map(dossierColonie, DossierColonieDTO.class);
                    convertBytesFieldsToBase64(dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public DossierColonieDTO getDossierColonieByAnnee(String annee) {
        DossierColonie dossierColonie = dossierColonieRepository.findByAnnee(annee)
                .orElseThrow(() -> new ResourceNotFoundException("DossierColonie not found with annee: " + annee));
        DossierColonieDTO dto = modelMapper.map(dossierColonie, DossierColonieDTO.class);
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

    private void convertBase64FieldsToBytes(DossierColonieDTO dossierColonieDTO) {
        if (dossierColonieDTO.getNoteMinistere() != null) {
            dossierColonieDTO.setNoteMinistereBytes(Base64.getDecoder().decode(dossierColonieDTO.getNoteMinistere()));
        }
        if (dossierColonieDTO.getDemandeProspection() != null) {
            dossierColonieDTO.setDemandeProspectionBytes(Base64.getDecoder().decode(dossierColonieDTO.getDemandeProspection()));
        }
        if (dossierColonieDTO.getNoteInformation() != null) {
            dossierColonieDTO.setNoteInformationBytes(Base64.getDecoder().decode(dossierColonieDTO.getNoteInformation()));
        }
        if (dossierColonieDTO.getNoteInstruction() != null) {
            dossierColonieDTO.setNoteInstructionBytes(Base64.getDecoder().decode(dossierColonieDTO.getNoteInstruction()));
        }
        if (dossierColonieDTO.getRapportMission() != null) {
            dossierColonieDTO.setRapportMissionBytes(Base64.getDecoder().decode(dossierColonieDTO.getRapportMission()));
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
