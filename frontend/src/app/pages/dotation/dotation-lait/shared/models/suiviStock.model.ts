import { CategorieLait } from "src/app/pages/parametrage/shared/model/categorie-lait.model";
import { Fournisseur } from "src/app/pages/parametrage/shared/model/fournisseur.model";
import { Marque } from "src/app/pages/parametrage/shared/model/marque.model";
import { Stock } from "./stock.model";

export class SuiviStock {
    id: number;
    code: string;
    libelle:string;
    matriculeAgent:string;
    nomAgent:string;
    prenomAgent:string;
    operation:string;
    dateOperation:Date;
    quantite: number;
    annee: string;
    observation:string;
    mois:string;

    stock :Stock
    fournisseur :Fournisseur
    marque :Marque
    categorieLait: CategorieLait;
    constructor(suiviStock){
        this.id = suiviStock.id
        this.code = suiviStock.code
        this.libelle = suiviStock.libelle
        this.quantite = suiviStock.quantite
        this.matriculeAgent =suiviStock.matriculeAgent
        this.nomAgent = suiviStock.nomAgent
        this.prenomAgent = suiviStock.prenomAgent
        this.operation = suiviStock.operation
        this.dateOperation =suiviStock.dateOperation
        this.annee = suiviStock.annee
        this.observation = suiviStock.observation
        this.stock = suiviStock.stock
        this.fournisseur =suiviStock.fournisseur
        this.marque =suiviStock.marque
        this.mois = suiviStock.mois
        this.categorieLait = suiviStock.categorieLait;
    }
}