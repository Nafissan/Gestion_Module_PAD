import { Agent } from "../../../../shared/model/agent.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { FileMetaData } from "./file-meta-data.models";

export class Attestation {
	id: number;
	etat:String;
	dateCreation: Date;
	dateSaisie: Date;
	commentaire: string;
	agent: Agent;
	uniteOrganisationnelle: UniteOrganisationnelle;
	fonctionDemandeur: string;
	uniteDemandeur: string;
	directeurSectorielDCH: string;
    fileMetaData : FileMetaData;
	constructor(demandeAttestation){
		this.id = demandeAttestation.id;
		this.dateSaisie = demandeAttestation.dateSaisie;
		this.dateCreation = demandeAttestation.dateCreation;
		this.commentaire = demandeAttestation.commentaire;
		this.agent = demandeAttestation.agent;
		this.etat = demandeAttestation.etat;
		this.uniteOrganisationnelle = demandeAttestation.uniteOrganisationnelle;
		this.fileMetaData = demandeAttestation.fileMetaData;
		this.fonctionDemandeur = demandeAttestation.fonctionDemandeur;
		this.uniteDemandeur = demandeAttestation.uniteDemandeur;
		this.directeurSectorielDCH = demandeAttestation.directeurSectorielDCH;
	}
}