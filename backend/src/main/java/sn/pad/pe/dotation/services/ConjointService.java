package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.ConjointDTO;

public interface ConjointService {

	public List<ConjointDTO> getConjoints();

	public ConjointDTO getConjointById(Long id);

	public boolean update(ConjointDTO conjointDto);

	public boolean delete(ConjointDTO conjointDto);

}
