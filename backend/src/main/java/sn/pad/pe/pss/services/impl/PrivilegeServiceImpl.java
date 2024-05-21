package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Privilege;
import sn.pad.pe.pss.dto.PrivilegeDTO;
import sn.pad.pe.pss.repositories.PrivilegeRepository;
import sn.pad.pe.pss.services.PrivilegeService;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@Service
public class PrivilegeServiceImpl implements PrivilegeService {

	@Autowired
	private PrivilegeRepository privilegeRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<PrivilegeDTO> getPrivileges() {
		List<PrivilegeDTO> privilegeDTOtoSaved = privilegeRepository.findAll().stream()
				.map(privilege -> modelMapper.map(privilege, PrivilegeDTO.class)).collect(Collectors.toList());
		return privilegeDTOtoSaved;
	}

	@Override
	public PrivilegeDTO getPrivilegeById(String name) {
		Optional<Privilege> privilege = privilegeRepository.findById(name);
		if (privilege.isPresent()) {
			return modelMapper.map(privilege.get(), PrivilegeDTO.class);
		} else {
			throw new ResourceNotFoundException("Privilege not found with id : " + name);
		}
	}

	@Override
	public PrivilegeDTO create(PrivilegeDTO privilegeDTO) {
		Privilege privilegeSaved = modelMapper.map(privilegeDTO, Privilege.class);
		return modelMapper.map(privilegeRepository.save(privilegeSaved), PrivilegeDTO.class);
	}

	@Override
	public boolean update(PrivilegeDTO privilegeDTO) {
		Optional<Privilege> privilegeUpdate = privilegeRepository.findById(privilegeDTO.getNom());
		boolean isUpdated = false;
		if (privilegeUpdate.isPresent()) {
			privilegeRepository.save(modelMapper.map(privilegeDTO, Privilege.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(PrivilegeDTO privilegeDTO) {
		Optional<Privilege> privilegeDelete = privilegeRepository.findById(privilegeDTO.getNom());
		boolean isDeleleted = false;
		if (privilegeDelete.isPresent()) {
			privilegeRepository.delete(privilegeDelete.get());
			isDeleleted = true;
		}
		return isDeleleted;
	}

}
