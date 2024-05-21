import { Interim } from "./interim.model";

export class EtapeInterim {
	id: number;
	commentaire: string;
	date: Date;
    action: string;
    titre: string
	fonction: string;
	structure:string;
	matricule: string;
	prenom: string;
	nom: string;
	etat: string;
    interim: Interim
	constructor(etapeInterim){
		this.id = etapeInterim.id;
		this.commentaire = etapeInterim.commentaire;
		this.date = etapeInterim.date;
		this.action = etapeInterim.action;
		this.fonction =  etapeInterim.fonction;
		this.structure =etapeInterim.structure;
        this.matricule = etapeInterim.matricule;
        this.prenom = etapeInterim.prenom;
        this.nom = etapeInterim.nom;
        this.etat = etapeInterim.etat;
		}
}
