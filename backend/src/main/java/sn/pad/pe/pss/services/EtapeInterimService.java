package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.EtapeInterimDTO;
import sn.pad.pe.pss.dto.InterimDTO;

public interface EtapeInterimService {

	public List<EtapeInterimDTO> getEtapeInterims();

	public EtapeInterimDTO getEtapeInterimById(Long id);

	public EtapeInterimDTO create(EtapeInterimDTO etapeInterimDTO);

	public boolean update(EtapeInterimDTO etapeInterimDTO);

	public boolean delete(EtapeInterimDTO etapeInterimDTO);

	public List<EtapeInterimDTO> findEtapeInterimsByInterim(InterimDTO interim);
}
