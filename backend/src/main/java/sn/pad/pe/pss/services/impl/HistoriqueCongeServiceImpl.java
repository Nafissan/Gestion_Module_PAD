package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Conge;
import sn.pad.pe.pss.bo.HistoriqueConge;
import sn.pad.pe.pss.dto.HistoriqueCongeDTO;
import sn.pad.pe.pss.repositories.CongeRepository;
import sn.pad.pe.pss.repositories.HistoriqueCongeRepository;
import sn.pad.pe.pss.services.HistoriqueCongeService;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
@Service
public class HistoriqueCongeServiceImpl implements HistoriqueCongeService {

	@Autowired
	private HistoriqueCongeRepository historiqueCongeRepository;
	@Autowired
	private CongeRepository congeRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<HistoriqueCongeDTO> getHistoriqueConges() {
		List<HistoriqueCongeDTO> historiqueCongeDTOs = historiqueCongeRepository.findAll().stream()
				.map(historiqueCongeDTO -> modelMapper.map(historiqueCongeDTO, HistoriqueCongeDTO.class))
				.collect(Collectors.toList());
		return historiqueCongeDTOs;
	}

	@Override
	public List<HistoriqueCongeDTO> getHistoriqueCongesByConge(Long idConge) {
		Optional<Conge> conge = congeRepository.findById(idConge);
		if (conge.isPresent()) {
			return historiqueCongeRepository.findHistoriqueCongesByConge(conge.get()).stream()
					.map(historiqueCongeDTO -> modelMapper.map(historiqueCongeDTO, HistoriqueCongeDTO.class))
					.collect(Collectors.toList());
		} else {
			throw new ResourceNotFoundException("HistoriqueConge not found with idConge : " + idConge);
		}
	}

	@Override
	public HistoriqueCongeDTO getHistoriqueCongeById(Long id) {
		Optional<HistoriqueConge> historiqueConge = historiqueCongeRepository.findById(id);
		if (historiqueConge.isPresent()) {
			return modelMapper.map(historiqueConge.get(), HistoriqueCongeDTO.class);
		} else {
			throw new ResourceNotFoundException("HistoriqueConge not found with id : " + id);
		}
	}

	@Override
	public HistoriqueCongeDTO createHistoriqueConge(HistoriqueCongeDTO historiqueCongeDTO) {
		HistoriqueConge historiqueConge = modelMapper.map(historiqueCongeDTO, HistoriqueConge.class);
		return modelMapper.map(historiqueCongeRepository.save(historiqueConge), HistoriqueCongeDTO.class);
	}

	@Override
	public boolean updateHistoriqueConge(HistoriqueCongeDTO historiqueCongeDTO) {
		HistoriqueConge historiqueConge = modelMapper.map(historiqueCongeDTO, HistoriqueConge.class);
		boolean isUpdated = false;
		Optional<HistoriqueConge> historiqueCongeToUpdated = historiqueCongeRepository
				.findById(historiqueConge.getId());
		if (historiqueCongeToUpdated.isPresent()) {
			historiqueCongeRepository.save(historiqueConge);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean deteleHistoriqueConge(HistoriqueCongeDTO historiqueCongeDTO) {
		HistoriqueConge historiqueConge = modelMapper.map(historiqueCongeDTO, HistoriqueConge.class);
		boolean isDeleted = false;
		Optional<HistoriqueConge> historiqueCongeToDeleted = historiqueCongeRepository
				.findById(historiqueConge.getId());
		if (historiqueCongeToDeleted.isPresent()) {
			historiqueCongeRepository.delete(historiqueConge);
			isDeleted = true;
		}
		return isDeleted;
	}

}
