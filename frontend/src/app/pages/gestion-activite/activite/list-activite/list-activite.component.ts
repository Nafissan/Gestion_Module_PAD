import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AgentService } from 'src/app/shared/services/agent.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { Activite } from '../../shared/model/activite.model';
import { ActiviteService } from '../../shared/service/activite.service';
import { AddOrUpdateActiviteComponent } from '../add-or-update-activite/add-or-update-activite.component';
import { DetailsActiviteComponent } from '../details-activite/details-activite.component';

@Component({
  selector: 'fury-list-activite',
  templateUrl: './list-activite.component.html',
  styleUrls: ['./list-activite.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListActiviteComponent implements OnInit {

  showProgressBar: boolean = false;
  date: Date = new Date();
  activite: Activite[] = [];
  subject$: ReplaySubject<Activite[]> = new ReplaySubject<Activite[]>(
    1
  );
  data$: Observable<Activite[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Activite> | null;

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
    { name: "Checkbox", property: "checkbox", visible: true },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Code",property: "code",visible: false, isModelProperty: true},
    { name: "Libelle",property: "libelle",visible: true, isModelProperty: true},
    { name: "Description",property: "description",visible: false,isModelProperty: true},
    { name: "Date",property: "date",visible: true, isModelProperty: true},
    { name: "Convention",property: "convention",visible: true, isModelProperty: true},
    { name: "Statut",property: "statut",visible: true, isModelProperty: true},
    { name: "Active",property: "active",visible: false, isModelProperty: true},
    { name: "creer le",property: "createdAt",visible: false,isModelProperty: true,},
    { name: "mise a jour le", property: "updatedAt",visible: false,isModelProperty: true, },
    { name: "Actions", property: "actions", visible: true },


  ] as ListColumn[];
  constructor(
    private activiteService: ActiviteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.getActivite();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((activite) => {
      this.activite = activite;
      this.dataSource.data = activite;
    });
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
  getActivite() {
    this.activiteService.getAll().subscribe(
      (response) => {
        this.activite = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.activite);
        this.showProgressBar = true;
      });
  }

  createActivite() {
    this.dialog
      .open(AddOrUpdateActiviteComponent)
      .afterClosed()
      .subscribe((activite: any) => {
        /**
         * Activite is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (activite) {
          /**
           * Here we are updating our local array.
           */
          this.activite.unshift(new Activite(activite));
          this.subject$.next(this.activite);
        }
      });
  }
  updateActivite(activite: Activite) {
    this.dialog
      .open(AddOrUpdateActiviteComponent, {
        data: activite,
      })
      .afterClosed()
      .subscribe((activite) => {
        /**
         * Activite is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (activite) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.activite.findIndex(
            (existingActivite) =>
            existingActivite.id === activite.id
          );
          this.activite[index] = new Activite(activite);
          this.subject$.next(this.activite);
        }
      });
  }
  detailsActivite(activite: Activite) {
    this.dialog
      .open(DetailsActiviteComponent, {
        data: activite,
      })
      .afterClosed()
      .subscribe((activite) => {
        /**
         * Activite is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (activite) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.activite.findIndex(
            (existingActivite) =>
            existingActivite.id === activite.id
          );
          this.activite[index] = new Activite(activite);
          this.subject$.next(this.activite);
        }
      });
  }
  deleteActivite(activite: Activite) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.activiteService.delete(activite).subscribe((response) => {
          this.activite.splice(
            this.activite.findIndex(
              (existingActivite) => existingActivite.id === activite.id
            ), 1);
          this.subject$.next(this.activite);
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
