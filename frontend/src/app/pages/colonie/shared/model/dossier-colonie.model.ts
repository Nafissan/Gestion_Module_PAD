export class DossierColonie {
	id: number;
	annee: string;
	code: string;
	description: string;
	etat: string;
    noteMinistere: File;
    demandeProspection: File;

	matricule: string;
	prenom: string;
	nom: string;
	fonction: string;

	codeDirection: string;
	nomDirection: string;
	descriptionDirection: string;
	constructor(dossiercolonie){
		this.id                       = dossiercolonie.id;
		this.code                     = dossiercolonie.code;
		this.annee                    = dossiercolonie.annee;
		this.description              = dossiercolonie.description;
		this.etat                     = dossiercolonie.etat;
        this.noteMinistere 			  = dossiercolonie.noteMinistere;
        this.demandeProspection 	  = dossiercolonie.demandeProspection;

		this.matricule                = dossiercolonie.matricule
		this.nom                      = dossiercolonie.nom
		this.prenom                   = dossiercolonie.prenom
		this.fonction                 = dossiercolonie.fonction

		this.codeDirection            = dossiercolonie.codeDirection
		this.nomDirection             = dossiercolonie.nomDirection
		this.descriptionDirection     = dossiercolonie.descriptionDirection


	}
}