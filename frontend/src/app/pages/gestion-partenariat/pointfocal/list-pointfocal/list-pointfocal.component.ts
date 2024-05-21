import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
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
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { Agent } from "src/app/shared/model/agent.model";

import { PointfocalService } from '../../shared/service/pointfocal.service'

import { Pointfocal } from "../../shared/model/pointfocal.model";
import { AddOrUpdatePointfocalComponent } from "../add-or-update-pointfocal/add-or-update-pointfocal.component";
import { DetailsPointfocalComponent } from "../details-pointfocal/details-pointfocal.component";

@Component({
  selector: 'fury-list-pointfocal',
  templateUrl: './list-pointfocal.component.html',
  styleUrls: ['./list-pointfocal.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListPointfocalComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentPointfocal: Pointfocal = undefined;
  pointfocals: Pointfocal[] = [];
  subject$: ReplaySubject<Pointfocal[]> = new ReplaySubject<Pointfocal[]>(
    1
  );
  data$: Observable<Pointfocal[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Pointfocal> | null;


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
    { name: "Code ", property: "code", visible: false, isModelProperty: true },
    { name: "Structure",property: "structure",visible: true,isModelProperty: true},
    { name: "Matricule",property: "matricule",visible: true,isModelProperty: true},
    { name: "Nom", property: "nom", visible: true, isModelProperty: true },
    {name: "Prenom",property: "prenom", visible: true, isModelProperty: true},
    { name: "Active", property: "active", visible: false, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
     
   

  ] as ListColumn[];
  constructor(
    private pointfocalService: PointfocalService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    
    this.dataSource = new MatTableDataSource();
    this.getPointfocal();
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

  getPointfocal() {
    this.pointfocalService.getAll().subscribe(
      (response) => {
        this.pointfocals = response.body;
      },
      (err) => {
      },
      () => {
        this.showProgressBar = true;
        this.data$.pipe(filter((data) => !!data)).subscribe((pointfocals) => {
          this.pointfocals = pointfocals;
          this.dataSource.data = pointfocals;
        });

        this.subject$.next(this.pointfocals);

      });
  }

  createPointfocal() {
    this.dialog
      .open(AddOrUpdatePointfocalComponent)
      .afterClosed()
      .subscribe((pointfocal: any) => {
        
        if (this.pointfocals.filter((point)=>point.agent.id==pointfocal.id && point.unite.code==pointfocal.unite.code).length==0) {

          this.pointfocals.unshift(new Pointfocal(pointfocal));
          this.subject$.next(this.pointfocals);
        }
      });
  }
  updatePointfocal(pointfocal: Pointfocal) {
    this.dialog
      .open(AddOrUpdatePointfocalComponent, {
        data: pointfocal,
      })
      .afterClosed()
      .subscribe((pointfocal) => {
       
        if (pointfocal) {
      
          const index = this.pointfocals.findIndex(
            (existingPointfocal) =>
            existingPointfocal.id === pointfocal.id
          );
          this.pointfocals[index] = new Pointfocal(pointfocal);
          this.subject$.next(this.pointfocals);
        }
      });
  }


  
  detailsPointfocal (pointfocal: Pointfocal) {
    this.dialog
      .open(DetailsPointfocalComponent, {
        data: pointfocal,
      })
      .afterClosed()
      .subscribe((pointfocal) => {

        if (pointfocal) {

          const index = this.pointfocals.findIndex(
            (existingPointfocal) =>
              existingPointfocal.id === pointfocal.id
          );
          this.pointfocals[index] = new Pointfocal(pointfocal);
          this.subject$.next(this.pointfocals);
        }
      });
  }
 
  deletePointfocal(pointfocal: Pointfocal) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.pointfocalService.delete(pointfocal).subscribe((response) => {
          this.pointfocals.splice(
            this.pointfocals.findIndex(
              (existingPointfocal) => existingPointfocal.id === pointfocal.id
            ), 1);
          this.subject$.next(this.pointfocals);
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

