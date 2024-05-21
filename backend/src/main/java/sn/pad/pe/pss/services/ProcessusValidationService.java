package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.ProcessusValidationDTO;

public interface ProcessusValidationService {

	public List<ProcessusValidationDTO> getProcessusValidations();

	public ProcessusValidationDTO getProcessusValidation(Long id);

	public ProcessusValidationDTO getProcessusValidationByLibelle(String libelle);

	public ProcessusValidationDTO create(ProcessusValidationDTO processusValidationDTO);

	public boolean update(ProcessusValidationDTO processusValidationDTO);

	public boolean delete(ProcessusValidationDTO processusValidationDTO);

}
