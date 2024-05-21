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
import { ActivatedRoute } from "@angular/router";
import { AddOrUpdateActionComponent } from "../add-or-update-action/add-or-update-action.component";
import { Partenaire, Prospect } from "../../../shared/model/partenaire.model";
import { PartenaireService } from "../../../shared/service/partenaire.service";
import {genererPDF} from '../../../../../shared/util/templates/edition_plan_prospection';
@Component({
  selector: 'fury-list-prospect',
  templateUrl: './list-prospect.component.html',
  styleUrls: ['./list-prospect.component.scss', '../../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListProspectComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  agentsChefStructure: Agent[] = [];
  currentProspect: Partenaire = undefined;
  prospects: Partenaire[] = [];
  subject$: ReplaySubject<Partenaire[]> = new ReplaySubject<Partenaire[]>(
    1
  );
  data$: Observable<Partenaire[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Partenaire> | null;
  idPlanProspection: number;


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
    { name: "Id", property: "id", visible: true, isModelProperty: true },
    { name: "Nom", property: "nom", visible: true, isModelProperty: true },
    { name: "Representant", property: "representantNom", visible: true, isModelProperty: true },
    { name: "Email", property: "representantEmail", visible: true, isModelProperty: true },
    { name: "Téléphone", property: "telephone", visible: true, isModelProperty: true },
    { name: "Active", property: "active", visible: false, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },



  ] as ListColumn[];
  constructor(
    private prospectService: PartenaireService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    //Recupère l'id du plan de prospection sélectionné
    this.route.paramMap.subscribe((params) => {
      this.idPlanProspection = parseInt(params.get("id"));
    });

    this.dataSource = new MatTableDataSource();

    this.getProspectsByPlanProspectionId();
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

  getProspectsByPlanProspectionId() {
    this.prospectService.getProspectsByPlanProspectionId(this.idPlanProspection).subscribe(
      (response) => {
        this.prospects = response.body;
      },
      (err) => {
      },
      () => {
        this.showProgressBar = true;
        this.data$.pipe(filter((data) => !!data)).subscribe((prospects) => {
          this.prospects = prospects;
          this.dataSource.data = prospects;
        });

        this.subject$.next(this.prospects);

      });
  }

  createProspect() {
    this.dialog
      .open(AddOrUpdateActionComponent)
      .afterClosed()
      .subscribe((Prospect: any) => {
        if (Prospect) {

          this.prospects.unshift(new Prospect(Prospect));
          this.subject$.next(this.prospects);
        }
      });
  }

  updateProspect(prospect: Partenaire) {
    this.dialog
      .open(AddOrUpdateActionComponent, {
        data: prospect,
      })
      .afterClosed()
      .subscribe((prospect) => {

        if (prospect) {

          const index = this.prospects.findIndex(
            (existingProspect) =>
              existingProspect.id === prospect.id
          );
          this.prospects[index] = new Partenaire(prospect);
          this.subject$.next(this.prospects);
        }
      });
  }

  suiviProspect(prospect: Partenaire) {
    this.dialog
      .open(AddOrUpdateActionComponent, {
        data: prospect,
      })
      .afterClosed()
      .subscribe((prospect) => {

        if (prospect) {

          const index = this.prospects.findIndex(
            (existingProspect) =>
              existingProspect.id === prospect.id
          );
          this.prospects[index] = new Partenaire(prospect);
          this.subject$.next(this.prospects);
        }
      });
  }

  detailsProspect(row): void{

  }

  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  
}
