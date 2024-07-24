import { DossierPelerinage } from "./dossier-pelerinage.model";
import {Agent} from '../../../../shared/model/agent.model'
export class Substitut {
    id: number;
    agent: Agent;
    dossierPelerinage: DossierPelerinage;
    matriculeAgent: string;
    nomAgent: string;
    prenomAgent: string;
    constructor(substitut:Substitut){
        this.id=substitut.id;
        this.agent=substitut.agent;
        this.dossierPelerinage=substitut.dossierPelerinage;
        this.matriculeAgent=substitut.matriculeAgent;
        this.nomAgent=substitut.nomAgent;
        this.prenomAgent=substitut.prenomAgent;
    }
}