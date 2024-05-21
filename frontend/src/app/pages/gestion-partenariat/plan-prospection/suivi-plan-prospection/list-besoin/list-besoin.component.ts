import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { filter } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { Agent } from "src/app/shared/model/agent.model";
import { fadeInRightAnimation } from "src/@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@fury/animations/fade-in-up.animation";
import { ListColumn } from "src/@fury/shared/list/list-column.model";
import { AuthenticationService } from "src/app/shared/services/authentification.service";
import { DialogConfirmationService } from "src/app/shared/services/dialog-confirmation.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { DialogUtil, NotificationUtil } from "src/app/shared/util/util";
import { Besoin } from "../../../shared/model/besoin.model";
import { BesoinService } from "../../../shared/service/besoin.service";
import { ActivatedRoute } from "@angular/router";
import { AddOrUpdateBesoinComponent } from "../add-or-update-besoin/add-or-update-besoin.component";
import { DetailsBesoinComponent } from "../details-besoin/details-besoin.component";
import { PlanProspectionService } from "../../../shared/service/plan-prospection.service";
import { PlanProspection } from "../../../shared/model/plan-prospection.model";

@Component({
  selector: 'fury-list-besoin',
  templateUrl: './list-besoin.component.html',
  styleUrls: ['./list-besoin.component.scss', '../../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListBesoinComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  agentsChefStructure: Agent[] = [];
  currentBesoin: Besoin = undefined;
  besoins: Besoin[] = [];
  subject$: ReplaySubject<Besoin[]> = new ReplaySubject<Besoin[]>(
    1
  );
  data$: Observable<Besoin[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Besoin> | null;
  idPlanProspection: number;
  planprospection: PlanProspection;

  pathProspect: string;

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
    { name: "Structure ", property: "structure", visible: true, isModelProperty: true },
    { name: "Besoin", property: "libelle", visible: true, isModelProperty: true },
    { name: "Active", property: "active", visible: false, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },



  ] as ListColumn[];
  constructor(
    private besoinService: BesoinService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private planprospectionService: PlanProspectionService,
  ) { }

  ngOnInit() {
    //Recupère l'id du plan de prospection sélectionné
    this.route.paramMap.subscribe({
      next: (params) => {
        this.idPlanProspection = parseInt(params.get("id"));
      },
      complete: () => { this.pathProspect = '../../suivi-prospect/' + this.idPlanProspection; }
      
    });

    this.planprospectionService.getById(this.idPlanProspection).subscribe({
      next: (response) => {
        this.planprospection = response.body;
      },   
    });

    this.dataSource = new MatTableDataSource();

    this.getBesoinsByPlanProspectionId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  getBesoinsByPlanProspectionId() {
    this.besoinService.getBesoinsByPlan(this.idPlanProspection).subscribe(
      (response) => {
        this.besoins = response.body;
      },
      (err) => {
      },
      () => {
        this.showProgressBar = true;
        this.data$.pipe(filter((data) => !!data)).subscribe((besoins) => {
          this.besoins = besoins;
          this.dataSource.data = besoins;
        });

        this.subject$.next(this.besoins);

      });
  }

  createBesoin() {
    let  besoin: Besoin = new Besoin({planprospection: this.planprospection} as Besoin);    
    this.dialog
      .open(AddOrUpdateBesoinComponent,{
        data: besoin,
      },)
      .afterClosed()
      .subscribe((besoin: any) => {
        if (besoin) {
          this.besoins.unshift(new Besoin(besoin));
          this.subject$.next(this.besoins);
        }
      });
  }

  updateBesoin(besoin: Besoin) {
    this.dialog
      .open(AddOrUpdateBesoinComponent, {
        data: besoin,
      },)
      .afterClosed()
      .subscribe((besoin) => {

        if (besoin) {

          const index = this.besoins.findIndex(
            (existingBesoin) =>
              existingBesoin.id === besoin.id
          );
          this.besoins[index] = new Besoin(besoin);
          this.subject$.next(this.besoins);
        }
      });
  }

  detailsBesoin(Besoin: Besoin) {
    this.dialog
      .open(DetailsBesoinComponent, {
        data: Besoin,
      })
      .afterClosed()
      .subscribe((Besoin) => {

        if (Besoin) {

          const index = this.besoins.findIndex(
            (existingBesoin) =>
              existingBesoin.id === Besoin.id
          );
          this.besoins[index] = new Besoin(Besoin);
          this.subject$.next(this.besoins);
        }
      });
  }

  deleteBesoin(Besoin: Besoin) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.besoinService.delete(Besoin).subscribe((response) => {
          this.besoins.splice(
            this.besoins.findIndex(
              (existingBesoin) => existingBesoin.id === Besoin.id
            ), 1);
          this.subject$.next(this.besoins);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }

  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
}
