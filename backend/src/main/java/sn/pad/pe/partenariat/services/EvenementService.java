package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.EvenementDTO;

public interface EvenementService {

	public List<EvenementDTO> getEvenements();

	public EvenementDTO getEvenementById(Long id);

	public EvenementDTO getEvenementByCode(String code);

	public EvenementDTO create(EvenementDTO evenementDto);

	public boolean update(EvenementDTO evenementDto);

	public boolean delete(EvenementDTO evenementDto);

	public List<EvenementDTO> createMultiple(List<EvenementDTO> evenementDtos);
}
