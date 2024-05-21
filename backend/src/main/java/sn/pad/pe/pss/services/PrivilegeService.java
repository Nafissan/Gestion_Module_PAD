package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.dto.PrivilegeDTO;

public interface PrivilegeService {

	public List<PrivilegeDTO> getPrivileges();

	public PrivilegeDTO getPrivilegeById(String codePrivilege);

	public PrivilegeDTO create(PrivilegeDTO privilegeDTO);

	public boolean update(PrivilegeDTO privilegeDTO);

	public boolean delete(PrivilegeDTO privilegeDTO);
}
