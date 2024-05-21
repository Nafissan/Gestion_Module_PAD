package sn.pad.pe.pss.bo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author cheikhibra.samb
 *
 */
@Entity
public class MouvementAgent implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Date dateDepart;
	private Date dateArrivee;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date updatedAt;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "CODE_DEP_ORG", referencedColumnName = "id", nullable = false)
	private UniteOrganisationnelle uniteDepart;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "CODE_ARR_ORG", referencedColumnName = "id", nullable = false)
	private UniteOrganisationnelle uniteArrivee;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "CODE_AGENT", referencedColumnName = "id", nullable = false)
	private Agent agent;

	public MouvementAgent() {
		super();

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateDepart() {
		return dateDepart;
	}

	public void setDateDepart(Date dateDepart) {
		this.dateDepart = dateDepart;
	}

	public Date getDateArrivee() {
		return dateArrivee;
	}

	public void setDateArrivee(Date dateArrivee) {
		this.dateArrivee = dateArrivee;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public UniteOrganisationnelle getUniteDepart() {
		return uniteDepart;
	}

	public void setUniteDepart(UniteOrganisationnelle uniteDepart) {
		this.uniteDepart = uniteDepart;
	}

	public UniteOrganisationnelle getUniteArrivee() {
		return uniteArrivee;
	}

	public void setUniteArrivee(UniteOrganisationnelle uniteArrivee) {
		this.uniteArrivee = uniteArrivee;
	}

	public Agent getAgent() {
		return agent;
	}

	public void setAgent(Agent agent) {
		this.agent = agent;
	}

}
