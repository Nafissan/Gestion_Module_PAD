export class NiveauHierarchique{
    id: number;
    libelle: string;
    position: number;

    constructor(niveauHierarchique){
        this.id = niveauHierarchique.id;
        this.libelle = niveauHierarchique.libelle;
        this.position = niveauHierarchique.position;
    }
}