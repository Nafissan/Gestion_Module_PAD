import { UniteOrganisationnelle } from "src/app/shared/model/unite-organisationelle";
import { PlanProspection } from "./plan-prospection.model";
import { Domaine } from 'src/app/pages/parametrage/shared/model/domaine.model';
import { Partenaire } from "./partenaire.model";

export class Besoin{
    id: number;
	code: string;
    active:boolean;
    libelle: string;
    unite:UniteOrganisationnelle;
    domaines: Domaine [];
    partenaires :Partenaire[];
    planprospection: PlanProspection;
	
  
	

    constructor(besoin){
        this.id = besoin.id;
        this.code =besoin.code;
        this.active = besoin.active;
        this.libelle = besoin.libelle;
        this.unite = besoin.unite;
        this.partenaires = besoin.prospect;
        this.planprospection = besoin.planprospection;
        this.domaines = besoin.dommaines;
        
        
        
    }


}