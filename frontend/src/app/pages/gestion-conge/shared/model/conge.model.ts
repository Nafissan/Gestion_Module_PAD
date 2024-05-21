import { PlanningConge } from "./planning-conge.model";
import { Agent } from "../../../../shared/model/agent.model";

export class Conge {
  id: number;
  code: string
  dateDepart: Date;
  annee: string;
  mois: string;
  dureePrevisionnelle: number;
  dureeEffective: number;
  dateRetourPrevisionnelle: Date;
  dateRetourEffectif: Date;
  dateSaisie: Date;
  etat: string;
  niveau: number;
  etape: number;
  description: string;
  codeDecision: string;
  dureeRestante: number;
  solde: number;
  agent: Agent;
  planningConge: PlanningConge;

  constructor(conge?){
    if(conge != null){
      this.id       				         = conge.id;
      this.code      				         = conge.code;
      this.dateDepart			           = conge.dateDepart;
      this.annee			               = conge.annee;
      this.mois			                 = conge.mois;
      this.dateRetourPrevisionnelle  = conge.dateRetourPrevisionnelle;
      this.dateRetourEffectif	       = conge.dateRetourEffectif;
      this.dateSaisie			           = conge.dateSaisie;
      this.etat				               = conge.etat;
      this.niveau				             = conge.niveau;
      this.etape				             = conge.etape;
      this.description       	       = conge.description;
      this.codeDecision     		     = conge.codeDecision;
      this.dureeRestante     	       = conge.dureeRestante;
      this.solde 				             = conge.solde;
      this.agent 				             = conge.agent;
      this.planningConge 		         = conge.planningConge
      this.dureePrevisionnelle       = conge.dureePrevisionnelle;
      this.dureeEffective            = conge.dureeEffective;
    }
  }
}
