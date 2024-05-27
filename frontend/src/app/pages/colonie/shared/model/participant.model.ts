import { Agent } from "src/app/shared/model/agent.model";

export class Participant {
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

    constructor(participant: any) {
        this.id = participant.id ;
        this.nom = participant.nom ;
        this.prenom = participant.prenom ;
        this.dateNaissance = participant.dateNaissance ;
        this.lieuNaissance = participant.lieuNaissance ;
        this.groupeSanguin = participant.groupeSanguin;
        this.sexe = participant.sexe ;
        this.ficheSocial = participant.ficheSocial || null;
        this.agentParent = participant.agentParent;
        this.status = participant.status || '';
        this.agent = participant.agent || null;
    }
}
