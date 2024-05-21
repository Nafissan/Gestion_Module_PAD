
import { Dotation } from './dotation.model';

export class Enfant {
	id: number;
	prenom: string;
	nom: string;
	sexe: string;
	dateNaissance: Date;
	numeroExtrait: string;
	
	dotation: Dotation;
}