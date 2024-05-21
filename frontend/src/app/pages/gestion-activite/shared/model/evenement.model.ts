import { Partenaire } from '../../../gestion-partenariat/shared/model/partenaire.model';

export class Evenement {
	id: number;
	code: string;
  libelle: string;
  datedebut: Date;
	active: boolean;
  partenaires: Partenaire[];
  datefin: Date;
  statut: number;
  commentaire: string;


	constructor(evenement){
	   this.id =          evenement.id;
     this.code =        evenement.code;
     this.libelle =     evenement.libelle;
     this.datedebut =        evenement.datedebut;
	   this.active =      evenement.active;
     this.partenaires =  evenement.partenaires;
     this.datefin = evenement.datefin;
     this.statut = evenement.statut;
     this.commentaire = evenement.commentaire;

	}
}
