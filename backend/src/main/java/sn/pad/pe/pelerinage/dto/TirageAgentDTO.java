package sn.pad.pe.pelerinage.dto;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pss.bo.Agent;

public class TirageAgentDTO {
private Long id;
    private Agent agent;
  private DossierPelerinage dossierPelerinage;
    private String matriculeAgent;
    private String nomAgent;
    private String prenomAgent;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Agent getAgent() {
        return agent;
    }
    public void setAgent(Agent agent) {
        this.agent = agent;
    }
    public DossierPelerinage getDossierPelerinage() {
        return dossierPelerinage;
    }
    public void setDossierPelerinage(DossierPelerinage dossierPelerinage) {
        this.dossierPelerinage = dossierPelerinage;
    }
    public String getMatriculeAgent() {
        return matriculeAgent;
    }
    public void setMatriculeAgent(String matriculeAgent) {
        this.matriculeAgent = matriculeAgent;
    }
    public String getNomAgent() {
        return nomAgent;
    }
    public void setNomAgent(String nomAgent) {
        this.nomAgent = nomAgent;
    }
    public String getPrenomAgent() {
        return prenomAgent;
    }
    public void setPrenomAgent(String prenomAgent) {
        this.prenomAgent = prenomAgent;
    }
}
