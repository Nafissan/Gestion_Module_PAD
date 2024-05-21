

import { UniteOrganisationnelle } from 'src/app/shared/model/unite-organisationelle';
import { Besoin } from './besoin.model';
import { Partenaire } from './partenaire.model'
import { PlanProspection } from './plan-prospection.model';
import { Potentiel } from './potentiel.model';

export class Suivi {
    id: number;
	
	domaine: string;
	action : string;
    date : number;
	code: number;
	active: boolean;
    unite:UniteOrganisationnelle;
    libelle:string
    besoin: Besoin;
    planprospection : PlanProspection;
    prospect:Partenaire;
    constructor(suivi){
        this.id = suivi.id;
        this.domaine= suivi.nom;
        this.libelle= suivi.libelle;
        this.code = suivi.code;
        this.prospect = suivi.prospect;
        this.action = suivi.action;
        this.date = suivi.date;
        this.active = suivi.active;
        this.unite = suivi.unite;
        this.besoin = suivi.besoin;
        this.planprospection= suivi.planprospection    }


}