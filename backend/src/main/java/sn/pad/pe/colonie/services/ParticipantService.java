package sn.pad.pe.colonie.services;

import sn.pad.pe.colonie.dto.ParticipantDTO;

import java.util.List;

public interface ParticipantService {
    ParticipantDTO saveParticipant(ParticipantDTO participantDTO);

    List<ParticipantDTO> getAllParticipants();

    boolean deleteParticipant(Long id);

    boolean updateParticipantStatus(Long id, String newStatus);
    boolean updateParticipant(ParticipantDTO updatedParticipant);
}
