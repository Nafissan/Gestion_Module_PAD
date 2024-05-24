import { Agent } from "../../../../shared/model/agent.model";

export class RapportProspection {
  id: string; // Identifiant du rapport (optionnel, dépend de vos besoins)
  rapport: File; // Le fichier du rapport
  agent: Agent; // L'agent qui a ajouté le rapport
  dateCreation: Date; // La date de création du rapport
  etat: string; // L'état du rapport (validé ou non validé)
  codeDossierColonie: string; // Le code du dossier colonie associé à ce rapport

  constructor(
    rapport: File,
    agent: Agent,
    dateCreation: Date,
    etat: string,
    codeDossierColonne: string
  ) {
    this.rapport = rapport;
    this.agent = agent;
    this.dateCreation = dateCreation;
    this.etat = etat;
    this.codeDossierColonie = codeDossierColonne;
  }
}
