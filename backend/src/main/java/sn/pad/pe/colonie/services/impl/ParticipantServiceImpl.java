package sn.pad.pe.colonie.services.impl;

import org.springframework.stereotype.Service;
import sn.pad.pe.colonie.dto.ParticipantDTO;
import sn.pad.pe.colonie.services.ParticipantService;
import sn.pad.pe.configurations.exception.ResourceNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("colonieParticipantServiceImpl")
public class ParticipantServiceImpl implements ParticipantService {

    private final List<ParticipantDTO> participantList = new ArrayList<>();


    @Override
    public ParticipantDTO saveParticipant(ParticipantDTO participantDTO) {
        participantList.add(participantDTO);
        return participantDTO;
    }

    @Override
    public ParticipantDTO getParticipantById(Long id) {
        return participantList.stream()
                .filter(participant -> participant.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Participant not found with id: " + id));
    }

    @Override
    public List<ParticipantDTO> getAllParticipants() {
        return participantList;
    }

    @Override
    public List<ParticipantDTO> getParticipantsByStatus(String status) {
        return participantList.stream()
                .filter(participant -> participant.getStatus().equals(status))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteParticipant(Long id) {
        participantList.removeIf(participant -> participant.getId().equals(id));
    }

    @Override
    public void updateParticipantStatus(Long id, String newStatus) {
        ParticipantDTO participant = getParticipantById(id);
        participant.setStatus(newStatus);
    }
    @Override
public ParticipantDTO updateParticipant(Long id, ParticipantDTO updatedParticipant) {
    ParticipantDTO participant = getParticipantById(id);
    participant.setNomEnfant(updatedParticipant.getNomEnfant());
    participant.setPrenomEnfant(updatedParticipant.getPrenomEnfant());
    participant.setDateNaissance(updatedParticipant.getDateNaissance());
    participant.setLieuNaissance(updatedParticipant.getLieuNaissance());
    participant.setGroupeSanguin(updatedParticipant.getGroupeSanguin());
    participant.setSexe(updatedParticipant.getSexe());
    participant.setMatriculeParent(updatedParticipant.getMatriculeParent());
    participant.setNomParent(updatedParticipant.getNomParent());
    participant.setPrenomParent(updatedParticipant.getPrenomParent());
    participant.setStatus(updatedParticipant.getStatus());
    participant.setMatriculeAgent(updatedParticipant.getMatriculeAgent());
    participant.setNomAgent(updatedParticipant.getNomAgent());
    participant.setPrenomAgent(updatedParticipant.getPrenomAgent());
    participant.setFicheSocial(updatedParticipant.getFicheSocial());
    participant.setDocument(updatedParticipant.getDocument());
    return participant;
}
}
