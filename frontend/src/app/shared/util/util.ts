import { Attestation } from "../../pages/gestion-demande-attestation/shared/model/demande-attestation.model";
import { EtapeAttestation } from "../../pages/gestion-demande-attestation/shared/model/etape-attestation.model";

export class DialogUtil {
    static confirmer: string = "CONFIRMER";
    static annuler: string = "ANNULER";
}
export class NotificationUtil {
    static ajout: string = "AJOUT REUSSI";
    static modification: string = "MODIFICATION REUSSIE";
    static suppression: string = "SUPPRESSION REUSSIE";
    static validation: string = "TRAITEMENT REUSSI";
    static cocher: string = "VEUILLEZ COCHER UN ELEMENT AU MOINS";
    static echec: string = "TRAITEMENT ECHOUE";
    static rejet: string = "REJET REUSSI";
    static cloture: string = "CLÔTURE REUSSIE";
    static transmis: string = "TRANSMISSION REUSSIE";
    static impute: string = "IMPUTATION REUSSIE";
    static ouvertureDossier: string = "DOSSIER OUVERT";
    static envoyeDossier: string = "DOSSIER ENVOYE";
    static fermetureDossier: string = "DOSSIER FERME";
    static vide: string = "Aucun élément Disponible!";
}
export class ValidationChamps {
    email: string = "[A-Za-z]+[0-9]*[\.]*[0-9]*[A-Za-z]*[0-9]*(@portdakar\.sn)";
    telephone: string = "[7][8760][0-9]{7}";
    chaine: string = "[A-Za-z]+[ ]*[A-Za-z]*[ ]*[A-Za-z]*[ ]*[0-9]*"
}
export class MailDossierConge {
    static objet: string = "DOSSIER CONGE " + new Date().getFullYear() + " ";
    static content: string =
        "Le dossier conge de l\'annee " + new Date().getFullYear() + " est ouvert.\n" +
        " Veuillez ajouter vos plannings conges."
}
export class MailClotureAttestation {
    static susbject: string = "Disponibilité de l'attestation de travail";
    static content: string =
        "Bonjour, \nVotre demande d'attestation de travail a été traitée avec succés et est disponible dans votre espace privé ";

}
export class MailRejeterAttestation {
    static susbject: string = "Rejet de la demande d'attestation de travail ";
    static content: string = "Votre demande d'attestation de travail a été rejeter ";
    static commentaire: string = "rejeter";
}

export class Word {
    static generateInitial(word: string): string {

        let words: string[] = word.split(" ");
        let initial: string = "";  
        words.forEach(element => {        
            initial = initial + "." +  element.charAt(0);    
        });
        
        return initial.substr(1);
    }
}