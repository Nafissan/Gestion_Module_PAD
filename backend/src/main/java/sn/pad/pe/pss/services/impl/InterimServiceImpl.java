package sn.pad.pe.pss.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.DossierInterim;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.bo.Interim;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.AttestationDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;
import sn.pad.pe.pss.repositories.DossierInterimRepository;
import sn.pad.pe.pss.repositories.InterimRepository;
import sn.pad.pe.pss.repositories.UniteOrganisationnelleRepository;
import sn.pad.pe.pss.services.FileMetaDataService;
import sn.pad.pe.pss.services.InterimService;
import sn.pad.pe.pss.services.helpers.FileStorageService;

@Service
public class InterimServiceImpl implements InterimService {

	@Autowired
	private InterimRepository interimRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private DossierInterimRepository dossierInterimRepository;

	@Autowired
	private FileStorageService fileStorageService;

	@Autowired
	FileMetaDataService fileMetaDataService;

	@Autowired
	private UniteOrganisationnelleRepository uniteOrganisationnelleRepository;

	@Override
	public List<InterimDTO> getInterims() {
		List<InterimDTO> interimDTOSaved = interimRepository.findAll().stream()
				.map(interim -> modelMapper.map(interim, InterimDTO.class)).collect(Collectors.toList());
		return interimDTOSaved;
	}

	@Override
	public InterimDTO getInterimById(Long id) {
		Optional<Interim> interim = interimRepository.findById(id);
		if (interim.isPresent()) {
			return modelMapper.map(interim.get(), InterimDTO.class);
		} else {
			throw new ResourceNotFoundException("Agent not found with id : " + id);
		}
	}

	@Override
	public List<InterimDTO> getInterimsByUniteOrganisationnelles(UniteOrganisationnelleDTO organisationnelle) {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelle,
				UniteOrganisationnelle.class);
		List<InterimDTO> interimDTOList = interimRepository.findInterimsByUniteOrganisationnelle(uniteOrganisationnelle)
				.stream().map(interim -> modelMapper.map(interim, InterimDTO.class)).collect(Collectors.toList());
		return interimDTOList;
	}

	@Override
	public List<InterimDTO> findInterimsByAgent(AgentDTO agentDTO) {
		Agent agent = modelMapper.map(agentDTO, Agent.class);
		List<InterimDTO> interimDTOList = interimRepository.findInterimsByAgentDepart(agent).stream()
				.map(interim -> modelMapper.map(interim, InterimDTO.class)).collect(Collectors.toList());
		return interimDTOList;
	}

	@Override
	public List<InterimDTO> getInterimByDossierInterim(Long idDossierInterim) {
		Optional<DossierInterim> dossierInterimOptional = dossierInterimRepository.findById(idDossierInterim);
		if (dossierInterimOptional.isPresent()) {
			DossierInterim dossierInterim = dossierInterimOptional.get();
			List<Interim> interims = interimRepository.findInterimsByDossierInterim(dossierInterim);
			return interims.stream().map(interim -> modelMapper.map(interim, InterimDTO.class))
					.collect(Collectors.toList());
		} else {
			throw new ResourceNotFoundException("Interim not found with idDossierInterim : " + idDossierInterim);
		}

	}

	@Override
	public InterimDTO create(InterimDTO interimDTO) {
//		Calendar calendar =new GregorianCalendar();
//		
//		
//		int anneecourant =calendar.get(Calendar.YEAR);
//		System.out.println("get Year :"+anneecourant);
//		DossierInterimDTO dossierInterimDTO = dossierInterimService.dossierInterimByUniteOrganisationnelleAndAnnee(interimDTO.getUniteOrganisationnelle(),anneecourant);

		Interim interimSaved = null;
//		if(dossierInterimDTO == null)
//		{
//			dossierInterimDTO = new DossierInterimDTO();
//			
//			dossierInterimDTO.setCode("DI-"+anneecourant);
//			dossierInterimDTO.setAnnee(anneecourant);
//			dossierInterimDTO.setDescription("Dossier Intérim de L'année "+anneecourant);
//			dossierInterimDTO.setUniteOrganisationnelle(interimDTO.getUniteOrganisationnelle());
//			dossierInterimDTO =	dossierInterimService.createDossierInterim(dossierInterimDTO);
//			
//		}
//		DossierInterim dossierInterim = modelMapper.map(dossierInterimDTO,DossierInterim.class);
		interimSaved = modelMapper.map(interimDTO, Interim.class);
//		interimSaved.setDossierInterim(dossierInterim);

		return modelMapper.map(interimRepository.save(interimSaved), InterimDTO.class);

	}

	@Override
	public boolean update(InterimDTO interimDTO) {

		Optional<Interim> imterimUpdate = interimRepository.findById(interimDTO.getId());
		boolean isUpdated = false;
		if (imterimUpdate.isPresent()) {

			Interim interimSaved = modelMapper.map(interimDTO, Interim.class);
			interimRepository.save(interimSaved);

			isUpdated = true;
		}
		return isUpdated;

	}

	@Override
	public boolean delete(InterimDTO interimDTO) {
		Optional<Interim> interimDelete = interimRepository.findById(interimDTO.getId());
		boolean isDeleleted = false;

		if (interimDelete.isPresent()) {

			Interim interimToDelete = interimDelete.get();
			interimRepository.delete(interimToDelete);
			isDeleleted = true;
		}
		return isDeleleted;
	}

