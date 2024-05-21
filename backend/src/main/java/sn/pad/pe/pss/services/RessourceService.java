package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.RessourceDTO;

public interface RessourceService {

	public List<RessourceDTO> getRessources();

	public RessourceDTO getRessourceById(String codeRessource);

	public RessourceDTO create(RessourceDTO ressourceDTO);

	public boolean update(RessourceDTO ressourceDTO);

	public boolean delete(RessourceDTO ressourceDTO);

}
