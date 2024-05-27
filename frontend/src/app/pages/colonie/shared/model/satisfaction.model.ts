import { Agent } from "src/app/shared/model/agent.model";

export class Satisfaction {
    id: number;
    questions: string[];
    reponses: { [key: string]: boolean };
    dateCreation: Date;
    traitePar: Agent;
    code: string;  
    commentaire: string;
  
    constructor(satisfaction: Satisfaction) {
      this.id = satisfaction.id;
      this.questions = satisfaction.questions;
      this.reponses = satisfaction.reponses;
      this.code = satisfaction.code;
      this.dateCreation= satisfaction.dateCreation;
      this.traitePar = satisfaction.traitePar;
      this.commentaire = satisfaction.commentaire;
    }
  }
  