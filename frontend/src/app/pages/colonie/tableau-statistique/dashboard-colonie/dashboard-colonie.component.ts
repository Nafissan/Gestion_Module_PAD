// dashboard-colonie.component.ts
import { ChartDataSets, ChartOptions } from 'chart.js';
import { ChartType } from 'chart.js';

import { Component, OnInit } from '@angular/core';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import { EtatDossierColonie } from '../../shared/util/util';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ColonService } from '../../shared/service/colon.service';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { Colon } from '../../shared/model/colon.model';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'fury-dashboard-colonie',
  templateUrl: './dashboard-colonie.component.html',
  styleUrls: ['./dashboard-colonie.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class DashboardColonieComponent implements OnInit {

  selectedYear: number | null = null;
  startDate = new Date(this.selectedYear, 0, 1);

  constructor(private dossierColonieService: DossierColonieService,
              private colonService: ColonService,
              private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('fr'); // Adapter la locale si nécessaire
  }

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
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
  }

  onYearChange(event: any) {
    const selectedDate = event.value;
    this.selectedYear = selectedDate ? selectedDate.getFullYear() : null;
    this.loadData(this.selectedYear);
  }
  

  loadData(year: number | null) {
    this.dossierColonieService.getAll().subscribe(
      (response) => {
        let dossiersColonies = response.body;
        const filteredDossierColonies = year
          ? dossiersColonies.filter(dossier => dossier.etat === EtatDossierColonie.fermer && new Date(dossier.createdAt).getFullYear() === year)
          : dossiersColonies.filter(dossier => dossier.etat === EtatDossierColonie.fermer);
        this.loadColons(filteredDossierColonies);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  

  loadColons(dossiersColonies: any[]) {
    this.colonService.getAll().subscribe(
      (response) => {
        let colons = response.body;
        this.processData(dossiersColonies, colons);
      },
      (error) => {
        console.error('Error fetching colons:', error);
      }
    );
  }

  processData(dossiersColonies: DossierColonie[], colons: Colon[]) {
    const colonCountsMap = new Map<number, number>();
    let maleCount = 0;
    let femaleCount = 0;
    let age7to12Count = 0;
    let age12to17Count = 0;
    let age17to20Count = 0;
  
    dossiersColonies.forEach(dossier => {
      let year = 0;
      if(dossier.code === 'DCLN-PAD-2023')  { year = 2023;}else{
        year = new Date(dossier.createdAt).getFullYear();
      }
      const colonsInDossier = colons.filter(colon => colon.codeDossier.id === dossier.id);
  
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