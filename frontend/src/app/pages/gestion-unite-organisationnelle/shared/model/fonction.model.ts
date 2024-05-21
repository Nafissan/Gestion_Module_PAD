import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
export class Fonction{
    id: number;
    nom: string;
    uniteOrganisationnelle:UniteOrganisationnelle[];

    constructor(fonction?: any){

        if(fonction  != null){
            this.id = fonction.id;
            this.nom = fonction.nom;
            this.uniteOrganisationnelle= fonction.uniteOrganisationnelle;
        }
    }


}