import {Continent} from './continent.model';
export class Zone {
    id: number;
    code: string;
    nom: string;
    active: boolean;
    constructor(zone){
        this.id = zone.id;
        this.code = zone.code;
        this.nom = zone.nom;
        this.active = zone.active;
    }
}