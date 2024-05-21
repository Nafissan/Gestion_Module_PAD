package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.ActiviteDTO;

public interface ActiviteService {

	public List<ActiviteDTO> getActivite();

	public ActiviteDTO getActiviteById(Long id);

	public ActiviteDTO getActiviteByCode(String code);

	public ActiviteDTO create(ActiviteDTO activiteDto);

	public boolean update(ActiviteDTO activiteDto);

	public boolean delete(ActiviteDTO activiteDto);

	public List<ActiviteDTO> createMultiple(List<ActiviteDTO> activiteDto);
}
