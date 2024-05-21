import { GenerateBaseOptions } from "rxjs/internal/observable/generate";
import { UniteOrganisationnelle } from "src/app/shared/model/unite-organisationelle";
import { Besoin } from "./besoin.model";
import { Partenaire } from "./partenaire.model";
import { PlanProspection } from "./plan-prospection.model";

export class Suiviplan {
    id: number;
    active:boolean;
    action:string;
    date:Date;
	unite:UniteOrganisationnelle;
    besoin: Besoin;
    planprospection:PlanProspection;
    partenaires: Partenaire ;
    

    constructor(suiviplan){
        this.id = suiviplan.id;
        this.active = suiviplan.active; 
        this.unite = suiviplan.unite;
        this.partenaires = suiviplan.partenaires;
        this.besoin = suiviplan.besoin;
        this.date = suiviplan.date;
        this.action = suiviplan.action;
        this.planprospection = suiviplan.planprospection;  
    }
}

export interface SuiviProspect {
    id: number;
    active:boolean;
    action:string;
    type:string;
    date:Date;
    prospect: Partenaire ;
}