import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { AddMarqueLaitComponent } from '../add-marque-lait/add-marque-lait.component';
import { Marque } from '../../shared/model/marque.model';
import { MarqueService } from '../../shared/service/marque.service';

@Component({
  selector: 'fury-list-marque-lait',
  templateUrl: './list-marque-lait.component.html',
  styleUrls: ['./list-marque-lait.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListMarqueLaitComponent implements OnInit {

  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();

  agentsChefStructureMail: string[] = [];
  currentMarque: Marque = undefined;
  marques: Marque[] = [];
  subject$: ReplaySubject<Marque[]> = new ReplaySubject<Marque[]>(
    1
  );
  data$: Observable<Marque[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Marque> | null;


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
    { name: "Checkbox", property: "checkbox", visible: false},
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Libelle ", property: "libelle", visible: true, isModelProperty: true },
    { name: "Commentaire", property: "commentaire", visible: true, isModelProperty: true },

    // { name: "type", property: "type", visible: false, isModelProperty: true },
    // { name: "Active ", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "action", visible: true },

  ] as ListColumn[];
  constructor(
    private marqueService: MarqueService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getMarques();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((marques) => {
      this.marques = marques;
      this.dataSource.data = marques;
    });

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
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
  getMarques() {
    this.marqueService.getAll().subscribe(
      (response) => {
        this.marques = response.body;
      },
      (err) => {
      },
      () => {

       this.subject$.next(this.marques);
        this.showProgressBar = true;

      }
    );
  }

  createMarque() {
    this.dialog
      .open(AddMarqueLaitComponent)
      .afterClosed()
      .subscribe((marque: any) => {
        /**
         * Marque is the updated continent (if the user pressed Save - otherwise it's null)
         */ if (marque) {
          /**
           * Here we are updating our local array.
           */
           this.marques.unshift(new Marque(marque));
          this.subject$.next(this.marques);
        }
      });
  }
  updateMarque(marque: Marque) {
    this.dialog
      .open(AddMarqueLaitComponent, {
        data: marque,
      })
      .afterClosed()
      .subscribe((marque) => {
        /**
         * Marque is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (marque) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index =   this.marques.findIndex(
            (existingMarque) =>
            existingMarque.id === marque.id
          );
          this.marques[index] = new Marque(marque);
          this.subject$.next(this.marques);
        }
      });
  }


  deleteMarque(Marque: Marque) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.marqueService.delete(Marque).subscribe((response) => {
          this.marques.splice(
            this.marques.findIndex(
              (existingMarque) => existingMarque.id === Marque.id
            ), 1);
          this.subject$.next(this.marques);
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
