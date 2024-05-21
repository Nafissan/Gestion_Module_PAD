package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.ConventionDTO;

public interface ConventionService {

	public List<ConventionDTO> getConventions();

	public ConventionDTO getConventionById(Long id);

	public List<ConventionDTO> getConventionByCode(int code);

	public ConventionDTO create(ConventionDTO conventionDto);

	public boolean update(ConventionDTO conventionDto);

	public boolean delete(ConventionDTO conventionDto);

	public List<ConventionDTO> createMultiple(List<ConventionDTO> conventionDtos);
}
