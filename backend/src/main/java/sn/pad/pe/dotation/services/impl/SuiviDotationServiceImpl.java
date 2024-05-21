package sn.pad.pe.dotation.services.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.Dotation;
import sn.pad.pe.dotation.bo.Stock;
import sn.pad.pe.dotation.bo.SuiviDotation;
import sn.pad.pe.dotation.bo.SuiviStock;
import sn.pad.pe.dotation.dto.SuiviDotationDTO;
import sn.pad.pe.dotation.repositories.DotationRepository;
import sn.pad.pe.dotation.repositories.StockRepository;
import sn.pad.pe.dotation.repositories.SuiviDotationRepository;
import sn.pad.pe.dotation.repositories.SuiviStockRepository;
import sn.pad.pe.dotation.services.SuiviDotationService;

@Service
@Transactional
public class SuiviDotationServiceImpl implements SuiviDotationService {

	@Autowired
	private SuiviDotationRepository suiviDotationRepository;
	@Autowired
	private DotationRepository dotationRepository;
	@Autowired
	private SuiviStockRepository suiviStockToSaveRepository;
	@Autowired
	private StockRepository stockRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public SuiviDotationDTO create(SuiviDotationDTO suiviDotationDTO) {
		SuiviStock suiviStockToSave = null;
		SuiviDotation suiviDotationSaved = null;

		SuiviDotation suiviDotationToSave = modelMapper.map(suiviDotationDTO, SuiviDotation.class);
		if (suiviDotationToSave.getEtat() != null && suiviDotationToSave.getEtat().equals("A VALIDER")) {
			suiviDotationToSave.setMois(suiviDotationDTO.getMois());
			suiviDotationSaved = suiviDotationRepository.save(suiviDotationToSave);
		} else if (suiviDotationToSave.getEtat() != null && suiviDotationToSave.getEtat().equals("VALIDER")) {
			Optional<Dotation> dotation = dotationRepository.findById(suiviDotationToSave.getDotation().getId());
			if (dotation.isPresent()) {
				Calendar calendar = new GregorianCalendar();
				Optional<Stock> stock = stockRepository.findStockByAnnee("" + calendar.get(Calendar.YEAR));
				if (stock.isPresent()) {
					/*
					 * Ajouter une nouvelle attribution Ajouter un nouveau Suivi stock
					 */
					suiviStockToSave = new SuiviStock();
					suiviStockToSave.setOperation("attribution");
					suiviStockToSave.setDateOperation(new Date());
					suiviStockToSave.setNomAgent(suiviDotationDTO.getNomAgent());
					suiviStockToSave.setMatriculeAgent(suiviDotationDTO.getMatriculeAgent());
					suiviStockToSave.setPrenomAgent(suiviDotationDTO.getPrenomAgent());
					suiviStockToSave.setQuantite(suiviDotationDTO.getNbreArticleAttribue());
					suiviStockToSave.setCategorieLait(suiviDotationToSave.getCategorieLait());
					suiviStockToSave.setStock(stock.get());

					SuiviStock suiviStockSaved = suiviStockToSaveRepository.save(suiviStockToSave);
					dotation.get().setNbreAttribution(dotation.get().getNbreAttribution() + 1);

					if (suiviStockSaved != null) {
						Stock stockToUpdate = suiviStockSaved.getStock();
						if (stockToUpdate.getQuantiteCourant() >= suiviStockSaved.getQuantite()) {
							stockToUpdate.setQuantiteCourant(
									stockToUpdate.getQuantiteCourant() - suiviStockSaved.getQuantite());
							/*
							 * Modifier le stock en dimunuant le nbre d'article attribué au nbre d'article
							 * global
							 */
							stockRepository.save(stockToUpdate);
						} else {
							throw new ResourceNotFoundException("Stock Insuffisant");
						}
						suiviStockSaved.setMois(suiviDotationToSave.getMois());
						suiviDotationToSave.setSuiviStock(suiviStockSaved);
						suiviDotationSaved = suiviDotationRepository.save(suiviDotationToSave);
						dotationRepository.save(dotation.get());
					}
				}
			}
		} else if (suiviDotationToSave.getEtat() != null && suiviDotationToSave.getEtat().equals("ANNULER")) {
			Optional<Dotation> dotation = dotationRepository.findById(suiviDotationToSave.getDotation().getId());
			if (dotation.isPresent()) {
				Calendar calendar = new GregorianCalendar();
				Optional<Stock> stock = stockRepository.findStockByAnnee("" + calendar.get(Calendar.YEAR));
				if (stock.isPresent()) {
					/*
					 * Ajouter une nouvelle attribution Ajouter un nouveau Suivi stock
					 */
					suiviStockToSave = new SuiviStock();
					suiviStockToSave.setOperation("annulation");
					suiviStockToSave.setDateOperation(new Date());
					suiviStockToSave.setNomAgent(suiviDotationDTO.getNomAgent());
					suiviStockToSave.setMatriculeAgent(suiviDotationDTO.getMatriculeAgent());
					suiviStockToSave.setPrenomAgent(suiviDotationDTO.getPrenomAgent());
					suiviStockToSave.setQuantite(suiviDotationDTO.getNbreArticleAttribue());
					suiviStockToSave.setCategorieLait(suiviDotationToSave.getCategorieLait());
					suiviStockToSave.setStock(stock.get());

					SuiviStock suiviStockSaved = suiviStockToSaveRepository.save(suiviStockToSave);
					dotation.get().setNbreAttribution(dotation.get().getNbreAttribution() - 1);

					if (suiviStockSaved != null) {
						Stock stockToUpdate = suiviStockSaved.getStock();
						stockToUpdate
								.setQuantiteCourant(stockToUpdate.getQuantiteCourant() + suiviStockSaved.getQuantite());

						stockRepository.save(stockToUpdate);

						suiviStockSaved.setMois(suiviDotationToSave.getMois());
						suiviDotationToSave.setSuiviStock(suiviStockSaved);
						suiviDotationSaved = suiviDotationRepository.save(suiviDotationToSave);
						dotationRepository.save(dotation.get());
					}
				}
			}
		}
		return modelMapper.map(suiviDotationSaved, SuiviDotationDTO.class);
	}

