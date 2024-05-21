package sn.pad.pe.pss.services;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.dto.AttestationDTO;
import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.dto.UploadFileResponse;

public interface AttestationService {

	public List<AttestationDTO> getAttestations();

	public AttestationDTO getAttestationById(Long id);

	public AttestationDTO create(AttestationDTO attestationDTO);

	public boolean update(AttestationDTO attestationDTO);

	public boolean updateMany(List<AttestationDTO> attestationDTOs);

	public boolean delete(AttestationDTO attestationDTO);

	public List<AttestationDTO> getAttestationsByUniteOrganisationnelles(
			UniteOrganisationnelleDTO organisationnelleDTO);

	public List<AttestationDTO> findAttestationsByAgent(AgentDTO agentDTO);

	public List<AttestationDTO> findAttestationsByEtatDifferent(String etat);

	public UploadFileResponse uploadAttestation(Long id, MultipartFile file);

	public ResponseEntity<Resource> downloadFile(Long id, HttpServletRequest request);

}
