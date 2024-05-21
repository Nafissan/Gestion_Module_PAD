package sn.pad.pe.dotation.services.impl;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.Dotation;
import sn.pad.pe.dotation.bo.Enfant;
import sn.pad.pe.dotation.dto.DotationDTO;
import sn.pad.pe.dotation.repositories.DotationRepository;
import sn.pad.pe.dotation.repositories.EnfantRepository;
import sn.pad.pe.dotation.services.DotationService;

@Service
public class DotationServiceImpl implements DotationService {

	@Autowired
	private DotationRepository dotationRepository;
	@Autowired
	private EnfantRepository enfantRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<DotationDTO> getDotations() {
		List<DotationDTO> typeDotationDtos = dotationRepository.findAll().stream()
				.map(typeDotation -> modelMapper.map(typeDotation, DotationDTO.class)).collect(Collectors.toList());
//		Collections.sort(typeDotationDtos, Collections.reverseOrder());
		return typeDotationDtos;
	}

	@Override
	public DotationDTO getDotationById(Long id) {
		Optional<Dotation> typeDotation = dotationRepository.findById(id);
		if (typeDotation.isPresent()) {
			return modelMapper.map(typeDotation.get(), DotationDTO.class);
		} else {
			throw new ResourceNotFoundException("Dotation not found with id : " + id);
		}
	}

	@Transactional
	@Override
	public DotationDTO create(DotationDTO dotationDto) {
		Dotation dotationToSave = modelMapper.map(dotationDto, Dotation.class);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY");
		List<Enfant> enfants = (List<Enfant>) dotationToSave
				.getEnfants(); /** Contient la liste des enfants à sauvegarder **/

		dotationToSave.setEnfants(null); /** mis à null **/

		Dotation dotationSaved = null;

		List<Dotation> dotationsAgent = dotationRepository
				.findByBeneficiaireMatricule(dotationToSave.getBeneficiaire().getMatricule());
		if (dotationsAgent.size() != 0) {
			for (Dotation dotation : dotationsAgent) {
				if (dotation.getDateDebut().getTime() == dotationToSave.getDateDebut().getTime()) {
					return modelMapper.map(null, DotationDTO.class);
				} else {
					dotationSaved = dotationRepository.save(dotationToSave);
					for (Enfant enfant : enfants) {
						enfant.setNumeroExtrait(simpleDateFormat.format(enfant.getDateNaissance())
								+ enfant.getNumeroExtrait() + dotationToSave.getBeneficiaire().getMatricule());
						enfant.setDotation(dotationSaved);
					}
					enfantRepository.saveAll(enfants);
				}
			}
		} else {

			dotationSaved = dotationRepository.save(dotationToSave);

			for (Enfant enfant : enfants) {
				enfant.setNumeroExtrait(simpleDateFormat.format(enfant.getDateNaissance()) + enfant.getNumeroExtrait()
						+ dotationToSave.getBeneficiaire().getMatricule());
				enfant.setDotation(dotationSaved);
			}

			enfantRepository.saveAll(enfants);

			return modelMapper.map(dotationSaved, DotationDTO.class);
		}
		enfantRepository.saveAll(enfants);

		return modelMapper.map(dotationSaved, DotationDTO.class);
	}

	@Override
	public boolean update(DotationDTO dotationDto) {
		Optional<Dotation> typeDotationUpdate = dotationRepository.findById(dotationDto.getId());
		boolean isUpdated = false;

		Dotation dotationToUpdate = modelMapper.map(dotationDto, Dotation.class);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY");
		if (typeDotationUpdate.isPresent()) {
			dotationToUpdate.setEnfants(dotationToUpdate.getEnfants());

			List<Enfant> enfants = (List<Enfant>) dotationToUpdate.getEnfants();
			/** Contient la liste des enfants à sauvegarder **/
			for (Enfant enfant : enfants) {

				Optional<Enfant> enfantToUpdate = enfantRepository.findById(enfant.getId());
				if (enfantToUpdate.isPresent()) {
					enfant.setId(enfantToUpdate.get().getId());
					enfant.setDotation(dotationToUpdate);
					enfantRepository.save(enfant);
				} else {
					enfant.setNumeroExtrait(simpleDateFormat.format(enfant.getDateNaissance())
							+ enfant.getNumeroExtrait() + dotationToUpdate.getBeneficiaire().getMatricule());
					enfant.setDotation(dotationToUpdate);
					enfantRepository.save(enfant);
				}
			}
			dotationRepository.save(dotationToUpdate);

			isUpdated = true;
		}
		return isUpdated;
	}

	/**
	 * @Override public boolean update(DotationDTO typeDotationDto) {
	 *           Optional<Dotation> typeDotationUpdate =
	 *           dotationRepository.findById(typeDotationDto.getId()); boolean
	 *           isDeleleted = false; if (typeDotationUpdate.isPresent()) {
	 *           dotationRepository.save(modelMapper.map(typeDotationDto,
	 *           Dotation.class)); isDeleleted = true; } return isDeleleted; }
	 **/

	@Override
	public boolean delete(DotationDTO typeDotationDto) {
		Optional<Dotation> typeDotationUpdate = dotationRepository.findById(typeDotationDto.getId());
		boolean isDeleted = false;
		if (typeDotationUpdate.isPresent()) {
			dotationRepository.delete(typeDotationUpdate.get());
			isDeleted = true;
		}
		return isDeleted;
	}

	@Override
	public List<DotationDTO> createMultiple(List<DotationDTO> typeDotationDtos) {
		List<Dotation> typeDotations = typeDotationDtos.stream()
				.map(typeDotationDto -> modelMapper.map(typeDotationDto, Dotation.class)).collect(Collectors.toList());

		typeDotationDtos = dotationRepository.saveAll(typeDotations).stream()
				.map(typeDotation -> modelMapper.map(typeDotation, DotationDTO.class)).collect(Collectors.toList());
		return typeDotationDtos;
	}

}
