import { CategorieLait } from "src/app/pages/parametrage/shared/model/categorie-lait.model";
import { Dotation } from "./dotation.model";
import { SuiviStock } from "./suiviStock.model";

export class SuiviDotation {
    id: number;
    nbreArticleAttribue: number;
    matriculeAgent: string;
    nomAgent: string;
    prenomAgent: string;
    dateAttribution: Date;
    createdAt:    Date;
    updatedAt:    Date;
    etat: string;
    mois: string;
    annee: number;
    dotation: Dotation;
    suiviStock: SuiviStock;
    categorieLait: CategorieLait;
    constructor(suiviDotation){
        this.id =                 suiviDotation.id
        this.matriculeAgent =     suiviDotation.matriculeAgent
        this.nomAgent =           suiviDotation.nomAgent
        this.prenomAgent =        suiviDotation.prenomAgent
        this.dateAttribution =    suiviDotation.dateAttribution
        this.etat           =     suiviDotation.etat
        this.dotation =           suiviDotation.dotation
        this.suiviStock =         suiviDotation.suiviStock
        this.mois       =         suiviDotation.mois;
        this.annee       =        suiviDotation.annee;
        this.categorieLait =      suiviDotation.categorieLait;
    }
}
