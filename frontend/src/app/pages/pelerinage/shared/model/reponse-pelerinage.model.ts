import { QuestionPelerinage} from './question-pelerinage.model';
import{SatisfactionPelerinage} from './satisfaction-pelerinage.model';

export class ReponsePelerinage{
    id: number;
    question:QuestionPelerinage;
    formulaire:SatisfactionPelerinage;
    reponse: string;
}