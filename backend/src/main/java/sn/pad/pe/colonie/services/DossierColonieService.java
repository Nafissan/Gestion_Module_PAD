package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.dto.DossierColonieDTO;

public interface DossierColonieService {
    public List<DossierColonieDTO> getDossierColonies();

	public DossierColonieDTO getDossierColonieByAnnee(String annee);

	public DossierColonieDTO createDossierColonie(DossierColonieDTO dossierColonieDTODossierColonieDTO);
    List<DossierColonieDTO> getDossiersColoniesFerme();

	public DossierColonieDTO getDossierColonieByEtat();
	public boolean updateDossierColonie(DossierColonieDTO dossierColonieDTODossierColonieDTO);

	public     boolean deleteDossierColonie(DossierColonieDTO dossierColonieDTODossierColonieDTO);

}