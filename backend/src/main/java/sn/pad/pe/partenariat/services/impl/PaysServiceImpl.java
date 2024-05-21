package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Pays;
import sn.pad.pe.partenariat.dto.PaysDTO;
import sn.pad.pe.partenariat.repositories.PaysRepository;
import sn.pad.pe.partenariat.services.PaysService;

@Service
public class PaysServiceImpl implements PaysService {

	@Autowired
	private PaysRepository paysRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<PaysDTO> getPays() {
		List<PaysDTO> paysDtos = paysRepository.findAll().stream().map(pays -> modelMapper.map(pays, PaysDTO.class))
				.collect(Collectors.toList());
		return paysDtos;
	}

	@Override
	public PaysDTO getPaysById(Long id) {
		Optional<Pays> pays = paysRepository.findById(id);
		if (pays.isPresent()) {
			return modelMapper.map(pays.get(), PaysDTO.class);
		} else {
			throw new ResourceNotFoundException("Pays not found with id : " + id);
		}
	}

	@Override
	public PaysDTO getPaysByCode(String code) {
		Optional<Pays> pays = paysRepository.findPaysByCode(code);
		if (pays.isPresent()) {
			return modelMapper.map(pays.get(), PaysDTO.class);
		} else {
			throw new ResourceNotFoundException("Pays not found with code : " + code);
		}
	}

	@Override
	public PaysDTO create(PaysDTO paysDto) {
		Pays paysSaved = modelMapper.map(paysDto, Pays.class);
		return modelMapper.map(paysRepository.save(paysSaved), PaysDTO.class);
	}

	@Override
	public boolean update(PaysDTO paysDto) {
		Optional<Pays> paysUpdate = paysRepository.findById(paysDto.getId());
		boolean isUpdated = false;
		if (paysUpdate.isPresent()) {
			paysRepository.save(modelMapper.map(paysDto, Pays.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(PaysDTO paysDto) {
		Optional<Pays> paysUpdate = paysRepository.findById(paysDto.getId());
		boolean isDeleted = false;
		if (paysUpdate.isPresent()) {
			paysRepository.delete(paysUpdate.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<PaysDTO> createMultiple(List<PaysDTO> paysDtos) {
		List<Pays> pays = paysDtos.stream().map(paysDto -> modelMapper.map(paysDto, Pays.class))
				.collect(Collectors.toList());

		paysDtos = paysRepository.saveAll(pays).stream().map(paysEn -> modelMapper.map(paysEn, PaysDTO.class))
				.collect(Collectors.toList());
		return paysDtos;
	}

}
