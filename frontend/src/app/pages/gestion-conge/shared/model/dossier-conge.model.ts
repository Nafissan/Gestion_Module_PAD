export class DossierConge {
	id: number;
	annee: string;
	code: string;
	description: string;
	etat: string;

	matricule: string;
	prenom: string;
	nom: string;
	fonction: string;

	codeDirection: string;
	nomDirection: string;
	descriptionDirection: string;
	constructor(dossierconge){
		this.id                       = dossierconge.id;
		this.code                     = dossierconge.code;
		this.annee                    = dossierconge.annee;
		this.description              = dossierconge.description;
		this.etat                     = dossierconge.etat;

		this.matricule                = dossierconge.matricule
		this.nom                      = dossierconge.nom
		this.prenom                   = dossierconge.prenom
		this.fonction                 = dossierconge.fonction

		this.codeDirection            = dossierconge.codeDirection
		this.nomDirection             = dossierconge.nomDirection
		this.descriptionDirection     = dossierconge.descriptionDirection


	}
}