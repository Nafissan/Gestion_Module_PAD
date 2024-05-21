package sn.pad.pe.pss.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Privilege;
import sn.pad.pe.pss.bo.Role;
import sn.pad.pe.pss.dto.PrivilegeDTO;
import sn.pad.pe.pss.dto.RoleDTO;
import sn.pad.pe.pss.repositories.PrivilegeRepository;
import sn.pad.pe.pss.repositories.RoleRepository;
import sn.pad.pe.pss.services.RoleService;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private PrivilegeRepository privilegeRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<RoleDTO> getRoles() {
		List<RoleDTO> roleDTOtoSaved = roleRepository.findAll().stream()
				.map(role -> modelMapper.map(role, RoleDTO.class)).collect(Collectors.toList());
		return roleDTOtoSaved;
	}

	@Override
	public RoleDTO getRoleById(Long name) {
		Optional<Role> role = roleRepository.findById(name);
		if (role.isPresent()) {
			return modelMapper.map(role.get(), RoleDTO.class);
		} else {
			throw new ResourceNotFoundException("Role not found with id : " + name);
		}
	}

	@Override
	public RoleDTO create(RoleDTO roleDTO) {
		Role roleSaved = modelMapper.map(roleDTO, Role.class);
		return modelMapper.map(roleRepository.save(roleSaved), RoleDTO.class);
	}

	@Override
	public RoleDTO create(RoleDTO roleDTO, List<String> nomPrivileges) {
		Set<PrivilegeDTO> privilegesAdded = new HashSet<PrivilegeDTO>();
		for (String privilege : nomPrivileges) {
			Privilege pr = privilegeRepository.findPrivilegeByNomLike(privilege);
			PrivilegeDTO privilegeDTO = modelMapper.map(pr, PrivilegeDTO.class);
			privilegesAdded.add(privilegeDTO);
		}
		roleDTO.setPrivileges(privilegesAdded);

		Role roleSaved = modelMapper.map(roleDTO, Role.class);
		return modelMapper.map(roleRepository.save(roleSaved), RoleDTO.class);
	}

	@Override
	public RoleDTO update(RoleDTO roleDTO, List<String> nomPrivileges) {
		try {
			Set<PrivilegeDTO> privilegesAdded = new HashSet<>();
			for (String privilege : nomPrivileges) {
				Privilege pr = privilegeRepository.findPrivilegeByNomLike(privilege);
				PrivilegeDTO privilegeDTO = modelMapper.map(pr, PrivilegeDTO.class);
				privilegesAdded.add(privilegeDTO);
			}
			roleDTO.setPrivileges(privilegesAdded);
			Role roleSaved = modelMapper.map(roleDTO, Role.class);
			return modelMapper.map(roleRepository.save(roleSaved), RoleDTO.class);

		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public boolean update(RoleDTO roleDTO) {
		Optional<Role> roleUpdate = roleRepository.findById(roleDTO.getId());
		boolean isUpdated = false;
		if (roleUpdate.isPresent()) {
			roleRepository.save(modelMapper.map(roleDTO, Role.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(RoleDTO roleDTO) {
		Optional<Role> roleUpdate = roleRepository.findById(roleDTO.getId());
		boolean isDeleleted = false;
		if (roleUpdate.isPresent()) {
			Role roleToDelete = roleUpdate.get();
			roleRepository.delete(roleToDelete);
			isDeleleted = true;
		}
		return isDeleleted;
	}

}
