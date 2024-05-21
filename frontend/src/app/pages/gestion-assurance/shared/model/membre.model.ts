import { Agent } from '../../../../shared/model/agent.model';
import { FileMetaData } from './file-meta-data.model';


export class Membre {
	id: number;
	code: string;
  nom: string;
  prenom: string;
  agent: Agent;
	active: boolean;
  principale: boolean;
  fileMetaData : FileMetaData;
  
	constructor(membre){
	   this.id = membre.id;
     this.code = membre.code;
     this.nom= membre.nom;
     this.prenom =  membre.prenom;
     this.fileMetaData = membre.fileMetaData;
     this.agent = membre.agent;
     this.principale = membre.principale;
     this.active = membre.active;
     
   
	}
}
