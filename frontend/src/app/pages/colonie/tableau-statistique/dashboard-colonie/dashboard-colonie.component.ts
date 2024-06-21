// dashboard-colonie.component.ts
import { ChartDataSets, ChartOptions } from 'chart.js';
import { ChartType } from 'chart.js';

import { Component, OnInit } from '@angular/core';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import { EtatDossierColonie } from '../../shared/util/util';

@Component({
  selector: 'app-dashboard-colonie',
  templateUrl: './dashboard-colonie.component.html',
  styleUrls: ['./dashboard-colonie.component.scss']
})
export class DashboardColonieComponent implements OnInit {

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = [];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;

  constructor(private dossierColonieService: DossierColonieService) { }
  public barChartData:ChartDataSets[] = [
    {data:[], label: 'NOMBRE COLONS'},
  ];
  private _gap = 16;
  gap = `${this._gap}px`;
  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dossierColonieService.getAll().subscribe(
      (response) => {
        let dossiersColonies = response.body; 
        const filteredDossierColonies = dossiersColonies.filter(dossier => 
          dossier.etat === EtatDossierColonie.fermer 
        );
        this.processData(filteredDossierColonies);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  processData(dossiersColonies: any[]) {
    const colonCountsMap = new Map<number, number>();

    dossiersColonies.forEach(dossier => {
      const year = new Date(dossier.createdAt).getFullYear();
      if (colonCountsMap.has(year)) {
        colonCountsMap.set(year, colonCountsMap.get(year) + dossier.colons.length);
      } else {
        colonCountsMap.set(year, dossier.colons.length);
      }
    });

    this.barChartLabels = Array.from(colonCountsMap.keys()).map(year => year.toString()).sort();
    this.barChartData = [{
      data: Array.from(colonCountsMap.values()),
      label: 'Nombre de colons'
    }];
  }
}
