import { DossierColonie } from "./dossier-colonie.model";

export class Participant {
    id: number;
    codeDossier: DossierColonie;
    nomEnfant: string;
    prenomEnfant: string;
    dateNaissance: Date;
    lieuNaissance: string;
    groupeSanguin: string;
    sexe: string;
    matriculeParent: string;
    nomParent: string;
    prenomParent: string;
    ficheSocial: string;
    status: string;
    matriculeAgent: string;
    nomAgent: string;
    prenomAgent: string;
    document: string;
    photo: string;

    constructor(participant: Participant) {
        this.id = participant.id ;
        this.codeDossier = participant.codeDossier;
        this.nomEnfant = participant.nomEnfant ;
        this.prenomEnfant = participant.prenomEnfant ;
        this.dateNaissance = participant.dateNaissance ;
        this.lieuNaissance = participant.lieuNaissance ;
        this.groupeSanguin = participant.groupeSanguin;
        this.sexe = participant.sexe ;
        this.nomParent = participant.nomParent;
        this.prenomParent = participant.prenomParent;
        this.matriculeParent = participant.matriculeParent;
        this.matriculeAgent = participant.matriculeAgent;
        this.prenomAgent = participant.prenomAgent;
        this.nomAgent = participant.nomAgent;
        this.ficheSocial = participant.ficheSocial;
        this.document = participant.document;
        this.status = participant.status;
        this.photo = participant.photo;
    }
}
