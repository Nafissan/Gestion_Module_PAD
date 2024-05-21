package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.DossierAbsenceDTO;

/**
 * 
 * @author abdou.diop
 * 
 */
public interface DossierAbsenceService {

	public List<DossierAbsenceDTO> getDossierAbsences();

//	public List<DossierAbsenceDTO> getgetDossierAbsencesByDossierConge(Long idDossierConge);
//	public DossierAbsenceDTO getPlanningDirectionsByCodeDirectionAndDossierConge(String codeDirection, Long idDossierConge);

	public DossierAbsenceDTO getDossierAbsenceById(Long id);

	public DossierAbsenceDTO createDossierAbsence(DossierAbsenceDTO dossierAbsenceDTO);

	public boolean updateDossierAbsence(DossierAbsenceDTO dossierAbsenceDTO);

	public boolean deteleDossierAbsence(DossierAbsenceDTO dossierAbsenceDTO);

	public List<DossierAbsenceDTO> findDossierAbsenceByAnnee(int annee);

}
