import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { DossierAbsence } from "./dossier-absence.modele";
export class PlanningAbsence{
    id:number;
	code:string;
	dateCreation:Date;
    etat:string;
    description:string;
    annee:number;
    dossierAbsence:DossierAbsence;
    uniteOrganisationnelle:UniteOrganisationnelle ;
    constructor(planningAbsence){
        this.id=planningAbsence.id;
        this.code=planningAbsence.code;
        this.dateCreation=planningAbsence.dateCreation;
        this.etat=planningAbsence.etat;
        this.description=planningAbsence.description;
        this.annee=planningAbsence.annee;
        this.etat=planningAbsence.etat;
        this.dossierAbsence=planningAbsence.dossierAbsence;
        this.uniteOrganisationnelle=planningAbsence.uniteOrganisationnelle;
    }
}