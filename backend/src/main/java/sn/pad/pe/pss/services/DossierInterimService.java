package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.DossierInterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;

/**
 * 
 * @author cheikhibra.samb
 *
 */
public interface DossierInterimService {

	public List<DossierInterimDTO> getDossierInterims();

	public DossierInterimDTO getDossierInterimById(Long id);

	public DossierInterimDTO dossierInterimByUniteOrganisationnelleAndAnnee(
			UniteOrganisationnelleDTO uniteOrganisationnelleDTO, int annee);

	public List<DossierInterimDTO> findDossierInterimByAnnee(int annee);

	public DossierInterimDTO createDossierInterim(DossierInterimDTO dossierInterimDTO);

	public boolean updateDossierInterim(DossierInterimDTO dossierInterimDTO);

	public boolean deteleDossierInterim(DossierInterimDTO dossierInterimDTO);
}
