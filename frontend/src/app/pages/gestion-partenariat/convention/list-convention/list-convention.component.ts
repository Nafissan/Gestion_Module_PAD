import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Convention } from '../../shared/model/convention.model';
import { ConventionService } from '../../shared/service/convention.service';
import { AddOrUpdateConventionComponent } from '../add-or-update-convention/add-or-update-convention.component';
import { DetailsConventionComponent } from '../details-convention/details-convention.component';

@Component({
  selector: 'fury-list-convention',
  templateUrl: './list-convention.component.html',
  styleUrls: ['./list-convention.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListConventionComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentConvention: Convention = undefined;
  conventions: Convention[] = [];
  subject$: ReplaySubject<Convention[]> = new ReplaySubject<Convention[]>(
    1
  );
  data$: Observable<Convention[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Convention> | null;

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
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Libelle ", property: "libelle", visible: true, isModelProperty: true },
    
    { name: "Date Signature", property: "dateSignature", visible: true, isModelProperty: true },
    { name: "Date Fin", property: "dateFin", visible: true, isModelProperty: true },
    { name: "Type Partenariat", property: "type", visible: false, isModelProperty: true },
    { name: "Statut", property: "statut", visible: true, isModelProperty: true },
    { name: "Active", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "action", visible: true },

  ] as ListColumn[];
  constructor(
    private conventionService: ConventionService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getConventions();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((conventions) => {
      this.conventions = conventions;
      this.dataSource.data = conventions;
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
   /* Les conventions qui sont activés */
  // getConventions() {
  //   this.conventionService.getAll().subscribe(
  //     (response) => {
  //       this.conventions = response.body;
  //       this.currentConvention = this.conventions.find(e => e.active === true);
  //     },
  //     (err) => {
  //     },
  //     () => {
  //       this.subject$.next(this.conventions.filter(continent => continent.active === true));
  //       this.showProgressBar = true;
  //     }
  //   );
  // }
  getConventions() {
    this.conventionService.getAll().subscribe(
      (response) => {
        this.conventions = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.conventions);
        this.showProgressBar = true;
      });
  }

  createConvention() {
    this.dialog
      .open(AddOrUpdateConventionComponent)
      .afterClosed()
      .subscribe((convention: Convention) => {
        /**
         * convention is the updated continent (if the user pressed Save - otherwise it's null)
         */ if (convention) {
          /**
           * Here we are updating our local array.
           */
          this.conventions.unshift(new Convention(convention));
          this.subject$.next(this.conventions);
        }
      });
  }
  updateConvention(convention: Convention) {
    this.dialog
      .open(AddOrUpdateConventionComponent, {
        data: convention,
      })
      .afterClosed()
      .subscribe((convention) => {
        /**
         * convention is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (convention) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.conventions.findIndex(
            (existingConvention) =>
            existingConvention.id === convention.id
          );
          this.conventions[index] = new Convention(convention);
          this.subject$.next(this.conventions);
        }
      });
  }
  detailsConvention(convention: Convention) {
    this.dialog
      .open(DetailsConventionComponent, {
        data: convention,
      })
      .afterClosed()
      .subscribe((convention) => {
        /**
         * convention is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (convention) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.conventions.findIndex(
            (existingConvention) =>
            existingConvention.id === convention.id
          );
          this.conventions[index] = new Convention(convention);
          this.subject$.next(this.conventions);
        }
      });
  }
  deleteConvention(convention: Convention) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.conventionService.delete(convention).subscribe((response) => {
          this.conventions.splice(
            this.conventions.findIndex(
              (existingConvention) => existingConvention.id === convention.id
            ), 1);
          this.subject$.next(this.conventions);
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
