export class CategorieLait {

	id: number;
	libelle: string;
	description: number;
	seuil: number;
	createdAt: Date;
	updatedAt: Date;
	constructor(categorieLait) {
		this.id = categorieLait.id;
		this.libelle = categorieLait.libelle
		this.description = categorieLait.description;
		this.seuil = categorieLait.seuil;
		this.createdAt = categorieLait.createdAt;
		this.updatedAt = categorieLait.updatedAt;
	}
}
