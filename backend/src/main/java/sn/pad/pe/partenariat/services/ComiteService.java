
package sn.pad.pe.partenariat.services;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.partenariat.dto.ComiteDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;

public interface ComiteService {

	public List<ComiteDTO> getComite();

	public ComiteDTO getComiteById(Long id);

	public ComiteDTO create(ComiteDTO ComiteDTO);

	public boolean update(ComiteDTO ComiteDTO);

	public boolean delete(ComiteDTO ComiteDTO);

	public UploadFileResponse uploadComite(Long id, MultipartFile file);

	public ResponseEntity<Resource> downloadFile(Long id, HttpServletRequest request);
}
