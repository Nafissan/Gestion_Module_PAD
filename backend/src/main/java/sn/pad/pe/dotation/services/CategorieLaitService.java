package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.CategorieLaitDTO;

public interface CategorieLaitService {

	public List<CategorieLaitDTO> getCategoriesLait();

	public CategorieLaitDTO getCategorieLaitById(Long id);

	public CategorieLaitDTO create(CategorieLaitDTO categorieLaitDto);

	public boolean update(CategorieLaitDTO categorieLaitDto);

	public boolean delete(CategorieLaitDTO categorieLaitDto);

}
