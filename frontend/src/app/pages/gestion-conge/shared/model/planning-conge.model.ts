
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { PlanningDirection } from "./planning-direction.model";
export class PlanningConge {
    id: number;
	code: string;
	dateCreation: Date;
	etat: string;
	description: string;
	planningDirection: PlanningDirection;
	uniteOrganisationnelle: UniteOrganisationnelle;
	constructor(planningConge){
		this.id                    = planningConge.id;
		this.code                  = planningConge.code;
		this.dateCreation          = planningConge.dateCreation;
		this.etat                  = planningConge.etat;
		this.description           = planningConge.description;
		this.planningDirection     = planningConge.planningDirection
		this.uniteOrganisationnelle= planningConge.uniteOrganisationnelle
	}
}