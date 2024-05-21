package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.RoleDTO;

public interface RoleService {

	public List<RoleDTO> getRoles();

	public RoleDTO getRoleById(Long id);

	public RoleDTO create(RoleDTO roleDTO, List<String> nomPrivileges);

	public RoleDTO create(RoleDTO roleDTO);

	public RoleDTO update(RoleDTO roleDTO, List<String> nomPrivileges);

	public boolean update(RoleDTO roleDTO);

	public boolean delete(RoleDTO roleDTO);

}
