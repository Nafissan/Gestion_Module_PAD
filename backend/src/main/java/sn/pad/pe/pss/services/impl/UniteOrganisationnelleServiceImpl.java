package sn.pad.pe.pss.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class UniteOrganisationnelleServiceImpl implements UniteOrganisationnelleService {

	@Autowired
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private GenerationCode generer;

	@Override
	public List<UniteOrganisationnelleDTO> getUniteOrganisationnelles() {
		return uniteOrganisationnelleRepository.findAll().stream()
				.map(uo -> modelMapper.map(uo, UniteOrganisationnelleDTO.class)).collect(Collectors.toList());
	}

	@Override
	public UniteOrganisationnelleDTO getUniteOrganisationnelleById(Long id) {
		Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository.findById(id);
		if (uniteOrganisationnelle.isPresent()) {
			return modelMapper.map(uniteOrganisationnelle.get(), UniteOrganisationnelleDTO.class);
		} else {
			throw new ResourceNotFoundException("Unité Organisationnelle not found with id : " + id);
		}
	}

	public UniteOrganisationnelleDTO getUniteOrganisationnelleByCode(String code) {
		Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
				.findUniteOrganisationnelleByCode(code);
		if (uniteOrganisationnelle.isPresent()) {
			return modelMapper.map(uniteOrganisationnelle.get(), UniteOrganisationnelleDTO.class);
		} else {
			throw new ResourceNotFoundException("Unité Organisationnelle not found with Code : " + code);
		}
	}

	@Override
	public List<UniteOrganisationnelleDTO> getUnitesOrganisationnellesSuperieures(Long id) {
		List<UniteOrganisationnelle> unitesSupeieures = new ArrayList<>();
		Optional<UniteOrganisationnelle> uniteOrganisationnelleOpt = uniteOrganisationnelleRepository.findById(id);
		if (!uniteOrganisationnelleOpt.isPresent())
			return null;
		UniteOrganisationnelle uniteOrganisationnelle = uniteOrganisationnelleOpt.get();
		boolean isExistUniteOrganisationnelle = uniteOrganisationnelleOpt.isPresent()
				&& uniteOrganisationnelle.getUniteSuperieure() != null;

		while (isExistUniteOrganisationnelle) {
			unitesSupeieures.add(uniteOrganisationnelle.getUniteSuperieure());
			isExistUniteOrganisationnelle = uniteOrganisationnelle.getUniteSuperieure().getUniteSuperieure() != null;
			if (isExistUniteOrganisationnelle)
				uniteOrganisationnelle = uniteOrganisationnelle.getUniteSuperieure();
		}
		return unitesSupeieures.stream().map(uo -> modelMapper.map(uo, UniteOrganisationnelleDTO.class))
				.collect(Collectors.toList());
	}

	public List<UniteOrganisationnelle> findUniteOrganisationnelleInferieure(long id) {
		Optional<UniteOrganisationnelle> uniteOrganisationnelleOpt = uniteOrganisationnelleRepository.findById(id);
		if (!uniteOrganisationnelleOpt.isPresent())
			return null;
		return uniteOrganisationnelleRepository.findUniteOrganisationnelleInferieure(uniteOrganisationnelleOpt.get());
	}

	@Override
	public List<UniteOrganisationnelleDTO> getUnitesOrganisationnellesInferieures(Long id) {
		List<UniteOrganisationnelle> unitesInferieures = new ArrayList<>();
		Optional<UniteOrganisationnelle> uniteOrganisationnelleOpt = uniteOrganisationnelleRepository.findById(id);
		UniteOrganisationnelle uniteOrganisationnelle = uniteOrganisationnelleOpt.get();
		boolean isExistUniteOrganisationnelle = uniteOrganisationnelleOpt.isPresent()
				&& uniteOrganisationnelleRepository
						.findUniteOrganisationnelleInferieure(uniteOrganisationnelle) != null;

		List<UniteOrganisationnelle> unitesInferieuresSuivantes = uniteOrganisationnelleRepository
				.findUniteOrganisationnelleInferieure(uniteOrganisationnelle);

		while (isExistUniteOrganisationnelle && !unitesInferieuresSuivantes.isEmpty()) {
			unitesInferieures.addAll(unitesInferieuresSuivantes);
			List<UniteOrganisationnelle> list = new ArrayList<UniteOrganisationnelle>();

			for (UniteOrganisationnelle uo : unitesInferieuresSuivantes) {
				list.addAll(uniteOrganisationnelleRepository.findUniteOrganisationnelleInferieure(uo));
			}
			unitesInferieuresSuivantes = list;

		}
		return unitesInferieures.stream().map(uo -> modelMapper.map(uo, UniteOrganisationnelleDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<UniteOrganisationnelleDTO> getUnitesOrganisationnellesSuperieursByNiveau(int niveau) {
		List<UniteOrganisationnelle> list = uniteOrganisationnelleRepository.findAll();
		List<UniteOrganisationnelle> supList = new ArrayList<>();
		for (UniteOrganisationnelle unite : list) {
			if (unite.getNiveauHierarchique().getPosition() == niveau) {
				supList.add(unite);
			}
		}
		return supList.stream().map(uo -> modelMapper.map(uo, UniteOrganisationnelleDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public UniteOrganisationnelleDTO create(UniteOrganisationnelleDTO uniteOrganisationnelleDTO) {
		UniteOrganisationnelle uniteOrganisationnelleToSave = modelMapper.map(uniteOrganisationnelleDTO,
				UniteOrganisationnelle.class);
		uniteOrganisationnelleToSave.setCode(generer.uniteOrganisationnelle());
		return modelMapper.map(uniteOrganisationnelleRepository.save(uniteOrganisationnelleToSave),
				UniteOrganisationnelleDTO.class);
	}

	@Override
	public boolean update(UniteOrganisationnelleDTO uniteOrganisationnelleDTO) {
		Optional<UniteOrganisationnelle> uniteOrganisationnelleUpdate = uniteOrganisationnelleRepository
				.findById(uniteOrganisationnelleDTO.getId());
		boolean isUpdated = false;
		if (uniteOrganisationnelleUpdate.isPresent()) {
			UniteOrganisationnelle uniteOrganisationnelleToUpdate = modelMapper.map(uniteOrganisationnelleDTO,
					UniteOrganisationnelle.class);
			uniteOrganisationnelleRepository.save(uniteOrganisationnelleToUpdate);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(UniteOrganisationnelleDTO uniteOrganisationnelleDTO) {
		Optional<UniteOrganisationnelle> uniteOrganisationnelleUpdate = uniteOrganisationnelleRepository
				.findById(uniteOrganisationnelleDTO.getId());
		boolean isDeleleted = false;
		if (uniteOrganisationnelleUpdate.isPresent()) {
			UniteOrganisationnelle uniteOrganisationnelleToDelete = uniteOrganisationnelleUpdate.get();
			uniteOrganisationnelleRepository.delete(uniteOrganisationnelleToDelete);
			isDeleleted = true;
		}
		return isDeleleted;
	}

	public List<UniteOrganisationnelleDTO> getUnitesOrgInferieurByUniteOrgAgentConnecte(AgentDTO agent) {
		List<UniteOrganisationnelle> list = uniteOrganisationnelleRepository.findAll();
		List<UniteOrganisationnelle> infList = new ArrayList<>();
		for (UniteOrganisationnelle unite : list) {
			if (unite.getNiveauHierarchique().getPosition() == agent.getUniteOrganisationnelle().getNiveauHierarchique()
					.getPosition()) {
				infList.add(unite);
			}
		}
		return infList.stream().map(uo -> modelMapper.map(uo, UniteOrganisationnelleDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public UniteOrganisationnelleDTO findTopByOrderByIdDesc() {
		Optional<UniteOrganisationnelle> lastRecord = uniteOrganisationnelleRepository
				.findTopByOrderByIdDesc();
		if (lastRecord.isPresent()) {
			return modelMapper.map(lastRecord.get(), UniteOrganisationnelleDTO.class);
		} else {
			return null;
		}
	}

}
