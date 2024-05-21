export class EtatDossierConge {
    static saisi:    string    =  "SAISI";
    static ouvert:   string    =  "OUVERT";
    static fermer:   string    =  "FERME";
    static position: number    =   1;
}
export class EtatPlanningConge {
    static saisi:    string    =  "SAISI";
    static encours:  string    =  "OUVERT";
    static valider:  string    =  "VALIDE";
    static ouvert: string      =  "PLANNING CONGE OUVERT";
}
export class EtatPlanningDirection {
    static saisi:    string    =  "SAISI";
    static transmis: string    =  "TRANSMIS";
    static imputer:  string    =  "IMPUTE";
    static encours:    string  =  "OUVERT";
    static valider:  string    =  "VALIDE";
    static cloturer: string    =  "CLOTURE";
}
export class EtatConge {
    static saisi:    string    = "SAISI";
    static encours:    string  = "MISE EN VALIDATION";
    static valider:  string    = "VALIDE";
    static rejeter:  string    = "REJETE";
    static reporter: string    = "REPORTE";
    static enconger: string    = "EN-CONGE";
    static cloturer: string    = "CLOTURE";
}