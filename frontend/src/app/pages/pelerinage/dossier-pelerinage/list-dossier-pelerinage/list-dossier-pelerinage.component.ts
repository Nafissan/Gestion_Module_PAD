import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EtatDossierPelerinage } from '../../shared/util/util';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { Agent } from 'src/app/shared/model/agent.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { DossierPelerinageService } from '../../shared/services/dossier-pelerinage.service';
import { MatDialog } from '@angular/material/dialog';
import { AgentService } from 'src/app/shared/services/agent.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { MailService } from 'src/app/shared/services/mail.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AddOrUpdateDossierPelerinageComponent } from '../add-or-update-dossier-pelerinage/add-or-update-dossier-pelerinage.component';
import { DetailsDossierPelerinageComponent } from '../details-dossier-pelerinage/details-dossier-pelerinage.component';
import { DialogUtil, MailDossierPelerinage, NotificationUtil } from 'src/app/shared/util/util';
import { Mail } from 'src/app/shared/model/mail.model';
import { ReadFileDossierPelerinageComponent } from '../read-file-dossier-pelerinage/read-file-dossier-pelerinage.component';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-list-dossier-pelerinage',
  templateUrl: './list-dossier-pelerinage.component.html',
  styleUrls: ['./list-dossier-pelerinage.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class ListDossierPelerinageComponent implements OnInit {
  showProgressBar: boolean = false;
  saisi: string = EtatDossierPelerinage.saisi;
  ouvert: string = EtatDossierPelerinage.ouvert;
  fermer: string = EtatDossierPelerinage.fermer;
  date: Date = new Date();
  dossierPelerinage: DossierPelerinage | null = null;
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
   { name: "Note d'information", property: "noteInformation", visible: false, isModelProperty: true },
    { name: "Rapport de pelerinage", property: "rapportPelerinage", visible: false, isModelProperty: true },
    { name: "Date creation", property: "createdAt", visible: false, isModelProperty: true },
    { name: "Lieu pelerinage", property: "lieuPelerinage", visible: false, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(private dossierPelerinageService: DossierPelerinageService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private agentService: AgentService ,) { }

  ngOnInit(): void {
    this.getDossierPelerinage();
  }
  ngAfterViewInit() { }

  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }

  onFilterChange(value) {
    if (!this.dossierPelerinage) {
      return;
    }
    value = value.trim().toLowerCase();
  }

  getDossierPelerinage() {
    this.dossierPelerinageService.getDossier().subscribe(
      (response) => {
        if (response.body !== null) {
          this.dossierPelerinage = response.body as DossierPelerinage;
          console.log('Dossier Colonie:', this.dossierPelerinage);
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
  createDossierPelerinage() {
    this.dialog
      .open(AddOrUpdateDossierPelerinageComponent)
      .afterClosed()
      .subscribe((DossierPelerinage: DossierPelerinage) => {
        if (DossierPelerinage) {
          this.dossierPelerinage = DossierPelerinage;
          this.refreshDossierPelerinage();
        }
      });
  }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

  updateDossierPelerinage(DossierPelerinage: DossierPelerinage) {
    this.dialog
      .open(AddOrUpdateDossierPelerinageComponent, { data: { dossier: DossierPelerinage, property: "update" } })
      .afterClosed()
      .subscribe((updatedDossierPelerinage: DossierPelerinage) => {
        if (updatedDossierPelerinage) {
          this.dossierPelerinage = updatedDossierPelerinage;
          this.refreshDossierPelerinage();
        }
      });
  }

  detailsDossierPelerinage(DossierPelerinage: DossierPelerinage) {
    this.dialog
      .open(DetailsDossierPelerinageComponent, { data: DossierPelerinage })
      .afterClosed()
      .subscribe((DossierPelerinage: DossierPelerinage) => {
        if (DossierPelerinage) {
          this.dossierPelerinage = DossierPelerinage;
          this.refreshDossierPelerinage();
        }
      });
  }

  refreshDossierPelerinage() {
    this.getDossierPelerinage();
  }

  deleteDossierPelerinage(DossierPelerinage: DossierPelerinage) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierPelerinageService.delete(DossierPelerinage).subscribe(
          () => {
            this.notificationService.success(NotificationUtil.suppression);
            this.refreshDossierPelerinage();
          },
          err => {
            this.notificationService.warn(NotificationUtil.echec);
          }
        );
      }
    });
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
  
  async fermerDossierPelerinage(dossierPelerinage: DossierPelerinage) {
    dossierPelerinage.etat = this.fermer;
    if ( dossierPelerinage.rapportPelerinage === null || dossierPelerinage.noteInformation === null) {
      this.notificationService.warn("Le dossier n'est pas complet. Il manque des fichiers !");
      return; 
    }
  
    this.dialog
      .open(AddOrUpdateDossierPelerinageComponent, { data: { dossier: dossierPelerinage, property: "fermer" } })
      .afterClosed()
      .subscribe(async (updatedDossierPelerinage: DossierPelerinage) => {
        if (updatedDossierPelerinage) {
          this.dossierPelerinage = null;
          await this.sendEmail(dossierPelerinage);
        }
      });
  }
  
  private async sendEmail(dossierPelerinage: DossierPelerinage) {
    try {
      await this.getAgent(dossierPelerinage.matricule);
      let mail = new Mail();
      mail.objet = MailDossierPelerinage.objet;
      mail.contenu = MailDossierPelerinage.content;
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
  

  onCellClick(property: string, row: DossierPelerinage): void {
    const dialogRef = this.dialog.open(ReadFileDossierPelerinageComponent, {
      data: { dossier: row, property: property },
      width: '80%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dossierPelerinage = row;
    });
  }

  ngOnDestroy() { }
}
