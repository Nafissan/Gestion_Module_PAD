import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { DossierColonieService } from "../../shared/service/dossier-colonie.service";
import { DossierColonie } from "../../shared/model/dossier-colonie.model";
import { ReplaySubject, Observable } from "rxjs";
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
import { MailService } from "../../../../shared/services/mail.service";
import { AgentService } from "../../../../shared/services/agent.service";
import { Agent } from "../../../../shared/model/agent.model";
import { Mail } from "src/app/shared/model/mail.model";

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
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentDossierColonie: DossierColonie = undefined;
  dossierColonies: DossierColonie[] = [];
  subject$: ReplaySubject<DossierColonie[]> = new ReplaySubject<DossierColonie[]>(1);
  data$: Observable<DossierColonie[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<DossierColonie> | null;
 

  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Code", property: "code", visible: true, isModelProperty: true },
    { name: "Annee", property: "annee", visible: true, isModelProperty: true },
    { name: "Description", property: "description", visible: true, isModelProperty: true },
    { name: "Etat", property: "etat", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "ajoutePar", visible: true }, // New combined column

    { name: "Note du Ministere", property: "noteMinistere", visible: true, isModelProperty: true },
    { name: "Demande de Prospection", property: "demandeProspection", visible: false, isModelProperty: true },
    { name: "Note d'information", property: "noteInformation", visible: false, isModelProperty: true },
    { name: "Note d'instruction", property: "noteInstruction", visible: false, isModelProperty: true },
    { name: "Rapport prospection", property: "rapportProspection", visible: false, isModelProperty: true },
    { name: "Rapport de mission", property: "rapportMission", visible: false, isModelProperty: true },

    { name: "Date creation", property: "createAt", visible: false, isModelProperty: true },

    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private dossierColonieService: DossierColonieService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.getDossierColonies();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((dossierColonies) => {
      this.dossierColonies = dossierColonies;
      this.dataSource.data = dossierColonies;
      console.log('Dossier Colonies in ngOnInit:', this.dossierColonies); // Debugging output
    });
  }

  ngAfterViewInit() {
    this.setDataSourceAttributes();
  }

  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(value) != -1;
    };
  }

  getDossierColonies() {
    this.dossierColonieService.getAll().subscribe(
      (response) => {
        this.dossierColonies = response.body;
        console.log('Dossier Colonies:', this.dossierColonies); 
        this.currentDossierColonie = this.dossierColonies.find(e => e.etat === EtatDossierColonie.ouvert || e.etat === EtatDossierColonie.saisi);// Debugging output
        this.subject$.next(this.dossierColonies);
        this.showProgressBar = true;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.dossierColonies.filter(dossierColonie => dossierColonie.etat === EtatDossierColonie.saisi || dossierColonie.etat === EtatDossierColonie.ouvert));
        this.showProgressBar = true;
      }
    );
  }
  createDossierColonie() {
    this.dialog
      .open(AddDossierColonieComponent)
      .afterClosed()
      .subscribe((dossierColonie: any) => {
        if (dossierColonie) {
          this.dossierColonies.unshift(new DossierColonie(dossierColonie));
          this.subject$.next(this.dossierColonies);
        }
      });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  updateDossierColonie(dossierColonie: DossierColonie) {
    this.dialog
      .open(AddDossierColonieComponent, { data: dossierColonie })
      .afterClosed()
      .subscribe((updatedDossierColonie) => {
        if (updatedDossierColonie) {
          const index = this.dossierColonies.findIndex(
            (existingDossierColonie) => existingDossierColonie.id === updatedDossierColonie.id
          );
            this.dossierColonies[index] = new DossierColonie(updatedDossierColonie);
            this.subject$.next(this.dossierColonies);
            console.log("Apres update", this.dossierColonies);
        }
      });
  }

  detailsDossierColonie(dossierColonie: DossierColonie) {
    this.dialog
      .open(DetailsDossierColonieComponent, { data: dossierColonie })
      .afterClosed()
      .subscribe((dossierColonie) => {
        if (dossierColonie) {
          const index = this.dossierColonies.findIndex(
            (existingDossierColonie) => existingDossierColonie.id === dossierColonie.id
          );
          this.dossierColonies[index] = new DossierColonie(dossierColonie);
          this.subject$.next(this.dossierColonies);
        }
      });
  }

  deleteDossierColonie(dossierColonie: DossierColonie) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierColonieService.delete(dossierColonie.id).subscribe(
          () => {
            this.dossierColonies.splice(
              this.dossierColonies.findIndex((existingDossierColonie) => existingDossierColonie.id === dossierColonie.id), 1
            );
            this.subject$.next(this.dossierColonies);
            this.notificationService.success(NotificationUtil.suppression);
          },
          err => {
            this.notificationService.warn(NotificationUtil.echec);
          }, () => { }
        )
      }
    })
  }
  fermerDossierColonie(dossierColonie: DossierColonie) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      let mail = new Mail();
      mail.objet = MailDossierColonie.objet;
      mail.contenu = MailDossierColonie.content;
      mail.lien = "";
      mail.emetteur = "";
      mail.destinataires = ["nnafissa27@gmail.com"];
      if (action === DialogUtil.confirmer) {
        dossierColonie.etat = this.fermer;
        this.dossierColonieService.update(dossierColonie).subscribe(
          (response) => {
            this.notificationService.success(NotificationUtil.fermetureDossier);
          },
          err => {
            this.notificationService.warn(NotificationUtil.echec);
          }, () => {
            this.mailService.sendMailByDirections(mail).subscribe(
              response => {
              }, err => {
                this.notificationService.warn(NotificationUtil.echec);
              },
              () => {
                this.notificationService.success(NotificationUtil.envoyeDossier);
              });
          });
      }
    });
  }

  ngOnDestroy() { }

 
}
