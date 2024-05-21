package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.EnfantDTO;

public interface EnfantService {

	public List<EnfantDTO> getEnfants();

	public EnfantDTO getEnfantById(Long id);

	public boolean update(EnfantDTO enfantDto);

	public boolean delete(EnfantDTO enfantDto);

}
