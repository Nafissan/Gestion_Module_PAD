package sn.pad.pe.pss.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.dto.FileMetaDataDTO;
import sn.pad.pe.pss.repositories.FileMetaDataRepository;
import sn.pad.pe.pss.services.FileMetaDataService;

/**
 * 
 * @author adama.thiaw
 *
 */

@Service
public class FileMetaDataServiceImpl implements FileMetaDataService {

	@Autowired
	private FileMetaDataRepository fileMetaDataRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public FileMetaDataDTO createFileData(FileMetaData fileMetaData) {
		FileMetaData fileMetaDataSaved = fileMetaDataRepository.save(fileMetaData);
		return modelMapper.map(fileMetaDataSaved, FileMetaDataDTO.class);
	}

	@Override
	public FileMetaDataDTO findById(Long id) {
		Optional<FileMetaData> optionalFileMetaData = fileMetaDataRepository.findById(id);
		if (optionalFileMetaData.isPresent()) {
			return modelMapper.map(optionalFileMetaData.get(), FileMetaDataDTO.class);
		} else {
			throw new ResourceNotFoundException("FileMetaData not found with id : " + id);
		}
	}

	@Override
	public List<FileMetaDataDTO> getAll() {
		return fileMetaDataRepository.findAll().stream().map(absence -> modelMapper.map(absence, FileMetaDataDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public Long getAllOccurrenceSize() {
		return fileMetaDataRepository.findAllOccurrenceSize();
	}

}
