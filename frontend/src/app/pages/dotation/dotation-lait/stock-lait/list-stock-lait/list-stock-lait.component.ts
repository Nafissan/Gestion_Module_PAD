import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import {Stock} from '../../shared/models/stock.model'
import {StockService} from '../../shared/stock.service'
import { AddOrUpdateSuiviStockLaitComponent } from '../../suivi-stock-lait/add-or-update-suivi-stock-lait/add-or-update-suivi-stock-lait.component';
import { AddOrUpdateStockLaitComponent } from '../add-or-update-stock-lait/add-or-update-stock-lait.component';
import { DetailsStockLaitComponent } from '../details-stock-lait/details-stock-lait.component';
import { CorrectionStockComponent } from '../correction-stock/correction-stock.component';

@Component({
  selector: 'fury-list-stock-lait',
  templateUrl: './list-stock-lait.component.html',
  styleUrls: ['./list-stock-lait.component.scss', '../../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListStockLaitComponent implements OnInit {


  stockAnneePrecedente:Stock;
  stockAnneeCourante:Stock;
  anneeSelected =new Date().getFullYear();
  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();

  agentsChefStructureMail: string[] = [];
  currentStock: Stock = undefined;
  stocks: Stock[] = [];
  subject$: ReplaySubject<Stock[]> = new ReplaySubject<Stock[]>(
    1
  );
  data$: Observable<Stock[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Stock> | null;

  idStock:number;
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
    { name: "Code ", property: "code", visible: false, isModelProperty: true },
    { name: "Annee", property: "annee", visible: true, isModelProperty: true },
    { name: "Quantité Courante", property: "quantiteCourant", visible: true, isModelProperty: true },
    { name: "Taux Disponibilité", property: "tauxdis", visible: true, isModelProperty: true },
    { name: "Taux Alerte", property: "seuilMinimum", visible: true, isModelProperty: true },
    // { name: "type", property: "type", visible: false, isModelProperty: true },
    // { name: "Active ", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "action", visible: true },

  ] as ListColumn[];
  constructor(
    private stockService: StockService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getStocks();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((stocks) => {
      this.stocks = stocks;
      this.dataSource.data = stocks;
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
  getStocks() {
    this.stockService.getAll().subscribe(
      (response) => {
        this.stocks = response.body;
        // this.getStockAnneeCourante();
        // this.getStockAnneePrecedente();
      },
      (err) => {
      },
      () => {
      //  this.subject$.next(this.Stocks.filter(continent => continent.active === true));
       this.subject$.next(this.stocks);
        this.showProgressBar = true;
      //  if(this.stockAnneeCourante === undefined){
      //    this.createStockDynamic();
      //  }
      }
    );
  }

  createStock() {
    this.dialog
      .open(AddOrUpdateStockLaitComponent)
      .afterClosed()
      .subscribe((stock: any) => {
        /**
         * Stock is the updated continent (if the user pressed Save - otherwise it's null)
         */ if (stock) {
          /**
           * Here we are updating our local array.
           */
          this.stocks.unshift(new Stock(stock));
          this.subject$.next(this.stocks);
        }
      });
  }
  updateStock(stock: Stock) {
    this.dialog
      .open(AddOrUpdateStockLaitComponent, {
        data: stock,
      })
      .afterClosed()
      .subscribe((stock) => {
        /**
         * Stock is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (stock) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.stocks.findIndex(
            (existingStock) =>
            existingStock.id === stock.id
          );
          this.stocks[index] = new Stock(stock);
          this.subject$.next(this.stocks);
        }
      });
  }
  detailsStock(Stock: Stock) {
    this.dialog
      .open(DetailsStockLaitComponent, {
        data: Stock,
      })
      .afterClosed()
      .subscribe((Stock) => {
        /**
         * Stock is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (Stock) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.stocks.findIndex(
            (existingStock) =>
            existingStock.id === Stock.id
          );
          this.stocks[index] = new Stock(Stock);
          this.subject$.next(this.stocks);
        }
      });
  }

  deleteStock(stock: Stock) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.stockService.delete(stock).subscribe((response) => {
          this.stocks.splice(
            this.stocks.findIndex(
              (existingStock) => existingStock.id === stock.id
            ), 1);
          this.subject$.next(this.stocks);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }

  nouvelleAcquistion(){

    // this.router.navigate(['/dotation/acquisition-lait/']);
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
         const index = this.stocks.findIndex(
           (existingStock) =>
           existingStock.id === suiviStock.stock.id
         );
         this.stocks[index] = new Stock(suiviStock.stock);
         this.subject$.next(this.stocks);

      }
    });
  }

  //  Methode permettant de corriger le Stock
  correctionStock(){

    this.dialog
    .open(CorrectionStockComponent)
    .afterClosed()
    .subscribe((suiviStock: any) => {
      /**
       * SuiviStock is the updated continent (if the user pressed Save - otherwise it's null)
       */ if (suiviStock) {
        /**
         * Here we are updating our local array.
         */
         const index = this.stocks.findIndex(
           (existingStock) =>
           existingStock.id === suiviStock.stock.id
         );
         this.stocks[index] = new Stock(suiviStock.stock);
         this.subject$.next(this.stocks);

      }
    });
  }
  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

  getStockAnneePrecedente(){
    this.stockService.getByAnnee(this.anneeSelected-1).subscribe(
      (response) => {
        this.stockAnneePrecedente = response.body;
      },
      (err) => {
      },
      () => {

      }
    );
   }

   getStockAnneeCourante(){
    this.stockService.getByAnnee(this.anneeSelected).subscribe(
      (response) => {
        this.stockAnneeCourante = response.body;
      },
      (err) => {
      },
      () => {

      }
    );
   }

   //Methode permattant de creer dynamiquement le stock de l'année courant
   createStockDynamic() {

    let stock: Stock
    stock.annee =  this.anneeSelected
    // stock.seuilMinimum =25
    stock.quantiteInitial = this.stockAnneePrecedente.quantiteReference
    // stock.seuilMinimum = 25
        this.stockService.create(stock).subscribe((response) => {

        }, err => {
          // this.notificationService.warn(NotificationUtil.echec);
        },
        () => {});

    }

}
