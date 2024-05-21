package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.EtapeValidationDTO;

public interface EtapeValidationService {

	public List<EtapeValidationDTO> getEtapeValidations();

	public EtapeValidationDTO getEtapeValidation(Long id);

	public EtapeValidationDTO getEtapeValidationByNumeroOrdre(int numeroOrdre);

	public EtapeValidationDTO getEtapeValidationByAction(String action);

	public EtapeValidationDTO create(EtapeValidationDTO etapeValidationDTO);

	public boolean update(EtapeValidationDTO etapeValidationDTO);

	public boolean delete(EtapeValidationDTO etapeValidationDTO);

}
