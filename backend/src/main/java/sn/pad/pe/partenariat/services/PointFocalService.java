package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.PointFocalDTO;

public interface PointFocalService {

	public List<PointFocalDTO> getPointFocal();

	public PointFocalDTO getPointFocalById(Long id);

	public List<PointFocalDTO> getPointFocalByCode(int code);

	public PointFocalDTO create(PointFocalDTO pointFocalDto);

	public boolean update(PointFocalDTO pointFocalDto);

	public boolean delete(PointFocalDTO pointFocalDeleted);

	public List<PointFocalDTO> createMultiple(List<PointFocalDTO> pointFocalDtos);
}
