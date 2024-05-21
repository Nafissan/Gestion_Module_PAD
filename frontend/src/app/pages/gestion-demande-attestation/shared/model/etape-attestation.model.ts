import { Attestation } from "./demande-attestation.model";
import { Agent } from "../../../../shared/model/agent.model";

export class EtapeAttestation {
    id : number;
	commentaire : string;
	date : Date;
	action : string;
	titre : string;
	fonction : string;
	structure : string;
	matricule : string;
	prenom : string;
	telephone : String;
	nom : string;
	etat : string;
	attestation : Attestation;
    createdAt : Date;
	updatedAt : Date;
	
	
	constructor(suiviAttestation?){
		if(suiviAttestation != null){
			this.id = suiviAttestation.id;
			this.id = suiviAttestation.id;
			this.commentaire = suiviAttestation.commentaire
			this.date = suiviAttestation.date
			this.action = suiviAttestation.action
			this.titre = suiviAttestation.titre
			this.fonction = suiviAttestation.fonction
			this.structure = suiviAttestation.structure
			this.matricule =suiviAttestation.matricule
			this.prenom = suiviAttestation.prenom
			this.nom = suiviAttestation.nom;
			this.etat = suiviAttestation.etat;
			this.attestation = suiviAttestation.attestationDTO
			this.createdAt = suiviAttestation.createdAt;
			this.updatedAt = suiviAttestation.updatedAt
		}
	
	}
}
