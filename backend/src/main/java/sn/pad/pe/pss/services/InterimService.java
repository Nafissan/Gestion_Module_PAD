package sn.pad.pe.pss.services;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.InterimDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface InterimService {

	public List<InterimDTO> getInterims();

	public InterimDTO getInterimById(Long id);

	public InterimDTO create(InterimDTO interimDTO);

	public boolean update(InterimDTO interimDTO);

	public boolean delete(InterimDTO interimDTO);

	public List<InterimDTO> getInterimsByUniteOrganisationnelles(UniteOrganisationnelleDTO organisationnelleDTO);

	public List<InterimDTO> findInterimsByAgent(AgentDTO agentDTO);

	public List<InterimDTO> getInterimByDossierInterim(Long idDossierInterim);

	public UploadFileResponse uploadInterim(Long id, MultipartFile file);

	public ResponseEntity<Resource> downloadInterim(Long id, HttpServletRequest request);

	public List<InterimDTO> getInterimsByUniteOrganisationnelleAndAnnee(UniteOrganisationnelleDTO organisationnelleDTO,
			int annee);

	public List<InterimDTO> getInterimsByUniteOrganisationnelless(List<Long> idUniteOrganisationnelles);
}
