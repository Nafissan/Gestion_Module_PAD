package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.dto.ParticipantDTO;

public interface ParticipantService {
    ParticipantDTO saveParticipant(ParticipantDTO participantDTO);

    List<ParticipantDTO> getAllParticipants();

    boolean deleteParticipant(Long id);
    void deleteAllParticipants();  
    boolean updateParticipantStatus(Long id, String newStatus);
    boolean updateParticipant(ParticipantDTO updatedParticipant);
}
