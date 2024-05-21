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

import { DomaineService } from '../../shared/service/domaine.service';
import { Domaine } from '../../shared/model/domaine.model';
import { AddOrUpdateDomaineComponent } from '../add-or-update-domaine/add-or-update-domaine.component';
import { DetailsDomaineComponent } from '../details-domaine/details-domaine.component';

@Component({
  selector: 'fury-list-domaine',
  templateUrl: './list-domaine.component.html',
  styleUrls: ['./list-domaine.component.scss' ,'../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListDomaineComponent implements OnInit {

  showProgressBar: boolean = false;
  date: Date = new Date();
  domaines: Domaine[] = [];
  subject$: ReplaySubject<Domaine[]> = new ReplaySubject<Domaine[]>(
    1
  );
  data$: Observable<Domaine[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Domaine> | null;

  
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
    { name: "Libelle", property: "libelle", visible: true, isModelProperty: true },
    { name: "Type", property: "type", visible: true, isModelProperty: true },
  
    { name: "Active", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private domaineService: DomaineService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private agentService: AgentService,

  ) { }

  ngOnInit() {
    this.getDomaine();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((zones) => {
      this.domaines = zones;
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
  getDomaine() {
    this.domaineService.getAll().subscribe(
      (response) => {
        this.domaines = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.domaines);
        this.showProgressBar = true;
      });
  }

  createDomaine() {
    this.dialog
      .open(AddOrUpdateDomaineComponent)
      .afterClosed()
      .subscribe((domaine: any) => {
        /**
         * Pays is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (domaine) {
          /**
           * Here we are updating our local array.
           */
          this.domaines.unshift(new Domaine(domaine));
          this.subject$.next(this.domaines);
        }
      });
  }
  updateDomaine(domaine: Domaine) {
    this.dialog
      .open(AddOrUpdateDomaineComponent, {
        data:domaine,
      })
      .afterClosed()
      .subscribe((domaine) => {
        
        if (domaine) {
         
          const index = this.domaines.findIndex(
            (existingDomaine) =>
            existingDomaine.id === domaine.id
          );
          this.domaines[index] = new Domaine(domaine);
          this.subject$.next(this.domaines);
        }
      });
  }
  detailsDomaine(domaine: Domaine) {
    this.dialog
      .open(DetailsDomaineComponent, {
        data: domaine,
      })
      .afterClosed()
      .subscribe((domaine) => {
    
        if (domaine) {
        
          const index = this.domaines.findIndex(
            (existingDomaine) =>
            existingDomaine.id === domaine.id
          );
          this.domaines[index] = new Domaine(domaine);
          this.subject$.next(this.domaines);
        }
      });
  }
  deleteDomaine(domaine: Domaine) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.domaineService.delete(domaine).subscribe((response) => {
          this.domaines.splice(
            this.domaines.findIndex(
              (existingDomaine) => existingDomaine.id === domaine.id
            ), 1);
          this.subject$.next(this.domaines);
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

