import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SatisfactionPelerinage } from '../../shared/model/satisfaction-pelerinage.model';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { DossierPelerinageService } from '../../shared/services/dossier-pelerinage.service';
import { SatisfactionPelerinageService } from '../../shared/services/satisfaction-pelerinage.service';
import { PelerinsService } from '../../shared/services/pelerin-pelerinage.service';
import { PelerinStat } from '../../shared/model/pelerinStat.model';
import { DetailSatisfactionStatistiquePelerinageComponent } from '../detail-satisfaction-statistique-pelerinage/detail-satisfaction-statistique-pelerinage.component';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import moment from 'moment';
import { ReplaySubject, Observable } from 'rxjs';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fury-dashbord-statistique-pelerinage',
  templateUrl: './dashbord-statistique-pelerinage.component.html',
  styleUrls: ['./dashbord-statistique-pelerinage.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class DashbordStatistiquePelerinageComponent implements OnInit {
  dateV = new FormControl(moment());
  satisfactionPelerinages:SatisfactionPelerinage[] = [];
  subject$: ReplaySubject<SatisfactionPelerinage[]> = new ReplaySubject<SatisfactionPelerinage[]>(1);
  data$: Observable<SatisfactionPelerinage[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<SatisfactionPelerinage> | null;
  showProgressBar: boolean = false;
  selectedYear: number | null = null;
  startDate = new Date(this.selectedYear, 0, 1);
  dossier: DossierPelerinage[]=[];
  private paginator: MatPaginator;
  private sort: MatSort;  filteredSatisfactionPelerinage:SatisfactionPelerinage[] = [];
  @ViewChild(MatDatepicker) picker;

  constructor(private dossierPelerinageService: DossierPelerinageService, private satisfactionPelerinageService:SatisfactionPelerinageService,
              private dialog: MatDialog, private pelerinService: PelerinsService, private dateAdapter: DateAdapter<any>) {
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
    { name: "Code Dossier Pelerinage", property: "dossierPelerinage", visible: true, isModelProperty: true },
    { name: "Date de creation", property: "dateCreation", visible: true, isModelProperty: true },
    { name: "Rempli par", property: "traitePar", visible: true },
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
    { data: [], label: 'NOMBRE PELERINS' }
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabelsSex: string[] = ['Masculin', 'Féminin'];
  public pieChartDataSex: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend: boolean = true;

  public pieChartLabelsAge: string[] = ['Âge 40-50', 'Âge 50-60', 'Âge 60-70'];
  public pieChartDataAge: number[] = [];
  totalPelerin: number = 0;
  femalePelerin: number = 0;
  malePelerin: number = 0;
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
      this.satisfactionPelerinages = satisfaction;
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
    this.dossierPelerinageService.getDossiersPelerinageFerme().subscribe(
      (response) => {
        this.dossier = response.body ;
        this.satisfactionPelerinageService.getAllSatisfactions().subscribe(response => {
          this.satisfactionPelerinages = response.body;
          this.processData();
        }, err => {
          console.error('Error loading dossier pelerinage:', err);
        }, () => {
          this.subject$.next(this.filteredSatisfactionPelerinage);
          this.showProgressBar = true;
        });
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  yearSelected(params: Date) {
    this.dateV.setValue(params);
    this.selectedYear = params.getFullYear(); 
    this.picker.close();
    this.loadData();
  }
  processData() {
    const pelerinCountsMap = new Map<number, number>();
    let maleCount = 0;
    let femaleCount = 0;
    let age40to50Count = 0;
    let age50to60Count = 0;
    let age60to70Count = 0;
  
    if (this.selectedYear !== null) {
      this.pelerinService.getPelerinsStatistics(this.selectedYear.toString()).subscribe(
        (response) => {
          const stats = response.body as PelerinStat;
          maleCount += stats.maleCount;
          femaleCount += stats.femaleCount;
          age40to50Count += stats.age40to50;
          age50to60Count += stats.age50to60;
          age60to70Count += stats.age60to70;
  
          this.updateMap(pelerinCountsMap, this.selectedYear, stats.totalPelerins);
          
          this.updateCharts(pelerinCountsMap, maleCount, femaleCount, age40to50Count, age50to60Count, age60to70Count);
        },
        (error) => {
          console.error(`Error fetching colon stats for dossier of year ${this.selectedYear.toString()}:`, error);
        }
      );
      this.filteredSatisfactionPelerinage = this.satisfactionPelerinages.filter(satisfaction => satisfaction.dossierPelerinage.annee === this.selectedYear.toString());
    } else {
      this.dossier.forEach(dossier => {
        this.pelerinService.getPelerinsStatistics(dossier.annee).subscribe(
          (response) => {
            const stats = response.body as PelerinStat;
            maleCount += stats.maleCount;
            femaleCount += stats.femaleCount;
            age40to50Count += stats.age40to50;
            age50to60Count += stats.age50to60;
            age60to70Count += stats.age60to70;
            const year = parseInt(dossier.annee, 10);
            this.updateMap(pelerinCountsMap, year, stats.totalPelerins);
  
            this.updateCharts(pelerinCountsMap, maleCount, femaleCount, age40to50Count, age50to60Count, age60to70Count);
          },
          (error) => {
            console.error(`Error fetching pelerin stats for dossier ${dossier.id}:`, error);
          }
        );
      });
      this.filteredSatisfactionPelerinage = this.satisfactionPelerinages;
    }
  }
  updateCharts(pelerinCountsMap: Map<number, number>, maleCount: number, femaleCount: number, age40to50Count: number, age50to60Count: number, age60to70Count: number) {
    this.totalPelerin = maleCount + femaleCount;
    this.femalePelerin = femaleCount;
    this.malePelerin = maleCount;
  
    this.barChartLabels = Array.from(pelerinCountsMap.keys()).map(year => year.toString()).sort();
    this.barChartData = [
      { data: Array.from(pelerinCountsMap.values()), label: 'Nombre de pelerins' }
    ];
  
    this.pieChartDataSex = [maleCount, femaleCount];
    this.pieChartDataAge = [age40to50Count, age50to60Count, age60to70Count];
    
    console.log(this.pieChartDataAge + " " + this.pieChartDataSex + " " + this.barChartData);
  }
  updateMap(map: Map<number, number>, year: number, count: number) {
    if (map.has(year)) {
      map.set(year, map.get(year) + count);
    } else {
      map.set(year, count);
    }
  }

  detailsSatisfaction(row: SatisfactionPelerinage) {
    this.dialog
      .open(DetailSatisfactionStatistiquePelerinageComponent, { data: row })
      .afterClosed()
      .subscribe((satisfaction) => {
        if (satisfaction) {
          const index = this.satisfactionPelerinages.findIndex(
            (existing) => existing.id === satisfaction.id
          );
          this.satisfactionPelerinages[index] = new SatisfactionPelerinage(satisfaction);
          this.subject$.next(this.satisfactionPelerinages);
        }
      });
  }
}

