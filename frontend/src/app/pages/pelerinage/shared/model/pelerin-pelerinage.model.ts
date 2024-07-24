import { DossierPelerinage } from "./dossier-pelerinage.model";
import {Agent} from '../../../../shared/model/agent.model'
export class Pelerin {
    id: number;
    agent: Agent;
    dossierPelerinage: DossierPelerinage;
    status: string;
    matriculeAgent: string;
    nomAgent: string;
    prenomAgent: string;
    document: string;
    passport:string;
    ficheMedical:string;
    constructor(pelerin:Pelerin){
        this.id=pelerin.id;
        this.agent=pelerin.agent;
        this.dossierPelerinage=pelerin.dossierPelerinage;
        this.status=pelerin.status;
        this.matriculeAgent=pelerin.matriculeAgent;
        this.nomAgent=pelerin.nomAgent;
        this.prenomAgent=pelerin.prenomAgent;
        this.document=pelerin.document;
        this.passport=pelerin.passport;
        this.ficheMedical=pelerin.ficheMedical;
    }
}