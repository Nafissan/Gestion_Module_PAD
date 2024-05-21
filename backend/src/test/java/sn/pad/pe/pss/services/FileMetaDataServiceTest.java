package sn.pad.pe.pss.services;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

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

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.dto.FileMetaDataDTO;
import sn.pad.pe.pss.repositories.FileMetaDataRepository;
import sn.pad.pe.pss.services.impl.FileMetaDataServiceImpl;

@DisplayName("Test Service FileMetaData")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class FileMetaDataServiceTest {
	@Mock
	private FileMetaDataRepository fileMetaDataRepository;
	@InjectMocks
	private FileMetaDataServiceImpl fileMetaDataServiceImpl;
	@Spy
	private ModelMapper modelMapper;
	private static FileMetaData fileMetaData;
	private static FileMetaDataDTO fileMetaDataVerify;
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		fileMetaData = new FileMetaData();
		fileMetaData.setId(1L);
		fileMetaData.setFileName("Conges.json");
		fileMetaData.setFileDownloadUri("/uri/download");
	}

	@BeforeEach
	void setUp() throws Exception {
	}
	@Order(1)
	@DisplayName("Create objet FileMetaData")
	@Test
	final void testCreateFileData() {
		when(fileMetaDataRepository.save(fileMetaData)).thenReturn(fileMetaData);
		FileMetaDataDTO fileMetaDataFromService = fileMetaDataServiceImpl.createFileData(fileMetaData);
		verify(fileMetaDataRepository, Mockito.times(1)).save(fileMetaData);
	}
	@Order(3)
	@DisplayName("Get Objet FileMetaData by ID: ID exist")
	@Test
	final void testFindByIdExist() {
		when(fileMetaDataRepository.findById(fileMetaData.getId())).thenReturn(Optional.of(fileMetaData));
		FileMetaDataDTO fileMetaDataFromService = fileMetaDataServiceImpl.findById(fileMetaData.getId());
		Assertions.assertEquals(fileMetaData.getId(), fileMetaDataFromService.getId());
		verify(fileMetaDataRepository, Mockito.times(1)).findById(fileMetaData.getId());
	}
	@Order(4)
	@DisplayName("Get Objet FileMetaData by ID: ID not exist")
	@Test
	final void testFindByIdNotExist() {
		when(fileMetaDataRepository.findById(fileMetaData.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			fileMetaDataVerify = fileMetaDataServiceImpl.findById(fileMetaData.getId());
		});
		Assertions.assertNull(fileMetaDataVerify);
		verify(fileMetaDataRepository, Mockito.times(1)).findById(fileMetaData.getId());
	}

}
