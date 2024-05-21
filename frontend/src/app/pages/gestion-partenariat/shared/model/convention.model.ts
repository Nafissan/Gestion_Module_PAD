import { Partenaire } from './partenaire.model'
import { TypePartenariat } from '../../../parametrage/shared/model/type-partenariat.model'
import { Domaine } from 'src/app/pages/parametrage/shared/model/domaine.model';

export class Convention {
    id: number;
	libelle: string;
    code: string;
	domaines: Domaine [];
	dateSignature: Date;
    dateFin: Date;
	statut: number;
    
	active: boolean;
    
	partenaires: Partenaire [];
	type: TypePartenariat;
    

    constructor(convention){
        this.id = convention.id;
        this.code = convention.code;
        this.libelle = convention.libelle;
        this.domaines = convention.domaines;
        this.dateSignature = convention.dateSignature;
        this.dateFin = convention.dateFin;
        this.statut = convention.statut;
        this.active = convention.active;
       
        this.partenaires = convention.partenaires;
        this.type = convention.type;
    }


}