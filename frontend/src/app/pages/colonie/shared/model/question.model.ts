export class Question{
    id:number;
    texte: string;
    type:string;
    constructor(question: Question){
        this.id =question.id;
        this.texte = question.texte;
        this.type= question.type;
    }
}