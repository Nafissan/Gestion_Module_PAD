package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Motif;
import sn.pad.pe.pss.dto.MotifDTO;
import sn.pad.pe.pss.repositories.MotifRepository;
import sn.pad.pe.pss.services.MotifService;

@Service
public class MotifServiceImpl implements MotifService {
	@Autowired
	private MotifRepository motifRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<MotifDTO> getMotif() {
		List<MotifDTO> motifs = motifRepository.findAll().stream().map(motif -> modelMapper.map(motif, MotifDTO.class))
				.collect(Collectors.toList());
		return motifs;
	}

	@Override
	public MotifDTO getMotifById(Long id) {
		Optional<Motif> motif = motifRepository.findById(id);
		if (motif.isPresent()) {
			return modelMapper.map(motif.get(), MotifDTO.class);
		} else {
			throw new ResourceNotFoundException("motif not found with id : " + id);
		}
	}

	@Override
	public MotifDTO createMotif(MotifDTO motifDTO) {
		Motif motifSave = modelMapper.map(motifDTO, Motif.class);
		return modelMapper.map(motifRepository.save(motifSave), MotifDTO.class);
	}

	@Override
	public boolean updateMotif(MotifDTO motifDTO) {
		boolean isupdate = false;
		Optional<Motif> motif = motifRepository.findById(motifDTO.getId());
		if (motif.isPresent()) {
			motifRepository.save(modelMapper.map(motifDTO, Motif.class));
			isupdate = true;
		}
		return isupdate;
	}

	@Override
	public boolean deleteMotif(MotifDTO motifDTO) {
		boolean isdelete = false;
		Optional<Motif> motif = motifRepository.findById(motifDTO.getId());
		if (motif.isPresent()) {
			motifRepository.delete(modelMapper.map(motifDTO, Motif.class));
			isdelete = true;
		}
		return isdelete;
	}

}
