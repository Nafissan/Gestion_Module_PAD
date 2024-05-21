import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordCongeRoutingModule } from './dashbord-conge-routing.module';
import { CongeBarChartComponent } from './conge-bar-chart/conge-bar-chart.component';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { ChartModule } from 'angular2-chartjs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CongeBarChartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashbordCongeRoutingModule,
    MaterialModule,
    FurySharedModule,
    ChartModule,
    ChartsModule,
    FormsModule,
  ]
})
export class DashbordCongeModule { }
