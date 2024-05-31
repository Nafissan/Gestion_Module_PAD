package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.dto.DossierColonieDTO;

public interface DossierColonieService {
    public List<DossierColonieDTO> getDossierColonies();

	public DossierColonieDTO getDossierColonieById(Long id);

	public DossierColonieDTO getDossierColonieByAnnee(String annee);

	public DossierColonieDTO createDossierColonie(DossierColonieDTO dossierColonieDTODossierColonieDTO);

	public boolean updateDossierColonie(DossierColonieDTO dossierColonieDTODossierColonieDTO);

	public     boolean deleteDossierColonieById(Long id);

}