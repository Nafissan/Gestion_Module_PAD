package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.StockDTO;

public interface StockService {

	public List<StockDTO> getStocks();

	public StockDTO getStockById(Long id);

	public StockDTO getStockByCode(String code);

	public StockDTO getStockByAnneeAndType(String annee, String type);

	public StockDTO create(StockDTO stockDTO);

	public boolean update(StockDTO stockDTO);

	public boolean delete(StockDTO stockDTO);

	public List<StockDTO> createMultiple(List<StockDTO> stockDTOs);

	public StockDTO getStockByAnnee(String annee);
}
