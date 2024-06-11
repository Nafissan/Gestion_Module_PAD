export class Question{
    id:number;
    texte: string;
    constructor(question: Question){
        this.id =question.id;
        this.texte = question.texte;
    }
}