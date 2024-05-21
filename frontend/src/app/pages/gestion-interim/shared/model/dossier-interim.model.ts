import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";

export class DossierInterim {
	id: number;
	code: string;
	description: string;
	etat: string;
	matricule: string;
	nom: string;
	prenom: string;
	structure: string;
	annee: number;
	fonction: string;
	uniteOrganisationnelle:	UniteOrganisationnelle;
	
	constructor(dossierInterim){
		this.id           = dossierInterim.id;
		this.code         = dossierInterim.code;
		this.description  = dossierInterim.description;
		this.etat         = dossierInterim.etat;
		this.matricule    = dossierInterim.matricule
		this.nom          = dossierInterim.nom
		this.prenom       = dossierInterim.prenom
		this.structure    = dossierInterim.structure
		this.annee        = dossierInterim.annee;  
		this.fonction     = dossierInterim.fonction
		this.uniteOrganisationnelle = dossierInterim.uniteOrganisationnelle;
	}



}