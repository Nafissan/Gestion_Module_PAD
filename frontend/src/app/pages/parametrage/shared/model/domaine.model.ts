
export class Domaine{
    id: number;
    code: string;
    libelle: string;
    type: string;
    active: boolean;
    constructor(domaine){
        this.id = domaine.id;
        this.code = domaine.code;
        this.type = domaine.type;
        this.libelle = domaine.libelle;
        this.active = domaine.active;
    }
}