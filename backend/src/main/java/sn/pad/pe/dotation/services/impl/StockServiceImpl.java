package sn.pad.pe.dotation.services.impl;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.Stock;
import sn.pad.pe.dotation.dto.StockDTO;
import sn.pad.pe.dotation.repositories.StockRepository;
import sn.pad.pe.dotation.services.StockService;

@Service
public class StockServiceImpl implements StockService {

	@Autowired
	private StockRepository stockRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<StockDTO> getStocks() {
		List<StockDTO> stockDTOs = stockRepository.findAll(Sort.by(Direction.DESC, "annee")).stream()
				.map(stock -> modelMapper.map(stock, StockDTO.class)).collect(Collectors.toList());
		return stockDTOs;
	}

	@Override
	public StockDTO getStockById(Long id) {
		Optional<Stock> stockOptional = stockRepository.findById(id);
		if (stockOptional.isPresent()) {
			return modelMapper.map(stockOptional.get(), StockDTO.class);
		} else {
			throw new ResourceNotFoundException("Stock not found with id : " + id);
		}
	}

	@Override
	public StockDTO getStockByCode(String code) {
		Optional<Stock> stockOptional = stockRepository.findStockByCode(code);
		if (stockOptional.isPresent()) {
			return modelMapper.map(stockOptional.get(), StockDTO.class);
		} else {
			throw new ResourceNotFoundException("Stock not found with code : " + code);
		}
	}

	@Override
	public StockDTO getStockByAnneeAndType(String annee, String type) {
		Optional<Stock> stockOptional = stockRepository.findStockByAnneeAndType(annee, type);
		if (stockOptional.isPresent()) {
			return modelMapper.map(stockOptional.get(), StockDTO.class);
		} else {
			throw new ResourceNotFoundException("Stock not found with annee : " + annee + " and code : " + type);
		}
	}

	@Override
	public StockDTO create(StockDTO stockDto) {
		Calendar calendar = new GregorianCalendar();
		Optional<Stock> stockPrecedent = stockRepository.findStockByAnnee("" + calendar.get(Calendar.YEAR));

		stockDto.setAnnee("" + calendar.get(Calendar.YEAR));
		stockDto.setCode("STOCK_" + stockDto.getAnnee());

		if (!stockPrecedent.isPresent()) {

			stockPrecedent = stockRepository.findStockByActive(true);

			Stock stockPrecedentEnt = null;

			if (stockPrecedent.isPresent()) {
				stockPrecedentEnt = stockPrecedent.get();
				//
				stockDto.setActive(true);
				stockDto.setQuantiteRestant(stockPrecedentEnt.getQuantiteCourant());
				stockDto.setQuantiteCourant(stockDto.getQuantiteRestant() + stockDto.getQuantiteReference());
				stockDto.setQuantiteInitial(stockDto.getQuantiteCourant());
				stockDto.setQuantiteReference(stockDto.getQuantiteCourant());

				stockPrecedentEnt.setActive(false);
				stockPrecedentEnt.setQuantiteCourant(0);
				stockRepository.save(stockPrecedentEnt);

			} else {
				stockDto.setQuantiteRestant(0);
				stockDto.setQuantiteCourant(stockDto.getQuantiteRestant() + stockDto.getQuantiteReference());
				stockDto.setQuantiteInitial(stockDto.getQuantiteCourant());
				stockDto.setQuantiteReference(stockDto.getQuantiteCourant());
				stockDto.setActive(true);

			}
			Stock stockSaved = stockRepository.save(modelMapper.map(stockDto, Stock.class));
			return modelMapper.map(stockRepository.save(stockSaved), StockDTO.class);
		} else {
			throw new RuntimeException("Le stock existe déja");
		}
	}

	@Override
	public boolean update(StockDTO stockDto) {
		Optional<Stock> stockDtoToUpdate = stockRepository.findById(stockDto.getId());
		boolean isDeleleted = false;
		if (stockDtoToUpdate.isPresent()) {
			stockRepository.save(modelMapper.map(stockDto, Stock.class));
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public boolean delete(StockDTO stockDto) {
		Optional<Stock> stockToDelete = stockRepository.findById(stockDto.getId());
		boolean isDeleted = false;
		if (stockToDelete.isPresent()) {
			stockRepository.delete(stockToDelete.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<StockDTO> createMultiple(List<StockDTO> stockDtos) {
		List<Stock> stocks = stockDtos.stream().map(stockDto -> modelMapper.map(stockDto, Stock.class))
				.collect(Collectors.toList());

		List<StockDTO> stockDTOs = stockRepository.saveAll(stocks).stream()
				.map(stock -> modelMapper.map(stock, StockDTO.class)).collect(Collectors.toList());
		return stockDTOs;
	}

	@Override
	public StockDTO getStockByAnnee(String annee) {
		Optional<Stock> stockOptional = stockRepository.findStockByAnnee(annee);
		if (stockOptional.isPresent()) {
			return modelMapper.map(stockOptional.get(), StockDTO.class);
		} else {
			throw new ResourceNotFoundException("Stock not found with annee : " + annee);
		}
	}

}
