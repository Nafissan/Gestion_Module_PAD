

import { Pointfocal } from "./pointfocal.model";

import { FileMetaData } from "./file-meta-data.model";

export class Comite{
    id: number;
	libelle: string;
	code: string;
    active: boolean;
    fileMetaData : FileMetaData;
    pointfocals : Pointfocal [];
    
	
  
	

    constructor(comite){
        this.id = comite.id;
        this.libelle = comite.libelle;
        this.code = comite.code;
        this.pointfocals = comite.pointfocals;
        this.active = comite.active;
        this.fileMetaData = comite.fileMetaData;
        
        
        
        
    }


}