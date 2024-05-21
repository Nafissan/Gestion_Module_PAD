import { Zone } from 'src/app/pages/parametrage/shared/model/zone.model';
import {Ville} from '../../../../shared/model/ville.model';
export class Partenaire {
	id: number;
	nom: string;
	email: string;
	code: string;
	telephone: string;
	adresse: string;
	fax: string;
	siteWeb: string;
	representantPrenom: string;
	representantNom: string;
	representantEmail: string;
	representantTelephone: string;
	latitude: number;
	longitude: number;
	statut: number;
	active: boolean;
	partenaire:boolean;
	ville: Ville;
	zone: Zone;
	dateApprobation: Date;
	createdAt:Date;

	constructor(partenaire){
	   this.id = partenaire.id;
	   this.nom = partenaire.nom;
	   this.code = partenaire.code;
	   this.email = partenaire.email;
	   this.telephone = partenaire.telephone;
	   this.adresse = partenaire.adresse;
	   this.fax = partenaire.fax;
	   this.siteWeb = partenaire.siteWeb;
	   this.representantPrenom = partenaire.representantPrenom;
	   this.representantNom = partenaire.representantNom;
	   this.representantEmail = partenaire.representantEmail;
	   this.representantTelephone = partenaire.representantTelephone;
	   this.latitude = partenaire.latitude;
	   this.longitude = partenaire.longitude;
	   this.partenaire = partenaire.partenaire;
	   this.statut = partenaire.statut;
	   this.active = partenaire.active;
	   this.ville = partenaire.ville;
	   this.zone = partenaire.zone;
	   this.dateApprobation = partenaire.dateApprobation;
	   this.createdAt = partenaire.createdAt;
	}
}


export class Prospect {
	id: number;
	nom: string;
	email: string;
	code: string;
	telephone: string;
	adresse: string;
	fax: string;
	siteWeb: string;
	representantPrenom: string;
	representantNom: string;
	representantEmail: string;
	representantTelephone: string;
	latitude: number;
	longitude: number;
	statut: number;
	active: boolean;
	partenaire:boolean;
	dateApprobation: Date;
	nature: string;
	profil: string;
  	objectifAccord: string;
  	dureeAccord: number;
	interetPAD: string;
	interetGobalProspect: string;
	createdAt:Date;
}