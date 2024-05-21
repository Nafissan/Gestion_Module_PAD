import { Convention } from '../../../gestion-partenariat/shared/model/convention.model'

export class Activite {
	id: number;
	code: string;
  description: string;
  libelle: string;
  date: Date;
	active: boolean;
  commentaire: string;
  statut: number;
  convention: Convention;

	constructor(activite){
	   this.id =          activite.id;
     this.code =        activite.code;
     this.description = activite.description;
     this.libelle =     activite.libelle;
     this.date =        activite.date;
	   this.active =      activite.active;
     this.convention =  activite.convention;
    this.commentaire = activite.commentaire;
    this.statut = activite.statut;
	}
}
