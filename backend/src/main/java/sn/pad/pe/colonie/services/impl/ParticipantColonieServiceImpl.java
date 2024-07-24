package sn.pad.pe.colonie.services.impl;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.services.AgentService;
 
import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.bo.ParticipantColonie;
import sn.pad.pe.colonie.dto.ColonStatisticsDTO;
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.colonie.dto.ParticipantColonieDTO;
import sn.pad.pe.colonie.repositories.ParticipantColonieRepository;
import sn.pad.pe.colonie.services.DossierColonieService;
import sn.pad.pe.colonie.services.ParticipantColonieService;
import sn.pad.pe.configurations.exception.ParticipantColonieException;
import sn.pad.pe.configurations.sms.SmsService;
import sn.pad.pe.dotation.bo.Notification;
import sn.pad.pe.dotation.repositories.NotificationRepository;
@Service
public class ParticipantColonieServiceImpl implements ParticipantColonieService {

      @Autowired
    private ParticipantColonieRepository participantColonieRepository;

   @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private DossierColonieService dossierColonieService;
    @Autowired
    private AgentService agentService;
    @Override
    public ParticipantColonieDTO saveParticipant(ParticipantColonieDTO participantDTO) {
        convertBase64FieldsToBytes(participantDTO);
    
       
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
            List<ParticipantColonie> participants = participantColonieRepository.findByStatusIn(Arrays.asList("A VALIDER", "REJETER"));
            
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
       participants = getParticipantsByAnnee(annee);
    } else {
        participants = getAllParticipants();
    }

    ColonStatisticsDTO statistics = new ColonStatisticsDTO();
    statistics.setTotalColons((long) participants.size());

    long age7to10Count = participants.stream()
        .filter(participant -> {
            int age = calculateAge(participant.getDateNaissance());
            System.out.println("Participant: " + participant.getId() + ", Age: " + age); // Débogage
            return age >= 7 && age < 10;
        })
        .count();
    statistics.setAge7to10(age7to10Count);

    long age10to15Count = participants.stream()
        .filter(participant -> {
            int age = calculateAge(participant.getDateNaissance());
            return age >= 10 && age < 15;
        })
        .count();
    statistics.setAge10to15(age10to15Count);

    long age15to18Count = participants.stream()
        .filter(participant -> {
            int age = calculateAge(participant.getDateNaissance());
            return age >= 15 && age <= 18;
        })
        .count();
    statistics.setAge15to18(age15to18Count);

    statistics.setMaleCount(participants.stream().filter(participant -> "masculin".equalsIgnoreCase(participant.getSexe().toString())).count());
    statistics.setFemaleCount(participants.stream().filter(participant -> "feminin".equalsIgnoreCase(participant.getSexe().toString())).count());

    return statistics;
}

private int calculateAge(Date birthDate) {
    if (birthDate == null) {
        return 0; // ou gérer le cas différemment selon les besoins
    }
    LocalDate localBirthDate = birthDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    return Period.between(localBirthDate, LocalDate.now()).getYears();
}

@Override
public boolean updateParticipant(ParticipantColonieDTO updatedParticipant) {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    logger.info("Début de la mise à jour du participant avec ID : {}", updatedParticipant.getId());

    Optional<ParticipantColonie> parOptional = participantColonieRepository.findById(updatedParticipant.getId());
    if (parOptional.isPresent()) {
        logger.info("Participant trouvé avec ID : {}", updatedParticipant.getId());

        convertBase64FieldsToBytes(updatedParticipant);

        Optional<ParticipantColonie> existingParticipant = participantColonieRepository.findByNomEnfantAndPrenomEnfantAndDateNaissanceAndMatriculeParentAndStatus(
            updatedParticipant.getNomEnfant(), updatedParticipant.getPrenomEnfant(), updatedParticipant.getDateNaissance(), updatedParticipant.getMatriculeParent(),updatedParticipant.getStatus());
        
        if (existingParticipant.isPresent()) {
                logger.error("Ce colon existe déjà avec le statut VALIDER");
                throw new ParticipantColonieException("Ce colon existe déjà");
        }

        ParticipantColonie participant = modelMapper.map(updatedParticipant, ParticipantColonie.class);
        participantColonieRepository.save(participant);

        logger.info("Participant mis à jour et sauvegardé avec succès avec ID : {}", participant.getId());
        return true;
    } else {
        logger.warn("Participant non trouvé avec ID : {}", updatedParticipant.getId());
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


    @Override
    public boolean sendMessages() {
        Notification notificationColonie= notificationRepository.findByModule("COLONIE");
        
        if (notificationColonie.isActive()) {
            DossierColonieDTO dossierColonie= dossierColonieService.getDossierColonieByEtat();
            List<ParticipantColonie> participantColonies = participantColonieRepository.findByCodeDossierAndStatus(modelMapper.map(dossierColonie, DossierColonie.class),"VALIDER");
            for (ParticipantColonie d : participantColonies) {
                AgentDTO agent = agentService.getAgentByMatricule(d.getMatriculeParent()) ;

                // Send sms
                String sms = "Bonjour " + agent.getPrenom() + " " + agent.getNom()
                        + ".Votre enfant repondant au nom de "+d.getPrenomEnfant()+" "+d.getNomEnfant()+" ne le "+d.getDateNaissance()+" est selectionne pour participe a la colonie de vacances de l'annee "+d.getCodeDossier().getAnnee()+ ". Vous recevrez dans les jours qui viennent le note d'instruction concernant la colonie.";

             SmsService.send(agent.getMatricule(),"776844623", sms);
            }
            return true;
        }
        return false;
    }
    
}
