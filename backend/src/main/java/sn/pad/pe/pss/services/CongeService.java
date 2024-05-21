package sn.pad.pe.pss.services;

import java.util.Date;
import java.util.List;

import sn.pad.pe.pss.dto.CongeDTO;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface CongeService {

	public CongeDTO getCongeById(Long id);

	public List<CongeDTO> getCongeByAgent(Long idAgent);

	public CongeDTO getCongeByCodeDecision(String codeDecision);

	public List<CongeDTO> getConges();

	public List<CongeDTO> getCongesByPlanningCongeAndEtat(Long idPlanningCongeDTO, String etat);

	public List<CongeDTO> getCongesByPlanningConge(Long idPlanningCongeDTO);

	public List<CongeDTO> getCongesByDateBetween(Date dateDepart, Date dateRetourEffectif);

	public CongeDTO createConge(CongeDTO congeDTO);

	public List<CongeDTO> createAllConge(List<CongeDTO> congesDTO);

	public boolean updateConge(CongeDTO congeDTO);

	public boolean updateCongeMany(List<CongeDTO> congeDTOs);

	public boolean deteleConge(CongeDTO congeDTO);

	public List<CongeDTO> getCongeByDossierConge(Long idDossierConge);

	public List<CongeDTO> getAllCongeByAnne(int annee);

	public List<CongeDTO> getCongesByPlanningCongeAndAnnee(Long idPlanningCongeDTO, String annee);

}
