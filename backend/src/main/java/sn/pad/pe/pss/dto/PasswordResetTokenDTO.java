package sn.pad.pe.pss.dto;

import java.util.Date;

public class PasswordResetTokenDTO {

	private static final int EXPIRATION = 60 * 24;

	private Long id;
	private String token;

	private AgentDTO agentDTO;

	private Date expiryDate;

	public PasswordResetTokenDTO(String token, AgentDTO agentDTO) {
		super();
		this.token = token;
		this.agentDTO = agentDTO;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public AgentDTO getCompteagent() {
		return agentDTO;
	}

	public void setCompteagent(AgentDTO agentDTO) {
		this.agentDTO = agentDTO;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

}