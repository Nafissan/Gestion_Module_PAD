package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.partenariat.bo.PointFocal;
import sn.pad.pe.partenariat.dto.PointFocalDTO;
import sn.pad.pe.partenariat.repositories.PointFocalRepository;
import sn.pad.pe.partenariat.services.PointFocalService;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class PointFocalServiceImpl implements PointFocalService {
	@Autowired
	private PointFocalRepository pointfocalRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<PointFocalDTO> getPointFocal() {
		List<PointFocalDTO> pointFocalDtos = pointfocalRepository.findByActive(true).stream()
				.map(pointfocal -> modelMapper.map(pointfocal, PointFocalDTO.class)).collect(Collectors.toList());
		return pointFocalDtos;

	}

	@Override
	public PointFocalDTO getPointFocalById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PointFocalDTO> getPointFocalByCode(int code) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PointFocalDTO create(PointFocalDTO pointfocalDto) {
		pointfocalDto.setActive(true);
		Optional<PointFocal> pointfocalUpdate = pointfocalRepository.findByUniteAndAgent(
				modelMapper.map(pointfocalDto.getUnite(), UniteOrganisationnelle.class),
				modelMapper.map(pointfocalDto.getAgent(), Agent.class));
		if (pointfocalUpdate.isPresent()) {
			PointFocal point = pointfocalUpdate.get();

			PointFocal pointfocalSaved = pointfocalRepository.save(modelMapper.map(point, PointFocal.class));
			return modelMapper.map(pointfocalSaved, PointFocalDTO.class);

		}
		pointfocalDto.setCode(genererCode());
		PointFocal pointfocalSaved = modelMapper.map(pointfocalDto, PointFocal.class);
		return modelMapper.map(pointfocalRepository.save(pointfocalSaved), PointFocalDTO.class);
	}

	@Override
	public boolean update(PointFocalDTO pointfocalDto) {
		Optional<PointFocal> pointfocalUpdate = pointfocalRepository.findById(pointfocalDto.getId());
		boolean isUpdated = false;
		if (pointfocalUpdate.isPresent()) {
			pointfocalDto.setCreatedAt(pointfocalUpdate.get().getCreatedAt());
			pointfocalRepository.save(modelMapper.map(pointfocalDto, PointFocal.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(PointFocalDTO pointFocalDto) {
		Optional<PointFocal> pointFocalToDelete = pointfocalRepository.findById(pointFocalDto.getId());
		boolean isDeleted = false;
		if (pointFocalToDelete.isPresent()) {

			PointFocal point = pointFocalToDelete.get();
			point.setActive(false);

			pointfocalRepository.save(point);
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<PointFocalDTO> createMultiple(List<PointFocalDTO> pointFocalDtos) {
		List<PointFocal> pointFocals = pointFocalDtos.stream()
				.map(pointFocalDto -> modelMapper.map(pointFocalDto, PointFocal.class)).collect(Collectors.toList());

		pointFocalDtos = pointfocalRepository.saveAll(pointFocals).stream()
				.map(pointFocal -> modelMapper.map(pointFocal, PointFocalDTO.class)).collect(Collectors.toList());
		return pointFocalDtos;
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 10;
		String prefixe = "PF-";
		String lastRecordCode = null;

		Optional<PointFocal> lastRecord = pointfocalRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

}
