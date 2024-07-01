import { Question} from './question.model';
import{Satisfaction} from './satisfaction.model';

export class Reponse{
    id: number;
    question:Question;
    formulaire:Satisfaction;
    reponse: string;
}