import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { UniteOrganisationnelle } from 'src/app/shared/model/unite-organisationelle';
import { Agent } from 'src/app/shared/model/agent.model';

import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Stock } from '../../shared/models/stock.model';
import { StockService } from '../../shared/stock.service';
import { SuiviStock } from '../../shared/models/suiviStock.model';
import { SuiviStockService } from '../../shared/suiviStock.service';

// tslint:disable-next-line:no-duplicate-imports

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from "moment";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY",
  },
  display: {
    dateInput: "YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: 'fury-dashboard-lait',
  templateUrl: './dashboard-lait.component.html',
  styleUrls: ['./dashboard-lait.component.scss',"../../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class DashboardLaitComponent implements OnInit {


  @ViewChild(MatDatepicker) picker;

  dateV = new FormControl(moment());
  stockAnneePrecedente:Stock;
  stockAnneeCourante:Stock;
  anneeSelected : number;
  showProgressBar: boolean = false;
  currentYear: number = new Date().getFullYear();

  acquisitionTotal:number=0;
  attributionTotal:number=0;
  quantiteRestant:number=0;
  
  currentStock: Stock = undefined;
  stocks: Stock[] = [];
  stock: Stock;

  stockReference:number=undefined;
  quantiteCourante:number=undefined;

  suiviStock:SuiviStock
  suiviStocks:SuiviStock[] = [];
  suiviStocksAttribution:SuiviStock[] = [];
  suiviStocksAcquisition:SuiviStock[] = [];

  subject$: ReplaySubject<SuiviStock[]> = new ReplaySubject<SuiviStock[]>(
    1
  );
  data$: Observable<SuiviStock[]> = this.subject$.asObservable();
  pageSize = 10;
  dataSource: MatTableDataSource<SuiviStock> | null;

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
    { name: "Traité par", property: "agent", visible: true, isModelProperty: true },
    { name: "Quantité", property: "quantite", visible: true, isModelProperty: true },
    { name: "Operation", property: "operation", visible: true, isModelProperty: true },
    { name: "CategorieLait", property: "categorieLait", visible: true, isModelProperty: true },
    { name: "Date Operation", property: "dateOperation", visible: true, isModelProperty: true },
  ] as ListColumn[];


  acJanv :number=0;
  acFev :number=0;
  acMars :number=0;
  acAvr :number=0;
  acMai :number=0;
  acJuin :number=0;
  acJuil :number=0;
  acAout :number=0;
  acSept :number=0;
  acOct :number=0;
  acNov :number=0;
  acDec :number=0;


  atJanv :number=0;
  atFev :number=0;
  atMars :number=0;
  atAvr :number=0;
  atMai :number=0;
  atJuin :number=0;
  atJuil :number=0;
  atAout :number=0;
  atSept :number=0;
  atOct :number=0;
  atNov :number=0;
  atDec :number=0;

  username: string;
  agent: Agent;

  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;



  public barChartData:ChartDataSets[] = [
    {data:[], label: 'ACQUISITION'},
    {data:[], label: 'ATTRIBUTION'}
  ];
    
  // aqcuisitionMap: Map<string, number> = new Map();
  // attributionMap: Map<string, number> = new Map();



  private _gap = 16;
  gap = `${this._gap}px`;

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }



  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mail', 'juin', 'Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
  public barChartType = 'bar';
  public barChartLegend = true;


  constructor(
    private authService: AuthenticationService,
    private compteService: CompteService,
    private stockService: StockService,
    private suiviStockService: SuiviStockService) { }

  ngOnInit() {
    // this.aqcuisitionMap.clear();
    // this.attributionMap.clear();

    this.getAgentConnecte();
    
    this.getStocksByAnnee(this.currentYear);
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

  getAgentConnecte() {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;

    }, err => { },
      () => {
      
      });
  }

  getStocksByAnnee(annee:number) {
    let idStock:number=0;
    this.stockService.getByAnnee(annee).subscribe(
      (response) => {

        this.stock = response.body;
        this.stockReference = this.stock.quantiteReference;
        this.quantiteCourante = this.stock.quantiteCourant;
        this.quantiteRestant = this.stock.quantiteRestant;
        idStock = this.stock.id;

      },
      (err) => {
      },
      () => {
      
          this.getSuiviStocksByAnnee(this.stock.id);
      }
    );

    if(idStock == 0){
      this.stockReference =0;
      this.quantiteCourante=0;
      this.quantiteRestant=0;
      this.suiviStocksAcquisition=[];
      this.suiviStocksAcquisition=[]
      this.suiviStocks = [];
      // this.getSuiviStocksByAnnee(idStock);
      this.barChartData = [
        {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Acquisition'},
        {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Attribution'},
      ];
      this.acJanv=0;
      this.acFev=0;
      this.acMars=0;
      this.acAvr=0;
      this.acMai=0;
      this.acJuin=0;
      this.acJuil=0;
      this.acAout=0;
      this.acSept=0;
      this.acOct=0;
      this.acNov=0;
      this.acDec=0;
    
    
      this.atJanv=0;
      this.atFev=0;
      this.atMars=0;
      this.atAvr=0;
      this.atMai=0;
      this.atJuin=0;
      this.atJuil=0;
      this.atAout=0;
      this.atSept=0;
      this.atOct=0;
      this.atNov=0;
      this.atDec=0;
    }
  }

  getAcquisitionByAnnee(idStock:number) {
    
    this.suiviStockService.getByStock(idStock).subscribe(
      (response) => {
        this.suiviStocks = response.body;
        this.suiviStocksAcquisition = this.suiviStocks.filter(a => a.operation === "acquisition")
        this.suiviStocks =  this.suiviStocksAcquisition;
        // this.attributionMap.set("ACQUISITION", this.suiviStocksAcquisition.length);

        // this.acJanv = 
        // this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Janvier").length;
        // this.acFev = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Fevrier").length;
        // this.acMars = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Mars").length;
        // this.acAvr = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Avril").length;
        // this.acMai = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Mai").length;
        // this.acJuin = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Juin").length;
        // this.acJuil = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Juillet").length;
        // this.acAout = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Août").length;
        // this.acSept = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Septembre").length;
        // this.acOct = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Octobre").length;
        // this.acNov = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Novembre").length;
        // this.acDec = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Decembre").length
    
      },
      (err) => {
      },
      () => {

        this.barChartData = [
          {data: [this.acJanv, this.acFev, this.acMars, this.acAvr, this.acMai, this.acJuin, this.acJuil,this.acAout,this.acSept,this.acOct,this.acNov,this.acDec], label: 'Acquisition'},
          // {data: [this.atJanv, this.atFev, this.atMars, this.atAvr, this.atMai, this.atJuin, this.atJuil,this.atAout,this.atSept,this.atOct,this.atNov,this.atDec], label: 'Attribution'},
        ];
        this.subject$.next(this.suiviStocks);
        this.showProgressBar = true;
      }
    );
  }

  getAttributionByAnnee(idStock:number) {
    this.suiviStockService.getByStock(idStock).subscribe(
      (response) => {
        this.suiviStocks = response.body;
        this.suiviStocksAttribution = this.suiviStocks.filter(a => a.operation === "attribution")
        this.suiviStocks =  this.suiviStocksAttribution;
        
        // this.atJanv = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Janvier").length;
        // this.atFev = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Fevrier").length;
        // this.atMars = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Mars").length;
        // this.atAvr = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Avril").length;
        // this.atMai = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Mai").length;
        // this.atJuin = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Juin").length;
        // this.atJuil = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Juillet").length;
        // this.atAout = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Août").length;
        // this.atSept = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Septembre").length;
        // this.atOct = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Octobre").length;
        // this.atNov = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Novembre").length;
        // this.atDec = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Decembre").length;
      },
      (err) => {
      },
      () => {
        
        this.barChartData = [
          // {data: [this.acJanv, this.acFev, this.acMars, this.acAvr, this.acMai, this.acJuin, this.acJuil,this.acAout,this.acSept,this.acOct,this.acNov,this.acDec], label: 'Acquisition'},
          {data: [this.atJanv, this.atFev, this.atMars, this.atAvr, this.atMai, this.atJuin, this.atJuil,this.atAout,this.atSept,this.atOct,this.atNov,this.atDec], label: 'Attribution'},
        ];

        this.subject$.next(this.suiviStocks);
        this.showProgressBar = true;
        
      }
    );
  }


  getSuiviStocksByAnnee(idStock:number) {

    this.suiviStockService.getByStock(idStock).subscribe(
      (response) => {
        this.suiviStocks = response.body;
        this.suiviStocksAcquisition = this.suiviStocks.filter(a => a.operation === "acquisition")
        this.suiviStocksAttribution = this.suiviStocks.filter(a => a.operation === "attribution")
        // suiviStocksJan = this.suiviStocks.filter(a => a.operation === "acquisition" && a.mois === "Janvier")
                
        this.suiviStocksAcquisition.forEach(a =>{
          this.acquisitionTotal += a.quantite;
          });

       this.suiviStocksAttribution.forEach(a =>{
        this.attributionTotal += a.quantite;
        });

        this.suiviStocksAcquisition.filter(a => a.mois === "Janvier").forEach(
          a=>{
            this.acJanv += a.quantite;
          }
        );

       
       this.suiviStocksAcquisition.filter(a => a.mois === "Fevrier").forEach(
          a=>{
            this.acFev += a.quantite;
          }
        );

        this.suiviStocksAcquisition.filter(a => a.mois === "Mars").forEach(
          a=>{
            this.acMars += a.quantite;
          }
         )
         
        this.suiviStocksAcquisition.filter(a =>a.mois === "Avril").forEach(
          a=>{
            this.acAvr += a.quantite;
          }
        );
        this.suiviStocksAcquisition.filter(a => a.mois === "Mai").forEach(
          a=>{
            this.acMai += a.quantite;
          }
        );
        this.suiviStocksAcquisition.filter(a =>a.mois === "Juin").forEach(
          a=>{
            this.acJuin += a.quantite;
          }
        );
        this.suiviStocksAcquisition.filter(a => a.mois === "Juillet").forEach(
          a=>{
            this.acJuil += a.quantite;
          }
        );
        this.suiviStocksAcquisition.filter(a => a.mois === "Août").forEach(
          a=>{
            this.acAout += a.quantite;
          }
        );
        this.suiviStocksAcquisition.filter(a => a.mois === "Septembre").forEach(
          a=>{
            this.acSept += a.quantite;
          }
        );
        this.suiviStocksAcquisition.filter(a => a.mois === "Octobre").forEach(
          a=>{
            this.acOct += a.quantite;
          }
        );
        this.suiviStocksAcquisition.filter(a => a.mois === "Novembre").forEach(
          a=>{
            this.acNov += a.quantite;
          }
        );

        this.suiviStocksAcquisition.filter(a => a.mois === "Decembre").forEach(
          a=>{
            this.acDec += a.quantite;
          }
        );

        // this.atJanv = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Janvier").length;
        // this.atFev = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Fevrier").length;
        // this.atMars = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Mars").length;
        // this.atAvr = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Avril").length;
        // this.atMai = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Mai").length;
        // this.atJuin = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Juin").length;
        // this.atJuil = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Juillet").length;
        // this.atAout = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Août").length;
        // this.atSept = this.suiviStocks.filter(a => a.operation === "attribution" && a.mois === "Septembre").length;
        // this.atOct = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Octobre").length;
        // this.atNov = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Novembre").length;
        // this.atDec = this.suiviStocks.filter(a => a.operation  === "attribution" && a.mois === "Decembre").length;
    

        this.suiviStocksAttribution.filter(a => a.mois === "Janvier").forEach(
          a=>{
            this.atJanv += a.quantite;
          }
        );

       
       this.suiviStocksAttribution.filter(a => a.mois === "Fevrier").forEach(
          a=>{
            this.atFev += a.quantite;
          }
        );

        this.suiviStocksAttribution.filter(a => a.mois === "Mars").forEach(
          a=>{
            this.atMars += a.quantite;
          }
         )
         
        this.suiviStocksAttribution.filter(a =>a.mois === "Avril").forEach(
          a=>{
            this.atAvr += a.quantite;
          }
        );
        this.suiviStocksAttribution.filter(a => a.mois === "Mai").forEach(
          a=>{
            this.atMai += a.quantite;
          }
        );
        this.suiviStocksAttribution.filter(a =>a.mois === "Juin").forEach(
          a=>{
            this.atJuin += a.quantite;
          }
        );
        this.suiviStocksAttribution.filter(a => a.mois === "Juillet").forEach(
          a=>{
            this.atJuil += a.quantite;
          }
        );
        this.suiviStocksAttribution.filter(a => a.mois === "Août").forEach(
          a=>{
            this.atAout += a.quantite;
          }
        );
        this.suiviStocksAttribution.filter(a => a.mois === "Septembre").forEach(
          a=>{
            this.atSept += a.quantite;
          }
        );
        this.suiviStocksAttribution.filter(a => a.mois === "Octobre").forEach(
          a=>{
            this.atOct += a.quantite;
          }
        );
        this.suiviStocksAttribution.filter(a => a.mois === "Novembre").forEach(
          a=>{
            this.atNov += a.quantite;
          }
        );

        this.suiviStocksAttribution.filter(a => a.mois === "Decembre").forEach(
          a=>{
            this.atDec += a.quantite;
          }
        );
         
      },
      (err) => {
      },
      () => {
        
        this.getCharts();
        this.subject$.next(this.suiviStocks);
        this.showProgressBar = true;
      }
    );
  }
  yearSelected(params) {
    this.dateV.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();

   this.acquisitionTotal = 0;
   this.attributionTotal = 0;

   this.acJanv=0;
   this.acFev=0;
   this.acMars=0;
   this.acAvr=0;
   this.acMai=0;
   this.acJuin=0;
   this.acJuil=0;
   this.acAout=0;
   this.acSept=0;
   this.acOct=0;
   this.acNov=0;
   this.acDec=0;
 
   this.atJanv=0;
   this.atFev=0;
   this.atMars=0;
   this.atAvr=0;
   this.atMai=0;
   this.atJuin=0;
   this.atJuil=0;
   this.atAout=0;
   this.atSept=0;
   this.atOct=0;
   this.atNov=0;
   this.atDec=0;

   this.barChartData = [
    {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Acquisition'},
    {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Attribution'},
  ];

  
   this.getStocksByAnnee(params.year());
  }

  // setAnnee(params){
  //   this.dateV.setValue(params);
  //   this.anneeSelected = params.year();
  //   this.picker.close();
  //   this.getStocksByAnnee(params.year());
  // }

  DetailsStocksAttributions(){
    this.getAttributionByAnnee(this.stock.id);
  }

  DetailsStocksAcquisitions(){
    this.getAcquisitionByAnnee(this.stock.id)
  }

  DetailsStocks(){
    this.acquisitionTotal = 0;
    this.attributionTotal = 0;

    this.acJanv=0;
   this.acFev=0;
   this.acMars=0;
   this.acAvr=0;
   this.acMai=0;
   this.acJuin=0;
   this.acJuil=0;
   this.acAout=0;
   this.acSept=0;
   this.acOct=0;
   this.acNov=0;
   this.acDec=0;
 
   this.atJanv=0;
   this.atFev=0;
   this.atMars=0;
   this.atAvr=0;
   this.atMai=0;
   this.atJuin=0;
   this.atJuil=0;
   this.atAout=0;
   this.atSept=0;
   this.atOct=0;
   this.atNov=0;
   this.atDec=0;

    this.barChartData = [
      {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Acquisition'},
      {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Attribution'},
    ];
    this.getSuiviStocksByAnnee(this.stock.id)
  }

  DetailsStocksCourant(){
    this.acquisitionTotal = 0;
   this.attributionTotal = 0;
   this.acJanv=0;
   this.acFev=0;
   this.acMars=0;
   this.acAvr=0;
   this.acMai=0;
   this.acJuin=0;
   this.acJuil=0;
   this.acAout=0;
   this.acSept=0;
   this.acOct=0;
   this.acNov=0;
   this.acDec=0;
 
   this.atJanv=0;
   this.atFev=0;
   this.atMars=0;
   this.atAvr=0;
   this.atMai=0;
   this.atJuin=0;
   this.atJuil=0;
   this.atAout=0;
   this.atSept=0;
   this.atOct=0;
   this.atNov=0;
   this.atDec=0;

   this.barChartData = [
    {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Acquisition'},
    {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Attribution'},
  ];
    this.getSuiviStocksByAnnee(this.stock.id)
  }

  getCharts(){
    this.barChartData = [
      {data: [this.acJanv, this.acFev, this.acMars, this.acAvr, this.acMai, this.acJuin, this.acJuil,this.acAout,this.acSept,this.acOct,this.acNov,this.acDec], label: 'Acquisition'},
      {data: [this.atJanv, this.atFev, this.atMars, this.atAvr, this.atMai, this.atJuin, this.atJuil,this.atAout,this.atSept,this.atOct,this.atNov,this.atDec], label: 'Attribution'},
    ];
  }
}
