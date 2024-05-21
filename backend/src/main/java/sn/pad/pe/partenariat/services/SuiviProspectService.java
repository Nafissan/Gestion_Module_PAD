package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.SuiviProspectDTO;

public interface SuiviProspectService {
	public List<SuiviProspectDTO> getSuiviProspects();

	public SuiviProspectDTO create(SuiviProspectDTO suiviprospectDto);

	public boolean update(SuiviProspectDTO suiviprospectDto);

	public boolean delete(SuiviProspectDTO suiviprospectDto);

	public List<SuiviProspectDTO> createMultiple(List<SuiviProspectDTO> suiviprospectDtos);

	public List<SuiviProspectDTO> getSuiviByProspectId(long id);

}