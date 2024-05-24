import { Agent } from "src/app/shared/model/agent.model";

export class Satisfaction {
    id: number;
    questions: string[];
    reponses: { [key: string]: boolean };
    dateCreation: Date;
    traitePar: Agent;
    code: string;  
    commentaire: string;
  
    constructor(id: number, q1: string[], q2: { [key: string]: boolean }, date: Date, agent: Agent, code: string, comment: string) {
      this.id = id;
      this.questions = q1;
      this.reponses = q2;
      this.code = code;
      this.dateCreation= date;
      this.traitePar = agent;
      this.commentaire = comment;
    }
  }
  