	@Override
	public List<SuiviDotationDTO> getSuiviDotationsByDotation(String code) {
		Optional<Dotation> dotation = dotationRepository.findDotationByCode(code);
		List<SuiviDotationDTO> suiviDotationDTOs = new ArrayList<SuiviDotationDTO>();
		if (dotation.isPresent()) {
			suiviDotationDTOs = suiviDotationRepository.findSuiviDotationByDotation(dotation.get()).stream()
					.map(stock -> modelMapper.map(stock, SuiviDotationDTO.class)).collect(Collectors.toList());

		}
		return suiviDotationDTOs;
	}

	@Override
	public List<SuiviDotationDTO> getSuiviDotationDTOs(Long idDotation) {
		List<SuiviDotation> suiviDotations = new ArrayList<>();
		List<SuiviDotationDTO> suiviDotationDTOs = new ArrayList<>();

		if (idDotation != null) {
			suiviDotations = suiviDotationRepository.findByDotationId(idDotation);
		} else {
			suiviDotations = suiviDotationRepository.findAll();
		}

		suiviDotationDTOs = suiviDotations.stream()
				.map(dotation -> modelMapper.map(dotation, SuiviDotationDTO.class)).collect(Collectors.toList());

		return suiviDotationDTOs;
	}

	@Override
	public List<SuiviDotationDTO> getSuiviDotationsByAnneeAndMois(int annee, String mois) {

		List<SuiviDotation> suiviDotationDTOs = suiviDotationRepository.findSuiviDotationsByAnneeAndMois(annee, mois);

		return suiviDotationDTOs.stream().map(stock -> modelMapper.map(stock, SuiviDotationDTO.class))
				.collect(Collectors.toList());

	}

	@Override
	public List<SuiviDotationDTO> getSuiviDotationsByDotationAndAnneeAndMois(Long id, int annee, String mois) {

		Optional<Dotation> dotation = dotationRepository.findById(id);
		List<SuiviDotationDTO> suiviDotationDTOs = new ArrayList<SuiviDotationDTO>();
		if (dotation.isPresent()) {
			suiviDotationDTOs = suiviDotationRepository
					.findSuiviDotationsByDotationAndAnneeAndMois(dotation.get(), annee, mois).stream()
					.map(stock -> modelMapper.map(stock, SuiviDotationDTO.class)).collect(Collectors.toList());

		}
		return suiviDotationDTOs;
	}

}