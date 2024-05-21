import { DossierConge } from "./dossier-conge.model";
export class PlanningDirection {
	id: number;
	code: string;
	description: string;
	niveau: number;
	etape: number;
	etat: string;

	matricule: string;
	prenom: string;
	nom: string;
	fonction: string;

	codeDirection: string;
	nomDirection: string;
	descriptionDirection: string;
	dossierConge: DossierConge;

	constructor(planningConge){
		this.id                    = planningConge.id;
		this.code                  = planningConge.code;
		this.description           = planningConge.description;
		this.niveau                = planningConge.niveau;
		this.etape                 = planningConge.etape;
		this.etat                  = planningConge.etat;

		this.matricule             = planningConge.matricule;
		this.prenom                = planningConge.prenom;
		this.nom                   = planningConge.nom;
		this.fonction              = planningConge.fonction;

		this.codeDirection         = planningConge.codeDirection;
		this.nomDirection          = planningConge.nomDirection;
		this.descriptionDirection  = planningConge.descriptionDirection;
		
		this.dossierConge          = planningConge.dossierConge;
	}
}