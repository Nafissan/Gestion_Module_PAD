import {DossierColonie} from '../model/dossier-colonie.model';
export class Colon {
    id: number;
    codeDossier: DossierColonie;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    lieuNaissance: string;
    groupeSanguin: string;
    sexe: string;
    matriculeParent: string;
    nomParent: string;
    prenomParent: string;
    ficheSocial: string;
    status: string;
    matriculeAgent: String;
    nomAgent: string;
    prenomAgent: string;
    document: string;

    constructor(colon: Colon) {
        this.id = colon.id ;
        this.codeDossier = colon.codeDossier;
        this.nom = colon.nom ;
        this.prenom = colon.prenom ;
        this.dateNaissance = colon.dateNaissance ;
        this.lieuNaissance = colon.lieuNaissance ;
        this.groupeSanguin = colon.groupeSanguin;
        this.sexe = colon.sexe ;
        this.nomParent = colon.nomParent;
        this.prenomParent = colon.prenomParent;
        this.matriculeParent = colon.matriculeParent;
        this.matriculeAgent = colon.matriculeAgent;
        this.prenomAgent = colon.prenomAgent;
        this.nomAgent = colon.nomAgent;
        this.ficheSocial = colon.ficheSocial;
        this.document = colon.document;
        this.status = colon.status;
    }
}
