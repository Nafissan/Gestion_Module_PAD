import { UniteOrganisationnelleService } from "../../pages/gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
import { NiveauHierarchique } from "../../pages/gestion-unite-organisationnelle/shared/model/niveau-hierarchique.model";
// import { NiveauHierarchique } from "../../pages/gestion-unite-organisationnelle/shared/model/niveau-hierarchique.model";

export class UniteOrganisationnelle {
    filter(arg0: (uniteOrganisationnelle: any) => boolean) {
      throw new Error('Method not implemented.');
    }
    slice(): any {
      throw new Error('Method not implemented.');
    }
    toLowerCase() {
      throw new Error('Method not implemented.');
    }
    id: number;
    code: string;
    description: string;
    nom: string;
    uniteSuperieure: UniteOrganisationnelle;
    niveauHierarchique: NiveauHierarchique

    constructor(uniteOrganisationnelle?: any){
        if(uniteOrganisationnelle  != null){
            this.id                 = uniteOrganisationnelle.id
            this.code               = uniteOrganisationnelle.code
            this.description        = uniteOrganisationnelle.description
            this.nom                = uniteOrganisationnelle.nom
            this.uniteSuperieure    = uniteOrganisationnelle.uniteSuperieure
            this.niveauHierarchique = uniteOrganisationnelle.niveauHierarchique
        }
    }
}