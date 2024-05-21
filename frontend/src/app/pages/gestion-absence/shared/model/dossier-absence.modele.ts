export class DossierAbsence {
    id: number;
	code:string;
	description:string;
	annee:number;
    structure:string;
	/**
	 * Agent Responsable de la création
	 */
	matricule:string;
	prenom:string;
	nom:string;
	fonction:string;
	/**
	 * Direction
	 */
	codeDirection:string;
	nomDirection:string;
	descriptionDirection:string;
	constructor(dossierabsence){
		this.id           = dossierabsence.id;
		this.code         = dossierabsence.code;
		this.annee        = dossierabsence.annee;
		this.description  = dossierabsence.description;
		this.matricule    = dossierabsence.matricule
		this.nom          = dossierabsence.nom
		this.prenom       = dossierabsence.prenom
		this.structure    = dossierabsence.structure
		this.fonction     = dossierabsence.fonction
	}
}