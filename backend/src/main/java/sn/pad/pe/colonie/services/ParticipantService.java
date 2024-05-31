package sn.pad.pe.colonie.services;

import sn.pad.pe.colonie.dto.ParticipantDTO;

import java.util.List;

public interface ParticipantService {
    ParticipantDTO saveParticipant(ParticipantDTO participantDTO);

    ParticipantDTO getParticipantById(Long id);

    List<ParticipantDTO> getAllParticipants();

    List<ParticipantDTO> getParticipantsByStatus(String status);

    void deleteParticipant(Long id);

    void updateParticipantStatus(Long id, String newStatus);
    ParticipantDTO updateParticipant(Long id, ParticipantDTO updatedParticipant);
}
