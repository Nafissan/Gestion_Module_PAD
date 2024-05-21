import { Agent } from "../../../../shared/model/agent.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { DossierInterim } from "./dossier-interim.model";
import { FileMetaData } from "../../../gestion-demande-attestation/shared/model/file-meta-data.models";


export class Interim {
    id: number;
	dateSaisie: Date;
	commentaire: string;
	etat: string;
    dateDepart: Date
    dateRetour: Date;
	dateRetourEffective: Date;

	annee : number;
	niveau: number;
	agentDepart: Agent;
	agentArrive: Agent;

	dossierInterim: DossierInterim;

	uniteOrganisationnelle:	UniteOrganisationnelle;
	fileMetaData : FileMetaData;
	
	constructor(interim){
		
		this.id = interim.id;
		this.dateSaisie = interim.dateSaisie;
		this.commentaire = interim.commentaire;
		this.etat = interim.etat;
		this.dateDepart =  interim.dateDepart;
		this.dateRetour = interim.dateRetour;
		this.dateRetourEffective = interim.dateRetourEffective;
		this.annee = interim.annee;
		this.niveau = interim.niveau;
		this.agentDepart = interim.agentDepart;
		this.agentArrive = interim.agentArrive;
		this.dossierInterim = interim.dossierInterim;
		this.uniteOrganisationnelle = interim.uniteOrganisationnelle;
        this.fileMetaData = interim.fileMetaData;
		}
}
