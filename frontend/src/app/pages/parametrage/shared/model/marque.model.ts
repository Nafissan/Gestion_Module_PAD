

export class Marque {
	id: number;
	libelle: string;
	commentaire: string;
    
	constructor(marque){
        this.id = marque.id
        this.libelle = marque.libelle
        this.commentaire = marque.commentaire
    }
}