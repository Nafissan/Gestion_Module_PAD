package sn.pad.pe.pss.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.DossierInterim;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.bo.Interim;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.DossierInterimDTO;
import sn.pad.pe.pss.dto.FileMetaDataDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;
import sn.pad.pe.pss.repositories.DossierInterimRepository;
import sn.pad.pe.pss.repositories.InterimRepository;
import sn.pad.pe.pss.services.helpers.FileStorageService;
import sn.pad.pe.pss.services.impl.InterimServiceImpl;

@DisplayName("Test Service Interim")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class InterimServiceTest {
	@Mock
	FileStorageService fileStorageService;
	@Mock
	FileMetaDataService fileMetaDataService;
	@Mock
	private HttpServletRequest request;
	@Mock
	private InterimRepository interimRepository;
	@Mock
	private DossierInterimRepository dossierInterimRepository;
	@InjectMocks
	private InterimServiceImpl interimServiceImpl;
	@Spy
	private ModelMapper modelMapper;
	private static InterimDTO interimDTO;
	private static InterimDTO interimDTOVerify;
	@SuppressWarnings("unused")
	private static List<InterimDTO> interimDTOsFromServiceVerify;
	private static List<InterimDTO> interimDTOs;
	private static AgentDTO agentDepart;
	private static AgentDTO agentArrive;
	private static UniteOrganisationnelleDTO uniteOrganisationnelleDTO;
	private static DossierInterimDTO dossierInterimDTO;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		agentDepart = new AgentDTO();
		agentDepart.setId(1L);

		agentArrive = new AgentDTO();
		agentArrive.setId(2L);

		uniteOrganisationnelleDTO = new UniteOrganisationnelleDTO();
		uniteOrganisationnelleDTO.setId(1L);
		dossierInterimDTO = new DossierInterimDTO();
		dossierInterimDTO.setId(1L);
		dossierInterimDTO.setUniteOrganisationnelle(uniteOrganisationnelleDTO);

		interimDTO = new InterimDTO();
		interimDTO.setId(1L);
		interimDTO.setAgentDepart(agentDepart);
		interimDTO.setAgentArrive(agentArrive);
		interimDTO.setUniteOrganisationnelle(uniteOrganisationnelleDTO);
		interimDTO.setDossierInterim(dossierInterimDTO);

		interimDTOs = Arrays.asList(interimDTO);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet Interim")
	@Test
	final void testGetInterims() {
		List<Interim> interims = interimDTOs.stream().map(interim -> modelMapper.map(interim, Interim.class))
				.collect(Collectors.toList());
		when(interimRepository.findAll()).thenReturn(interims);
		List<InterimDTO> interimDTOsFromService = interimServiceImpl.getInterims();
		Assertions.assertEquals(interimDTOs.size(), interimDTOsFromService.size());
		verify(interimRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet Interim By ID: ID exist")
	@Test
	final void testGetInterimByIdExist() {
		Interim interim = modelMapper.map(interimDTO, Interim.class);
		when(interimRepository.findById(interim.getId())).thenReturn(Optional.of(interim));
		InterimDTO interimDTOFromService = interimServiceImpl.getInterimById(interim.getId());
		Assertions.assertEquals(interimDTO.getId(), interimDTOFromService.getId());
		verify(interimRepository, Mockito.times(1)).findById(interim.getId());
	}

	@Order(3)
	@DisplayName("Get Objet Interim By ID: ID not exist")
	@Test
	final void testGetInterimByIdNotExist() {
		Interim interim = modelMapper.map(interimDTO, Interim.class);
		when(interimRepository.findById(interim.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			interimDTOVerify = interimServiceImpl.getInterimById(interim.getId());
		});
		Assertions.assertNull(interimDTOVerify);
		verify(interimRepository, Mockito.times(1)).findById(interim.getId());
	}

	@Order(4)
	@DisplayName("Get Objet Interim By UniteOrganisationnelle")
	@Test
	final void testGetInterimsByUniteOrganisationnelles() {
		UniteOrganisationnelle uniteOrganisationnelle = modelMapper.map(uniteOrganisationnelleDTO,
				UniteOrganisationnelle.class);
		when(modelMapper.map(uniteOrganisationnelleDTO, UniteOrganisationnelle.class))
				.thenReturn(uniteOrganisationnelle);
		List<Interim> interims = interimDTOs.stream().map(interim -> modelMapper.map(interim, Interim.class))
				.collect(Collectors.toList());
		when(interimRepository.findInterimsByUniteOrganisationnelle(uniteOrganisationnelle)).thenReturn(interims);
		List<InterimDTO> interimDTOsFromService = interimServiceImpl
				.getInterimsByUniteOrganisationnelles(uniteOrganisationnelleDTO);
		Assertions.assertEquals(interimDTOs.size(), interimDTOsFromService.size());
		verify(interimRepository, Mockito.times(1)).findInterimsByUniteOrganisationnelle(uniteOrganisationnelle);
	}

	@Order(5)
	@DisplayName("Get Objet Interim By Agent")
	@Test
	final void testFindInterimsByAgent() {
		Agent agent = modelMapper.map(agentDepart, Agent.class);
		when(modelMapper.map(agentDepart, Agent.class)).thenReturn(agent);
		List<Interim> interims = interimDTOs.stream().map(interim -> modelMapper.map(interim, Interim.class))
				.collect(Collectors.toList());
		when(interimRepository.findInterimsByAgentDepart(agent)).thenReturn(interims);
		List<InterimDTO> interimDTOsFromService = interimServiceImpl.findInterimsByAgent(agentDepart);
		Assertions.assertEquals(interimDTOs.size(), interimDTOsFromService.size());
		verify(interimRepository, Mockito.times(1)).findInterimsByAgentDepart(agent);
	}

	@Order(6)
	@DisplayName("Get Objet Interim By DossierInterim: DossierInterim exist ")
	@Test
	final void testGetInterimByDossierInterimExist() {
		DossierInterim dossierInterim = modelMapper.map(dossierInterimDTO, DossierInterim.class);
		when(dossierInterimRepository.findById(dossierInterim.getId())).thenReturn(Optional.of(dossierInterim));
		List<Interim> interims = interimDTOs.stream().map(interim -> modelMapper.map(interim, Interim.class))
				.collect(Collectors.toList());
		when(interimRepository.findInterimsByDossierInterim(dossierInterim)).thenReturn(interims);
		List<InterimDTO> interimDTOsFromService = interimServiceImpl
				.getInterimByDossierInterim(dossierInterimDTO.getId());
		Assertions.assertEquals(interimDTOs.size(), interimDTOsFromService.size());
		verify(interimRepository, Mockito.times(1)).findInterimsByDossierInterim(dossierInterim);
	}
	@Order(6)
	@DisplayName("Get Objet Interim By DossierInterim: DossierInterim not exist")
	@Test
	final void testGetInterimByDossierInterimNotExist() {
		DossierInterim dossierInterim = modelMapper.map(dossierInterimDTO, DossierInterim.class);
		when(dossierInterimRepository.findById(dossierInterim.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			interimDTOsFromServiceVerify = interimServiceImpl
					.getInterimByDossierInterim(dossierInterimDTO.getId());
		});
		Assertions.assertNull(interimDTOVerify);
		verify(dossierInterimRepository, Mockito.times(1)).findById(dossierInterim.getId());
	}

	@Order(7)
	@DisplayName("Create objet Interim")
	@Test
	final void testCreate() {
		Interim interim = modelMapper.map(interimDTO, Interim.class);
		when(modelMapper.map(interimDTO, Interim.class)).thenReturn(interim);
		when(interimRepository.save(interim)).thenReturn(interim);
		when(modelMapper.map(interim, InterimDTO.class)).thenReturn(interimDTO);
		InterimDTO interimDTOFromService = interimServiceImpl.create(interimDTO);
		Assertions.assertEquals(interimDTO, interimDTOFromService);
		verify(interimRepository, Mockito.times(1)).save(interim);
	}

	@Order(8)
	@DisplayName("Update Objet Interim: Object exist")
	@Test
	final void testUpdateExist() {
		Interim interim = modelMapper.map(interimDTO, Interim.class);
		when(modelMapper.map(interimDTO, Interim.class)).thenReturn(interim);
		when(interimRepository.findById(interim.getId())).thenReturn(Optional.of(interim));
		when(interimRepository.save(interim)).thenReturn(interim);
		updated = interimServiceImpl.update(interimDTO);
		Assertions.assertTrue(updated);
		Mockito.verify(interimRepository).findById(interim.getId());
		Mockito.verify(interimRepository).save(interim);
	}

	@Order(9)
	@DisplayName("Update Objet Interim: Object not exist")
	@Test
	final void testUpdateNotExist() {
		Interim interim = modelMapper.map(interimDTO, Interim.class);
		when(interimRepository.findById(interim.getId())).thenReturn(Optional.empty());
		updated = interimServiceImpl.update(interimDTO);
		Assertions.assertFalse(updated);
		Mockito.verify(interimRepository, Mockito.times(1)).findById(interim.getId());
		Mockito.verify(interimRepository, Mockito.times(0)).save(interim);
	}

	@Order(10)
	@DisplayName("Delete objet Interim By ID: ID exist")
	@Test
	final void testDeleteExist() {
		Interim interim = modelMapper.map(interimDTO, Interim.class);
		when(interimRepository.findById(interim.getId())).thenReturn(Optional.of(interim));
		doNothing().when(interimRepository).delete(interim);
		deleted = interimServiceImpl.delete(interimDTO);
		Assertions.assertTrue(deleted);
		Mockito.verify(interimRepository).findById(interim.getId());
		Mockito.verify(interimRepository).delete(interim);
	}

	@Order(11)
	@DisplayName("Delete objet Interim By ID: ID not exist")
	@Test
	final void testDeleteNotExist() {
		Interim interim = modelMapper.map(interimDTO, Interim.class);
		when(interimRepository.findById(interim.getId())).thenReturn(Optional.empty());
		deleted = interimServiceImpl.delete(interimDTO);
		Assertions.assertFalse(deleted);
		Mockito.verify(interimRepository, Mockito.times(1)).findById(interim.getId());
		Mockito.verify(interimRepository, Mockito.times(0)).delete(interim);
	}

	@Order(12)
	@DisplayName("Upload File: File exist")
	@Test
	void uploadAttestationExist() {
		MultipartFile file = new MockMultipartFile("test.txt", "Hallo World".getBytes());
		UploadFileResponse fileSaved = new UploadFileResponse(1L, "test.txt", "test.txt", "txt", 2L);
		FileMetaDataDTO fileMetaData = new FileMetaDataDTO();
		Interim interim = modelMapper.map(interimDTO, Interim.class);

		when(interimRepository.findIntermById(interim.getId())).thenReturn(interim);
		when(fileStorageService.uploadFile(file)).thenReturn(fileSaved);
		when(fileMetaDataService.findById(fileSaved.getId())).thenReturn(fileMetaData);
		when(interimRepository.save(interim)).thenReturn(interim);

		UploadFileResponse fileUdated = interimServiceImpl.uploadInterim(1L, file);
		Assertions.assertEquals(fileSaved, fileUdated);
	}

	@Order(13)
	@DisplayName("Upload File: File not exist")
	@Test
	void uploadAttestationNotExist() {
		UploadFileResponse fileSaved = new UploadFileResponse(1L, "test.txt", "test.txt", "txt", 2L);
		Interim interim = modelMapper.map(interimDTO, Interim.class);

		when(interimRepository.findIntermById(interim.getId())).thenReturn(null);
		UploadFileResponse fileUdated = interimServiceImpl.uploadInterim(1L, null);
		Assertions.assertNotEquals(fileSaved, fileUdated);
	}

	@Order(14)
	@DisplayName("Download File: File exist")
	@Test
	void downloadFileExist() {
		FileMetaData fileMetaData = new FileMetaData();
		fileMetaData.setFileName("test.txt");
		Interim interim = modelMapper.map(interimDTO, Interim.class);

		interim.setFileMetaData(fileMetaData);
		String fileName = fileMetaData.getFileName();
		when(interimRepository.findIntermById(interim.getId())).thenReturn(interim);
		ResponseEntity<Resource> responseEntity = new ResponseEntity<Resource>(HttpStatus.ACCEPTED);
		when(fileStorageService.downloadFile(fileName, request)).thenReturn(responseEntity);

		ResponseEntity<Resource> responseEntity2 = interimServiceImpl.downloadInterim(interim.getId(), request);
		Assertions.assertEquals(responseEntity, responseEntity2);
	}

	@Order(15)
	@DisplayName("Download File: File not exist")
	@Test
	void downloadFileNotExist() {
		FileMetaData fileMetaData = new FileMetaData();
		fileMetaData.setFileName("test.txt");
		Interim interim = modelMapper.map(interimDTO, Interim.class);

		interim.setFileMetaData(fileMetaData);
		@SuppressWarnings("unused")
		String fileName = fileMetaData.getFileName();
		when(interimRepository.findIntermById(interim.getId())).thenReturn(interim);
		ResponseEntity<Resource> responseEntity = new ResponseEntity<Resource>(HttpStatus.ACCEPTED);
		ResponseEntity<Resource> responseEntity2 = interimServiceImpl.downloadInterim(interim.getId(), request);
		Assertions.assertNotEquals(responseEntity, responseEntity2);
	}

}
