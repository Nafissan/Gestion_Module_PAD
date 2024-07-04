
export class DossierColonie {
	id: number;
	annee: string;
	code: string;
	description: string;
	etat: string;
	noteMinistere: string;
	demandeProspection: string;
	noteInformation: string;
	noteInstruction: string;
	rapportMission: string;
	matricule: string;
	prenom: string;
	nom: string;
	fonction: string;
	createdAt: Date;
	updatedAt: Date;
	commentaire: string;
	constructor(dossiercolonie: DossierColonie) {
	  this.id = dossiercolonie.id;
	  this.code = dossiercolonie.code;
	  this.annee = dossiercolonie.annee;
	  this.description = dossiercolonie.description;
	  this.etat = dossiercolonie.etat;
	  this.noteMinistere = dossiercolonie.noteMinistere;
	  this.demandeProspection = dossiercolonie.demandeProspection;
	  this.noteInformation = dossiercolonie.noteInformation;
	  this.noteInstruction = dossiercolonie.noteInstruction;
	  this.rapportMission = dossiercolonie.rapportMission;
	  this.matricule = dossiercolonie.matricule;
	  this.nom = dossiercolonie.nom;
	  this.prenom = dossiercolonie.prenom;
	  this.fonction = dossiercolonie.fonction;
	  this.createdAt = dossiercolonie.createdAt;
	  this.updatedAt = dossiercolonie.updatedAt;
	  this.commentaire = dossiercolonie.commentaire;
	}

  }
  