package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.DetailEvenementDTO;

public interface DetailEvenementService {
	public List<DetailEvenementDTO> getDetailEvenements();

	public DetailEvenementDTO getDetailEvenementById(Long id);

	public List<DetailEvenementDTO> getDetailEvenementByCode(Long code);

	public DetailEvenementDTO create(DetailEvenementDTO detailevenementDto);

	public boolean update(DetailEvenementDTO detailevenementDto);

	public boolean delete(DetailEvenementDTO detailevenementDto);

	public List<DetailEvenementDTO> createMultiple(List<DetailEvenementDTO> detailevenementDtos);

}
