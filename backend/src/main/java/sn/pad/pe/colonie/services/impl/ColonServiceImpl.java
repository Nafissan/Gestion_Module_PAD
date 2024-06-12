package sn.pad.pe.colonie.services.impl;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.Colon;
import sn.pad.pe.colonie.dto.ColonDTO;
import sn.pad.pe.colonie.repositories.ColonRepository;
import sn.pad.pe.colonie.services.ColonService;

@Service
public class ColonServiceImpl implements ColonService {

    @Autowired
    private ColonRepository colonRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<ColonDTO> getColons() {
        return colonRepository.findAll().stream()
                .map(colon -> {
                    ColonDTO dto = modelMapper.map(colon, ColonDTO.class);
                    convertBytesFieldsToBase64(dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public ColonDTO saveColon(ColonDTO colonDTO) {
        convertBase64FieldsToBytes(colonDTO);
        Colon colon = modelMapper.map(colonDTO, Colon.class);
        Colon savedColon = colonRepository.save(colon);
        ColonDTO dto = modelMapper.map(savedColon, ColonDTO.class);
        convertBase64FieldsToBytes(dto);
        return dto;
    }

    private void convertBase64FieldsToBytes(ColonDTO colonDTO) {
        if (colonDTO.getFicheSocial() != null) {
            colonDTO.setFicheSocialBytes(Base64.getDecoder().decode(colonDTO.getFicheSocial()));
        }
        if (colonDTO.getDocument() != null) {
            colonDTO.setDocumentBytes(Base64.getDecoder().decode(colonDTO.getDocument()));
        }
    }

    private void convertBytesFieldsToBase64(ColonDTO colonDTO) {
        if (colonDTO.getFicheSocialBytes() != null) {
            colonDTO.setFicheSocial(Base64.getEncoder().encodeToString(colonDTO.getFicheSocialBytes()));
        }
        if (colonDTO.getDocumentBytes() != null) {
            colonDTO.setDocument(Base64.getEncoder().encodeToString(colonDTO.getDocumentBytes()));
        }
    }
}
