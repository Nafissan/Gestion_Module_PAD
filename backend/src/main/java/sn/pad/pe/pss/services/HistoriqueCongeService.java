package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.HistoriqueCongeDTO;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface HistoriqueCongeService {

	public List<HistoriqueCongeDTO> getHistoriqueConges();

	public List<HistoriqueCongeDTO> getHistoriqueCongesByConge(Long idConge);

	public HistoriqueCongeDTO getHistoriqueCongeById(Long id);

	public HistoriqueCongeDTO createHistoriqueConge(HistoriqueCongeDTO historiqueCongeDTO);

	public boolean updateHistoriqueConge(HistoriqueCongeDTO historiqueCongeDTO);

	public boolean deteleHistoriqueConge(HistoriqueCongeDTO historiqueCongeDTO);

}
