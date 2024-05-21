import { Agent } from "src/app/shared/model/agent.model";
import { UniteOrganisationnelle } from "src/app/shared/model/unite-organisationelle";


export class Pointfocal {
    id: number;
	nom: string;
	service: string;
	agent:Agent;
	code: number;
	active: boolean;
    unite:UniteOrganisationnelle;
	

    constructor(pointfocal){
        this.id = pointfocal.id;
        this.nom= pointfocal.nom;
        this.code = pointfocal.code;
        this.unite = pointfocal.unite;
        this.active = pointfocal.active;
        this.agent = pointfocal.agent;
    }


}