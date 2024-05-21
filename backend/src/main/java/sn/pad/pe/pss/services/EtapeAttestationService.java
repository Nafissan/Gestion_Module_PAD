package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.EtapeAttestationDTO;

public interface EtapeAttestationService {

	public List<EtapeAttestationDTO> getEtapeAttestations();

	public EtapeAttestationDTO getEtapeAttestationById(Long id);

	public boolean updateMany(List<EtapeAttestationDTO> etapeAttestationDTOs);

	public EtapeAttestationDTO createMany(List<EtapeAttestationDTO> etapeAttestationDTOs);

	public EtapeAttestationDTO create(EtapeAttestationDTO etapeAttestationDTO);

	public boolean update(EtapeAttestationDTO etapeAttestationDTO);

	public boolean delete(EtapeAttestationDTO etapeAttestationDTO);
}
