import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle"

export class UniteTree {
      id: number
      code: string
      nom: string
      description: string
      niveau: number
      inferieures: UniteTree[] 
       
      constructor(unite: UniteOrganisationnelle, unites?: UniteTree[]) {
        this.id = unite.id
        this.code = unite.code
        this.nom = unite.nom
        this.description = unite.description
        this.niveau = unite.niveauHierarchique.position
        this.inferieures = unites
      }


}