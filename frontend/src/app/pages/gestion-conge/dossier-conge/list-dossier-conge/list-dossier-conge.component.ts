import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { DossierCongeService } from "../../shared/services/dossier-conge.service";
import { DossierConge } from "../../shared/model/dossier-conge.model";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { AddDossierCongeComponent } from "../add-dossier-conge/add-dossier-conge.component";
import { DetailsDossierCongeComponent } from "../details-dossier-conge/details-dossier-conge.component";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { EtatDossierConge } from "../../shared/util/util";
import { NotificationService } from "../../../../shared/services/notification.service";
import { MailDossierConge } from "../../../../shared/util/util";
import { MailService } from "../../../../shared/services/mail.service";
import { AgentService } from "../../../../shared/services/agent.service";
import { Agent } from "../../../../shared/model/agent.model";
import { Mail } from "../../../../shared/model/mail.model";
@Component({
  selector: "fury-list-dossier-conge",
  templateUrl: "./list-dossier-conge.component.html",
  styleUrls: ["./list-dossier-conge.component.scss", "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListDossierCongeComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  saisi: string = EtatDossierConge.saisi;
  ouvert: string = EtatDossierConge.ouvert;
  fermer: string = EtatDossierConge.fermer;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentDossierConge: DossierConge = undefined;
  dossierConges: DossierConge[] = [];
  subject$: ReplaySubject<DossierConge[]> = new ReplaySubject<DossierConge[]>(
    1
  );
  data$: Observable<DossierConge[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<DossierConge> | null;

  // -----Utliser pour la pagination et le tri des listes--------
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // -------------------------------------------------------------
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Code", property: "code", visible: false, isModelProperty: true },
    { name: "Annee ", property: "annee", visible: true, isModelProperty: true },
    {
      name: "Description", property: "description", visible: true, isModelProperty: true,
    },
    { name: "Etat", property: "etat", visible: true, isModelProperty: true },


    { name: "Matricule ", property: "matricule", visible: false, isModelProperty: true },
    { name: "Prenom ", property: "prenom", visible: false, isModelProperty: true },
    { name: "Nom ", property: "nom", visible: false, isModelProperty: true },
    { name: "Fonction ", property: "fonction", visible: false, isModelProperty: true },

    { name: "CodeDirection ", property: "codeDirection", visible: false, isModelProperty: true },
    { name: "NomDirection ", property: "nomDirection", visible: false, isModelProperty: true },
    { name: "DescriptionDirection ", property: "descriptionDirection", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private dossierCongeService: DossierCongeService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.getDossierConges();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((dossierConges) => {
      this.dossierConges = dossierConges;
      this.dataSource.data = dossierConges;
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  }
  getDossierConges() {
    this.dossierCongeService.getAll().subscribe(
      (response) => {
        this.dossierConges = response.body;
        this.currentDossierConge = this.dossierConges.find(e => e.etat === EtatDossierConge.saisi || e.etat === EtatDossierConge.ouvert);
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.dossierConges.filter(dossierConge => dossierConge.etat === EtatDossierConge.saisi || dossierConge.etat === EtatDossierConge.ouvert));
        this.showProgressBar = true;
        if (this.currentDossierConge && this.currentDossierConge.etat === EtatDossierConge.saisi) {
          this.getAllAgentsChefByNiveau();
        }
      }
    );
  }

  createDossierConge() {
    this.dialog
      .open(AddDossierCongeComponent)
      .afterClosed()
      .subscribe((dossierConge: any) => {
        /**
         * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (dossierConge) {
          /**
           * Here we are updating our local array.
           */
          this.dossierConges.unshift(new DossierConge(dossierConge));
          this.subject$.next(this.dossierConges);
          this.getAllAgentsChefByNiveau();
        }
      });
  }
  updateDossierConge(dossierConge: DossierConge) {
    this.dialog
      .open(AddDossierCongeComponent, {
        data: dossierConge,
      })
      .afterClosed()
      .subscribe((dossierConge) => {
        /**
         * DossierConge is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (dossierConge) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.dossierConges.findIndex(
            (existingDossierConge) =>
              existingDossierConge.id === dossierConge.id
          );
          this.dossierConges[index] = new DossierConge(dossierConge);
          this.subject$.next(this.dossierConges);
        }
      });
  }
  detailsDossierConge(dossierConge: DossierConge) {
    this.dialog
      .open(DetailsDossierCongeComponent, {
        data: dossierConge,
      })
      .afterClosed()
      .subscribe((dossierConge) => {
        /**
         * DossierConge is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (dossierConge) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.dossierConges.findIndex(
            (existingDossierConge) =>
              existingDossierConge.id === dossierConge.id
          );
          this.dossierConges[index] = new DossierConge(dossierConge);
          this.subject$.next(this.dossierConges);
        }
      });
  }
  deleteDossierConge(dossierConge: DossierConge) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierCongeService.delete(dossierConge).subscribe((response) => {
          this.dossierConges.splice(
            this.dossierConges.findIndex(
              (existingDossierConge) => existingDossierConge.id === dossierConge.id
            ), 1);
          this.subject$.next(this.dossierConges);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }
  ouvrirDossierConge(dossierConge: DossierConge) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      let mail = new Mail();
      mail.objet = MailDossierConge.objet;
      mail.contenu = MailDossierConge.content;
      mail.lien = "";
      mail.emetteur = "";
      mail.destinataires = ["mamadouseydou.diallo@portdakar.sn"]; // Pour les tests "cheikhibra.samb@portdakar.sn", "serignemalick.gaye@portdakar.sn", "aliounebada.ndoye@portdakar.sn", 
      // mail.destinataires=  this.agentsChefStructureMail; // Notifier les directions des structures de l'ouverture du dossier de congé  

      if (action === DialogUtil.confirmer) {
        dossierConge.etat = this.ouvert;
        this.dossierCongeService.update(dossierConge).subscribe((response) => {
          this.notificationService.success(NotificationUtil.ouvertureDossier);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => {
          this.mailService.sendMailByDirections(mail).subscribe(
            response => {
            }, err => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            () => {
              this.notificationService.success(NotificationUtil.ouvertureDossier);
            });
        });
      }
    });
  }
  fermerDossierConge(dossierConge: DossierConge) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      let mail = new Mail();
      mail.objet = MailDossierConge.objet;
      mail.contenu = MailDossierConge.content;
      mail.lien = "";
      mail.emetteur = "";
      mail.destinataires = ["cheikhibra.samb@portdakar.sn", "serignemalick.gaye@portdakar.sn", "aliounebada.ndoye@portdakar.sn", "mamadouseydou.diallo@portdakar.sn"]; // Pour les tests
      // mail.destinataires=  this.agentsChefStructureMail; // Notifier les directions des structures de l'ouverture du dossier de congé

      if (action === DialogUtil.confirmer) {
        dossierConge.etat = this.fermer;
        this.dossierCongeService.update(dossierConge).subscribe((response) => {
          this.notificationService.success(NotificationUtil.ouvertureDossier);
        }, err => {
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

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  getAllAgentsChefByNiveau() {
    this.agentService.getAllChefByPosition(true, EtatDossierConge.position)
      .subscribe(response => {
        this.agentsChefStructure = response.body;
      }, err => {
      }, () => {
        this.agentsChefStructure.forEach(agent => {
          this.agentsChefStructureMail.push(agent.email);
        })
      });
  }
}
