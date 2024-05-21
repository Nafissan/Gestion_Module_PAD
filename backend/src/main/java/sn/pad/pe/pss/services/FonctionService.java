package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.dto.FonctionDTO;

/**
 * 
 * @author charle.sarr
 *
 */
public interface FonctionService {

	public List<FonctionDTO> getFonctions();

	public List<FonctionDTO> getFonctionByNom(String nom);

	public FonctionDTO getFonctionById(Long id);

	public FonctionDTO create(FonctionDTO fonctionDTO);

	public boolean update(FonctionDTO fonctionDTO);

	public boolean delete(FonctionDTO fonctionDTO) throws ResourceNotFoundException;

	public List<FonctionDTO> getFonctionByUniteOrganisationnelle(Long id);

}
