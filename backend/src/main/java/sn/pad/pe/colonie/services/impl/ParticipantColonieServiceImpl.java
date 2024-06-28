package sn.pad.pe.colonie.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.pad.pe.colonie.bo.ParticipantColonie;
import sn.pad.pe.colonie.dto.ParticipantColonieDTO;
import sn.pad.pe.colonie.repositories.ParticipantColonieRepository;
import sn.pad.pe.colonie.services.ParticipantColonieService;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class ParticipantColonieServiceImpl implements ParticipantColonieService {

      @Autowired
    private ParticipantColonieRepository participantColonieRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ParticipantColonieDTO saveParticipant(ParticipantColonieDTO participantDTO) {
        convertBase64FieldsToBytes(participantDTO);
        ParticipantColonie participant = modelMapper.map(participantDTO, ParticipantColonie.class);
        ParticipantColonie savedParticipant = participantColonieRepository.save(participant);
        return modelMapper.map(savedParticipant, ParticipantColonieDTO.class);
    }

   @Override
public List<ParticipantColonieDTO> getAllParticipants() {
    List<ParticipantColonie> liste = participantColonieRepository.findAll();
    if (liste == null || liste.isEmpty()) {
        System.out.println("No participants found in the database.");
        return new ArrayList<>();
    }
    try {
        List<ParticipantColonieDTO> dtos = liste.stream()
            .map(participant -> {
                ParticipantColonieDTO dto = mapToDto(participant);
                convertBytesFieldsToBase64(dto);
                return dto;
            })
            .collect(Collectors.toList());
        return dtos;
    } catch (Exception e) {
        System.out.print("Error retrieving Participants: " + e.getMessage());
        throw new RuntimeException("Failed to retrieve Participants", e);
    }
}


        private ParticipantColonieDTO mapToDto(ParticipantColonie participant){
            ParticipantColonieDTO dto =new ParticipantColonieDTO();
            dto.setCodeDossier(participant.getCodeDossier());
            dto.setDateNaissance(participant.getDateNaissance());
            dto.setDocumentBytes(participant.getDocument());
            dto.setFicheSocialBytes(participant.getFicheSocial());
            dto.setGroupeSanguin(participant.getGroupeSanguin());
            dto.setId(participant.getId());
            dto.setLieuNaissance(participant.getLieuNaissance());
            dto.setMatriculeAgent(participant.getMatriculeAgent());
            dto.setMatriculeParent(participant.getMatriculeParent());
            dto.setNomAgent(participant.getNomAgent());
            dto.setNomEnfant(participant.getNomEnfant());
            dto.setNomParent(participant.getNomParent());
            dto.setPrenomAgent(participant.getPrenomAgent());
            dto.setPrenomEnfant(participant.getPrenomEnfant());
            dto.setPrenomParent(participant.getPrenomParent());
            dto.setSexe(participant.getSexe());
            dto.setStatus(participant.getStatus());
            return dto;
        }
    @Override
    public boolean deleteParticipant(ParticipantColonieDTO participantDTO) {
        Optional<ParticipantColonie> participant = participantColonieRepository.findById(participantDTO.getId());
        if (participant.isPresent()) {
            participantColonieRepository.delete(participant.get());
            return true;
        }
        return false;
    }
    @Override
    @Transactional
    public void deleteAllParticipants() {
        try {
            participantColonieRepository.deleteAll();
            System.out.println("Tous les participants ont été supprimés avec succès.");
        } catch (Exception e) {
            System.err.println("Erreur lors de la suppression de tous les participants : " + e.getMessage());
            throw e; // Assurez-vous que les exceptions sont propagées si nécessaire
        }
    }
    

    @Override
    public boolean  updateParticipant( ParticipantColonieDTO updatedParticipant) {
        Optional<ParticipantColonie> parOptional = participantColonieRepository.findById(updatedParticipant.getId());
        if (parOptional.isPresent()) {
            convertBase64FieldsToBytes(updatedParticipant);
            ParticipantColonie participant = modelMapper.map(updatedParticipant, ParticipantColonie.class);
            participantColonieRepository.save(participant);
            return true;
        } else {
            return false;
        }
}
  private void convertBase64FieldsToBytes(ParticipantColonieDTO participantDTO) {
        if (participantDTO.getFicheSocial() != null) {
            if (isValidBase64(participantDTO.getFicheSocial())) {
            participantDTO.setFicheSocialBytes(Base64.getDecoder().decode(participantDTO.getFicheSocial()));
            }else {
                System.err.println("Invalid Base64 string for ficheSociale: ");
            }
        }
        if (participantDTO.getDocument() != null) {
            if (isValidBase64(participantDTO.getDocument())) {
            participantDTO.setDocumentBytes(Base64.getDecoder().decode(participantDTO.getDocument()));
        }else {
            System.err.println("Invalid Base64 string for Document: ");
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
    private void convertBytesFieldsToBase64(ParticipantColonieDTO participantDTO) {
        if (participantDTO.getFicheSocialBytes() != null) {
            participantDTO.setFicheSocial(Base64.getEncoder().encodeToString(participantDTO.getFicheSocialBytes()));
        }
        if (participantDTO.getDocumentBytes() != null) {
            participantDTO.setDocument(Base64.getEncoder().encodeToString(participantDTO.getDocumentBytes()));
        }
    }
}
