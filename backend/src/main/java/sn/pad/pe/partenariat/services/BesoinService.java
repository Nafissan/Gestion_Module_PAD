package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.BesoinDTO;

public interface BesoinService {

	public List<BesoinDTO> getBesoin();

	public BesoinDTO getBesoinById(Long id);

	public List<BesoinDTO> getBesoinByPlanprospection(Long id);

	public BesoinDTO create(BesoinDTO besoinDTO);

	public boolean update(BesoinDTO besoinDTO);

	public boolean delete(BesoinDTO besoinDTO);

	public List<BesoinDTO> createMultiple(List<BesoinDTO> besoinDtos);
}
