import { Absence } from "./absence.model";

export class  EtapeAbsence{
    id:number;
    commentaire:string;
    date:Date;
    action:string;
    titre:string;
    fonction:string;
    structure:string;
    matricule:string;
    prenom:string;
    nom:string;
    createdAt:Date;
    updatedAt:Date;
    absence:Absence;

    constructor(etapeAbsence){
        this.id = etapeAbsence.id;
        this.commentaire=etapeAbsence.commentaire;
        this.date=etapeAbsence.date;
        this.action=etapeAbsence.action;
        this.fonction=etapeAbsence.fonction;
        this.structure=etapeAbsence.structure;
        this.matricule=etapeAbsence.matricule;
        this.prenom=etapeAbsence.matricule;
        this.nom=etapeAbsence.nom;
        this.createdAt=etapeAbsence.createdAt;
        this.updatedAt=etapeAbsence.updatedAt;
        this.absence=etapeAbsence.absence;
    }
}