package sn.pad.pe.colonie.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.Participant;
import sn.pad.pe.colonie.dto.ParticipantDTO;
import sn.pad.pe.colonie.repositories.ParticipantColonieRepository;
import sn.pad.pe.colonie.services.ParticipantService;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("colonieParticipantServiceImpl")
public class ParticipantServiceImpl implements ParticipantService {

      @Autowired
    private ParticipantColonieRepository participantColonieRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ParticipantDTO saveParticipant(ParticipantDTO participantDTO) {
        convertBase64FieldsToBytes(participantDTO);
        Participant participant = modelMapper.map(participantDTO, Participant.class);
        Participant savedParticipant = participantColonieRepository.save(participant);
        return modelMapper.map(savedParticipant, ParticipantDTO.class);
    }

    @Override
    public List<ParticipantDTO> getAllParticipants() {
        return participantColonieRepository.findAll().stream()
        .map(participant -> {
            ParticipantDTO dto = modelMapper.map(participant, ParticipantDTO.class);
            convertBytesFieldsToBase64(dto);
            return dto;
        })
        .collect(Collectors.toList());
        }


    @Override
    public boolean deleteParticipant(Long id) {
        Optional<Participant> dossier = participantColonieRepository.findById(id);
        if (dossier.isPresent()) {
            participantColonieRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateParticipantStatus(Long id, String newStatus) {
        Optional<Participant> participantOptional = participantColonieRepository.findById(id);
        if (participantOptional.isPresent()) {
            Participant participant = participantOptional.get();
            participant.setStatus(newStatus);
            participantColonieRepository.save(participant);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean  updateParticipant( ParticipantDTO updatedParticipant) {
        Optional<Participant> parOptional = participantColonieRepository.findById(updatedParticipant.getId());
        if (parOptional.isPresent()) {
            convertBase64FieldsToBytes(updatedParticipant);
            Participant participant = modelMapper.map(updatedParticipant, Participant.class);
            participantColonieRepository.save(participant);
            return true;
        } else {
            return false;
        }
}
  private void convertBase64FieldsToBytes(ParticipantDTO participantDTO) {
        if (participantDTO.getFicheSocial() != null) {
            participantDTO.setFicheSocialBytes(Base64.getDecoder().decode(participantDTO.getFicheSocial()));
        }
        if (participantDTO.getDocument() != null) {
            participantDTO.setDocumentBytes(Base64.getDecoder().decode(participantDTO.getDocument()));
        }
    }

    private void convertBytesFieldsToBase64(ParticipantDTO participantDTO) {
        if (participantDTO.getFicheSocialBytes() != null) {
            participantDTO.setFicheSocial(Base64.getEncoder().encodeToString(participantDTO.getFicheSocialBytes()));
        }
        if (participantDTO.getDocumentBytes() != null) {
            participantDTO.setDocument(Base64.getEncoder().encodeToString(participantDTO.getDocumentBytes()));
        }
    }
}
