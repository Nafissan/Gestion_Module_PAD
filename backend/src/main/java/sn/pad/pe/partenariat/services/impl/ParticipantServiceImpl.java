package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Participant;
import sn.pad.pe.partenariat.dto.ParticipantDTO;
import sn.pad.pe.partenariat.repositories.ParticipantRepository;
import sn.pad.pe.partenariat.services.ParticipantService;

@Service
public class ParticipantServiceImpl implements ParticipantService {
	@Autowired
	private ParticipantRepository participantRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ParticipantDTO> getParticipants() {
		List<ParticipantDTO> participantDtos = participantRepository.findAll().stream()
				.map(participant -> modelMapper.map(participant, ParticipantDTO.class)).collect(Collectors.toList());
		return participantDtos;
	}

	@Override
	public ParticipantDTO getParticipantById(Long id) {
		Optional<Participant> participant = participantRepository.findById(id);
		if (participant.isPresent()) {
			return modelMapper.map(participant.get(), ParticipantDTO.class);
		} else {
			throw new ResourceNotFoundException("Participant not found with id : " + id);
		}
	}

	@Override
	public List<ParticipantDTO> getParticipantByCode(int code) {
		List<ParticipantDTO> participantDtos = participantRepository.findParticipantByStatut(code).stream()
				.map(participant -> modelMapper.map(participant, ParticipantDTO.class)).collect(Collectors.toList());
		return participantDtos;
	}

	@Override
	public ParticipantDTO create(ParticipantDTO participantDto) {
		Participant participantSaved = modelMapper.map(participantDto, Participant.class);
		return modelMapper.map(participantRepository.save(participantSaved), ParticipantDTO.class);
	}

	@Override
	public boolean update(ParticipantDTO participantDto) {
		Optional<Participant> participantUpdate = participantRepository.findById(participantDto.getId());
		boolean isUpdated = false;
		if (participantUpdate.isPresent()) {
			participantRepository.save(modelMapper.map(participantDto, Participant.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(ParticipantDTO participantDto) {
		Optional<Participant> participantToDelete = participantRepository.findById(participantDto.getId());
		boolean isDeleted = false;
		if (participantToDelete.isPresent()) {
			participantRepository.delete(participantToDelete.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<ParticipantDTO> createMultiple(List<ParticipantDTO> participantDtos) {
		List<Participant> participants = participantDtos.stream()
				.map(participantDto -> modelMapper.map(participantDto, Participant.class)).collect(Collectors.toList());

		participantDtos = participantRepository.saveAll(participants).stream()
				.map(participant -> modelMapper.map(participant, ParticipantDTO.class)).collect(Collectors.toList());
		return participantDtos;
	}

}
