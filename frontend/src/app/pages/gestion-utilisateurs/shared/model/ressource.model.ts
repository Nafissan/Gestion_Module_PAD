import { Privilege } from "./privilege.model";

export class Ressource {
    name: string;
	nomRessource: string;
    checked: boolean;
	privileges: Privilege[];

	constructor(ressource){
		this.name = ressource.name;
        this.nomRessource = ressource.nomRessource;
	}
}