//	@Override
//	public List<InterimDTO> getInterimByDossierInterim(Long idDossierInterim) {
//		DossierInterimDTO dossierInterimDTO = dossierInterimService.getDossierInterimById(idDossierInterim);		
//		DossierInterim dossierInterim = modelMapper.map(dossierInterimDTO,DossierInterim.class);
//		List<InterimDTO> dossierInterimDTOs = interimRepository.findInterimsByDossierInterim(dossierInterim) 
//				.stream()
//				.map(interim -> modelMapper.map(interim, InterimDTO.class))
//				.collect(Collectors.toList());
//		return dossierInterimDTOs;
//		return isDeleleted;
//	}

	@Override
	public UploadFileResponse uploadInterim(Long id, MultipartFile file) {
		Interim interim = interimRepository.findIntermById(id);
		if (interim != null && file != null) {
			UploadFileResponse fileToSave = fileStorageService.uploadFile(file);
			FileMetaData metadata = modelMapper.map(fileMetaDataService.findById(fileToSave.getId()),
					FileMetaData.class);
			interim.setFileMetaData(metadata);
			interimRepository.save(interim);
			return fileToSave;
		} else {
			return null;
		}

	}

	@Override
	public ResponseEntity<Resource> downloadInterim(Long id, HttpServletRequest request) {
		Interim interim = interimRepository.findIntermById(id);
		String fileName = interim.getFileMetaData().getFileName();
		if (fileName != null) {
			return fileStorageService.downloadFile(fileName, request);
		} else {
			return null;
		}

	}

	@Override
	public List<InterimDTO> getInterimsByUniteOrganisationnelleAndAnnee(UniteOrganisationnelleDTO organisationnelleDTO,
			int annee) {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(organisationnelleDTO,
				UniteOrganisationnelle.class);
		List<InterimDTO> interimDTOList = interimRepository
				.findInterimsByUniteOrganisationnelleAndAnnee(uniteOrganisationnelle, annee).stream()
				.map(interim -> modelMapper.map(interim, InterimDTO.class)).collect(Collectors.toList());
		return interimDTOList;
	}

	@Override
	public List<InterimDTO> getInterimsByUniteOrganisationnelless(List<Long> idUniteOrganisationnelles) {

		List<Interim> interims = new ArrayList<Interim>();

		for (Long idUniteOrganisationnelle : idUniteOrganisationnelles) {
			Optional<UniteOrganisationnelle> uniteOrganisationnelle = uniteOrganisationnelleRepository
					.findById(idUniteOrganisationnelle);

			List<Interim> ints = interimRepository.findInterimsByUniteOrganisationnelle(uniteOrganisationnelle.get());

			interims.addAll(ints);
		}

		List<InterimDTO> interimDTOs = interims.stream().map(interim -> modelMapper.map(interim, InterimDTO.class))
				.collect(Collectors.toList());

		return interimDTOs;
	}

}
