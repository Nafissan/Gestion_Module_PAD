package sn.pad.pe.pss.services;

import java.util.List;

import sn.pad.pe.pss.bo.FileMetaData;
import sn.pad.pe.pss.dto.FileMetaDataDTO;

/**
 * 
 * @author adama.thiaw
 *
 */

public interface FileMetaDataService {
	public FileMetaDataDTO createFileData(FileMetaData fileMetaData);

	public FileMetaDataDTO findById(Long id);

	public List<FileMetaDataDTO> getAll();

	public Long getAllOccurrenceSize();
}
