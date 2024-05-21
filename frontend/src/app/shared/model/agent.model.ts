import { UniteOrganisationnelle } from "./unite-organisationelle";
import { Fonction } from "../../pages/gestion-unite-organisationnelle/shared/model/fonction.model";


export class Agent {
  length: number;
  libelle: any;
  forEach(arg0: (enf: any) => void) {
    throw new Error('Method not implemented.');
  }
	id: number;
	matricule: string;
	nom: string;
	prenom: string;
	dateNaissance: Date;
	matrimoniale: string;
	photo: string;
	sexe: string;
	email: string;
	telephone: string;
	dateEngagement: Date;
	datePriseService: Date;
	estChef: boolean;
	uniteOrganisationnelle: UniteOrganisationnelle;
	adresse: string;
	lieuNaissance: string;
	profil: string;
	fonction: Fonction;

	constructor(agent?) {
		if (agent != null) {
			this.id = agent.id;
			this.matricule = agent.matricule
			this.nom = agent.nom
			this.prenom = agent.prenom
			this.dateNaissance = agent.dateNaissance;
			this.matrimoniale = agent.matrimoniale;
			this.photo = agent.photo;
			this.sexe = agent.sexe;
			this.email = agent.mail;
			this.telephone = agent.telephone;
			this.dateEngagement = agent.dateEngagement
			this.datePriseService = agent.datePriseService;
			this.estChef = agent.estChef;
			this.adresse = agent.adresse;
			this.lieuNaissance = agent.lieuNaissance;
			this.uniteOrganisationnelle = agent.uniteOrganisationelle;
			this.fonction = agent.fonction
			this.profil = agent.profil
		}
	}
}