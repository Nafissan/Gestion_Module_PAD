export class Fournisseur {
	id: number;
	nomfournisseur: string;
	reffournisseur: string;
	courriel: string;
	tel: string;
	fax: string;
	siteweb: string;
	addresse: string;
	codepostal: string;
	ville: string;
	pays: string;
	commentaire: string;
	active: boolean;

	constructor(fournisseur){
        this.id = fournisseur.id
        this.nomfournisseur = fournisseur.nomfournisseur
        this.reffournisseur = fournisseur.reffournisseur
        this.courriel = fournisseur.courriel
        this.tel =fournisseur.tel
        this.fax = fournisseur.fax
        this.siteweb = fournisseur.siteweb
        this.codepostal = fournisseur.codepostal
        this.ville =fournisseur.ville
        this.pays = fournisseur.pays
        this.commentaire = fournisseur.commentaire
        this.active = fournisseur.active
    }
}