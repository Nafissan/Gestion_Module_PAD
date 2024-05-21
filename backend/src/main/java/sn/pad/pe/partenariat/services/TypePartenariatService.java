package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.TypePartenariatDTO;

public interface TypePartenariatService {

	public List<TypePartenariatDTO> getTypePartenariats();

	public TypePartenariatDTO getTypePartenariatById(Long id);

	public TypePartenariatDTO getTypePartenariatByCode(String code);

	public TypePartenariatDTO create(TypePartenariatDTO typePartenariatDto);

	public boolean update(TypePartenariatDTO typePartenariatDto);

	public boolean delete(TypePartenariatDTO typePartenariatDto);

	public List<TypePartenariatDTO> createMultiple(List<TypePartenariatDTO> typePartenariatDtos);
}
