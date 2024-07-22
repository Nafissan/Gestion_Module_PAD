package sn.pad.pe.colonie.services.impl;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.bo.ParticipantColonie;
import sn.pad.pe.colonie.dto.ColonStatisticsDTO;
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.colonie.dto.ParticipantColonieDTO;
import sn.pad.pe.colonie.repositories.ParticipantColonieRepository;
import sn.pad.pe.colonie.services.DossierColonieService;
import sn.pad.pe.colonie.services.ParticipantColonieService;
@Service
public class ParticipantColonieServiceImpl implements ParticipantColonieService {

      @Autowired
    private ParticipantColonieRepository participantColonieRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private DossierColonieService dossierColonieService;
    @Override
    public ParticipantColonieDTO saveParticipant(ParticipantColonieDTO participantDTO) {
        convertBase64FieldsToBytes(participantDTO);
    
        Optional<ParticipantColonie> existingParticipant = participantColonieRepository.findByNomEnfantAndPrenomEnfantAndDateNaissanceAndMatriculeParent(
        participantDTO.getNomEnfant(), participantDTO.getPrenomEnfant(), participantDTO.getDateNaissance(), participantDTO.getMatriculeParent());

        if (existingParticipant.isPresent()) {
            if ("VALIDER".equalsIgnoreCase(existingParticipant.get().getStatus())) {
                throw new IllegalStateException("Ce colon existe déjà");
            }
        }
        DossierColonie dossier = modelMapper.map(dossierColonieService.getDossierColonieByEtat(),DossierColonie.class);
        participantDTO.setCodeDossier(dossier);
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
@Override
public List<ParticipantColonieDTO> getParticipantsByDossierEtat() {
    DossierColonieDTO dossierColonie =dossierColonieService.getDossierColonieByEtat(); 
    if (dossierColonie!= null) {
        return getParticipantsByDossierId(modelMapper.map(dossierColonie, DossierColonie.class));
    }
    return new ArrayList<>();
}
@Override
public List<ParticipantColonieDTO> getParticipantsByDossierId(DossierColonie dossierId) {
    List<ParticipantColonie> participants = participantColonieRepository.findByCodeDossier(dossierId);
    
    return participants.stream()
                       .map(participant -> {
                        ParticipantColonieDTO dto = mapToDto(participant);
                        convertBytesFieldsToBase64(dto);
                        return dto;
                    })
                    .collect(Collectors.toList());
}
        private ParticipantColonieDTO mapToDto(ParticipantColonie participant){
            ParticipantColonieDTO dto = modelMapper.map(participant, ParticipantColonieDTO.class);
            dto.setDocumentBytes(participant.getDocument());
            dto.setFicheSocialBytes(participant.getFicheSocial());
            dto.setPhotoBytes(participant.getPhoto());
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
    public void deleteAllParticipants() {
        try {
            List<ParticipantColonie> participants = participantColonieRepository.findByStatusIn(List.of("A VALIDER", "REJETER"));
            
            participantColonieRepository.deleteAll(participants);
            
            System.out.println("Tous les participants avec le statut 'A VALIDER' ou 'REJETER' ont été supprimés avec succès.");
        } catch (Exception e) {
            System.err.println("Erreur lors de la suppression des participants : " + e.getMessage());
        }
    }
    
    @Override
public List<ParticipantColonieDTO> getParticipantsValider() {
    DossierColonieDTO dossier = dossierColonieService.getDossierColonieByEtat();
    if(dossier != null ){
        List<ParticipantColonie> participants = participantColonieRepository.findByCodeDossierAndStatus(modelMapper.map(dossier, DossierColonie.class),"VALIDER");
        return participants.stream()
                .map(participant -> {
                    ParticipantColonieDTO dto = mapToDto(participant);
                    convertBytesFieldsToBase64(dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }
    return new ArrayList<>();
}
@Override
public List<ParticipantColonieDTO> getParticipantsByAnnee(String annee) {
    DossierColonieDTO dossier = dossierColonieService.getDossierColonieByAnnee(annee);
    if (dossier != null) {
        List<ParticipantColonie> participants = participantColonieRepository.findByCodeDossierAndStatus(modelMapper.map(dossier, DossierColonie.class),"VALIDER");
        return participants.stream()
                .map(participant -> {
                    ParticipantColonieDTO dto = mapToDto(participant);
                    convertBytesFieldsToBase64(dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }
    return new ArrayList<>();
}
@Override
public ColonStatisticsDTO getParticipantStatisticsByAnnee(String annee) {
    List<ParticipantColonieDTO> participants;
    if (annee != null && !annee.isEmpty()) {
       participants =getParticipantsByAnnee(annee);
    } else {
        participants = getAllParticipants();
    }

    ColonStatisticsDTO statistics = new ColonStatisticsDTO();
    statistics.setTotalColons((long) participants.size());
    statistics.setAge7to10(participants.stream().filter(participant -> calculateAge(participant.getDateNaissance()) >= 7 && calculateAge(participant.getDateNaissance()) < 10).count());
    statistics.setAge10to15(participants.stream().filter(participant -> calculateAge(participant.getDateNaissance()) >= 10 && calculateAge(participant.getDateNaissance()) < 15).count());
    statistics.setAge15to18(participants.stream().filter(participant -> calculateAge(participant.getDateNaissance()) >= 15 && calculateAge(participant.getDateNaissance()) < 18).count());

    statistics.setMaleCount(participants.stream().filter(participant -> "masculin".equalsIgnoreCase(participant.getSexe().toString())).count());
    statistics.setFemaleCount(participants.stream().filter(participant -> "feminin".equalsIgnoreCase(participant.getSexe().toString())).count());

    return statistics;
}

private int calculateAge(Date birthDate) {
    LocalDate localBirthDate = birthDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    return Period.between(localBirthDate, LocalDate.now()).getYears();
}
  @Override
    public boolean updateParticipant(ParticipantColonieDTO updatedParticipant) {
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
        if (participantDTO.getPhoto() != null) {
            if (isValidBase64(participantDTO.getPhoto())) {
            participantDTO.setPhotoBytes(Base64.getDecoder().decode(participantDTO.getPhoto()));
        }else {
            System.err.println("Invalid Base64 string for Photo: ");
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
        if (participantDTO.getPhotoBytes() != null) {
            participantDTO.setPhoto(Base64.getEncoder().encodeToString(participantDTO.getPhotoBytes()));
        }
    }
    
}
