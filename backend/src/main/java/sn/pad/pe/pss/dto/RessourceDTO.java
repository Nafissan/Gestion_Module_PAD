package sn.pad.pe.pss.dto;
// Generated 10 juil. 2019 15:46:52 by Hibernate Tools 5.2.10.Final

import java.util.List;

public class RessourceDTO {

	private String name;
	private String nomRessource;

	private List<PrivilegeDTO> privileges;

	public RessourceDTO() {
		super();
	}

	public RessourceDTO(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNomRessource() {
		return nomRessource;
	}

	public void setNomRessource(String nomRessource) {
		this.nomRessource = nomRessource;
	}

	public List<PrivilegeDTO> getPrivileges() {
		return privileges;
	}

	public void setPrivileges(List<PrivilegeDTO> privileges) {
		this.privileges = privileges;
	}

}
