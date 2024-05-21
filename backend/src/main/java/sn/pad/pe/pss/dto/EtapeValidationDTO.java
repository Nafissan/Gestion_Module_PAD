package sn.pad.pe.pss.dto;

import java.util.Set;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public class EtapeValidationDTO {
	private Long id;
	private int numeroOrdre;
	private String action;
	private String description;

	private ProcessusValidationDTO processusValidation;
	private Set<AgentDTO> agents;

	public EtapeValidationDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getNumeroOrdre() {
		return numeroOrdre;
	}

	public void setNumeroOrdre(int numeroOrdre) {
		this.numeroOrdre = numeroOrdre;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ProcessusValidationDTO getProcessusValidation() {
		return processusValidation;
	}

	public void setProcessusValidation(ProcessusValidationDTO processusValidation) {
		this.processusValidation = processusValidation;
	}

	public Set<AgentDTO> getAgents() {
		return agents;
	}

	public void setAgents(Set<AgentDTO> agents) {
		this.agents = agents;
	}

}
