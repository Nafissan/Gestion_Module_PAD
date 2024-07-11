package sn.pad.pe.colonie.services.impl;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.RapportProspection;
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.colonie.dto.RapportProspectionDTO;
import sn.pad.pe.colonie.repositories.RapportProspectionRepository;
import sn.pad.pe.colonie.services.DossierColonieService;
import sn.pad.pe.colonie.services.RapportProspectionService;

@Service
public class RapportProspectionServiceImpl implements RapportProspectionService {

    @Autowired
    private RapportProspectionRepository rapportProspectionRepository;

    @Autowired
    private ModelMapper modelMapper;
 @Autowired
    private DossierColonieService dossierColonieService;
    @Override
    public RapportProspectionDTO saveRapportProspection(RapportProspectionDTO rapportProspectionDTO) {
        System.out.print(rapportProspectionDTO.getCodeDossierColonie());
        convertBase64FieldsToBytes(rapportProspectionDTO);
        RapportProspection rapportProspection = modelMapper.map(rapportProspectionDTO, RapportProspection.class);
        RapportProspection savedRapportProspection = rapportProspectionRepository.save(rapportProspection);
        return modelMapper.map(savedRapportProspection, RapportProspectionDTO.class);
    }

   

    @Override
    public List<RapportProspectionDTO> getAllRapportsProspection() {
        List<RapportProspection> rapportsProspection = rapportProspectionRepository.findAll();
        try {
            List<RapportProspectionDTO> dtos = rapportsProspection.stream()
            .map(rapportProspection ->{
                 RapportProspectionDTO rapport= mapToDto(rapportProspection);
                 convertBytesFieldsToBase64(rapport);
                 return rapport;
            })
            .collect(Collectors.toList());
            return dtos;
        } catch (Exception e) {
            System.out.print("Error retrieving rapports: " + e.getMessage());
            throw new RuntimeException("Failed to retrieve rapports", e);
        }    
    }
        public RapportProspectionDTO mapToDto(RapportProspection rapport) {
            RapportProspectionDTO dto = new RapportProspectionDTO();
            dto.setId(rapport.getId());
            dto.setRapportProspectionByte(rapport.getRapportProspection());
            dto.setMatricule(rapport.getMatricule());
            dto.setNom(rapport.getNom());
            dto.setPrenom(rapport.getPrenom());
            dto.setDateCreation(rapport.getDateCreation());
            dto.setDateValidation(rapport.getDateValidation());
            dto.setEtat(rapport.getEtat());
            dto.setCodeDossierColonie(rapport.getCodeDossierColonie());
            dto.setMatriculeAgent(rapport.getMatriculeAgent());
            dto.setNomAgent(rapport.getNomAgent());
            dto.setPrenomAgent(rapport.getPrenomAgent());
            dto.setCommentaire(rapport.getCommentaire());
            return dto;
        }
    @Override
    public boolean updateRapportProspection(RapportProspectionDTO rapportProspectionDTO) {
        Optional<RapportProspection> rapport = rapportProspectionRepository.findById(rapportProspectionDTO.getId());
        if(rapport.isPresent()){ 
            convertBase64FieldsToBytes(rapportProspectionDTO);
            RapportProspection dto = modelMapper.map(rapportProspectionDTO, RapportProspection.class);
            rapportProspectionRepository.save(dto);
            return true;
        }
        return false;
    }
      @Override
    public RapportProspectionDTO getRapportProspectionByEtat() {
        DossierColonieDTO dossierColonie = dossierColonieService.getDossierColonieByEtat();
        if (dossierColonie != null) {
            Optional<RapportProspection> rapport = rapportProspectionRepository.findByCodeDossierColonie(dossierColonie.getId());
            if (rapport.isPresent()) {
                RapportProspectionDTO rapportDTO = mapToDto(rapport.get());
                convertBytesFieldsToBase64(rapportDTO);
                return rapportDTO;
            }
        }
        return null;
    }
    @Override
    public boolean deleteRapportProspection(RapportProspectionDTO rapportProspectionDTO) {
        Optional<RapportProspection> rapport = rapportProspectionRepository.findById(rapportProspectionDTO.getId());
        System.out.print("contains "+ rapport.isPresent());
        if (rapport.isPresent()) {
            RapportProspection rapportpProspection = rapport.get();
            rapportProspectionRepository.delete(rapportpProspection);
            return true;
        }
        return false;
    }
    private void convertBase64FieldsToBytes(RapportProspectionDTO rapport) {
        if (rapport.getRapportProspection() != null) {
            if (isValidBase64(rapport.getRapportProspection())) {
                rapport.setRapportProspectionByte(Base64.getDecoder().decode(rapport.getRapportProspection()));
                }else {
                    System.err.println("Invalid Base64 string for rapport prospection: ");
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
    private void convertBytesFieldsToBase64(RapportProspectionDTO rapport) {
        if (rapport.getRapportProspectionByte() != null) {
            rapport.setRapportProspection(Base64.getEncoder().encodeToString(rapport.getRapportProspectionByte()));
        }
       
    }
}
