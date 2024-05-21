package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.dto.NiveauHierarchiqueDTO;

/**
 * 
 * @author charle.sarr
 *
 */
public interface NiveauHierarchiqueService {

	public List<NiveauHierarchiqueDTO> getNiveauxHierarchique();

	public NiveauHierarchiqueDTO getNiveauHierarchiqueById(Long id);

	public NiveauHierarchiqueDTO create(NiveauHierarchiqueDTO niveauHierarchiqueDTO);

	public NiveauHierarchiqueDTO getNiveauHierarchiqueByPosition(int position);

	public boolean update(NiveauHierarchiqueDTO niveauHierarchiqueDTO);

	public boolean delete(NiveauHierarchiqueDTO niveauHierarchiqueDTO) throws ResourceNotFoundException;

}
