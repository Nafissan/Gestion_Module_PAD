export class TypeDotation {

	id: number;
	libelle: string;
	nbreArticle: number;
	nbreMois: number;

	constructor(typeDotationLait) {
		this.id = typeDotationLait.id;
		this.libelle = typeDotationLait.libelle
		this.nbreArticle = typeDotationLait.nbreArticle;
		this.nbreMois = typeDotationLait.nbreMois;
	}
}
