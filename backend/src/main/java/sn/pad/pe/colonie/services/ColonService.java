package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.dto.ColonDTO;

public interface ColonService {
    public List<ColonDTO> getColons();

	public ColonDTO getColonByMatriculeParent(String matricule);
	public ColonDTO getColonByCodeDossier(String  code);

	public boolean update(ColonDTO colonDTO);

	public boolean delete(ColonDTO colonDTO);
}
