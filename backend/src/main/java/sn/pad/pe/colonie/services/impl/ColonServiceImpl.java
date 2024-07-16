package sn.pad.pe.colonie.services.impl;


import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.Colon;
import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.dto.ColonDTO;
import sn.pad.pe.colonie.dto.ColonStatisticsDTO;
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

    @Override
    public List<ColonDTO> getColonsByAnnee(String annee) {
        DossierColonieDTO dossier = dossierService.getDossierColonieByAnnee(annee);
        if (dossier != null) {
            List<Colon> colonList = colonRepository.findByCodeDossier(dossier.getId());
            return colonList.stream()
                    .map(colon -> {
                        ColonDTO dto = mapToDto(colon);
                        convertBytesFieldsToBase64(dto);
                        dto.setCodeDossier(modelMapper.map(dossier, DossierColonie.class));
                        return dto;
                    })
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }
    @Override
    public List<ColonDTO> getColonsByDossierEtat() {
        DossierColonieDTO dossiers = dossierService.getDossierColonieByEtat();
        if (dossiers != null ) {
            List<Colon> colonList = colonRepository.findByCodeDossierIn(dossiers.getId());
            return colonList.stream()
                    .map(colon -> {
                        ColonDTO dto = mapToDto(colon);
                        convertBytesFieldsToBase64(dto);
                        return dto;
                    })
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }
    @Override
    public ColonStatisticsDTO getColonStatisticsByAnnee(String annee) {
        List<ColonDTO> colons;
        if (annee != null && !annee.isEmpty()) {
            DossierColonieDTO dossier = dossierService.getDossierColonieByAnnee(annee);
            if (dossier != null) {
                List<Colon> colonList = colonRepository.findByCodeDossier(dossier.getId());
                colons = colonList.stream()
                    .map(colon -> modelMapper.map(colon, ColonDTO.class))
                    .collect(Collectors.toList());
            } else {
                colons = new ArrayList<>();
            }
        } else {
            colons = getColons();
        }
    
        ColonStatisticsDTO statistics = new ColonStatisticsDTO();
        statistics.setTotalColons((long) colons.size());
        statistics.setAge7to10(colons.stream().filter(colon -> calculateAge(colon.getDateNaissance()) >= 7 && calculateAge(colon.getDateNaissance()) < 10).count());
        statistics.setAge10to15(colons.stream().filter(colon -> calculateAge(colon.getDateNaissance()) >= 10 && calculateAge(colon.getDateNaissance()) < 15).count());
        statistics.setAge15to18(colons.stream().filter(colon -> calculateAge(colon.getDateNaissance()) >= 15 && calculateAge(colon.getDateNaissance()) < 18).count());
    
        statistics.setMaleCount(colons.stream().filter(colon -> "masculin".equalsIgnoreCase(colon.getSexe().toString())).count());
        statistics.setFemaleCount(colons.stream().filter(colon -> "feminin".equalsIgnoreCase(colon.getSexe().toString())).count());
    
        return statistics;
    }
    

   private int calculateAge(Date birthDate) {
    LocalDate localBirthDate = birthDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    return Period.between(localBirthDate, LocalDate.now()).getYears();
}

}
