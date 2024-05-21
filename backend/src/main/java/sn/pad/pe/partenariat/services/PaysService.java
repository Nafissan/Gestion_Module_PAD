package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.PaysDTO;

public interface PaysService {

	public List<PaysDTO> getPays();

	public PaysDTO getPaysById(Long id);

	public PaysDTO getPaysByCode(String code);

	public PaysDTO create(PaysDTO paysDto);

	public boolean update(PaysDTO paysDto);

	public boolean delete(PaysDTO paysDto);

	public List<PaysDTO> createMultiple(List<PaysDTO> paysDtos);
}
