package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.dto.ColonDTO;

public interface ColonService {
    public List<ColonDTO> getColons();
    ColonDTO saveColon(ColonDTO colonDTO);

	public ColonDTO getColonByMatriculeParent(String matricule);
	public ColonDTO getColonByCodeDossier(String  code);

	public boolean update(ColonDTO colonDTO);
    public ColonDTO getColonById(Long id);

	public boolean deleteColonById(Long id);
}
