package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.ProspectDTO;

public interface ProspectService {
	public List<ProspectDTO> getProspects();

	public ProspectDTO getProspectById(Long id);

	public List<ProspectDTO> getProspectByCode(int code);

	public ProspectDTO create(ProspectDTO prospectDto);

	public boolean update(ProspectDTO prospectDto);

	public boolean delete(ProspectDTO prospectDto);

	public List<ProspectDTO> createMultiple(List<ProspectDTO> prospectDtos);

	public List<ProspectDTO> getProspectByPlanProspection(long id);

	public boolean qualifierProspectPotentiel(long id, boolean estPotentiel,  boolean estPartenaire);

}
