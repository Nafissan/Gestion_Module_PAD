package sn.pad.pe.dotation.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.Fournisseur;
import sn.pad.pe.dotation.dto.FournisseurDTO;
import sn.pad.pe.dotation.repositories.FournisseurRepository;
import sn.pad.pe.dotation.services.FournisseurService;

@Service
public class FounisseurServiceImpl implements FournisseurService {

	@Autowired
	private FournisseurRepository fournisseurRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public FournisseurDTO saveFounisseur(FournisseurDTO fournisseurDto) {

		Fournisseur fournisseurSaved = modelMapper.map(fournisseurDto, Fournisseur.class);
		return modelMapper.map(fournisseurRepository.save(fournisseurSaved), FournisseurDTO.class);
	}

	@Override
	public List<FournisseurDTO> getFournisseurs() {
		List<FournisseurDTO> fournisseurDtos = fournisseurRepository.findAll().stream()
				.map(fournisseur -> modelMapper.map(fournisseur, FournisseurDTO.class)).collect(Collectors.toList());
		return fournisseurDtos;
	}

	@Override
	public FournisseurDTO getFounisseurById(Long id) {
		Optional<Fournisseur> fournisseur = fournisseurRepository.findById(id);
		if (fournisseur.isPresent()) {
			return modelMapper.map(fournisseur.get(), FournisseurDTO.class);
		} else {
			throw new ResourceNotFoundException("Fournisseur not found with id : " + id);
		}
	}

	@Override
	public boolean update(FournisseurDTO fournisseurDto) {
		Optional<Fournisseur> fournisseurUpdate = fournisseurRepository.findById(fournisseurDto.getId());
		boolean isDeleleted = false;
		if (fournisseurUpdate.isPresent()) {
			fournisseurRepository.save(modelMapper.map(fournisseurDto, Fournisseur.class));
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public boolean delete(FournisseurDTO fournisseurDto) {
		Optional<Fournisseur> fournisseurUpdate = fournisseurRepository.findById(fournisseurDto.getId());
		boolean isDeleted = false;
		if (fournisseurUpdate.isPresent()) {
			fournisseurRepository.delete(fournisseurUpdate.get());
			isDeleted = true;
		}
		return isDeleted;
	}

}
