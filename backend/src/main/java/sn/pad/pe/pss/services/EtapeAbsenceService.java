package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.dto.EtapeAbsenceDTO;

/**
 * 
 * @author abdou.diop
 *
 */
public interface EtapeAbsenceService {

	public List<EtapeAbsenceDTO> getEtapeAbsence();

	public EtapeAbsenceDTO getEtapeAbsenceById(Long id);

	public EtapeAbsenceDTO createEtapeAbsence(EtapeAbsenceDTO etapeabsenceDTO);

	public boolean updateEtapeAbsence(EtapeAbsenceDTO etapeabsence);

	public boolean deleteEtapeAbsence(EtapeAbsenceDTO etapeabsence) throws ResourceNotFoundException;

}
