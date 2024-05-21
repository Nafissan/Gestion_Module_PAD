package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.DossierInterim;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.DossierInterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.DossierInterimRepository;
import sn.pad.pe.pss.services.DossierInterimService;

/**
 * 
 * @author cheikhibra.samb
 *
 */
@Service
public class DossierInterimServiceImpl implements DossierInterimService {

	@Autowired
	private DossierInterimRepository dossierInterimRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<DossierInterimDTO> getDossierInterims() {

		List<DossierInterimDTO> dossierInterimDTOs = dossierInterimRepository.findAll().stream()
				.map(dossierInterim -> modelMapper.map(dossierInterim, DossierInterimDTO.class))
				.collect(Collectors.toList());
		return dossierInterimDTOs;
	}

	@Override
	public DossierInterimDTO getDossierInterimById(Long id) {
		Optional<DossierInterim> dossierInterim = dossierInterimRepository.findById(id);
		if (dossierInterim.isPresent()) {
			return modelMapper.map(dossierInterim.get(), DossierInterimDTO.class);
		} else {
			throw new ResourceNotFoundException("DossierInterim not found with id : " + id);
		}
	}

	@Override
	public DossierInterimDTO dossierInterimByUniteOrganisationnelleAndAnnee(
			UniteOrganisationnelleDTO uniteOrganisationnelleDTO, int annee) {

		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDTO,
				UniteOrganisationnelle.class);

		DossierInterim dossierInterim = dossierInterimRepository
				.findDossierInterimByUniteOrganisationnelleAndAnnee(uniteOrganisationnelle, annee);

		if (dossierInterim == null) {
			return null;
		} else {
			return modelMapper.map(dossierInterim, DossierInterimDTO.class);
		}
	}

	@Override
	public List<DossierInterimDTO> findDossierInterimByAnnee(int annee) {
		List<DossierInterimDTO> dossierInterimDTOs = dossierInterimRepository.findDossierInterimByAnnee(annee).stream()
				.map(dossierInterim -> modelMapper.map(dossierInterim, DossierInterimDTO.class))
				.collect(Collectors.toList());
		return dossierInterimDTOs;
	}

	@Override
	public DossierInterimDTO createDossierInterim(DossierInterimDTO dossierInterimDTO) {
		DossierInterim dossierInterim = modelMapper.map(dossierInterimDTO, DossierInterim.class);
		DossierInterim dossierInterimToSave = dossierInterimRepository.save(dossierInterim);
		return modelMapper.map(dossierInterimToSave, DossierInterimDTO.class);
	}

	@Override
	public boolean updateDossierInterim(DossierInterimDTO dossierInterimDTO) {
		boolean isUpdated = false;
		DossierInterim dossierInterim = modelMapper.map(dossierInterimDTO, DossierInterim.class);
		Optional<DossierInterim> dossierInterimToUpdated = dossierInterimRepository.findById(dossierInterim.getId());
		if (dossierInterimToUpdated.isPresent()) {
			dossierInterimRepository.save(dossierInterim);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean deteleDossierInterim(DossierInterimDTO dossierInterimDTO) {
		boolean isDeleted = false;
		DossierInterim dossierConge = modelMapper.map(dossierInterimDTO, DossierInterim.class);
		Optional<DossierInterim> dossierCongeToDeleted = dossierInterimRepository.findById(dossierConge.getId());
		if (dossierCongeToDeleted.isPresent()) {
			dossierInterimRepository.delete(dossierConge);
			isDeleted = true;
		}
		return isDeleted;
	}

}
