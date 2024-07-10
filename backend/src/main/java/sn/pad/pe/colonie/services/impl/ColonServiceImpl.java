package sn.pad.pe.colonie.services.impl;


import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.Colon;
import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.dto.ColonDTO;
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.colonie.repositories.ColonRepository;
import sn.pad.pe.colonie.services.ColonService;

@Service
public class ColonServiceImpl implements ColonService {

    @Autowired
    private ColonRepository colonRepository;
    @Autowired
    private DossierColonieServiceImpl dossierService;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<ColonDTO> getColons() {
        List<Colon> colonList = colonRepository.findAll();
        if (colonList == null || colonList.isEmpty()) {
            System.out.println("No colons found in the database.");
            return new ArrayList<>();
        }
        
            List<ColonDTO> colonDTOs = colonList.stream()
            .map(colon -> {
                ColonDTO dto = mapToDto(colon);
                convertBytesFieldsToBase64(dto);
                DossierColonieDTO dossierColonie = modelMapper.map(colon.getCodeDossier(), DossierColonieDTO.class);
                DossierColonie dossierColonies = modelMapper.map(dossierColonie, DossierColonie.class);
                dto.setCodeDossier(dossierColonies);
                return dto;
            })
            .collect(Collectors.toList());

        return colonDTOs;
    }

    private ColonDTO mapToDto(Colon colon) {
        ColonDTO dto = new ColonDTO();
        dto.setDateNaissance(colon.getDateNaissance());
        dto.setDocumentBytes(colon.getDocument());
        dto.setFicheSocialBytes(colon.getFicheSocial());
        dto.setGroupeSanguin(colon.getGroupeSanguin());
        dto.setId(colon.getId());
        dto.setLieuNaissance(colon.getLieuNaissance());
        dto.setMatriculeAgent(colon.getMatriculeAgent());
        dto.setMatriculeParent(colon.getMatriculeParent());
        dto.setNomAgent(colon.getNomAgent());
        dto.setNomEnfant(colon.getNomEnfant());
        dto.setNomParent(colon.getNomParent());
        dto.setPrenomAgent(colon.getPrenomAgent());
        dto.setPrenomEnfant(colon.getPrenomEnfant());
        dto.setPrenomParent(colon.getPrenomParent());
        dto.setSexe(colon.getSexe());
        dto.setStatus(colon.getStatus());
        dto.setPhotoBytes(colon.getPhoto());
        return dto;
    }

    @Override
    public ColonDTO saveColon(ColonDTO colonDTO) {
        convertBase64FieldsToBytes(colonDTO);
        List<DossierColonieDTO> dossiers = dossierService.getDossierColonies();
        DossierColonieDTO dossierOuvertOuSaisi = dossiers.stream()
                .filter(dossier -> "OUVERT".equals(dossier.getEtat()) || "SAISI".equals(dossier.getEtat()))
                .findFirst()
                .orElse(null);
            
            Colon colon = modelMapper.map(colonDTO, Colon.class);
            DossierColonie dossierColonie = modelMapper.map(dossierOuvertOuSaisi, DossierColonie.class);
            colon.setCodeDossier(dossierColonie); 

        Colon savedColon = colonRepository.save(colon);

        return modelMapper.map(savedColon,ColonDTO.class);
    }

        
    private void convertBase64FieldsToBytes(ColonDTO colonDTO) {
        if (colonDTO.getFicheSocial() != null) {
            if (isValidBase64(colonDTO.getFicheSocial())) {
                colonDTO.setFicheSocialBytes(Base64.getDecoder().decode(colonDTO.getFicheSocial()));
                }else {
                    System.err.println("Invalid Base64 string for ficheSociale: ");
                }        }
        if (colonDTO.getDocument() != null) {
            if (isValidBase64(colonDTO.getDocument())) {
                colonDTO.setDocumentBytes(Base64.getDecoder().decode(colonDTO.getDocument()));
            }else {
                System.err.println("Invalid Base64 string for Document: ");
            }        }
        if (colonDTO.getPhoto() != null) {
                if (isValidBase64(colonDTO.getPhoto())) {
                    colonDTO.setPhotoBytes(Base64.getDecoder().decode(colonDTO.getPhoto()));
                    }else {
                        System.err.println("Invalid Base64 string for photo: ");
                        }        }
    }
    private boolean isValidBase64(String base64) {
        try {
            Base64.getDecoder().decode(base64);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
    private void convertBytesFieldsToBase64(ColonDTO colonDTO) {
        if (colonDTO.getFicheSocialBytes() != null) {
            colonDTO.setFicheSocial(Base64.getEncoder().encodeToString(colonDTO.getFicheSocialBytes()));
        }
        if (colonDTO.getDocumentBytes() != null) {
            colonDTO.setDocument(Base64.getEncoder().encodeToString(colonDTO.getDocumentBytes()));
        }
        if (colonDTO.getPhotoBytes() != null) {
            colonDTO.setPhoto(Base64.getEncoder().encodeToString(colonDTO.getPhotoBytes()));
        }
    }
}
