import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
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
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { NotificationService } from "../../../../shared/services/notification.service";
import { RapportProspection } from "../../shared/model/rapport-prospection.model";
import { RapportProspectionService } from "../../shared/service/rapport-prospection.service";
import { AddOrUpdateRapportProspectionComponent } from "../add-or-update-rapport-prospection/add-or-update-rapport-prospection.component";
import { DetailsRapportProspectionComponent } from "../details-rapport-prospection/details-rapport-prospection.component";
import { AuthenticationService } from "src/app/shared/services/authentification.service";

@Component({
  selector: "fury-liste-rapport-prospection",
  templateUrl: "./liste-rapport-prospection.component.html",
  styleUrls: ["./liste-rapport-prospection.component.scss", "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListeRapportProspectionComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  currentRapport: RapportProspection = undefined;
  rapports: RapportProspection[] = [];
  subject$: ReplaySubject<RapportProspection[]> = new ReplaySubject<RapportProspection[]>(1);
  data$: Observable<RapportProspection[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<RapportProspection> | null;
  rapportSelectionne: RapportProspection;
  afficherRapport: boolean = false;

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
    { name: "Code", property: "codeDossierColonie", visible: true, isModelProperty: true },
    { name: "Date de création", property: "dateCreation", visible: true, isModelProperty: true },
    { name: "État", property: "etat", visible: true, isModelProperty: true },
    { name: "Rapport Prospection", property: "rapport", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "Agent", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private rapportService: RapportProspectionService,
    private dialog: MatDialog,    private authentificationService: AuthenticationService,

    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getRapportProspections();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((rapports) => {
      this.rapports = rapports;
      this.dataSource.data = rapports;
      console.log('Participants Colonies in ngOnInit:', this.rapports); // Debugging output

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

  getRapportProspections() {
    this.rapportService.getAllReports().subscribe(
      (response) => {
        this.rapports = response;
        this.currentRapport = this.rapports.find(e => e.etat === 'Non Valide');
        this.subject$.next(this.rapports);
this.showProgressBar=true;
console.log(this.rapports);
      },
      (err) => { },
      () => {
        this.subject$.next(this.rapports);
      }
    );
  }

  createRapportProspection() {
    this.dialog
      .open(AddOrUpdateRapportProspectionComponent)
      .afterClosed()
      .subscribe((rapport: any) => {
        if (rapport) {
          this.rapports.unshift(rapport);
          this.subject$.next(this.rapports);
        }
      });
  }

  updateDossierColonie(rapport: DossierColonie) {
    this.dialog
      .open(AddOrUpdateRapportProspectionComponent, { data: rapport })
      .afterClosed()
      .subscribe((rapport) => {
        if (rapport) {
          const index = this.rapports.findIndex(
            (existingrapport) => existingrapport.id === rapport.id
          );
          this.rapports[index] = rapport;
          this.subject$.next(this.rapports);
        }
      });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  detailsDossierColonie(rapport: RapportProspection) {
    this.dialog
      .open(DetailsRapportProspectionComponent, { data: rapport })
      .afterClosed()
      .subscribe((rapport) => {
        if (rapport) {
          const index = this.rapports.findIndex(
            (existingrapport) => existingrapport.id === rapport.id
          );
          this.rapports[index] = new rapport(rapport);
          this.subject$.next(this.rapports);
        }
      });
  }

  deleteDossierColonie(rapport: RapportProspection) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.rapportService.deleteReport(rapport.id).subscribe(
          () => {
            this.rapports.splice(
              this.rapports.findIndex((existingrapport) => existingrapport.id === rapport.id), 1
            );
            this.subject$.next(this.rapports);
            this.notificationService.success(NotificationUtil.suppression);
          },
          err => {
            this.notificationService.warn(NotificationUtil.echec);
          }
        );
      }
    });
  }
  validerRapportProspection(rapport: RapportProspection){
    rapport.etat = 'VALIDER';
    this.rapportService.updateReport(rapport).subscribe(()=>{
      this.notificationService.success('Rapport de prospection valide avec succes');
    },() => {
      this.notificationService.warn('Echac de validation du rapport');
    })
  }
  rejeterRapportProspection(rapport: RapportProspection){
    rapport.etat = 'REJETER';
    this.rapportService.updateReport(rapport).subscribe(()=>{
      this.notificationService.success('Rapport de prospection rejete avec succes');
    },() => {
      this.notificationService.warn('Echac de rejection du rapport');
    })
  }
  afficherRapportProspection(rapport:RapportProspection){
    this.rapportSelectionne = rapport;
    this.afficherRapport=true;
  }
  ngOnDestroy() { }
}
