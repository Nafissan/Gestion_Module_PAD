package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.SuiviDotationDTO;

public interface SuiviDotationService {

	public List<SuiviDotationDTO> getSuiviDotationDTOs(Long idDotation);

	public List<SuiviDotationDTO> getSuiviDotationsByDotation(String code);

	public SuiviDotationDTO create(SuiviDotationDTO suiviDotationDTO);

	public List<SuiviDotationDTO> getSuiviDotationsByAnneeAndMois(int annee, String mois);

	public List<SuiviDotationDTO> getSuiviDotationsByDotationAndAnneeAndMois(Long id, int annee, String mois);
}
