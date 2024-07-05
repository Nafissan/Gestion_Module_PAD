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
import { Agent } from "../../../../shared/model/agent.model";
import { Mail } from "src/app/shared/model/mail.model";
import { ParticipantService } from "../../shared/service/participant.service";
import { ReadFileDossierComponent } from "../read-file-dossier/read-file-dossier.component";
import { Participant } from "../../shared/model/participant-colonie.model";

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
  dossierColonies: DossierColonie;
  subject$: ReplaySubject<DossierColonie> = new ReplaySubject<DossierColonie>(1);
  data$: Observable<DossierColonie> = this.subject$.asObservable();
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
    { name: "Ajoute par", property: "ajoutePar", visible: true }, 

    { name: "Note du Ministere", property: "noteMinistere", visible: true, isModelProperty: true },
    { name: "Demande de Prospection", property: "demandeProspection", visible: false, isModelProperty: true },
    { name: "Note d'information", property: "noteInformation", visible: false, isModelProperty: true },
    { name: "Note d'instruction", property: "noteInstruction", visible: false, isModelProperty: true },
    { name: "Rapport de mission", property: "rapportMission", visible: false, isModelProperty: true },

    { name: "Date creation", property: "createdAt", visible: false, isModelProperty: true },

    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private dossierColonieService: DossierColonieService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private participantService: ParticipantService
  ) { }

  ngOnInit() {
    this.getDossierColonies();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((dossierColonies) => {
      this.dossierColonies = dossierColonies;
      this.dataSource.data = [dossierColonies];
    });
  }

  ngAfterViewInit() {
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
    this.dossierColonieService.getDossier().subscribe(
      (response) => {
        if(response.body!==null){
        this.dossierColonies = response.body as DossierColonie;
        console.log('Dossier Colonies:', this.dossierColonies); 
        }
      },
      (err) => {
        console.error('Error loading dossier colonies:', err); 
      },()=> {
        this.subject$.next(this.dossierColonies);
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
          this.dossierColonies = dossierColonie;
          this.subject$.next(this.dossierColonies);
          this.refreshDossierColonies(); 
        }
      });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  updateDossierColonie(dossierColonie: DossierColonie) {
    this.dialog
      .open(AddDossierColonieComponent, { data:  { dossier: dossierColonie, property: "update" }, })
      .afterClosed()
      .subscribe((updatedDossierColonie : DossierColonie) => {
        if (updatedDossierColonie) {
          this.dossierColonies = updatedDossierColonie;
          this.subject$.next(this.dossierColonies);
          this.refreshDossierColonies();
        }
      });
  }

  detailsDossierColonie(dossierColonie: DossierColonie) {
    this.dialog
      .open(DetailsDossierColonieComponent, { data: dossierColonie })
      .afterClosed()
      .subscribe((dossierColonie: DossierColonie) => {
        if (dossierColonie) {
          this.dossierColonies = dossierColonie;
          this.subject$.next(this.dossierColonies);
          this.refreshDossierColonies();
        }
      });
  }
  refreshDossierColonies() { this.getDossierColonies();}
  
  deleteDossierColonie(dossierColonie: DossierColonie) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
       
        this.dossierColonieService.delete(dossierColonie).subscribe(
          () => {
            this.subject$.next(this.dossierColonies);
            this.notificationService.success(NotificationUtil.suppression);
            this.refreshDossierColonies(); 
          },
          err => {
            this.notificationService.warn(NotificationUtil.echec);
          }, () => { }
        )
      }
    })
  }
  fermerDossierColonie(dossierColonie: DossierColonie) {
        dossierColonie.etat = this.fermer;
        this.dialog
        .open(AddDossierColonieComponent, { data:  { dossier: dossierColonie, property: "fermer" }, })
        .afterClosed()
        .subscribe((updatedDossierColonie: DossierColonie) => {
          if (updatedDossierColonie) {
            this.dossierColonies = updatedDossierColonie;
            this.subject$.next(this.dossierColonies);
          }
          this.refreshDossierColonies();
        });
        this.refreshDossierColonies(); 
   
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
      this.dossierColonies = row;
      this.subject$.next(this.dossierColonies);
    });
  }

  
  ngOnDestroy() { }

 
}
