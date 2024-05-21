import { Pays } from "../../pages/parametrage/shared/model/pays.model";

export class Ville {
	id: number;
	code: string;
  nom: string;
	active: boolean;
  pays: Pays;

	constructor(ville){
		this.id                       = ville.id;
		this.code                     = ville.code;
    this.nom                      = ville.nom;
		this.active                   = ville.active;
    this.pays                     = ville.pays;
	}
}
