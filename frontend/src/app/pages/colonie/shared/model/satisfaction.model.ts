import { DossierColonie } from "./dossier-colonie.model";

export class Satisfaction {
  id: number;
  codeDossier: DossierColonie;
  dateCreation: Date;
  reponses: { [questionId: number]: string };
  commentaire: string;
  matricule: string;
  nom: string;
  prenom: string;

  constructor(satisfaction: Satisfaction) {
    this.id = satisfaction.id;
    this.codeDossier = satisfaction.codeDossier;
    this.dateCreation = satisfaction.dateCreation;
    this.reponses = satisfaction.reponses;
    this.commentaire = satisfaction.commentaire;
    this.matricule = satisfaction.matricule;
    this.nom = satisfaction.nom;
    this.prenom = satisfaction.prenom;
  }
}
  