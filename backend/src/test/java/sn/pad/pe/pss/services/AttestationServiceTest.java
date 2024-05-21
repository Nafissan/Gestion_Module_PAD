package sn.pad.pe.pss.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
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
import sn.pad.pe.pss.bo.Attestation;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.AttestationDTO;
import sn.pad.pe.pss.dto.FileMetaDataDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;
import sn.pad.pe.pss.repositories.AgentRepository;
import sn.pad.pe.pss.repositories.AttestationRepository;
import sn.pad.pe.pss.services.helpers.FileStorageService;
import sn.pad.pe.pss.services.impl.AttestationServiceImpl;

@DisplayName("Test Service Attestation")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class AttestationServiceTest {
	@Spy
	private static ModelMapper modelMapper;

	@Mock
	private AttestationRepository attestationRepository;
	@Mock
	private AgentRepository agentRepository;
	@Mock
	FileStorageService fileStorageService;
	@Mock
	FileMetaDataService fileMetaDataService;
	@Mock
	private HttpServletRequest request;
	@InjectMocks
	private AttestationServiceImpl attestationService;

	private static AttestationDTO attestationDto;
	private static AttestationDTO attestationDto_1;
	private static Attestation attestation;
	private static UniteOrganisationnelleDTO organisationnelleDTO;
	private static UniteOrganisationnelle organisationnelle;
	private static AgentDTO agentDTO;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		agentDTO = new AgentDTO();
		agentDTO.setId(1L);
		agentDTO.setMatricule("607043");
		agentDTO.setEmail("ada@gmail.com");
		agentDTO.setPrenom("");
		organisationnelleDTO = new UniteOrganisationnelleDTO();
		organisationnelleDTO.setId(1L);

		organisationnelle = new UniteOrganisationnelle();
		organisationnelle.setId(1L);

		attestationDto = new AttestationDTO();
		attestationDto.setId(1L);
		attestationDto.setCommentaire("demande1");
		attestationDto.setAgent(agentDTO);
		attestationDto.setUniteOrganisationnelle(organisationnelleDTO);

		modelMapper = new ModelMapper();
		attestation = modelMapper.map(attestationDto, Attestation.class);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("List des attestations")
	@Test
	void testGetAttestations() {
		when(attestationRepository.findAll()).thenReturn(Arrays.asList(attestation));
		List<AttestationDTO> attestationDTOs = attestationService.getAttestations();
		Assertions.assertEquals(1, attestationDTOs.size());
	}

	@Order(2)
	@DisplayName("Chercher attestationDto By Id: Id exist")
	@Test
	void testGetAttestationByIdExist() {
		when(attestationRepository.findById(attestationDto.getId())).thenReturn(Optional.of((attestation)));
		when(modelMapper.map(attestation, AttestationDTO.class)).thenReturn(attestationDto);

		AttestationDTO myAttestationDTO = attestationService.getAttestationById(attestationDto.getId());
		assertEquals(attestationDto, myAttestationDTO);
	}

	@Order(3)
	@DisplayName("Chercher attestationDto By Id: Id not exist")
	@Test
	void testGetAttestationByIdNotExist() {
		when(attestationRepository.findById(attestationDto.getId())).thenReturn(Optional.empty());

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			attestationDto_1 = attestationService.getAttestationById(attestationDto.getId());
		});
		Assertions.assertNull(attestationDto_1);
		verify(attestationRepository, Mockito.times(1)).findById(attestation.getId());
	}

	@Order(4)
	@DisplayName("Creation attestationDto")
	@Test
	void testCreate() {
		when(modelMapper.map(attestationDto, Attestation.class)).thenReturn(attestation);
		when(attestationRepository.save(attestation)).thenReturn(attestation);
		when(modelMapper.map(attestation, AttestationDTO.class)).thenReturn(attestationDto);

		AttestationDTO myTestAttestationDTO = attestationService.create(attestationDto);
		assertEquals(myTestAttestationDTO, attestationDto);
	}

	@Order(5)
	@DisplayName("Update attestationDto: Object exist")
	@Test
	void testUpdateExist() {
		AttestationDTO attestationDTOFromMapper = attestationDto;
		when(modelMapper.map(attestationDTOFromMapper, Attestation.class)).thenReturn(attestation);
		when(attestationRepository.findById(attestation.getId())).thenReturn(Optional.of(attestation));
		when(attestationRepository.save(attestation)).thenReturn(attestation);
		updated = attestationService.update(modelMapper.map(attestationDto, AttestationDTO.class));
		Assertions.assertTrue(updated);
		Mockito.verify(attestationRepository, Mockito.times(1)).findById(attestation.getId());
		Mockito.verify(attestationRepository, Mockito.times(1)).save(attestation);
	}

	@Order(6)
	@DisplayName("Update attestationDto: Object not exist")
	@Test
	void testUpdateNotExist() {
		AttestationDTO attestationDTOFromMapper = attestationDto;
		when(modelMapper.map(attestationDTOFromMapper, Attestation.class)).thenReturn(attestation);
		when(attestationRepository.findById(attestation.getId())).thenReturn(Optional.empty());
		updated = attestationService.update(modelMapper.map(attestationDto, AttestationDTO.class));
		Assertions.assertFalse(updated);
		Mockito.verify(attestationRepository, Mockito.times(1)).findById(attestation.getId());
		Mockito.verify(attestationRepository, Mockito.times(0)).save(attestation);
	}

	@Order(7)
	@DisplayName("Delete attestationDto By Id: Id exist")
	@Test
	void testDeleteExist() {
		AttestationDTO attestationDTOFromMapper = attestationDto;
		when(attestationRepository.findById(attestation.getId())).thenReturn(Optional.of(attestation));
		when(modelMapper.map(attestationDTOFromMapper, Attestation.class)).thenReturn(attestation);
		doNothing().when(attestationRepository).delete(attestation);
		deleted = attestationService.delete(attestationDTOFromMapper);
		Assertions.assertTrue(deleted);
		Mockito.verify(attestationRepository, Mockito.times(1)).findById(attestation.getId());
		Mockito.verify(attestationRepository, Mockito.times(1)).delete(attestation);
	}

	@Order(8)
	@DisplayName("Delete attestationDto By Id: Id not exist")
	@Test
	void testDeleteNotExist() {
		AttestationDTO attestationDTOFromMapper = attestationDto;
		when(attestationRepository.findById(attestation.getId())).thenReturn(Optional.empty());
		deleted = attestationService.delete(attestationDTOFromMapper);
		Assertions.assertFalse(deleted);
		Mockito.verify(attestationRepository, Mockito.times(1)).findById(attestation.getId());
		Mockito.verify(attestationRepository, Mockito.times(0)).delete(attestation);
	}

	@SuppressWarnings("unchecked")
	@Order(9)
	@DisplayName("UpdateMany attestationDto: Object exist")
	@Test
	void testUpdateManyExist() {
		List<AttestationDTO> attestationsDtos = Arrays.asList(attestationDto);
		List<Attestation> attestations = attestationsDtos.stream()
				.map(att -> modelMapper.map(att, Attestation.class)).collect(Collectors.toList());
		when(attestationRepository.saveAll(any(List.class))).thenReturn(attestations);
		updated = attestationService.updateMany(attestationsDtos);
		Assertions.assertTrue(updated);
		Mockito.verify(attestationRepository, Mockito.times(1)).saveAll(any(List.class));
	}

	@SuppressWarnings("unchecked")
	@Order(10)
	@DisplayName("UpdateMany attestationDto: Object not exist")
	@Test
	void testUpdateManyNotExist() {
		List<Attestation> attestations = Arrays.asList(attestation);
		updated = attestationService.updateMany(Collections.EMPTY_LIST);
		Assertions.assertFalse(updated);
		Mockito.verify(attestationRepository, Mockito.times(0)).saveAll(attestations);
	}

	@Order(11)
	@DisplayName("Chercher attestationDto By UniteOrganisationnelles")
	@Test
	void getAttestationsByUniteOrganisationnelles() {
		List<AttestationDTO> attestationDTOsFromMapper = Arrays.asList(attestationDto);
		when(modelMapper.map(organisationnelleDTO, UniteOrganisationnelle.class)).thenReturn(organisationnelle);
		when(attestationRepository.findAttestationsByUniteOrganisationnelle(organisationnelle))
				.thenReturn(Arrays.asList(attestation));

		List<AttestationDTO> attestationDTOsService = attestationService
				.getAttestationsByUniteOrganisationnelles(organisationnelleDTO);
		Assertions.assertEquals(attestationDTOsFromMapper.size(), attestationDTOsService.size());
		verify(attestationRepository, Mockito.times(1)).findAttestationsByUniteOrganisationnelle(organisationnelle);
	}

	@Order(12)
	@DisplayName("Chercher attestationDto By Agent")
	@Test
	void findAttestationsByAgent() {
		Agent agent = modelMapper.map(agentDTO, Agent.class);
		List<AttestationDTO> attestationDTOsFromMapper = Arrays.asList(attestationDto);
		when(modelMapper.map(agentDTO, Agent.class)).thenReturn(agent);
		when(attestationRepository.findAttestationsByAgent(agent)).thenReturn(Arrays.asList(attestation));

		List<AttestationDTO> attestationDTOsService = attestationService.findAttestationsByAgent(agentDTO);

		Assertions.assertEquals(attestationDTOsFromMapper.size(), attestationDTOsService.size());
		verify(attestationRepository, Mockito.times(1)).findAttestationsByAgent(agent);
	}

	@Order(13)
	@DisplayName("Chercher attestationDto By Etat")
	@Test
	void findAttestationsByEtatDifferent() {
		List<AttestationDTO> attestationDTOsFromMapper = Arrays.asList(attestationDto);
		when(attestationRepository.findAttestationsByEtatNotLike("VALIDE")).thenReturn(Arrays.asList(attestation));

		List<AttestationDTO> attestationDTOsService = attestationService.findAttestationsByEtatDifferent("VALIDE");

		Assertions.assertEquals(attestationDTOsFromMapper.size(), attestationDTOsService.size());
		verify(attestationRepository, Mockito.times(1)).findAttestationsByEtatNotLike("VALIDE");
	}

	@Order(14)
	@DisplayName("Upload File: File exist")
	@Test
	void uploadAttestationExist() {
		MultipartFile file = new MockMultipartFile("test.txt", "Hallo World".getBytes());
		UploadFileResponse fileSaved = new UploadFileResponse(1L, "test.txt", "test.txt", "txt", 2L);
		FileMetaDataDTO fileMetaData = new FileMetaDataDTO();

		when(attestationRepository.findAttestationById(attestation.getId())).thenReturn(attestation);
		when(fileStorageService.uploadFile(file)).thenReturn(fileSaved);
		when(fileMetaDataService.findById(fileSaved.getId())).thenReturn(fileMetaData);
		when(attestationRepository.save(attestation)).thenReturn(attestation);

		UploadFileResponse fileUdated = attestationService.uploadAttestation(1L, file);
		Assertions.assertEquals(fileSaved, fileUdated);
	}

	@Order(15)
	@DisplayName("Upload File: File not exist")
	@Test
	void uploadAttestationNotExist() {
		UploadFileResponse fileSaved = new UploadFileResponse(1L, "test.txt", "test.txt", "txt", 2L);
		when(attestationRepository.findAttestationById(attestation.getId())).thenReturn(null);
		UploadFileResponse fileUdated = attestationService.uploadAttestation(1L, null);
		Assertions.assertNotEquals(fileSaved, fileUdated);
	}

	@Order(16)
	@DisplayName("Download File: File exist")
	@Test
	void downloadFileExist() {
		FileMetaData fileMetaData = new FileMetaData();
		fileMetaData.setFileName("test.txt");
		attestation.setFileMetaData(fileMetaData);
		String fileName = fileMetaData.getFileName();
		when(attestationRepository.findAttestationById(attestation.getId())).thenReturn(attestation);
		ResponseEntity<Resource> responseEntity = new ResponseEntity<Resource>(HttpStatus.ACCEPTED);
		when(fileStorageService.downloadFile(fileName, request)).thenReturn(responseEntity);

		ResponseEntity<Resource> responseEntity2 = attestationService.downloadFile(attestation.getId(), request);
		Assertions.assertEquals(responseEntity, responseEntity2);
	}

	@Order(17)
	@DisplayName("Download File: File not exist")
	@Test
	void downloadFileNotExist() {
		FileMetaData fileMetaData = new FileMetaData();
		fileMetaData.setFileName("test.txt");
		attestation.setFileMetaData(fileMetaData);
		@SuppressWarnings("unused")
		String fileName = fileMetaData.getFileName();
		when(attestationRepository.findAttestationById(attestation.getId())).thenReturn(attestation);
		ResponseEntity<Resource> responseEntity = new ResponseEntity<Resource>(HttpStatus.ACCEPTED);
		ResponseEntity<Resource> responseEntity2 = attestationService.downloadFile(attestation.getId(), request);
		Assertions.assertNotEquals(responseEntity, responseEntity2);
	}

}
