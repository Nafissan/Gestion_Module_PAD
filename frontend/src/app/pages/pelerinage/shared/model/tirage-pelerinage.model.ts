import { DossierPelerinage } from "./dossier-pelerinage.model";
import {Agent} from '../../../../shared/model/agent.model'
export class TirageAgent {
    id: number;
    agent: Agent;
    dossierPelerinage: DossierPelerinage;
    matriculeAgent: string;
    nomAgent: string;
    prenomAgent: string;
    constructor(tirage:TirageAgent){
        this.id=tirage.id;
        this.agent=tirage.agent;
        this.dossierPelerinage=tirage.dossierPelerinage;
        this.matriculeAgent=tirage.matriculeAgent;
        this.nomAgent=tirage.nomAgent;
        this.prenomAgent=tirage.prenomAgent;
    }
}