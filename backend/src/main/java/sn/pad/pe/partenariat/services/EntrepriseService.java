package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.EntrepriseDTO;

public interface EntrepriseService {
	public List<EntrepriseDTO> getEntreprises();

	public EntrepriseDTO getEntrepriseById(Long id);

	public List<EntrepriseDTO> getEntrepriseByCode(String code);

	public EntrepriseDTO create(EntrepriseDTO entrepriseDto);

	public boolean update(EntrepriseDTO entrepriseDto);

	public boolean delete(EntrepriseDTO entrepriseDto);

	public List<EntrepriseDTO> createMultiple(List<EntrepriseDTO> entrepriseDtos);

}
