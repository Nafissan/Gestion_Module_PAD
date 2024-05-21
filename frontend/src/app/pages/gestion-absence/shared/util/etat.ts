// export  class EtatAbsence{
//     saisir:string = 'SAISI';
//     transmettre: string = 'TRANSMIS';
//     valider: string = 'VALIDER';
//     rejeter: string = 'REJETER';
//     cloturer: string = 'CLOTURER';

// }

export class EtatAbsence {
    saisir:  string          = "SAISI";
    valider: string          =  "VALIDE";
    rejeter: string          =  "REJETE";
    transmettre: string      =  "TRANSMIS";
    encours:  string         =  "En COURS";
    atransmettre:  string    =  "A TRANSMETTRE";
    aimputer: string         =  "A IMPUTER";
}

export class EtatPlanningAbsence {
    saisi:    string    =  "SAISI";
    transmis: string    =  "TRANSMIS";
    imputer:  string    =  "IMPUTE";
    valider:  string    =  "VALIDE";
    cloturer: string    =  "CLOTURE";
}
