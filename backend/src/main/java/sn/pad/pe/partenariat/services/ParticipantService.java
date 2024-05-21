package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.ParticipantDTO;

public interface ParticipantService {
	public List<ParticipantDTO> getParticipants();

	public ParticipantDTO getParticipantById(Long id);

	public List<ParticipantDTO> getParticipantByCode(int code);

	public ParticipantDTO create(ParticipantDTO participantDto);

	public boolean update(ParticipantDTO participantDto);

	public boolean delete(ParticipantDTO participantDto);

	public List<ParticipantDTO> createMultiple(List<ParticipantDTO> participantDtos);

}
