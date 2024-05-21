import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AgentService } from 'src/app/shared/services/agent.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import {Pays} from '../../shared/model/pays.model';
import {PaysService} from '../../shared/service/pays.service';
import { AddOrUpdatePaysComponent } from '../add-or-update-pays/add-or-update-pays.component';
import { DetailsPaysComponent } from '../details-pays/details-pays.component';

@Component({
  selector: 'fury-list-pays',
  templateUrl: './list-pays.component.html',
  styleUrls: ['./list-pays.component.scss' ,'../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListPaysComponent implements OnInit, AfterViewInit, OnDestroy {

  showProgressBar: boolean = false;
  date: Date = new Date();
  pays: Pays[] = [];
  subject$: ReplaySubject<Pays[]> = new ReplaySubject<Pays[]>(
    1
  );
  data$: Observable<Pays[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Pays> | null;

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
    { name: "Image", property: "image", visible: true },
    { name: "Code", property: "code", visible: true, isModelProperty: true },
    { name: "Nom", property: "nom", visible: true, isModelProperty: true },
    { name: "NomOfficiel", property: "nomOfficiel", visible: true, isModelProperty: true },
    { name: "Latitude", property: "latitude", visible: false, isModelProperty: true },
    { name: "Longitude", property: "longitude", visible: false, isModelProperty: true },
    { name: "Zoom", property: "zoom", visible: false, isModelProperty: true },
    { name: "Active", property: "active", visible: false, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private paysService: PaysService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.getPays();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((pays) => {
      this.pays = pays;
      this.dataSource.data = pays;
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
  getPays() {
    this.paysService.getAll().subscribe(
      (response) => {
        this.pays = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.pays);
        this.showProgressBar = true;
      });
  }

  createPays() {
    this.dialog
      .open(AddOrUpdatePaysComponent)
      .afterClosed()
      .subscribe((pays: any) => {
        /**
         * Pays is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (pays) {
          /**
           * Here we are updating our local array.
           */
          this.pays.unshift(new Pays(pays));
          this.subject$.next(this.pays);
        }
      });
  }
  updatePays(pays: Pays) {
    this.dialog
      .open(AddOrUpdatePaysComponent, {
        data: pays,
      })
      .afterClosed()
      .subscribe((pays) => {
        /**
         * Pays is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (pays) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.pays.findIndex(
            (existingPays) =>
            existingPays.id === pays.id
          );
          this.pays[index] = new Pays(pays);
          this.subject$.next(this.pays);
        }
      });
  }
  detailsPays(pays: Pays) {
    this.dialog
      .open(DetailsPaysComponent, {
        data: pays,
      })
      .afterClosed()
      .subscribe((pays) => {
        /**
         * Pays is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (pays) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.pays.findIndex(
            (existingPays) =>
            existingPays.id === pays.id
          );
          this.pays[index] = new Pays(pays);
          this.subject$.next(this.pays);
        }
      });
  }
  deletePays(pays: Pays) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.paysService.delete(pays).subscribe((response) => {
          this.pays.splice(
            this.pays.findIndex(
              (existingDossierConge) => existingDossierConge.id === pays.id
            ), 1);
          this.subject$.next(this.pays);
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
