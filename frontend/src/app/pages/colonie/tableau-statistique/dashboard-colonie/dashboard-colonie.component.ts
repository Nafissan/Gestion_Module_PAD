import { ChartDataSets, ChartOptions } from 'chart.js';
import { ChartType } from 'chart.js';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import { EtatDossierColonie } from '../../shared/util/util';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ColonService } from '../../shared/service/colon.service';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { Colon } from '../../shared/model/colon.model';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { Satisfaction } from '../../shared/model/satisfaction.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SatisfactionService } from '../../shared/service/satisfaction.service';
import { DetailsSatisfactionComponent } from '../details-satisfaction/details-satisfaction.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fury-dashboard-colonie',
  templateUrl: './dashboard-colonie.component.html',
  styleUrls: ['./dashboard-colonie.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class DashboardColonieComponent implements OnInit {
  dateV = new FormControl(moment());
  satisfactions: Satisfaction[] = [];
  subject$: ReplaySubject<Satisfaction[]> = new ReplaySubject<Satisfaction[]>(1);
  data$: Observable<Satisfaction[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Satisfaction> | null;
  showProgressBar: boolean = false;
  selectedYear: number | null = null;
  startDate = new Date(this.selectedYear, 0, 1);
  private paginator: MatPaginator;
  private sort: MatSort;  filteredSatisfaction: Satisfaction[] = [];
  @ViewChild(MatDatepicker) picker;

  constructor(private dossierColonieService: DossierColonieService, private satisfactionService: SatisfactionService,
              private dialog: MatDialog, private colonService: ColonService, private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('fr'); // Adapter la locale si nécessaire
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: true },
    { name: "Code Dossier Colonie", property: "codeDossier", visible: true, isModelProperty: true },
    { name: "Date de creation", property: "dateCreation", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "traitePar", visible: true },
  ] as ListColumn[];
  
  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false,
          min: 0 // Définit que l'échelle de l'axe y commence à 1
        }
      }]
    }
  };
  barChartLabels: string[] = [];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'NOMBRE COLONS' }
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabelsSex: string[] = ['Masculin', 'Féminin'];
  public pieChartDataSex: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend: boolean = true;

  public pieChartLabelsAge: string[] = ['Âge 7-12', 'Âge 12-17', 'Âge 17-20'];
  public pieChartDataAge: number[] = [];
  totalColons: number = 0;
  femaleColons: number = 0;
  maleColons: number = 0;
  pieChartColorsSex = [
    {
      backgroundColor: ['#FFA500', '#0000FF'],
    },
  ];

  pieChartColorsAge = [
    {
      backgroundColor: ['#FFA500', '#0000FF', '#FF6384'],
    },
  ];
  private _gap = 16;
  gap = `${this._gap}px`;
  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  ngOnInit(): void {
    this.loadData(this.selectedYear);
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((satisfaction) => {
      this.satisfactions = satisfaction;
      this.dataSource.data = satisfaction;
    });
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => { 
      const dataStr = JSON.stringify(data).toLowerCase(); 
      return dataStr.indexOf(value) !== -1; 
    }
  }

  loadData(year: number | null) {
    this.dossierColonieService.getAll().subscribe(
      (response) => {
        let dossiersColonies = response.body as DossierColonie[];
        const filteredDossierColonies = year
          ? dossiersColonies.filter(dossier => dossier.etat === EtatDossierColonie.fermer && dossier.annee === year.toString())
          : dossiersColonies.filter(dossier => dossier.etat === EtatDossierColonie.fermer);
        this.loadColons(filteredDossierColonies);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getSatisfactions(dossiersColonies: any[], colons: any[]) {
    this.satisfactionService.getAllSatisfactions().subscribe(response => {
      this.satisfactions = response.body as Satisfaction[];
      this.processData(dossiersColonies, colons);
    }, err => {
      console.error('Error loading participant colonies:', err);
    }, () => {
      this.subject$.next(this.filteredSatisfaction);
      this.showProgressBar = true;
    });
  }

  loadColons(dossiersColonies: any[]) {
    this.colonService.getAll().subscribe(
      (response) => {
        let colons = response.body;
        this.getSatisfactions(dossiersColonies, colons);
      },
      (error) => {
        console.error('Error fetching colons:', error);
      }
    );
  }

  yearSelected(params: Date) {
    this.dateV.setValue(params);
    this.selectedYear = params.getFullYear(); 
    this.picker.close();
    this.loadData(this.selectedYear);
  }

  processData(dossiersColonies: DossierColonie[], colons: Colon[]) {
    const colonCountsMap = new Map<number, number>();
    let maleCount = 0;
    let femaleCount = 0;
    let age7to12Count = 0;
    let age12to17Count = 0;
    let age17to20Count = 0;

    dossiersColonies.forEach(dossier => {
      let year = Number(dossier.annee);
      const colonsInDossier = colons.filter(colon => colon.codeDossier.id === dossier.id);
      this.filteredSatisfaction = this.satisfactions.filter(satisfaction => satisfaction.codeDossier.id === dossier.id);
      console.log(this.filteredSatisfaction);
      maleCount += colonsInDossier.filter(colon => colon.sexe === 'masculin').length;
      femaleCount += colonsInDossier.filter(colon => colon.sexe === 'feminin').length;

      age7to12Count += colonsInDossier.filter(colon => {
        const age = this.calculateAge(colon.dateNaissance);
        return age >= 7 && age < 12;
      }).length;

      age12to17Count += colonsInDossier.filter(colon => {
        const age = this.calculateAge(colon.dateNaissance);
        return age >= 12 && age < 17;
      }).length;

      age17to20Count += colonsInDossier.filter(colon => {
        const age = this.calculateAge(colon.dateNaissance);
        return age >= 17 && age <= 20;
      }).length;

      this.updateMap(colonCountsMap, year, colonsInDossier.length);
    });

    this.totalColons = maleCount + femaleCount;
    this.femaleColons = femaleCount;
    this.maleColons = maleCount;
    this.barChartLabels = Array.from(colonCountsMap.keys()).map(year => year.toString()).sort();

    this.barChartData = [
      { data: Array.from(colonCountsMap.values()), label: 'Nombre de colons' }
    ];

    this.pieChartDataSex = [maleCount, femaleCount];
    this.pieChartDataAge = [age7to12Count, age12to17Count, age17to20Count];
  }

  updateMap(map: Map<number, number>, year: number, count: number) {
    if (map.has(year)) {
      map.set(year, map.get(year) + count);
    } else {
      map.set(year, count);
    }
  }

  detailsSatisfaction(row: Satisfaction) {
    this.dialog
      .open(DetailsSatisfactionComponent, { data: row })
      .afterClosed()
      .subscribe((satisfaction) => {
        if (satisfaction) {
          const index = this.satisfactions.findIndex(
            (existing) => existing.id === satisfaction.id
          );
          this.satisfactions[index] = new Satisfaction(satisfaction);
          this.subject$.next(this.satisfactions);
        }
      });
  }

  calculateAge(dateNaissance: Date): number {
    const birthDate = new Date(dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
