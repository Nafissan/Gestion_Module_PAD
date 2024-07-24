import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { DossierColonieService } from "../../shared/service/dossier-colonie.service";
import { DossierColonie } from "../../shared/model/dossier-colonie.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { AddDossierColonieComponent } from "../add-dossier-colonie/add-dossier-colonie.component";
import { DetailsDossierColonieComponent } from "../details-dossier-colonie/details-dossier-colonie.component";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, MailDossierColonie, NotificationUtil } from "../../../../shared/util/util";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { EtatDossierColonie } from "../../shared/util/util";
import { NotificationService } from "../../../../shared/services/notification.service";
import { ReadFileDossierComponent } from "../read-file-dossier/read-file-dossier.component";
import { Mail } from "src/app/shared/model/mail.model";
import { MailService } from "src/app/shared/services/mail.service";
import { AgentService } from "src/app/shared/services/agent.service";
import { Agent } from "src/app/shared/model/agent.model";

@Component({
  selector: "fury-liste-dossier-colonie",
  templateUrl: "./liste-dossier-colonie.component.html",
  styleUrls: ["./liste-dossier-colonie.component.scss", "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListeDossierColonieComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  saisi: string = EtatDossierColonie.saisi;
  ouvert: string = EtatDossierColonie.ouvert;
  fermer: string = EtatDossierColonie.fermer;
  date: Date = new Date();
  dossierColonie: DossierColonie | null = null;
  pageSize = 4;
  agent: Agent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Code", property: "code", visible: true, isModelProperty: true },
    { name: "Annee", property: "annee", visible: true, isModelProperty: true },
    { name: "Description", property: "description", visible: true, isModelProperty: true },
    { name: "Etat", property: "etat", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "ajoutePar", visible: true },
    { name: "Note du Ministere", property: "noteMinistere", visible: true, isModelProperty: true },
    { name: "Demande de Prospection", property: "demandeProspection", visible: false, isModelProperty: true },
    { name: "Note d'information", property: "noteInformation", visible: false, isModelProperty: true },
    { name: "Note d'instruction", property: "noteInstruction", visible: false, isModelProperty: true },
    { name: "Rapport de mission", property: "rapportMission", visible: false, isModelProperty: true },
    { name: "Date creation", property: "createdAt", visible: false, isModelProperty: true },
    { name: "Type colonie", property: "type", visible: false, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private dossierColonieService: DossierColonieService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private agentService: AgentService ,

  ) { }

  ngOnInit() {
    this.getDossierColonie();
  }

  ngAfterViewInit() { }

  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }

  onFilterChange(value) {
    if (!this.dossierColonie) {
      return;
    }
    value = value.trim().toLowerCase();
  }

  getDossierColonie() {
    this.dossierColonieService.getDossier().subscribe(
      (response) => {
        if (response.body !== null) {
          this.dossierColonie = response.body as DossierColonie;
          console.log('Dossier Colonie:', this.dossierColonie);
        }
      },
      (err) => {
        console.error('Error loading dossier colonie:', err);
      },
      () => {
        this.showProgressBar = true;
      }
    );
  }

  createDossierColonie() {
    this.dialog
      .open(AddDossierColonieComponent)
      .afterClosed()
      .subscribe((dossierColonie: DossierColonie) => {
        if (dossierColonie) {
          this.dossierColonie = dossierColonie;
          this.refreshDossierColonie();
        }
      });
  }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

  updateDossierColonie(dossierColonie: DossierColonie) {
    this.dialog
      .open(AddDossierColonieComponent, { data: { dossier: dossierColonie, property: "update" } })
      .afterClosed()
      .subscribe((updatedDossierColonie: DossierColonie) => {
        if (updatedDossierColonie) {
          this.dossierColonie = updatedDossierColonie;
          this.refreshDossierColonie();
        }
      });
  }

  detailsDossierColonie(dossierColonie: DossierColonie) {
    this.dialog
      .open(DetailsDossierColonieComponent, { data: dossierColonie })
      .afterClosed()
      .subscribe((dossierColonie: DossierColonie) => {
        if (dossierColonie) {
          this.dossierColonie = dossierColonie;
          this.refreshDossierColonie();
        }
      });
  }

  refreshDossierColonie() {
    this.getDossierColonie();
  }

  deleteDossierColonie(dossierColonie: DossierColonie) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierColonieService.delete(dossierColonie).subscribe(
          () => {
            this.notificationService.success(NotificationUtil.suppression);
          },
          err => {
            this.notificationService.warn(NotificationUtil.echec);
          }
        );
      }
    });
    this.refreshDossierColonie();
  }
  getAgent(matricule: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.agentService.getAgentByMatricule(matricule).subscribe(
        (response) => {
          this.agent = response.body as Agent;
          console.log(this.agent);
          resolve();
        },
        (error) => {
          console.error("Erreur lors de la récupération de l'agent", error);
          reject(error);
        }
      );
    });
  }
  
  async fermerDossierColonie(dossierColonie: DossierColonie) {
    dossierColonie.etat = this.fermer;
    if (dossierColonie.demandeProspection === null || dossierColonie.rapportMission === null || dossierColonie.noteInformation === null || dossierColonie.noteInstruction === null) {
      this.notificationService.warn("Le dossier n'est pas complet. Il manque des fichiers !");
      return; // Sortir de la fonction si le dossier n'est pas complet
    }
  
    this.dialog
      .open(AddDossierColonieComponent, { data: { dossier: dossierColonie, property: "fermer" } })
      .afterClosed()
      .subscribe(async (updatedDossierColonie: DossierColonie) => {
        if (updatedDossierColonie) {
          this.dossierColonie = updatedDossierColonie;
          await this.sendEmail(dossierColonie);
          this.refreshDossierColonie(); // Appeler refresh après l'envoi de l'email
        }
      });
  }
  
  private async sendEmail(dossierColonie: DossierColonie) {
    try {
      await this.getAgent(dossierColonie.matricule);
      let mail = new Mail();
      mail.objet = MailDossierColonie.objet;
      mail.contenu = MailDossierColonie.content;
      mail.lien = "";
      mail.emetteur = "";
      mail.destinataires = [this.agent.email];
      
      await this.mailService.sendMailByDirections(mail).toPromise();
      this.notificationService.success('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email', error);
      this.notificationService.warn('Failed to send email');
    } finally {
      this.notificationService.success(NotificationUtil.fermetureDossier);
    }
  }
  

  onCellClick(property: string, row: DossierColonie): void {
    const dialogRef = this.dialog.open(ReadFileDossierComponent, {
      data: { dossier: row, property: property },
      width: '80%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dossierColonie = row;
    });
  }

  ngOnDestroy() { }
}
