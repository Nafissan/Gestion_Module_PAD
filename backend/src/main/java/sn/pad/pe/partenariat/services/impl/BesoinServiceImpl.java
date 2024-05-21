package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.partenariat.bo.Besoin;
import sn.pad.pe.partenariat.dto.BesoinDTO;
import sn.pad.pe.partenariat.repositories.BesoinRepository;
import sn.pad.pe.partenariat.services.BesoinService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class BesoinServiceImpl implements BesoinService {
	@Autowired
	private BesoinRepository besoinRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<BesoinDTO> getBesoin() {
		List<BesoinDTO> besoinDTOtoSaved = besoinRepository.findAll().stream()
				.map(besoin -> modelMapper.map(besoin, BesoinDTO.class)).collect(Collectors.toList());
		return besoinDTOtoSaved;
	}

	@Override
	public BesoinDTO getBesoinById(Long idBesoinDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BesoinDTO create(BesoinDTO besoinDTO) {
		besoinDTO.setCode(genererCode());
		Besoin besoinSaved = modelMapper.map(besoinDTO, Besoin.class);
		return modelMapper.map(besoinRepository.save(besoinSaved), BesoinDTO.class);
	}

	@Override
	public boolean update(BesoinDTO besoinDTO) {
		Optional<Besoin> besoinUpdate = besoinRepository.findById(besoinDTO.getId());
		boolean isUpdated = false;
		if (besoinUpdate.isPresent()) {
			besoinDTO.setCreatedAt(besoinUpdate.get().getCreatedAt());
			besoinRepository.save(modelMapper.map(besoinDTO, Besoin.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(BesoinDTO besoinDTO) {
		Optional<Besoin> besoinDelete = besoinRepository.findById(besoinDTO.getId());
		boolean isDeleleted = false;
		if (besoinDelete.isPresent()) {
			besoinRepository.delete(besoinDelete.get());
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public List<BesoinDTO> createMultiple(List<BesoinDTO> besoinDtos) {
		List<Besoin> besoins = besoinDtos.stream().map(besoinDto -> modelMapper.map(besoinDto, Besoin.class))
				.collect(Collectors.toList());

		besoinDtos = besoinRepository.saveAll(besoins).stream().map(besoin -> modelMapper.map(besoin, BesoinDTO.class))
				.collect(Collectors.toList());
		return besoinDtos;
	}

	@Override
	public List<BesoinDTO> getBesoinByPlanprospection(Long id) {
		List<BesoinDTO> besoinDTOtoSaved = besoinRepository.findBesoinByPlanprospectionId(id).stream()
				.map(besoin -> modelMapper.map(besoin, BesoinDTO.class)).collect(Collectors.toList());
		return besoinDTOtoSaved;
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 10;
		String prefixe = "BES-";
		String lastRecordCode = null;

		Optional<Besoin> lastRecord = besoinRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

}
