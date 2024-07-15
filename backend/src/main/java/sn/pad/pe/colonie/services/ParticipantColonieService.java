package sn.pad.pe.colonie.services;

import java.util.List;


import sn.pad.pe.colonie.dto.ParticipantColonieDTO;
public interface ParticipantColonieService {
    ParticipantColonieDTO saveParticipant(ParticipantColonieDTO participantDTO);

    List<ParticipantColonieDTO> getAllParticipants();
    List<ParticipantColonieDTO> getParticipantsByDossierId(Long dossierId); // Nouvelle méthode
    public List<ParticipantColonieDTO> getParticipantsByDossierEtat();
    boolean deleteParticipant(ParticipantColonieDTO participantDTO);
    void deleteAllParticipants();  
    boolean updateParticipant(ParticipantColonieDTO updatedParticipant);
}
