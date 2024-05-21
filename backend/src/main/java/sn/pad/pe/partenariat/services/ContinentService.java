package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.ContinentDTO;

public interface ContinentService {

	public List<ContinentDTO> getContinents();

	public ContinentDTO getContinentById(Long id);

	public ContinentDTO getContinentByCode(String code);

	public ContinentDTO create(ContinentDTO continentDto);

	public boolean update(ContinentDTO continentDto);

	public boolean delete(ContinentDTO continentDto);

	public List<ContinentDTO> createMultiple(List<ContinentDTO> continentDtos);
}
