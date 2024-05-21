import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { CategorieLait } from '../../shared/model/categorie-lait.model';
import { CategorieLaitService } from '../../shared/service/categorie-lait.service';
import { AddOrUpdateCategorieLaitComponent } from '../add-or-update-categorie-lait/add-or-update-categorie-lait.component';

@Component({
  selector: 'fury-list-categorie-lait',
  templateUrl: './list-categorie-lait.component.html',
  styleUrls: ['./list-categorie-lait.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListCategorieLaitComponent implements OnInit {

  showProgressBar: boolean = false;
  categorieLait: CategorieLait[] = [];
  subject$: ReplaySubject<CategorieLait[]> = new ReplaySubject<CategorieLait[]>(
    1
  );
  data$: Observable<CategorieLait[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<CategorieLait> | null;

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
    { name: "Id", property: "id", visible: true, isModelProperty: true },
    { name: "Libelle",property: "libelle",visible: true,isModelProperty: true},
    { name: "Description",property: "description",visible: true, isModelProperty: true},
    { name: "seuil",property: "seuil",visible: true, isModelProperty: true},
    { name: "creer le",property: "createdAt",visible: false,isModelProperty: true,},
    { name: "mise a jour le", property: "updatedAt",visible: false,isModelProperty: true, },
    { name: "Actions", property: "actions", visible: true },

  ] as ListColumn[];
  constructor(
    private categorieLaitService: CategorieLaitService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getcategorieLait();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((categorieLait) => {
      this.categorieLait = categorieLait;
      this.dataSource.data = categorieLait;
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
  getcategorieLait() {
    this.categorieLaitService.getAll().subscribe(
      (response) => {
        this.categorieLait = response.body;
        this.subject$.next(this.categorieLait);
        this.showProgressBar = true;
      },
      (err) => {
      },
      () => {
        console.log(this.categorieLait);
        this.subject$.next(this.categorieLait);
        this.showProgressBar = true;
      });
  }

  createCategorieLait() {
    this.dialog
      .open(AddOrUpdateCategorieLaitComponent)
      .afterClosed()
      .subscribe((categorieLait: any) => {
        /**
         * categorieLait is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (categorieLait) {
          /**
           * Here we are updating our local array.
           */
          this.categorieLait.unshift(new CategorieLait(categorieLait));
          this.subject$.next(this.categorieLait);
        }
      });
  }
  updateCategorieLait(categorieLait: CategorieLait) {
    this.dialog
      .open(AddOrUpdateCategorieLaitComponent, {
        data: categorieLait,
      })
      .afterClosed()
      .subscribe((categorieLait) => {
        /**
         * categorieLait is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (categorieLait) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.categorieLait.findIndex(
            (existingcategorieLait) =>
            existingcategorieLait.id === categorieLait.id
          );
          this.categorieLait[index] = new CategorieLait(categorieLait);
          this.subject$.next(this.categorieLait);
        }
      });
  }

  deleteCategorieLait(categorieLait: CategorieLait) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.categorieLaitService.delete(categorieLait).subscribe((response) => {
          this.categorieLait.splice(
            this.categorieLait.findIndex(
              (existingcategorieLait) => existingcategorieLait.id === categorieLait.id
            ), 1);
          this.subject$.next(this.categorieLait);
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
