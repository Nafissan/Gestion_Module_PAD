export class Stock {
    id: number;
    code: string;
    libelle:string;
    nbreArticle: number;
    seuilMinimum:number;
	quantiteInitial:number;
	quantiteCourant:number;
	quantiteRestant:number;
	quantiteReference:number;
	type: string;
    annee: number;
    active: boolean;

    constructor(stock){
        this.id = stock.id
        this.code = stock.code
        this.libelle = stock.libelle
        this.quantiteInitial = stock.quantiteInitial
        this.quantiteCourant = stock.quantiteCourant
        this.quantiteRestant = stock.quantiteRestant
        this.quantiteReference = stock.quantiteReference
        this.seuilMinimum = stock.seuilMinimum
        this.type =stock.type
        this.annee = stock.annee
        this.active = stock.active

    }
}