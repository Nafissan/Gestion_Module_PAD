import { Question } from 'src/app/pages/colonie/shared/model/question.model';
import{SatisfactionPelerinage} from './satisfaction-pelerinage.model';

export class ReponsePelerinage{
    id: number;
    question:Question;
    formulaire:SatisfactionPelerinage;
    reponse: string;
}