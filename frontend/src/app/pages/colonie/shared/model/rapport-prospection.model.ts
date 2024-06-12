import { Agent } from "../../../../shared/model/agent.model";
import { DossierColonie } from "./dossier-colonie.model";

export class RapportProspection {
  id: number; // Identifiant du rapport (optionnel, dépend de vos besoins)
  rapport: string; // Le fichier du rapport
  agent: Agent; // L'agent qui a ajouté le rapport
  dateCreation: Date; // La date de création du rapport
  etat: string; // L'état du rapport (validé ou non validé)
  codeDossierColonie: DossierColonie; // Le code du dossier colonie associé à ce rapport

  constructor(
    rapport: string,
    agent: Agent,
    dateCreation: Date,
    etat: string,
    codeDossierColonne: DossierColonie
  ) {
    this.rapport = rapport;
    this.agent = agent;
    this.dateCreation = dateCreation;
    this.etat = etat;
    this.codeDossierColonie = codeDossierColonne;
  }
}
