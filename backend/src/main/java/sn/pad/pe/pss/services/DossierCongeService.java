package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.DossierCongeDTO;

/**
 * 
 * @author mamadouseydou.diallo
 * 
 */
public interface DossierCongeService {

	public List<DossierCongeDTO> getDossierConges();

	public DossierCongeDTO getDossierCongeById(Long id);

	public DossierCongeDTO getDossierCongeByAnnee(String annee);

	public DossierCongeDTO createDossierConge(DossierCongeDTO dossierCongeDTO);

	public boolean updateDossierConge(DossierCongeDTO dossierCongeDTO);

	public boolean deteleDossierConge(DossierCongeDTO dossierCongeDTO);

}
