
export class DossierPelerinage {
	id: number;
	annee: string;
	code: string;
	description: string;
	etat: string;
	noteInformation: string;
	rapportPelerinage: string;
	matricule: string;
	prenom: string;
	nom: string;
	fonction: string;
	createdAt: Date;
	updatedAt: Date;
	commentaire: string;
	lieuPelerinage: string;
	constructor(dossierPelerinage: DossierPelerinage) {
	  this.id = dossierPelerinage.id;
	  this.code = dossierPelerinage.code;
	  this.annee = dossierPelerinage.annee;
	  this.description = dossierPelerinage.description;
	  this.etat = dossierPelerinage.etat;
	  this.noteInformation = dossierPelerinage.noteInformation;
	  this.rapportPelerinage = dossierPelerinage.rapportPelerinage;
	  this.matricule = dossierPelerinage.matricule;
	  this.nom = dossierPelerinage.nom;
	  this.prenom = dossierPelerinage.prenom;
	  this.fonction = dossierPelerinage.fonction;
	  this.createdAt = dossierPelerinage.createdAt;
	  this.updatedAt = dossierPelerinage.updatedAt;
	  this.commentaire = dossierPelerinage.commentaire;
	  this.lieuPelerinage = dossierPelerinage.lieuPelerinage;
	}

  }
  