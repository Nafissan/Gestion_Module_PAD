
export class Participant {
    id: number;
    codeDossier: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    lieuNaissance: string;
    groupeSanguin: string;
    sexe: string;
    matriculeParent: String;
    nomParent: String;
    prenomParent: String;
    ficheSocial: File;
    status: string;
    matriculeAgent: String;
    nomAgent: String;
    prenomAgent: String;
    document: File;

    constructor(participant: any) {
        this.id = participant.id ;
        this.codeDossier = participant.codeDossier;
        this.nom = participant.nom ;
        this.prenom = participant.prenom ;
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
    }
}
