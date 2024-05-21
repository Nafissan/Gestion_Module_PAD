package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.dto.MotifDTO;

public interface MotifService {
	public List<MotifDTO> getMotif();

	public MotifDTO getMotifById(Long id);

	public MotifDTO createMotif(MotifDTO motifDTO);

	public boolean updateMotif(MotifDTO motifDTO);

	public boolean deleteMotif(MotifDTO motifDTO) throws ResourceNotFoundException;

}
