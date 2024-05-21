package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.DotationDTO;

public interface DotationService {

	public List<DotationDTO> getDotations();

	public DotationDTO getDotationById(Long id);

	public DotationDTO create(DotationDTO dotationDto);

	public boolean update(DotationDTO dotationDto);

	public boolean delete(DotationDTO dotationDto);

	public List<DotationDTO> createMultiple(List<DotationDTO> dotationDtos);
}
