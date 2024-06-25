import { DossierColonie } from "./dossier-colonie.model";

export class RapportProspection {
  id: number;
  rapportProspection: string;
  matricule: string;
  nom: string;
  prenom: string;
  dateCreation: Date;
  dateValidation: Date;
  etat: string;
  codeDossierColonie: DossierColonie; 
  matriculeAgent: string;
  nomAgent: string;
  prenomAgent: string;
 constructor(rapprt: RapportProspection){
  this.id = rapprt.id;
  this.rapportProspection = rapprt.rapportProspection;
  this.matricule = rapprt.matricule;
  this.nom = rapprt.nom;
  this.prenom = rapprt.prenom;
  this.dateCreation = rapprt.dateCreation;
  this.dateValidation = rapprt.dateValidation;
  this.etat = rapprt.etat;
  this.codeDossierColonie = rapprt.codeDossierColonie;
  this.matriculeAgent = rapprt.matriculeAgent;
  this.nomAgent = rapprt.nomAgent;
  this.prenomAgent = rapprt.prenomAgent;
 }
}
