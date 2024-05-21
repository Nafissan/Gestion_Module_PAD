
import { Agent } from './../../../../../shared/model/agent.model';
import { Conjoint } from './conjoint.model';
import { Enfant } from './enfant.model';
import { TypeDotation } from './typedotation.model';

export class Dotation {
    id: number;
    code: string;
    dateDebut: Date;
    dateFin: Date
    beneficiaire: Agent;
    nbreEnfant: number;
    observation: string;
    statut: string;
    nbreArticleRecu: number;
    type: string;
    nbreAttribution: number;
    enfants: Enfant[];
    conjoint: Conjoint;
    typeDotation: TypeDotation;
    createdAt: Date;
    updatedAt:  Date;

}