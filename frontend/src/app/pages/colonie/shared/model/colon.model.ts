import { Agent } from "../../../../shared/model/agent.model";

export class Colon {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    lieuNaissance: string;
    groupeSanguin: string;
    sexe: string;
    ficheSocial: File;
    agentParent: Agent;
    status?: string;
    agent?: Agent;

    constructor(colon: Colon) {
        this.id = colon.id ;
        this.nom = colon.nom ;
        this.prenom = colon.prenom ;
        this.dateNaissance = colon.dateNaissance ;
        this.lieuNaissance = colon.lieuNaissance ;
        this.groupeSanguin = colon.groupeSanguin;
        this.sexe = colon.sexe ;
        this.ficheSocial = colon.ficheSocial || null;
        this.agentParent = colon.agentParent;
        this.status = colon.status || '';
        this.agent = colon.agent ;
    }
}
