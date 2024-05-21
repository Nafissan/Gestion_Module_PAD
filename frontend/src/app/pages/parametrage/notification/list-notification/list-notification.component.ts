import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AgentService } from 'src/app/shared/services/agent.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AddOrUpdateNotificationComponent } from '../add-or-update-notification/add-or-update-notification.component';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { NotificationEntity } from '../../shared/model/notification.model';
import { DetailsNotificationComponent } from '../details-notification/details-notification.component';

@Component({
  selector: 'fury-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})


export class ListNotificationComponent implements OnInit {

  showProgressBar: boolean = false;
  date: Date = new Date();
  notifications: NotificationEntity[] = [];
  subject$: ReplaySubject<NotificationEntity[]> = new ReplaySubject<NotificationEntity[]>(
    1
  );
  data$: Observable<NotificationEntity[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<NotificationEntity> | null;

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
    { name: "Module", property: "module", visible: true, isModelProperty: true },
    { name: "Libelle", property: "libelle", visible: true, isModelProperty: true },
    { name: "Active", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    //private zoneService: ZoneService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    //private agentService: AgentService,

  ) { }

  ngOnInit() {
    this.getNotifications();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((notifications) => {
      this.notifications = notifications;
      this.dataSource.data = notifications;
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
  getNotifications() {
    this.notificationService.getAll().subscribe(
      (response) => {
        this.notifications = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.notifications);
        this.showProgressBar = true;
      });
  }

  createNotification() {
    this.dialog
      .open(AddOrUpdateNotificationComponent)
      .afterClosed()
      .subscribe((notification: any) => {
        /**
         * Pays is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (notification) {
          /**
           * Here we are updating our local array.
           */
          this.notifications.unshift(new NotificationEntity(notification));
          this.subject$.next(this.notifications);
        }
      });
  }
  updateNotification(notification: NotificationEntity) {
    this.dialog
      .open(AddOrUpdateNotificationComponent, {
        data: notification,
      })
      .afterClosed()
      .subscribe((notification) => {
        /**
         * zone is the updated dossierConge (if the user pressed Save - otherwise it's null)*/
         
        if (notification) {
          /*
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           **/
          const index = this.notifications.findIndex(
            (existingNotification) =>
            existingNotification.id === notification.id
          );
          this.notifications[index] = new NotificationEntity(notification);
          this.subject$.next(this.notifications);
        }
      });
  }
  detailsNotification(notification: NotificationEntity) {
    this.dialog
      .open(DetailsNotificationComponent, {
        data: notification,
      })
      .afterClosed()
      .subscribe((pays) => {
    
        if (pays) {
        
          const index = this.notifications.findIndex(
            (existingPays) =>
            existingPays.id === pays.id
          );
          this.notifications[index] = new NotificationEntity(notification);
          this.subject$.next(this.notifications);
        }
      });
  }
  deleteNotification(notification: NotificationEntity) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.notificationService.delete(notification).subscribe((response) => {   
          this.notifications.splice( 
            this.notifications.findIndex(
            (existingDossierConge) => existingDossierConge.id === notification.id
          ), 1);
          this.subject$.next(this.notifications);
          this.notificationService.success((NotificationUtil.suppression));
        }, err => {
          this.notificationService.warn((NotificationUtil.echec));
        }, () => { })
      }
    })
  }

  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

}
