package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.DomaineDTO;

public interface DomaineService {

	public List<DomaineDTO> getDomaine();

	public DomaineDTO getDomaineById(Long id);

	public DomaineDTO create(DomaineDTO domaineDtO);

	public boolean update(DomaineDTO domaineDtO);

	public boolean delete(DomaineDTO domaineDtO);
}
