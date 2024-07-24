import { Question} from './question-pelerinage.model';
import{SatisfactionPelerinage} from './satisfaction-pelerinage.model';

export class ReponsePelerinage{
    id: number;
    question:Question;
    formulaire:SatisfactionPelerinage;
    reponse: string;
}