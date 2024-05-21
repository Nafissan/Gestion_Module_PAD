package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.FournisseurDTO;

public interface FournisseurService {

	public List<FournisseurDTO> getFournisseurs();

	public FournisseurDTO getFounisseurById(Long id);

	public FournisseurDTO saveFounisseur(FournisseurDTO fournisseurDto);

	public boolean update(FournisseurDTO fournisseurDto);

	public boolean delete(FournisseurDTO fournisseurDto);

}
