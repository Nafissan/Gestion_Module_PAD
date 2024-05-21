import { Agent } from "../../../../shared/model/agent.model";
import { Motif } from "./motif.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { PlanningAbsence } from "./planning-absence.modele";

export class Absence{
    id:number;
	dateDepart:Date;
	dateRetourPrevisionnelle:Date;
	dateRetourEffectif:Date;
	dateSaisie:Date;
    etat:string;
    mois:string;
    annee:number;
    motif:Motif;
	commentaire:string;
	dureeRestante:string;
	createdAt:Date;
    updatedAt:Date;
    niveau: number;
    etape:string;
    etape_validation:number;
    agent:Agent;
    uniteOrganisationnelle: UniteOrganisationnelle;
    planningAbsence: PlanningAbsence;
    constructor(absence){
        this.id=absence.id;
        this.dateDepart=absence.dateDepart;
        this.dateRetourPrevisionnelle=absence.dateRetourPrevisionnelle;
        this.dateRetourEffectif=absence.dateRetourEffectif;
        this.dateSaisie=absence.dateSaisie;
        this.etat=absence.etat;
        this.mois=absence.mois;
        this.annee=absence.annee;
        this.commentaire=absence.commentaire;
        this.dureeRestante=absence.dureeRestante;
        this.createdAt=absence.createdAt;
        this.updatedAt=absence.updatedAt;
        this.niveau = absence.niveau;
        this.etape = absence.etape;
        this.etape_validation = absence.etape_validation;
        this.agent=absence.agent;
        this.motif=absence.motif;
        this.uniteOrganisationnelle = absence.uniteOrganisationnelle;
        this.planningAbsence = absence.planningAbsence;
    }
}