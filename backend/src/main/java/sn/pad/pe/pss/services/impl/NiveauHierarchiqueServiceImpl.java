package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.NiveauHierarchique;
import sn.pad.pe.pss.dto.NiveauHierarchiqueDTO;
import sn.pad.pe.pss.repositories.NiveauHierarchiqueRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.NiveauHierarchiqueService;

/**
 * 
 * @author charle.sarr
 *
 */

@Service
public class NiveauHierarchiqueServiceImpl implements NiveauHierarchiqueService {

	@Autowired
	private NiveauHierarchiqueRepository niveauHierarchiqueRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UniteOrganisationnelleRepository uniteRepository;

	@Override
	public List<NiveauHierarchiqueDTO> getNiveauxHierarchique() {
		List<NiveauHierarchiqueDTO> niveauHierarchiqueToSaved = niveauHierarchiqueRepository.findAll().stream()
				.map(niveauHierarchique -> modelMapper.map(niveauHierarchique, NiveauHierarchiqueDTO.class))
				.collect(Collectors.toList());
		return niveauHierarchiqueToSaved;
	}

	@Override
	public NiveauHierarchiqueDTO getNiveauHierarchiqueById(Long id) {
		Optional<NiveauHierarchique> niveauHierarchique = niveauHierarchiqueRepository.findById(id);
		if (niveauHierarchique.isPresent()) {
			return modelMapper.map(niveauHierarchique.get(), NiveauHierarchiqueDTO.class);
		} else {
			throw new ResourceNotFoundException("NiveauHierarchique not found with id : " + id);
		}
	}

	@Override
	public NiveauHierarchiqueDTO getNiveauHierarchiqueByPosition(int position) {
		NiveauHierarchique niveauHierarchique = niveauHierarchiqueRepository.findByPosition(position);
		if (niveauHierarchique != null) {
			return modelMapper.map(niveauHierarchique, NiveauHierarchiqueDTO.class);
		} else {
			throw new ResourceNotFoundException("NiveauHierarchiqueDTO not found with position : " + position);
		}
	}

	@Override
	public NiveauHierarchiqueDTO create(NiveauHierarchiqueDTO niveauHierarchiqueDTO) {
		NiveauHierarchique nivHier = niveauHierarchiqueRepository.findByPosition(niveauHierarchiqueDTO.getPosition());
		if (nivHier == null) {
			NiveauHierarchique niveauHierarchique = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
			return modelMapper.map(niveauHierarchiqueRepository.save(niveauHierarchique), NiveauHierarchiqueDTO.class);
		} else {
			return null;
		}

	}

	@Override
	public boolean update(NiveauHierarchiqueDTO niveauHierarchiqueDTO) {
		NiveauHierarchique nivHier = niveauHierarchiqueRepository.findByPosition(niveauHierarchiqueDTO.getPosition());
		if (nivHier != null && nivHier.getId() != niveauHierarchiqueDTO.getId()) {
			throw new ResourceNotFoundException("La position existe déjà.");
		}
		Optional<NiveauHierarchique> niveauHierarchique = niveauHierarchiqueRepository
				.findById(niveauHierarchiqueDTO.getId());

		boolean isUpdated = false;
		if (niveauHierarchique.isPresent()) {
			NiveauHierarchique niveauHierarchiqueUpdate = modelMapper.map(niveauHierarchiqueDTO,
					NiveauHierarchique.class);
			niveauHierarchiqueRepository.save(niveauHierarchiqueUpdate);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(NiveauHierarchiqueDTO niveauHierarchiqueDTO) {
		NiveauHierarchique nivHier = modelMapper.map(niveauHierarchiqueDTO, NiveauHierarchique.class);
		boolean existsUnite = uniteRepository.existsByNiveauHierarchique(nivHier);
		Optional<NiveauHierarchique> niveauHierarchiqueDelete = niveauHierarchiqueRepository
				.findById(niveauHierarchiqueDTO.getId());
		boolean isDeleleted = false;
		if (niveauHierarchiqueDelete.isPresent()) {
			if (existsUnite) {
				throw new ResourceNotFoundException("Ce niveau est rattaché à une unité organisationnelle");
			} else {
				niveauHierarchiqueRepository.delete(niveauHierarchiqueDelete.orElseGet(null));
				isDeleleted = true;
			}

		}
		return isDeleleted;
	}
}
