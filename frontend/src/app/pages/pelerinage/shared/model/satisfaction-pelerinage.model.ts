import { DossierPelerinage } from "./dossier-pelerinage.model";

export class SatisfactionPelerinage {

id: number;
codeDossier: DossierPelerinage;
dateCreation: Date;
commentaire: string;
matricule: string;
nom: string;
prenom: string;

constructor(satisfaction: SatisfactionPelerinage) {
  this.id = satisfaction.id;
  this.codeDossier = satisfaction.codeDossier;
  this.dateCreation = satisfaction.dateCreation;
  this.commentaire = satisfaction.commentaire;
  this.matricule = satisfaction.matricule;
  this.nom = satisfaction.nom;
  this.prenom = satisfaction.prenom;
}
}