package sn.pad.pe.pss.dto;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

public class HistoriqueAttestationDTO {
	private Long id;
	private String commentaire;
	private Date date;
	private String etat;

	@JsonProperty("attestations")
	private Set<AttestationDTO> attestationDTO;

	@JsonProperty("agents")
	private Set<AgentDTO> agentDTO;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

}
