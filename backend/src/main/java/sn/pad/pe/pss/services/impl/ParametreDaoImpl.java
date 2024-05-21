package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.pss.bo.Parametres;
import sn.pad.pe.pss.dto.ParametresDTO;
import sn.pad.pe.pss.repositories.ParametreRepository;
import sn.pad.pe.pss.services.ParametreService;

@Service
public class ParametreDaoImpl implements ParametreService {

	@Autowired
	private ParametreRepository parametreRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ParametresDTO> findAllParametre() {
		List<ParametresDTO> parametresDTOs = parametreRepository.findAll().stream()
				.map(parametres -> modelMapper.map(parametres, ParametresDTO.class)).collect(Collectors.toList());
		return parametresDTOs;
	}

	@Override
	public List<ParametresDTO> chercherListParametreByCode(String mc) {
		List<ParametresDTO> parametresDTOs = parametreRepository.findParametresByCode(mc).stream()
				.map(parametres -> modelMapper.map(parametres, ParametresDTO.class)).collect(Collectors.toList());
		return parametresDTOs;
	}

	@Override
	public ParametresDTO saveParametre(ParametresDTO comm) {
		Parametres parametres = modelMapper.map(comm, Parametres.class);
		return modelMapper.map(parametreRepository.save(parametres), ParametresDTO.class);
	}
}
