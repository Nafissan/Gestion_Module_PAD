import { PlanningConge } from "./planning-conge.model";
import { PlanningDirection } from "./planning-direction.model";

export class EtapePlanningDirection  {
  id: number;
  date: Date;
  description: string;
  etat: string;

  fonction: string;
	structure: string;
	matricule: string;
	prenom: string;
  nom: string;
  
  planningDirection: PlanningDirection;

  constructor(historiqueConge){
	 this.id       		            = historiqueConge.id;
	 this.date			              = historiqueConge.date;
   this.etat		  	            = historiqueConge.etat;
   this.description             = historiqueConge.description;
   
   this.fonction                = historiqueConge.fonction;
   this.structure               = historiqueConge.structure;
   this.matricule               = historiqueConge.matricule;
   this.prenom                  = historiqueConge.prenom;
   this.nom                     = historiqueConge.nom;
   
	 this.planningDirection 		  = historiqueConge.planningDirection;
  }
}
