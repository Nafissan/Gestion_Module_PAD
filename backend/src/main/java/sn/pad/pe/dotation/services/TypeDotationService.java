package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.TypeDotationDTO;

public interface TypeDotationService {

	public List<TypeDotationDTO> getTypeDotations();

	public TypeDotationDTO getTypeDotationById(Long id);

	public TypeDotationDTO create(TypeDotationDTO typeDotationDto);

	public boolean update(TypeDotationDTO typeDotationDto);

	public boolean delete(TypeDotationDTO typeDotationDto);

	public List<TypeDotationDTO> createMultiple(List<TypeDotationDTO> typeDotationDtos);
}
