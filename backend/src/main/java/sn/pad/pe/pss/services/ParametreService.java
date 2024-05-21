package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.ParametresDTO;

public interface ParametreService {

	public List<ParametresDTO> findAllParametre();

	public List<ParametresDTO> chercherListParametreByCode(String mc);

	public ParametresDTO saveParametre(ParametresDTO comm);

}
