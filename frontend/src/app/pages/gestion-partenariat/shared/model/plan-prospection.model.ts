
export class PlanProspection {
    id: number;
	libelle: string;
    code: number;
    annee:number;
    active:boolean;
	

    constructor(planprospection){
        this.id = planprospection.id;
        this.libelle = planprospection.libelle;
        this.code = planprospection.code;
        this.annee = planprospection.annee;
        this.active = planprospection.active; 
       

    }
}