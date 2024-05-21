package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.SuiviStockDTO;

public interface SuiviStockService {

	public List<SuiviStockDTO> getSuiviStockDTOs();

	public List<SuiviStockDTO> getSuiviStocksByStock(Long idStock);

	public SuiviStockDTO getStockById(Long id);

	public SuiviStockDTO create(SuiviStockDTO suiviStockDTO);

	public boolean update(SuiviStockDTO suiviStockDTO);

	public boolean delete(SuiviStockDTO suiviStockDTO);

	public SuiviStockDTO addCorrectionStock(SuiviStockDTO suiviStockDTO);

	public List<SuiviStockDTO> getSuiviStocksByStockAndCategorie(Long idStock);
}
