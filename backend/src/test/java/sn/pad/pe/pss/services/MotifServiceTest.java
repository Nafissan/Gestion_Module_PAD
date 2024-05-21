package sn.pad.pe.pss.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import sn.pad.pe.pss.bo.Motif;
import sn.pad.pe.pss.dto.MotifDTO;
import sn.pad.pe.pss.repositories.MotifRepository;
import sn.pad.pe.pss.services.impl.MotifServiceImpl;

@DisplayName("Test Service Motif")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class MotifServiceTest {
	@InjectMocks
	private MotifServiceImpl motifServiceImpl;
	@Mock
	private MotifRepository motifRepository;
	@Spy
	private ModelMapper modelMapper;
	private static MotifDTO motifDTO;
	private static MotifDTO motifDTOVerify;
	private static List<MotifDTO> motifDTOs;
	private static boolean updated;
	private static boolean deleted;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		motifDTO = new MotifDTO();
		motifDTO.setId(1L);
		motifDTO.setJours(2);

		motifDTOs = Arrays.asList(motifDTO);
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Liste objet Motif")
	@Test
	final void testGetMotif() {
		List<Motif> motifs = motifDTOs.stream().map(motif -> modelMapper.map(motif, Motif.class))
				.collect(Collectors.toList());
		when(motifRepository.findAll()).thenReturn(motifs);
		List<MotifDTO> motifDTOsFromService = motifServiceImpl.getMotif();
		Assertions.assertEquals(motifDTOs.size(), motifDTOsFromService.size());
		verify(motifRepository, Mockito.times(1)).findAll();
	}

	@Order(2)
	@DisplayName("Get Objet Motif By ID: ID exist")
	@Test
	final void testGetMotifByIdExist() {
		Motif motif = modelMapper.map(motifDTO, Motif.class);
		when(motifRepository.findById(motif.getId())).thenReturn(Optional.of(motif));
		MotifDTO motifDTOFromService = motifServiceImpl.getMotifById(motif.getId());
		Assertions.assertEquals(motifDTO.getId(), motifDTOFromService.getId());
		verify(motifRepository, Mockito.times(1)).findById(motif.getId());
	}

	@Order(3)
	@DisplayName("Get Objet Motif By ID: ID exist")
	@Test
	final void testGetMotifByIdNotExist() {
		Motif motif = modelMapper.map(motifDTO, Motif.class);
		when(motifRepository.findById(motif.getId())).thenReturn(Optional.empty());
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			motifDTOVerify = motifServiceImpl.getMotifById(motif.getId());
		});
		Assertions.assertNull(motifDTOVerify);
		verify(motifRepository, Mockito.times(1)).findById(motif.getId());
	}
	@Order(4)
	@DisplayName("Create objet Motif")
	@Test
	final void testCreateMotif() {
		Motif motif = modelMapper.map(motifDTO, Motif.class);
		when(modelMapper.map(motifDTO, Motif.class)).thenReturn(motif);
		when(motifRepository.save(motif)).thenReturn(motif);
		when(modelMapper.map(motif, MotifDTO.class)).thenReturn(motifDTO);
		MotifDTO motifDTOFromService = motifServiceImpl.createMotif(motifDTO);
		Assertions.assertEquals(motifDTO, motifDTOFromService);
		verify(motifRepository, Mockito.times(1)).save(motif);
	}
	@Order(5)
	@DisplayName("Update Objet Motif: Object exist")
	@Test
	final void testUpdateMotifExist() {
		Motif motif = modelMapper.map(motifDTO, Motif.class);
		when(modelMapper.map(motifDTO, Motif.class)).thenReturn(motif);
		when(motifRepository.findById(motif.getId())).thenReturn(Optional.of(motif));
		when(motifRepository.save(motif)).thenReturn(motif);
		updated = motifServiceImpl.updateMotif(motifDTO);
		Assertions.assertTrue(updated);
		Mockito.verify(motifRepository).findById(motif.getId());
		Mockito.verify(motifRepository).save(motif);
	}
	@Order(6)
	@DisplayName("Update Objet Motif: Object not exist")
	@Test
	final void testUpdateMotifNotExist() {
		Motif motif = modelMapper.map(motifDTO, Motif.class);
		when(motifRepository.findById(motif.getId())).thenReturn(Optional.empty());
		updated = motifServiceImpl.updateMotif(motifDTO);
		Assertions.assertFalse(updated);
		Mockito.verify(motifRepository, Mockito.times(1)).findById(motif.getId());
		Mockito.verify(motifRepository, Mockito.times(0)).save(motif);
	}
	@Order(7)
	@DisplayName("Delete objet Motif By ID: ID exist")
	@Test
	final void testDeleteMotifExist() {
		Motif motif = modelMapper.map(motifDTO, Motif.class);
		when(motifRepository.findById(motif.getId())).thenReturn(Optional.of(motif));
		doNothing().when(motifRepository).delete(motif);
		deleted = motifServiceImpl.deleteMotif(motifDTO);
		Assertions.assertTrue(deleted);
		Mockito.verify(motifRepository).findById(motif.getId());
		Mockito.verify(motifRepository).delete(motif);
	}
	@Order(7)
	@DisplayName("Delete objet Motif By ID: ID not exist")
	@Test
	final void testDeleteMotifNotExist() {
		Motif motif = modelMapper.map(motifDTO, Motif.class);
		when(motifRepository.findById(motif.getId())).thenReturn(Optional.empty());
		deleted = motifServiceImpl.deleteMotif(motifDTO);
		Assertions.assertFalse(deleted);
		Mockito.verify(motifRepository, Mockito.times(1)).findById(motif.getId());
		Mockito.verify(motifRepository, Mockito.times(0)).delete(motif);
	}

}
