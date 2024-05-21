package sn.pad.pe.dotation.services.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.Stock;
import sn.pad.pe.dotation.bo.SuiviStock;
import sn.pad.pe.dotation.dto.StockDTO;
import sn.pad.pe.dotation.dto.SuiviStockDTO;
import sn.pad.pe.dotation.repositories.StockRepository;
import sn.pad.pe.dotation.repositories.SuiviStockRepository;
import sn.pad.pe.dotation.services.StockService;
import sn.pad.pe.dotation.services.SuiviStockService;

@Service
@Transactional
public class SuiviStockServiceImpl implements SuiviStockService {

	@Autowired
	private SuiviStockRepository suiviStockRepository;
	@Autowired
	private StockRepository stockRepository;
	@Autowired
	private StockService stockService;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<SuiviStockDTO> getSuiviStockDTOs() {
		List<SuiviStockDTO> stockDTOs = suiviStockRepository.findAll(Sort.by(Direction.DESC, "id")).stream()
				.map(stock -> modelMapper.map(stock, SuiviStockDTO.class)).collect(Collectors.toList());
		return stockDTOs;
	}

	@Override
	public SuiviStockDTO getStockById(Long id) {
		Optional<SuiviStock> suiviStockOptional = suiviStockRepository.findById(id);
		if (suiviStockOptional.isPresent()) {
			return modelMapper.map(suiviStockOptional.get(), SuiviStockDTO.class);
		} else {
			throw new ResourceNotFoundException("SuiviStock not found with id : " + id);
		}
	}

	@Override
	public List<SuiviStockDTO> getSuiviStocksByStock(Long idStock) {

		Optional<Stock> stockOptional = stockRepository.findById(idStock);

		if (stockOptional.isPresent()) {

			return suiviStockRepository.findSuiviStockByStock(stockOptional.get()).stream()
					.map(stock -> modelMapper.map(stock, SuiviStockDTO.class)).collect(Collectors.toList());
		} else {
			throw new ResourceNotFoundException("List SuiviStock not found with code_stock : " + idStock);
		}
	}

	@Override
	public SuiviStockDTO create(SuiviStockDTO suiviStockDTO) {

		SuiviStock suiviStockToSave = modelMapper.map(suiviStockDTO, SuiviStock.class);

		SuiviStock suiviStockSaved = null;

		Calendar calendar = new GregorianCalendar();
		Optional<Stock> stockAnnee = stockRepository.findStockByAnnee("" + calendar.get(Calendar.YEAR));
		if (!stockAnnee.isPresent()) {

			StockDTO stockDTO = new StockDTO();

			stockDTO.setQuantiteCourant(0);
			stockDTO.setQuantiteRestant(0);
			stockDTO.setQuantiteInitial(0);
			stockDTO.setSeuilMinimum(25);
			stockDTO.setQuantiteReference(suiviStockDTO.getQuantite());

			StockDTO stockDTOSaved = stockService.create(stockDTO);
			stockAnnee = Optional.of(modelMapper.map(stockDTOSaved, Stock.class));
		} else {
			Stock stock = stockAnnee.get();
			stock.setQuantiteCourant(stock.getQuantiteCourant() + suiviStockToSave.getQuantite());
			stock.setQuantiteReference(stock.getQuantiteReference() + suiviStockToSave.getQuantite());
			stock.setSeuilMinimum(25);
			stockAnnee = Optional.of(stock);
		}

		/*
		 * Ajouter une nouvelle acquisition Ajouter un nouveau Suivi stock
		 */
		suiviStockToSave.setDateOperation(new Date());
		suiviStockToSave.setStock(stockAnnee.get());

		suiviStockSaved = suiviStockRepository.save(suiviStockToSave);

		return modelMapper.map(suiviStockSaved, SuiviStockDTO.class);
	}

	@Override
	public boolean update(SuiviStockDTO suiviStockDTO) {
		Optional<SuiviStock> suiviStockToUpdate = suiviStockRepository.findById(suiviStockDTO.getId());
		boolean isDeleleted = false;
		if (suiviStockToUpdate.isPresent()) {
			suiviStockRepository.save(modelMapper.map(suiviStockToUpdate, SuiviStock.class));
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public boolean delete(SuiviStockDTO suiviStockDTO) {
		Optional<SuiviStock> suiviStockToDelete = suiviStockRepository.findById(suiviStockDTO.getId());
		boolean isDeleted = false;
		if (suiviStockToDelete.isPresent()) {
			suiviStockRepository.delete(suiviStockToDelete.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public SuiviStockDTO addCorrectionStock(SuiviStockDTO suiviStockDTO) {

		SuiviStock suiviStockToSave = modelMapper.map(suiviStockDTO, SuiviStock.class);

		SuiviStock suiviStockSaved = null;

		Calendar calendar = new GregorianCalendar();
		Optional<Stock> stockAnnee = stockRepository.findStockByAnnee("" + calendar.get(Calendar.YEAR));

		if (stockAnnee.isPresent()) {

			suiviStockToSave.setDateOperation(new Date());
			Stock stockGet = stockAnnee.get();
//			stockGet.setQuantiteCourant(stockGet.getQuantiteCourant() + (suiviStockToSave.getQuantite()));
//			stockGet.setQuantiteReference(stockGet.getQuantiteReference() + (suiviStockToSave.getQuantite()));
			suiviStockToSave.setStock(stockGet);

			suiviStockSaved = suiviStockRepository.save(suiviStockToSave);

			if (suiviStockSaved != null) {

				Stock stockToUpdate = suiviStockSaved.getStock();

				if (stockToUpdate.getQuantiteCourant() >= 0) {

					stockToUpdate
							.setQuantiteCourant(stockToUpdate.getQuantiteCourant() + (suiviStockToSave.getQuantite()));
//					stockToUpdate.setQuantiteReference(
//							stockToUpdate.getQuantiteReference() + (suiviStockToSave.getQuantite()));

					stockRepository.save(stockToUpdate);

				} else {
					throw new ResourceNotFoundException("Cette Opération est Impossible");
				}

				suiviStockToSave.setStock(stockToUpdate);
				suiviStockSaved = suiviStockRepository.save(suiviStockToSave);
			}

		}

		/*
		 * Ajouter une nouvelle acquisition Ajouter un nouveau Suivi stock
		 */

		return modelMapper.map(suiviStockSaved, SuiviStockDTO.class);
	}

	@Override
	public List<SuiviStockDTO> getSuiviStocksByStockAndCategorie(Long idStock) {

		Optional<Stock> stockOptional = stockRepository.findById(idStock);

		if (stockOptional.isPresent()) {

			return suiviStockRepository.findSuiviStockByStockAndCategorieLait(stockOptional.get().getId()).stream()
					.map(stock -> modelMapper.map(stock, SuiviStockDTO.class)).collect(Collectors.toList());
		} else {
			throw new ResourceNotFoundException("List SuiviStock not found with code_stock : " + idStock);
		}
	}

}
