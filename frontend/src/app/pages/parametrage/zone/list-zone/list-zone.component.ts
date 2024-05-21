import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';

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
import {Pays} from '../../shared/model/pays.model';
import {ZoneService} from '../../shared/service/zone.service';
import { Zone } from '../../shared/model/zone.model';
import { AddOrUpdateZoneComponent } from '../add-or-update-zone/add-or-update-zone.component';
import { DetailsZoneComponent } from '../details-zone/details-zone.component';

@Component({
  selector: 'fury-list-zone',
  templateUrl: './list-zone.component.html',
  styleUrls: ['./list-zone.component.scss' ,'../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListZoneComponent implements OnInit {

  showProgressBar: boolean = false;
  date: Date = new Date();
  zones: Zone[] = [];
  subject$: ReplaySubject<Zone[]> = new ReplaySubject<Zone[]>(
    1
  );
  data$: Observable<Zone[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Zone> | null;

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
    { name: "Code", property: "code", visible: true, isModelProperty: true },
    { name: "Nom", property: "nom", visible: true, isModelProperty: true },
    { name: "Active", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private zoneService: ZoneService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private agentService: AgentService,

  ) { }

  ngOnInit() {
    this.getZones();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((zones) => {
      this.zones = zones;
      this.dataSource.data = zones;
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
  getZones() {
    this.zoneService.getAll().subscribe(
      (response) => {
        this.zones = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.zones);
        this.showProgressBar = true;
      });
  }

  createZone() {
    this.dialog
      .open(AddOrUpdateZoneComponent)
      .afterClosed()
      .subscribe((zone: any) => {
        /**
         * Pays is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (zone) {
          /**
           * Here we are updating our local array.
           */
          this.zones.unshift(new Zone(zone));
          this.subject$.next(this.zones);
        }
      });
  }
  updateZone(zone: Zone) {
    this.dialog
      .open(AddOrUpdateZoneComponent, {
        data: zone,
      })
      .afterClosed()
      .subscribe((zone) => {
        /**
         * zone is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (zone) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.zones.findIndex(
            (existingZone) =>
            existingZone.id === zone.id
          );
          this.zones[index] = new Zone(zone);
          this.subject$.next(this.zones);
        }
      });
  }
  detailsZone(zone: Zone) {
    this.dialog
      .open(DetailsZoneComponent, {
        data: zone,
      })
      .afterClosed()
      .subscribe((pays) => {
    
        if (pays) {
        
          const index = this.zones.findIndex(
            (existingPays) =>
            existingPays.id === pays.id
          );
          this.zones[index] = new Zone(zone);
          this.subject$.next(this.zones);
        }
      });
  }
  deleteZone(zone: Zone) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.zoneService.delete(zone).subscribe((response) => {
          this.zones.splice(
            this.zones.findIndex(
              (existingDossierConge) => existingDossierConge.id === zone.id
            ), 1);
          this.subject$.next(this.zones);
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
