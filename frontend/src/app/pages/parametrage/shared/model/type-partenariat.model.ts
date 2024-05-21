
export class TypePartenariat {
	id: number;
	code: string;
    libelle: string;
	active: boolean;

	constructor(typePartenariat){
		this.id = typePartenariat.id;
		this.code = typePartenariat.code;
    this.libelle  = typePartenariat.libelle
		this.active                   = typePartenariat.active
	}
}
