package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.ZoneDTO;

public interface ZoneService {

	public List<ZoneDTO> getZones();

	public ZoneDTO getZoneById(Long id);

	public ZoneDTO getZoneByCode(String code);

	public ZoneDTO create(ZoneDTO zoneDto);

	public boolean update(ZoneDTO zoneDto);

	public boolean delete(ZoneDTO zoneDto);

	public List<ZoneDTO> createMultiple(List<ZoneDTO> zoneDtos);
}
