package sn.pad.pe.pss.services.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Fonction;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.FonctionDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.AgentRepository;
import sn.pad.pe.pss.repositories.FonctionRepository;
import sn.pad.pe.pss.services.FonctionService;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;

/**
 * 
 * @author charle.sarr
 *
 */

@Service
public class FonctionServiceImpl implements FonctionService {
	@Autowired
	private FonctionRepository fonctionRepository;
	@Autowired
	private AgentRepository agentRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UniteOrganisationnelleService uniteOrganisationnelleService;

	/***************************************************************************************************************************************************************************************************************
	 * LISTE LISTE LISTE LISTE LISTE
	 **************************************************************************************************************************************************************************************************************/
	@Override
	public List<FonctionDTO> getFonctions() {
		List<Fonction> listeFonction = fonctionRepository.findAll();
		List<FonctionDTO> listeFonctionDTO = listeFonction.stream()
				.map(fonction -> modelMapper.map(fonction, FonctionDTO.class)).collect(Collectors.toList());
		return listeFonctionDTO;

	}

	/****************************************************************************************************************************************************************************************************************
	 * FIND-BY-ID FIND-BY-ID FIND-BY-ID FIND-BY-ID FIND-BY-ID
	 **************************************************************************************************************************************************************************************************************/

	@Override
	public FonctionDTO getFonctionById(Long id) {
		Optional<Fonction> fonction = fonctionRepository.findById(id);
		if (fonction.isPresent()) {
			return modelMapper.map(fonction.get(), FonctionDTO.class);

		} else {
			throw new ResourceNotFoundException("fonction not found with id : " + id);
		}
	}

	/***************************************************************************************************************************************************************************************************************
	 * FONCTION BY UNITEORGANISATIONNEELE FONCTION BY UNITEORGANISATIONNEELE
	 * FONCTION BY UNITEORGANISATIONNEELE
	 **************************************************************************************************************************************************************************************************************/
	@Override

	public List<FonctionDTO> getFonctionByUniteOrganisationnelle(Long id) {
		UniteOrganisationnelleDTO uniteOrganisationnelleDTO = uniteOrganisationnelleService
				.getUniteOrganisationnelleById(id);
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDTO,
				UniteOrganisationnelle.class);
		// List<UniteOrganisationnelleDTO> listeuniteOrganisationnelleDTO =
		// java.util.Arrays.asList(uniteOrganisationnelle);

		// List<UniteOrganisationnelle> listeUniteOrganisationnelle=
		// listeuniteOrganisationnelleDTO.stream().map(uniteOrg ->
		// modelMapper.map(uniteOrg, UniteOrganisationnelle.class)
		// ).collect(Collectors.toList());
		List<UniteOrganisationnelle> listeUniteOrganisationnelle = Arrays.asList(uniteOrganisationnelle);
		List<Fonction> listeFonction = fonctionRepository
				.findFonctionByUniteOrganisationnelle(listeUniteOrganisationnelle);

		return listeFonction.stream().map(uniteOrg -> modelMapper.map(uniteOrg, FonctionDTO.class))
				.collect(Collectors.toList());

	}

	/***************************************************************************************************************************************************************************************************************
	 * FONCTION BY NOM FONCTION BY NOM FONCTION BY NOM FONCTION BY NOM
	 **************************************************************************************************************************************************************************************************************/
	@Override
	public List<FonctionDTO> getFonctionByNom(String nom) {
		List<Fonction> listeFonction = fonctionRepository.findFonctionByNom(nom);
		List<FonctionDTO> listeFonctionDTO = listeFonction.stream()
				.map(fonction -> modelMapper.map(fonction, FonctionDTO.class)).collect(Collectors.toList());
		return listeFonctionDTO;

	}

	/***************************************************************************************************************************************************************************************************************
	 * CREATE CREATE CREATE CREATE CREATE
	 **************************************************************************************************************************************************************************************************************/

	@Override
	public FonctionDTO create(FonctionDTO fonctionDTO) {
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		return modelMapper.map(fonctionRepository.save(fonction), FonctionDTO.class);
	}

	/*
	 * public List <FonctionDTO> create(ArrayList<FonctionDTO> listeFonctionToSave)
	 * {
	 * 
	 * List<Fonction> listeFonction= listeFonctionToSave.stream().map(fonctionDto ->
	 * modelMapper.map(fonctionDto, Fonction.class) ).collect(Collectors.toList());
	 * List<Fonction> listeFonctionSaved =
	 * fonctionRepository.saveAll(listeFonction); List<FonctionDTO>
	 * listeFonctionSavedDTO= listeFonctionSaved.stream().map(fonction ->
	 * modelMapper.map(fonction, FonctionDTO.class) ).collect(Collectors.toList());
	 * 
	 * return listeFonctionSavedDTO;
	 * 
	 * }
	 */

	/***************************************************************************************************************************************************************************************************************
	 * UPDATE UPDATE UPDATE UPDATE UPDATE
	 **************************************************************************************************************************************************************************************************************/

	@Override
	public boolean update(FonctionDTO fonctionDTO) {
		Optional<Fonction> fonction = fonctionRepository.findById(fonctionDTO.getId());
		boolean isUpdated = false;
		if (fonction.isPresent()) {
			Fonction fonctionUpdate = modelMapper.map(fonctionDTO, Fonction.class);
			fonctionRepository.save(fonctionUpdate);
			isUpdated = true;
		}
		return isUpdated;
	}

	/***************************************************************************************************************************************************************************************************************
	 * DELETE DELETE DELETE DELETE DELETE
	 **************************************************************************************************************************************************************************************************************/

	@Override
	public boolean delete(FonctionDTO fonctionDTO) {
		Optional<Fonction> fonctionDelete = fonctionRepository.findById(fonctionDTO.getId());
		Fonction fonction = modelMapper.map(fonctionDTO, Fonction.class);
		boolean isDeleleted = false;
		if (fonctionDelete.isPresent()) {
			if (agentRepository.findByFonction(fonction).isEmpty()) {
				fonctionRepository.delete(fonctionDelete.get());
				isDeleleted = true;
			}
		}
		return isDeleleted;
	}

}
