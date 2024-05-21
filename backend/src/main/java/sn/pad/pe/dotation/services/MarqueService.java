package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.MarqueDTO;

public interface MarqueService {

	public MarqueDTO create(MarqueDTO marqueDto);

	public List<MarqueDTO> getMarques();

	public MarqueDTO getMarqueById(Long id);

	public boolean update(MarqueDTO marqueDto);

	public boolean delete(MarqueDTO marqueDto);

}
