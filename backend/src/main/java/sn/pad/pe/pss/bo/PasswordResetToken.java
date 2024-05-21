package sn.pad.pe.pss.bo;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class PasswordResetToken {

	private static final int EXPIRATION = 60 * 24;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String token;

	@OneToOne(targetEntity = Agent.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = false, name = "id")
	private Agent agent;

	private Date expiryDate;

	public PasswordResetToken(String token, Agent agent) {
		super();
		this.token = token;
		this.agent = agent;
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

	public Agent getCompteagent() {
		return agent;
	}

	public void setCompteagent(Agent agents) {
		this.agent = agent;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

}