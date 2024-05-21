package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.CompteDTO;

public interface CompteService {

	public List<CompteDTO> getComptes();

	public CompteDTO getCompteById(Long id);

	public CompteDTO getCompteByUsername(String username);

	public CompteDTO create(CompteDTO compteDTO);

	public boolean update(CompteDTO compteDTO);

	public boolean updateMany(List<CompteDTO> compteDTOs);

	public boolean update(CompteDTO compteDTO, String oldPassword, String newPassword);

	public boolean delete(CompteDTO compteDTO);

	public CompteDTO getCompteByAgent(Long idAgent);

	public boolean updateForgot(CompteDTO compteDTO, String newPassword);
}
