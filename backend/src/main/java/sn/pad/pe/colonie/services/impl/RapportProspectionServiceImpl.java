package sn.pad.pe.colonie.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.RapportProspection;
import sn.pad.pe.colonie.dto.RapportProspectionDTO;
import sn.pad.pe.colonie.repositories.RapportProspectionRepository;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import sn.pad.pe.colonie.services.RapportProspectionService;

@Service
public class RapportProspectionServiceImpl implements RapportProspectionService {

    @Autowired
    private RapportProspectionRepository rapportProspectionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public RapportProspectionDTO saveRapportProspection(RapportProspectionDTO rapportProspectionDTO) {
        convertBase64FieldsToBytes(rapportProspectionDTO);
        RapportProspection rapportProspection = modelMapper.map(rapportProspectionDTO, RapportProspection.class);
        RapportProspection savedRapportProspection = rapportProspectionRepository.save(rapportProspection);
        return modelMapper.map(savedRapportProspection, RapportProspectionDTO.class);
    }

   

    @Override
    public List<RapportProspectionDTO> getAllRapportsProspection() {
        List<RapportProspection> rapportsProspection = rapportProspectionRepository.findAll();
        return rapportsProspection.stream()
                .map(rapportProspection ->{
                     RapportProspectionDTO rapport= modelMapper.map(rapportProspection, RapportProspectionDTO.class);
                     convertBytesFieldsToBase64(rapport);
                     return rapport;
                })
                .collect(Collectors.toList());
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
    public boolean deleteRapportProspection(Long id) {
        if (rapportProspectionRepository.existsById(id)) {
            rapportProspectionRepository.deleteById(id);
            return true;
        }
        return false;
    }
    private void convertBase64FieldsToBytes(RapportProspectionDTO rapport) {
        if (rapport.getRapportProspection() != null) {
            rapport.setRapportProspectionByte(Base64.getDecoder().decode(rapport.getRapportProspection()));
        }
    }

    private void convertBytesFieldsToBase64(RapportProspectionDTO rapport) {
        if (rapport.getRapportProspectionByte() != null) {
            rapport.setRapportProspection(Base64.getEncoder().encodeToString(rapport.getRapportProspectionByte()));
        }
       
    }
}
