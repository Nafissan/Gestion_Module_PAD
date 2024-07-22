import { ChartDataSets, ChartOptions } from 'chart.js';
import { ChartType } from 'chart.js';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import { EtatDossierColonie } from '../../shared/util/util';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { ColonStat } from '../../shared/model/colonStat.model';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable, forkJoin } from 'rxjs';
import { Satisfaction } from '../../shared/model/satisfaction.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SatisfactionService } from '../../shared/service/satisfaction.service';
import { DetailsSatisfactionComponent } from '../details-satisfaction/details-satisfaction.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { ParticipantService } from '../../shared/service/participant.service';

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
  colonStat: DossierColonie[]=[];
  private paginator: MatPaginator;
  private sort: MatSort;  filteredSatisfaction: Satisfaction[] = [];
  @ViewChild(MatDatepicker) picker;

  constructor(private dossierColonieService: DossierColonieService, private satisfactionService: SatisfactionService,
              private dialog: MatDialog, private participantService: ParticipantService, private dateAdapter: DateAdapter<any>) {
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

  public pieChartLabelsAge: string[] = ['Âge 7-10', 'Âge 10-15', 'Âge 15-18'];
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
    this.loadData();
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

  loadData() {
    forkJoin([
      this.dossierColonieService.getDossiersColoniesFerme(),
      this.satisfactionService.getAllSatisfactions()
    ]).subscribe(([dossiersResponse, satisfactionsResponse]) => {
      this.colonStat = dossiersResponse.body;
      this.satisfactions = satisfactionsResponse.body;
      this.processData();
    }, err => {
      console.error('Error loading data:', err);
    });
  }
  
  yearSelected(params: Date) {
    this.dateV.setValue(params);
    this.selectedYear = params.getFullYear(); 
    this.picker.close();
    this.loadData();
  }

  processData() {
    const colonCountsMap = new Map<number, number>();
    let maleCount = 0;
    let femaleCount = 0;
    let age7to10Count = 0;
    let age10to15Count = 0;
    let age15to18Count = 0;
  
    if (this.selectedYear !== null) {
      this.participantService.getParticipantsStatistics(this.selectedYear.toString()).subscribe(
        (response) => {
          const stats = response.body as ColonStat;
          maleCount += stats.maleCount;
          femaleCount += stats.femaleCount;
          age7to10Count += stats.age7to10;
          age10to15Count += stats.age10to15;
          age15to18Count += stats.age15to18;
  
          this.filteredSatisfaction = this.satisfactions.filter(satisfaction => satisfaction.codeDossier.annee === this.selectedYear.toString());
          this.updateMap(colonCountsMap, this.selectedYear, stats.totalColons);
          
          // Mettre à jour les graphiques après avoir récupéré toutes les données
          this.updateCharts(colonCountsMap, maleCount, femaleCount, age7to10Count, age10to15Count, age15to18Count);
        },
        (error) => {
          console.error(`Error fetching colon stats for dossier of year ${this.selectedYear.toString()}:`, error);
        }
      );
    } else {
      // Traiter les dossiers pour toutes les années
      this.colonStat.forEach(dossier => {
        this.participantService.getParticipantsStatistics(dossier.annee).subscribe(
          (response) => {
            const stats = response.body as ColonStat;
            maleCount += stats.maleCount;
            femaleCount += stats.femaleCount;
            age7to10Count += stats.age7to10;
            age10to15Count += stats.age10to15;
            age15to18Count += stats.age15to18;
  
            const year = parseInt(dossier.annee, 10);
            this.updateMap(colonCountsMap, year, stats.totalColons);
  
            // Mettre à jour les graphiques après avoir récupéré toutes les données
            this.updateCharts(colonCountsMap, maleCount, femaleCount, age7to10Count, age10to15Count, age15to18Count);
          },
          (error) => {
            console.error(`Error fetching colon stats for dossier ${dossier.id}:`, error);
          }
        );
      });
      this.filteredSatisfaction = this.satisfactions;
    }
  }
  updateCharts(colonCountsMap: Map<number, number>, maleCount: number, femaleCount: number, age7to10Count: number, age10to15Count: number, age15to18Count: number) {
    this.totalColons = maleCount + femaleCount;
    this.femaleColons = femaleCount;
    this.maleColons = maleCount;
  
    this.barChartLabels = Array.from(colonCountsMap.keys()).map(year => year.toString()).sort();
    this.barChartData = [
      { data: Array.from(colonCountsMap.values()), label: 'Nombre de colons' }
    ];
  
    this.pieChartDataSex = [maleCount, femaleCount];
    this.pieChartDataAge = [age7to10Count, age10to15Count, age15to18Count];
    
    console.log(this.pieChartDataAge + " " + this.pieChartDataSex + " " + this.barChartData);
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
}
