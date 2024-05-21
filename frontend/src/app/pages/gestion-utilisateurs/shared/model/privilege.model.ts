export class Privilege {
    nom: string;
	description: string;
    checked: boolean = false;

	constructor(privilege){
		this.nom = privilege.mail;
        this.description = privilege.username;
	}
}