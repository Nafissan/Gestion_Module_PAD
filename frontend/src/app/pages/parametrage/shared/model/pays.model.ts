import {Continent} from './continent.model';
export class Pays {
    id: number;
    nom: string;
    nomOfficiel: string;
    code: string;
    code31: string;
    image: string;
    latitude: number;
    longitude: number;
    zoom: number;
    active: boolean;
    continent: Continent; 
  libelle: string;
  type: string;

    constructor(pays){
        this.id = pays.id;
        this.nom = pays.nom;
        this.nomOfficiel = pays.nomOfficiel;
        this.code = pays.code;
        this.code31 = pays.code31;
        this.image = pays.image;
        this.latitude = pays.latitude;
        this.longitude = pays.longitude;
        this.zoom = pays.zoom;
        this.active = pays.active;
        this.continent = pays.zoom;
    }
}