import { DossierColonie } from "./dossier-colonie.model";

export class RapportProspection {
  id: number;
  rapportProspection: string;
  matricule: string;
  nom: string;
  prenom: string;
  dateCreation: Date;
  dateValidation?: Date;
  etat: string;
  codeDossierColonie: DossierColonie; 
  matriculeAgent: string;
  nomAgent: string;
  prenomAgent: string;
 
}
