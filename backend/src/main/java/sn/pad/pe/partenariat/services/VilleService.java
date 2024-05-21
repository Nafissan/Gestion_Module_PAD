package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.VilleDTO;

public interface VilleService {

	public List<VilleDTO> getVille();

	public VilleDTO getVilleById(Long id);

	public VilleDTO getVilleByCode(String code);

	public VilleDTO create(VilleDTO villeDto);

	public boolean update(VilleDTO villeDto);

	public boolean delete(VilleDTO villeDto);

	public List<VilleDTO> createMultiple(List<VilleDTO> villeDtos);
}
