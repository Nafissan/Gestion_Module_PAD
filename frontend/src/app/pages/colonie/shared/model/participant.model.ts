import { Agent } from "src/app/shared/model/agent.model";

export class Participant{
    id : number;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    lieuNaissance: string;
    groupeSanguin: string;
    ficheSocial: File;
    agentParent: Agent;
    status?:string;
    agent?: Agent;
}