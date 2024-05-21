export class NotificationEntity {
    id: number;
    libelle: string;
    module: string;
    active: boolean;
    constructor(notification){
        this.id = notification.id;
        this.libelle = notification.libelle;
        this.module = notification.module;
        this.active = notification.active;
    }
}