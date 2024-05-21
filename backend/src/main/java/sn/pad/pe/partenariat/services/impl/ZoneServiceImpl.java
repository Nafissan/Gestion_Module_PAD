package sn.pad.pe.partenariat.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.partenariat.bo.Zone;
import sn.pad.pe.partenariat.dto.ZoneDTO;
import sn.pad.pe.partenariat.repositories.ZoneRepository;
import sn.pad.pe.partenariat.services.ZoneService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class ZoneServiceImpl implements ZoneService {

	@Autowired
	private ZoneRepository zoneRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ZoneDTO> getZones() {
		List<ZoneDTO> zoneDtos = zoneRepository.findAll().stream().map(zone -> modelMapper.map(zone, ZoneDTO.class))
				.collect(Collectors.toList());
		return zoneDtos;
	}

	@Override
	public ZoneDTO getZoneById(Long id) {
		Optional<Zone> zone = zoneRepository.findById(id);
		if (zone.isPresent()) {
			return modelMapper.map(zone.get(), ZoneDTO.class);
		} else {
			throw new ResourceNotFoundException("Zone not found with id : " + id);
		}
	}

	@Override
	public ZoneDTO getZoneByCode(String code) {
		Optional<Zone> zone = zoneRepository.findZoneByCode(code);
		if (zone.isPresent()) {
			return modelMapper.map(zone.get(), ZoneDTO.class);
		} else {
			throw new ResourceNotFoundException("zone not found with code : " + code);
		}
	}

	@Override
	public ZoneDTO create(ZoneDTO zoneDto) {
		zoneDto.setCode(genererCode());
		Zone zoneSaved = modelMapper.map(zoneDto, Zone.class);
		return modelMapper.map(zoneRepository.save(zoneSaved), ZoneDTO.class);
	}

	@Override
	public boolean update(ZoneDTO zoneDto) {
		Optional<Zone> zoneUpdate = zoneRepository.findById(zoneDto.getId());
		boolean isUpdated = false;
		if (zoneUpdate.isPresent()) {
			zoneDto.setCreatedAt(zoneUpdate.get().getCreatedAt());
			zoneRepository.save(modelMapper.map(zoneDto, Zone.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(ZoneDTO zoneDto) {
		Optional<Zone> zoneUpdate = zoneRepository.findById(zoneDto.getId());
		boolean isUpdated = false;
		if (zoneUpdate.isPresent()) {
			zoneRepository.delete(zoneUpdate.get());
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public List<ZoneDTO> createMultiple(List<ZoneDTO> zoneDtos) {
		List<Zone> zone = zoneDtos.stream().map(zoneDto -> modelMapper.map(zoneDto, Zone.class))
				.collect(Collectors.toList());

		zoneDtos = zoneRepository.saveAll(zone).stream().map(zoneEn -> modelMapper.map(zoneEn, ZoneDTO.class))
				.collect(Collectors.toList());
		return zoneDtos;
	}

	private String genererCode() {

		String newRecordCode = null;
		int sizeCode = 6;
		String prefixe = "ZN-";
		String lastRecordCode = null;

		Optional<Zone> lastRecord = zoneRepository.findTopByOrderByIdDesc();

		if (lastRecord.isPresent()) {
			lastRecordCode = lastRecord.get().getCode();
		}

		newRecordCode = GenerationCode.generer(prefixe, sizeCode, lastRecordCode);

		return newRecordCode;
	}

}
