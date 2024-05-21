export class Continent {
	id: number;
	code: string;
	nom: string;
	active: boolean;

	constructor(continent){
		this.id                       = continent.id;
		this.code                     = continent.code;
		this.nom                      = continent.nom
		this.active                   = continent.active
	}
}