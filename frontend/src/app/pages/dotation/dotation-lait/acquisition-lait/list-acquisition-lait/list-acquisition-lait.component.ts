import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { SuiviStock } from '../../shared/models/suiviStock.model';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import {SuiviStockService} from '../../shared/suiviStock.service'
import { AddOrUpdateSuiviStockLaitComponent } from '../../suivi-stock-lait/add-or-update-suivi-stock-lait/add-or-update-suivi-stock-lait.component';
import { DetailsSuiviStockLaitComponent } from '../../suivi-stock-lait/details-suivi-stock-lait/details-suivi-stock-lait.component';

@Component({
  selector: 'fury-list-acquisition-lait',
  templateUrl: './list-acquisition-lait.component.html',
  styleUrls: ['./list-acquisition-lait.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListAcquisitionLaitComponent implements OnInit {

  
  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();

  agentsChefStructureMail: string[] = [];
  currentSuiviStock: SuiviStock = undefined;
  suiviStocks: SuiviStock[] = [];
  subject$: ReplaySubject<SuiviStock[]> = new ReplaySubject<SuiviStock[]>(
    1
  );
  data$: Observable<SuiviStock[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<SuiviStock> | null;

  // -----Utliser pour la pagination et le tri des listes--------
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChildren(MatSort) set matSort(ms: MatSort) {
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
    { name: "Libelle", property: "libelle", visible: true, isModelProperty: true },
    { name: "Nombre d'article", property: "nbreArticle", visible: true, isModelProperty: true },
    { name: "Date Operation", property: "dateOperation", visible: true, isModelProperty: true },
    { name: "Actions", property: "action", visible: true },

  ] as ListColumn[];
  constructor(
    private SuiviStockService: SuiviStockService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getSuiviStocks();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((suiviStocks) => {
      this.suiviStocks = suiviStocks;
      this.dataSource.data = suiviStocks;
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
  getSuiviStocks() {
    this.SuiviStockService.getAll().subscribe(
      (response) => {
        this.suiviStocks = response.body;
       // this.currentSuiviStock = this.SuiviStocks.find(e => e.active === true);
      },
      (err) => {
      },
      () => {
      //  this.subject$.next(this.SuiviStocks.filter(continent => continent.active === true));
       this.subject$.next(this.suiviStocks);
        this.showProgressBar = true;
      }
    );
  }

  createSuiviStock() {
    this.dialog
      .open(AddOrUpdateSuiviStockLaitComponent)
      .afterClosed()
      .subscribe((suiviStock: any) => {
        /**
         * SuiviStock is the updated continent (if the user pressed Save - otherwise it's null)
         */ if (suiviStock) {
          /**
           * Here we are updating our local array.
           */
          this.suiviStocks.unshift(new SuiviStock(suiviStock));
          this.subject$.next(this.suiviStocks);
        }
      });
  }
  updateSuiviStock(SuiviStock: SuiviStock) {
    this.dialog
      .open(AddOrUpdateSuiviStockLaitComponent, {
        data: SuiviStock,
      })
      .afterClosed()
      .subscribe((SuiviStock) => {
        /**
         * SuiviStock is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (SuiviStock) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.suiviStocks.findIndex(
            (existingSuiviStock) =>
            existingSuiviStock.id === SuiviStock.id
          );
          this.suiviStocks[index] = new SuiviStock(SuiviStock);
          this.subject$.next(this.suiviStocks);
        }
      });
  }
  detailsContinent(suiviStock: SuiviStock) {
    this.dialog
      .open(DetailsSuiviStockLaitComponent, {
        data: suiviStock,
      })
      .afterClosed()
      .subscribe((suiviStock) => {
        /**
         * SuiviStock is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (suiviStock) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.suiviStocks.findIndex(
            (existingSuiviStock) =>
            existingSuiviStock.id === suiviStock.id
          );
          this.suiviStocks[index] = new SuiviStock(suiviStock);
          this.subject$.next(this.suiviStocks);
        }
      });
  }

  deleteSuiviStock(SuiviStock: SuiviStock) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.SuiviStockService.delete(SuiviStock).subscribe((response) => {
          this.suiviStocks.splice(
            this.suiviStocks.findIndex(
              (existingSuiviStock) => existingSuiviStock.id === SuiviStock.id
            ), 1);
          this.subject$.next(this.suiviStocks);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }

  voirAcquistion(){
       
    this.router.navigate(['/dotation/suivi-SuiviStock-lait']);
  }

  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

}

