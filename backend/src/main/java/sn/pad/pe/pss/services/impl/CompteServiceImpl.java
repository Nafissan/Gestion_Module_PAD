package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Compte;
import sn.pad.pe.pss.dto.CompteDTO;
import sn.pad.pe.pss.repositories.CompteRepository;
import sn.pad.pe.pss.services.CompteService;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@Service
public class CompteServiceImpl implements CompteService {

	@Autowired
	private CompteRepository compteRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public List<CompteDTO> getComptes() {
		List<CompteDTO> comptesDtoSaved = compteRepository.findAll().stream()
				.map(compte -> modelMapper.map(compte, CompteDTO.class)).collect(Collectors.toList());
		return comptesDtoSaved;
	}

	@Override
	public CompteDTO getCompteById(Long id) {
		Optional<Compte> compte = compteRepository.findById(id);
		if (compte.isPresent()) {
			return modelMapper.map(compte.get(), CompteDTO.class);
		} else {
			throw new ResourceNotFoundException("CompteDTO not found with id : " + id);
		}
	}

	@Override
	public CompteDTO getCompteByUsername(String username) {
		Compte compte = compteRepository.findCompteByUsername(username);
		if (compte != null) {
			return modelMapper.map(compte, CompteDTO.class);
		} else {
			throw new ResourceNotFoundException("CompteDTO not found with id : " + username);
		}
	}

	@Override
	public CompteDTO create(CompteDTO compte) {
		Compte compteFound = compteRepository.findCompteByUsername(compte.getUsername());
		if (compteFound != null)
			throw new RuntimeException(
					"Le compte avec username " + compte.getUsername() + " est déja utilisé par l'utilisateur "
							+ compteFound.getAgent().getPrenom() + " " + compteFound.getAgent().getNom());
		if (compte.getPassword() != null)
			compte.setPassword(bCryptPasswordEncoder.encode(compte.getPassword()));
		compte.setEnabled(true);
		Compte compteSaved = modelMapper.map(compte, Compte.class);
		return modelMapper.map(compteRepository.save(compteSaved), CompteDTO.class);
	}

	@Override
	public boolean update(CompteDTO compteDTO) {
		Optional<Compte> compteUpdate = compteRepository.findById(compteDTO.getId());
		boolean isUpdated = false;
		if (compteUpdate.isPresent()) {
			compteRepository.save(modelMapper.map(compteDTO, Compte.class));
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean updateMany(List<CompteDTO> compteDTOs) {
		boolean isUpdated = false;
		if (!compteDTOs.isEmpty()) {
			List<Compte> comptesToSaved = compteDTOs.stream().map(compteDTO -> modelMapper.map(compteDTO, Compte.class))
					.collect(Collectors.toList());
			compteRepository.saveAll(comptesToSaved);
			isUpdated = true;
		}
		return isUpdated;
	}

	@Override
	public boolean delete(CompteDTO compteDTO) {
		Optional<Compte> compteDelete = compteRepository.findById(compteDTO.getId());
		boolean isDeleleted = false;
		if (compteDelete.isPresent()) {
			compteRepository.delete(compteDelete.get());
			isDeleleted = true;
		}
		return isDeleleted;
	}

	@Override
	public boolean update(CompteDTO compteDTO, String oldPassword, String newPassword) {
		Optional<Compte> compteUpdate = compteRepository.findById(compteDTO.getId());
		boolean isUpdated = false;

		if (compteUpdate.isPresent()) {
			String passwordCompte = compteUpdate.get().getPassword();
			if (bCryptPasswordEncoder.matches(oldPassword, passwordCompte)) {
				compteDTO.setPassword(bCryptPasswordEncoder.encode(newPassword));
				compteRepository.save(modelMapper.map(compteDTO, Compte.class));
				isUpdated = true;
			} else {
				throw new ResourceNotFoundException("l'ancien mot de passe ne correspond pas");
			}
		}
		return isUpdated;
	}

	@Override
	public CompteDTO getCompteByAgent(Long idAgent) {

		Optional<Compte> compte = compteRepository.findCompteByAgent(idAgent);
		if (compte.isPresent()) {
			return modelMapper.map(compte.get(), CompteDTO.class);
		} else {
			throw new ResourceNotFoundException("CompteDTO not found with id : " + compte);
		}
	}

	@Override
	public boolean updateForgot(CompteDTO compteDTO, String newPassword) {
		Optional<Compte> compteUpdate = compteRepository.findById(compteDTO.getId());
		boolean isUpdated = false;

		if (compteUpdate.isPresent()) {
			compteDTO.setPassword(bCryptPasswordEncoder.encode(newPassword));
			compteRepository.save(modelMapper.map(compteDTO, Compte.class));
			isUpdated = true;
		} else {
			throw new ResourceNotFoundException("CompteDTO not found with id : " + compteUpdate);
		}

		return isUpdated;
	}
}
